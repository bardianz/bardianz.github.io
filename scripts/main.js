(() => {
  'use strict';

  /* ---------- One shared lightbox for every project screenshot ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');

  if (lightbox && lightboxImg) {
    lightbox.addEventListener('show.bs.modal', (e) => {
      const trigger = e.relatedTarget;
      if (!trigger) return;
      lightboxImg.src = trigger.getAttribute('href');
      lightboxImg.alt = trigger.querySelector('img')?.alt || '';
    });
  }

  /* ---------- Close the mobile menu after choosing a section ---------- */
  const nav = document.getElementById('siteNav');
  if (nav) {
    nav.addEventListener('click', (e) => {
      if (e.target.closest('a[href^="#"]:not(.dropdown-toggle), .dropdown-item')) {
        bootstrap.Collapse.getInstance(nav)?.hide();
      }
    });
  }
})();
