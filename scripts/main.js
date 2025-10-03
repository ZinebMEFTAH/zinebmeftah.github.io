// Hamburger menu toggle for mobile navigation
document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger");
  const navLinks = document.querySelector(".nav-links");

  if (burger && navLinks) {
    burger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }
});

(function () {
  const doc = document.documentElement;

  // Theme: honor saved preference or system
  const storageKey = 'theme';
  const getSystemTheme = () =>
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const applyTheme = (theme) => {
    doc.setAttribute('data-theme', theme);
    const btn = document.getElementById('themeToggle');
    if (btn) btn.setAttribute('aria-pressed', String(theme === 'dark'));
    localStorage.setItem(storageKey, theme);
  };
  const initTheme = () => {
    const saved = localStorage.getItem(storageKey);
    applyTheme(saved || getSystemTheme());
  };
  initTheme();

  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const next = doc.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  }

  // (Removed hamburger/mobile menu logic, now handled above)

  // Language switcher (toggle aria-pressed and document direction if Arabic)
  document.querySelectorAll('.lang-switcher button[data-lang]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      document.querySelectorAll('.lang-switcher button').forEach((b) => b.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', 'true');
      if (lang === 'ar') {
        doc.setAttribute('dir', 'rtl');
        doc.setAttribute('lang', 'ar');
      } else {
        doc.setAttribute('dir', 'ltr');
        doc.setAttribute('lang', lang || 'en');
      }
    });
  });

  // Flip-card keyboard and click toggle
  document.querySelectorAll('.flip-card').forEach((card) => {
    const toggle = () => {
      const flipped = card.classList.toggle('flipped');
      card.setAttribute('aria-pressed', String(flipped));
    };
    card.addEventListener('click', toggle);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });

  // Security: ensure external links use rel=noopener
  document.querySelectorAll('a[target="_blank"]').forEach((a) => {
    const rel = (a.getAttribute('rel') || '').split(/\s+/);
    if (!rel.includes('noopener')) rel.push('noopener');
    a.setAttribute('rel', rel.join(' ').trim());
  });
})();
