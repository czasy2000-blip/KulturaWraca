const NAV_HTML = `
<nav class="nav">
  <div class="nav-inner">
    <a href="/KulturaWraca/" class="logo">
      <div class="logo-icon">
        <svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
      </div>
      <div>
        <div class="logo-name"><span>Kultura</span>Wraca</div>
        <div class="logo-sub">Skup książek, płyt i winyli</div>
      </div>
    </a>
    <ul class="nav-links">
      <li><a href="/KulturaWraca/" data-page="index">Skup książek</a></li>
      <li><a href="/KulturaWraca/jak-to-dziala.html" data-page="jak-to-dziala">Jak to działa</a></li>
      <li><a href="/KulturaWraca/kim-jestesmy.html" data-page="kim-jestesmy">Kim jesteśmy</a></li>
      <li><a href="/KulturaWraca/blog.html" data-page="blog">Blog</a></li>
      <li><a href="/KulturaWraca/kontakt.html" data-page="kontakt">Kontakt</a></li>
    </ul>
    <div class="nav-right" style="display:flex;align-items:center;gap:12px;flex-shrink:0;">
      <a href="https://www.facebook.com/profile.php?id=100090801495391" target="_blank" class="nav-fb" style="display:flex;align-items:center;gap:5px;white-space:nowrap;">
        <svg viewBox="0 0 24 24" fill="#1877F2" width="16" height="16"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
        Facebook
      </a>
      <a href="/KulturaWraca/skup.html" class="btn-nav" style="background:#7A1E2E;color:#fff;border-radius:7px;padding:9px 18px;font-size:13px;font-weight:600;text-decoration:none;display:inline-flex;align-items:center;gap:5px;">Sprzedaj książkę →</a>
    </div>
  </div>
</nav>`;

