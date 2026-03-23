const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(express.json());

// ==================== KONFIGURACJA ====================
const ALLEGRO_CLIENT_ID = process.env.ALLEGRO_CLIENT_ID;
const ALLEGRO_CLIENT_SECRET = process.env.ALLEGRO_CLIENT_SECRET;
const PORT = process.env.PORT || 3000;

// ==================== TOKEN ALLEGRO ====================
let allegroToken = null;
let tokenExpiry = 0;

async function getAllegroToken() {
  // Jeśli token ważny — zwróć z cache
  if (allegroToken && Date.now() < tokenExpiry) {
    console.log("[TOKEN] Używam cached token (ważny jeszcze " +
      Math.round((tokenExpiry - Date.now()) / 1000) + "s)");
    return allegroToken;
  }

  console.log("[TOKEN] Pobieram nowy token client_credentials...");
  console.log("[TOKEN] Client ID:", ALLEGRO_CLIENT_ID ? ALLEGRO_CLIENT_ID.substring(0, 8) + "..." : "BRAK!");
  console.log("[TOKEN] Client Secret:", ALLEGRO_CLIENT_SECRET ? "ustawiony (" + ALLEGRO_CLIENT_SECRET.length + " znaków)" : "BRAK!");

  if (!ALLEGRO_CLIENT_ID || !ALLEGRO_CLIENT_SECRET) {
    throw new Error("Brak ALLEGRO_CLIENT_ID lub ALLEGRO_CLIENT_SECRET w zmiennych środowiskowych");
  }

  const credentials = Buffer.from(
    `${ALLEGRO_CLIENT_ID}:${ALLEGRO_CLIENT_SECRET}`
  ).toString("base64");

  console.log("[TOKEN] Basic auth length:", credentials.length);

  try {
    const response = await fetch("https://allegro.pl/auth/oauth/token", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    console.log("[TOKEN] Response status:", response.status);
    console.log("[TOKEN] Response headers:", JSON.stringify(Object.fromEntries(response.headers.entries())));

    const data = await response.json();

    if (!response.ok) {
      console.error("[TOKEN] BŁĄD odpowiedzi:", JSON.stringify(data));
      throw new Error(`Token error ${response.status}: ${JSON.stringify(data)}`);
    }

    allegroToken = data.access_token;
    // Odejmij 60s marginesu bezpieczeństwa
    tokenExpiry = Date.now() + (data.expires_in - 60) * 1000;

    console.log("[TOKEN] OK! Token ważny przez", data.expires_in, "sekund");
    console.log("[TOKEN] Token prefix:", allegroToken ? allegroToken.substring(0, 20) + "..." : "PUSTY!");
    console.log("[TOKEN] Scope:", data.scope || "brak");

    return allegroToken;
  } catch (err) {
    console.error("[TOKEN] WYJĄTEK:", err.message);
    allegroToken = null;
    tokenExpiry = 0;
    throw err;
  }
}

// ==================== SZUKAJ NA ALLEGRO ====================
async function searchAllegro(isbn) {
  const token = await getAllegroToken();

  const url = `https://api.allegro.pl/offers/listing?phrase=${isbn}&sort=-price&limit=10&category.id=7`;
  // category.id=7 = Książki i Komiksy — pomaga filtrować

  console.log("[ALLEGRO] Szukam:", url);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/vnd.allegro.public.v1+json",
    },
  });

  console.log("[ALLEGRO] Response status:", response.status);

  if (!response.ok) {
    const errorText = await response.text();
    console.error("[ALLEGRO] BŁĄD odpowiedzi:", response.status, errorText);

    // Jeśli 401 — token wygasł, wyczyść i spróbuj raz jeszcze
    if (response.status === 401) {
      console.log("[ALLEGRO] Token wygasł — czyszczę cache...");
      allegroToken = null;
      tokenExpiry = 0;
      throw new Error("Token wygasł, spróbuj ponownie");
    }

    throw new Error(`Allegro API ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  return data;
}

// ==================== NAJNIŻSZA CENA ====================
function findLowestPrice(allegroData) {
  const items = [
    ...(allegroData.items?.promoted || []),
    ...(allegroData.items?.regular || []),
  ];

  console.log("[CENA] Znaleziono ofert:", items.length);

  if (items.length === 0) return null;

  let lowest = Infinity;

  for (const item of items) {
    const price = parseFloat(item.sellingMode?.price?.amount);
    if (!isNaN(price) && price > 0 && price < lowest) {
      lowest = price;
    }
  }

  return lowest === Infinity ? null : lowest;
}

// ==================== OPEN LIBRARY (FALLBACK) ====================
async function getBookInfo(isbn) {
  try {
    const url = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`;
    console.log("[OPENLIB] Pobieram info:", url);

    const response = await fetch(url);
    const data = await response.json();
    const book = data[`ISBN:${isbn}`];

    if (book) {
      return {
        title: book.title || null,
        cover: book.cover?.medium || book.cover?.large || null,
      };
    }
  } catch (err) {
    console.error("[OPENLIB] Błąd:", err.message);
  }
  return { title: null, cover: null };
}

