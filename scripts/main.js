(() => {
  'use strict';

  /* ---------- Language toggle (EN <-> FA) ----------
     Every element with data-fa keeps its English HTML in data-en, and
     swaps between the two on toggle. Choice is remembered in localStorage. */
  const KEY = 'site-lang';
  const root = document.documentElement;
  const langBtn = document.getElementById('langToggle');
  const langLabel = langBtn.querySelector('.lang-toggle-text');
  const translatable = document.querySelectorAll('[data-fa]');

  translatable.forEach((el) => { el.dataset.en = el.innerHTML.trim(); });

  const setLang = (lang) => {
    const fa = lang === 'fa';
    translatable.forEach((el) => { el.innerHTML = fa ? el.dataset.fa : el.dataset.en; });
    root.lang = fa ? 'fa' : 'en';
    root.dir = fa ? 'rtl' : 'ltr';
    langLabel.textContent = fa ? 'EN' : 'FA';
    try { localStorage.setItem(KEY, lang); } catch (_) { /* storage unavailable */ }
  };

  let saved = null;
  try { saved = localStorage.getItem(KEY); } catch (_) { /* storage unavailable */ }
  if (saved === 'fa') setLang('fa');

  langBtn.addEventListener('click', () => setLang(root.dir === 'rtl' ? 'en' : 'fa'));

  /* ---------- Copy contact email ---------- */
  document.querySelectorAll('[data-copy-email]').forEach((button) => {
    button.addEventListener('click', async () => {
      const email = button.dataset.copyEmail;
      const status = button.parentElement.querySelector('.copy-email-status');
      const label = button.querySelector('span');
      const originalLabel = label ? label.textContent : '';
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(email);
        } else {
          const field = document.createElement('textarea');
          field.value = email;
          field.setAttribute('readonly', '');
          field.style.position = 'fixed';
          field.style.opacity = '0';
          document.body.appendChild(field);
          field.select();
          const copied = document.execCommand('copy');
          field.remove();
          if (!copied) throw new Error('Copy command unavailable');
        }
        if (status) status.textContent = root.dir === 'rtl' ? 'ایمیل کپی شد' : 'Email copied';
        if (label) label.textContent = root.dir === 'rtl' ? 'کپی شد' : 'Copied';
      } catch (_) {
        if (status) status.textContent = root.dir === 'rtl' ? 'کپی نشد؛ ایمیل را انتخاب کنید' : 'Copy failed; select the email manually';
      }
      window.setTimeout(() => {
        if (label) label.textContent = root.dir === 'rtl' ? 'کپی ایمیل' : originalLabel;
        if (status) status.textContent = '';
      }, 2200);
    });
  });

  /* ---------- One shared lightbox for every project screenshot ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');

  lightbox.addEventListener('show.bs.modal', (e) => {
    const trigger = e.relatedTarget;
    if (!trigger) return;
    lightboxImg.src = trigger.getAttribute('href');
    lightboxImg.alt = trigger.querySelector('img')?.alt || '';
  });

  /* ---------- Close the mobile menu after choosing a section ---------- */
  const nav = document.getElementById('siteNav');
  nav.addEventListener('click', (e) => {
    if (e.target.closest('a[href^="#"]:not(.dropdown-toggle), .dropdown-item')) {
      bootstrap.Collapse.getInstance(nav)?.hide();
    }
  });
})();