const FOOTER_HTML = `
<footer>
  <div class="footer-grid">
    <div>
      <div class="footer-logo">
        <div class="footer-logo-icon">
          <svg viewBox="0 0 24 24" width="18" height="18"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
        </div>
        <div class="footer-logo-name"><span>Kultura</span>Wraca</div>
      </div>
      <p class="footer-desc">Skupujemy używane książki z całej Polski od ponad 4 lat. Każda książka trafia do nowego czytelnika, nie na makulaturę.</p>
      <div class="footer-contact">
        <a href="tel:+48511825915"><svg viewBox="0 0 24 24" width="14" height="14" style="flex-shrink:0"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/></svg>511 825 915</a>
        <a href="mailto:sklepkulturawraca@gmail.com"><svg viewBox="0 0 24 24" width="14" height="14" style="flex-shrink:0"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>sklepkulturawraca@gmail.com</a>
        <a href="/KulturaWraca/kontakt.html"><svg viewBox="0 0 24 24" width="14" height="14" style="flex-shrink:0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>ul. Wrocławska 1/3, 63-400 Ostrów Wlkp.</a>
        <a href="https://www.facebook.com/profile.php?id=100090801495391" target="_blank"><svg viewBox="0 0 24 24" fill="currentColor" stroke="none" width="14" height="14" style="flex-shrink:0"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>facebook.com/kulturawraca</a>
      </div>
    </div>
    <div class="footer-col">
      <h5>O skupie</h5>
      <a href="/KulturaWraca/kim-jestesmy.html">Kim jesteśmy</a>
      <a href="/KulturaWraca/jak-to-dziala.html">Jak to działa</a>
      <a href="/KulturaWraca/jakich-nie-skupujemy.html">Jakich nie skupujemy</a>
      <a href="/KulturaWraca/blog.html">Blog</a>
      <a href="/KulturaWraca/kontakt.html">Kontakt</a>
    </div>
    <div class="footer-col">
      <h5>Sprzedaj</h5>
      <a href="/KulturaWraca/skup.html">Zacznij wycenę</a>
      <a href="/KulturaWraca/jak-to-dziala.html">Jak to działa</a>
      <a href="/KulturaWraca/jakich-nie-skupujemy.html">Jakich nie skupujemy</a>
      <a href="/KulturaWraca/regulamin.html">Regulamin</a>
      <a href="/KulturaWraca/polityka-prywatnosci.html">Polityka prywatności</a>
    </div>
    <div class="footer-col">
      <h5>Skupy regionalne</h5>
      <a href="/KulturaWraca/skup-ksiazek-wroclaw.html">Skup książek Wrocław</a>
      <a href="/KulturaWraca/skup-ksiazek-warszawa.html">Skup książek Warszawa</a>
      <a href="/KulturaWraca/skup-ksiazek-krakow.html">Skup książek Kraków</a>
      <a href="/KulturaWraca/skup-ksiazek-poznan.html">Skup książek Poznań</a>
      <a href="/KulturaWraca/skup-ksiazek-gdansk.html">Skup książek Gdańsk</a>
      <a href="/KulturaWraca/skup-ksiazek-lodz.html">Skup książek Łódź</a>
      <a href="/KulturaWraca/skup-ksiazek-katowice.html">Skup książek Katowice</a>
      <a href="/KulturaWraca/skup-ksiazek-walbrzych.html">Skup książek Wałbrzych</a>
      <a href="/KulturaWraca/skup-ksiazek-jelenia-gora.html">Skup książek Jelenia Góra</a>
      <a href="/KulturaWraca/skup-ksiazek-legnica.html">Skup książek Legnica</a>
      <a href="/KulturaWraca/skup-ksiazek-zielona-gora.html">Skup książek Zielona Góra</a>
      <a href="/KulturaWraca/skup-ksiazek-ostrow-wlkp.html">Skup książek Ostrów Wlkp.</a>
      <a href="/KulturaWraca/skup-ksiazek-bydgoszcz.html">Skup książek Bydgoszcz</a>
      <a href="/KulturaWraca/skup-ksiazek-szczecin.html">Skup książek Szczecin</a>
      <a href="/KulturaWraca/skup-ksiazek-rzeszow.html">Skup książek Rzeszów</a>
      <a href="/KulturaWraca/skup-ksiazek-lublin.html">Skup książek Lublin</a>
    </div>
  </div>

  <div style="border-top:1px solid #253545;padding-top:1.5rem;margin-top:0;max-width:1100px;margin:0 auto;padding-left:0;padding-right:0;">
    <p style="font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#4a6070;margin-bottom:10px;">Skup książek i płyt — miasta</p>
    <div style="font-size:11px;line-height:2;color:#3a5060;">
      <a href="/KulturaWraca/skup-ksiazek-wroclaw.html" style="color:#3a5060;text-decoration:none;margin-right:8px;">Skup książek Wrocław</a>
      <a href="/KulturaWraca/skup-ksiazek-warszawa.html" style="color:#3a5060;text-decoration:none;margin-right:8px;">Skup książek Warszawa</a>
      <a href="/KulturaWraca/skup-ksiazek-krakow.html" style="color:#3a5060;text-decoration:none;margin-right:8px;">Skup książek Kraków</a>
      <a href="/KulturaWraca/skup-ksiazek-poznan.html" style="color:#3a5060;text-decoration:none;margin-right:8px;">Skup książek Poznań</a>
      <a href="/KulturaWraca/skup-ksiazek-gdansk.html" style="color:#3a5060;text-decoration:none;margin-right:8px;">Skup książek Gdańsk</a>
      <a href="/KulturaWraca/skup-ksiazek-lodz.html" style="color:#3a5060;text-decoration:none;margin-right:8px;">Skup książek Łódź</a>
      <a href="/KulturaWraca/skup-ksiazek-katowice.html" style="color:#3a5060;text-decoration:none;margin-right:8px;">Skup książek Katowice</a>
      <a href="/KulturaWraca/skup-ksiazek-walbrzych.html" style="color:#3a5060;text-decoration:none;margin-right:8px;">Skup książek Wałbrzych</a>
      <a href="/KulturaWraca/skup-ksiazek-jelenia-gora.html" style="color:#3a5060;text-decoration:none;margin-right:8px;">Skup książek Jelenia Góra</a>
      <a href="/KulturaWraca/skup-ksiazek-legnica.html" style="color:#3a5060;text-decoration:none;margin-right:8px;">Skup książek Legnica</a>
      <a href="/KulturaWraca/skup-ksiazek-zielona-gora.html" style="color:#3a5060;text-decoration:none;margin-right:8px;">Skup książek Zielona Góra</a>
      <a href="/KulturaWraca/skup-ksiazek-ostrow-wlkp.html" style="color:#3a5060;text-decoration:none;margin-right:8px;">Skup książek Ostrów Wielkopolski</a>
      <a href="/KulturaWraca/skup-ksiazek-bydgoszcz.html" style="color:#3a5060;text-decoration:none;margin-right:8px;">Skup książek Bydgoszcz</a>
      <a href="/KulturaWraca/skup-ksiazek-szczecin.html" style="color:#3a5060;text-decoration:none;margin-right:8px;">Skup książek Szczecin</a>
      <a href="/KulturaWraca/skup-ksiazek-rzeszow.html" style="color:#3a5060;text-decoration:none;margin-right:8px;">Skup książek Rzeszów</a>
      <a href="/KulturaWraca/skup-ksiazek-lublin.html" style="color:#3a5060;text-decoration:none;margin-right:8px;">Skup książek Lublin</a>
      <span style="margin-right:8px;color:#3a5060;">Skup książek Śląsk</span>
      <span style="margin-right:8px;color:#3a5060;">Skup książek Trójmiasto</span>
      <span style="margin-right:8px;color:#3a5060;">Skup książek Toruń</span>
      <span style="margin-right:8px;color:#3a5060;">Skup książek Białystok</span>
      <span style="margin-right:8px;color:#3a5060;">Skup książek Kielce</span>
      <span style="margin-right:8px;color:#3a5060;">Skup książek Olsztyn</span>
      <span style="margin-right:8px;color:#3a5060;">Skup płyt audio online</span>
      <span style="margin-right:8px;color:#3a5060;">Skup winyli</span>
      <span style="margin-right:8px;color:#3a5060;">Skup DVD i Blu-ray</span>
      <span style="margin-right:8px;color:#3a5060;">Skup podręczników</span>
      <span style="margin-right:8px;color:#3a5060;">Skup książek akademickich</span>
      <span style="margin-right:8px;color:#3a5060;">Skup komiksów</span>
      <span style="margin-right:8px;color:#3a5060;">Skup książek dla dzieci</span>
      <span style="margin-right:8px;color:#3a5060;">Skup starych książek</span>
      <span style="margin-right:8px;color:#3a5060;">Skup antykwaryczny</span>
      <span style="margin-right:8px;color:#3a5060;">Hurtowy skup książek</span>
    </div>
  </div>
  <div class="footer-bottom">
    <p>© 2026 KulturaWraca | NIP: 8952249461 | skupujemykulture.pl — Wszystkie prawa zastrzeżone.</p>
    <div class="footer-bottom-links">
      <a href="/KulturaWraca/regulamin.html">Regulamin</a>
      <a href="/KulturaWraca/polityka-prywatnosci.html">Polityka prywatności</a>
    </div>
  </div>
</footer>`;

// Inject nav and footer
const navEl = document.getElementById('nav-placeholder');
const footerEl = document.getElementById('footer-placeholder');
if(navEl) navEl.outerHTML = NAV_HTML;
if(footerEl) footerEl.outerHTML = FOOTER_HTML;

// Mark active nav link
const rawPage = location.pathname.split('/').pop().replace('.html','');
const page = rawPage === '' ? 'index' : rawPage;
document.querySelectorAll('.nav-links a').forEach(a=>{
  if(a.dataset.page === page) a.classList.add('act');
});

// Handle anchor links — blokuj href="#" i smooth scroll dla sekcji
document.addEventListener('click', function(e){
  const a = e.target.closest('a[href^="#"]');
  if(!a) return;
  const id = a.getAttribute('href').slice(1);
  e.preventDefault();
  if(!id) return; // href="#" — nic nie rób
  const el = document.getElementById(id);
  if(el) el.scrollIntoView({behavior:'smooth'});
});