// ==================== ENDPOINT: WYCENA ====================
app.get("/api/wycena/:isbn", async (req, res) => {
  const isbn = req.params.isbn.replace(/[^0-9X]/gi, ""); // Czyść ISBN
  console.log("\n========================================");
  console.log("[WYCENA] ISBN:", isbn);
  console.log("========================================");

  if (!isbn || (isbn.length !== 10 && isbn.length !== 13)) {
    return res.json({
      found: false,
      isbn,
      title: null,
      cover: null,
      price: 0.1,
      reason: "Nieprawidłowy ISBN (musi mieć 10 lub 13 cyfr)",
    });
  }

  // Pobierz info z Open Library
  const bookInfo = await getBookInfo(isbn);
  console.log("[WYCENA] Tytuł:", bookInfo.title);

  // Szukaj na Allegro
  try {
    const allegroData = await searchAllegro(isbn);
    const lowestPrice = findLowestPrice(allegroData);

    if (lowestPrice === null) {
      console.log("[WYCENA] Brak ofert na Allegro → 0.10 zł");
      return res.json({
        found: true,
        isbn,
        title: bookInfo.title,
        cover: bookInfo.cover,
        price: 0.1,
        lowestAllegro: null,
        reason: "Brak ofert na Allegro",
      });
    }

    // 10% od najniższej ceny, minimum 0.10 zł
    const ourPrice = Math.max(0.1, parseFloat((lowestPrice * 0.1).toFixed(2)));

    console.log("[WYCENA] Najniższa Allegro:", lowestPrice, "→ Nasza cena:", ourPrice);

    return res.json({
      found: true,
      isbn,
      title: bookInfo.title,
      cover: bookInfo.cover,
      price: ourPrice,
      lowestAllegro: lowestPrice,
      reason: `10% od najniższej ceny Allegro (${lowestPrice} zł)`,
    });
  } catch (err) {
    console.error("[WYCENA] Błąd Allegro:", err.message);

    return res.json({
      found: false,
      isbn,
      title: bookInfo.title,
      cover: bookInfo.cover,
      price: 0.1,
      reason: "Brak dostępu do Allegro API",
      error: err.message,
    });
  }
});

// ==================== ENDPOINT: HEALTH ====================
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString(),
    hasClientId: !!ALLEGRO_CLIENT_ID,
    hasClientSecret: !!ALLEGRO_CLIENT_SECRET,
    hasToken: !!allegroToken,
    tokenValid: Date.now() < tokenExpiry,
  });
});

// ==================== ENDPOINT: TEST TOKEN ====================
app.get("/api/test-token", async (req, res) => {
  console.log("\n========================================");
  console.log("[TEST] Testowanie tokena Allegro...");
  console.log("========================================");

  try {
    const token = await getAllegroToken();
    res.json({
      success: true,
      tokenPrefix: token.substring(0, 20) + "...",
      expiresIn: Math.round((tokenExpiry - Date.now()) / 1000) + "s",
    });
  } catch (err) {
    res.json({
      success: false,
      error: err.message,
    });
  }
});

// ==================== START ====================
app.listen(PORT, () => {
  console.log(`\n🟢 KulturaWraca Backend działa na porcie ${PORT}`);
  console.log(`   ALLEGRO_CLIENT_ID: ${ALLEGRO_CLIENT_ID ? "OK" : "BRAK!"}`);
  console.log(`   ALLEGRO_CLIENT_SECRET: ${ALLEGRO_CLIENT_SECRET ? "OK" : "BRAK!"}`);
  console.log(`   ALLEGRO_REFRESH_TOKEN: ${process.env.ALLEGRO_REFRESH_TOKEN ? "⚠️ NADAL USTAWIONY (do usunięcia!)" : "✅ usunięty"}`);
});
