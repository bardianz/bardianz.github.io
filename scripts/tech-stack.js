(function () {
  'use strict';

  const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/';
  const SIMPLE_ICONS = 'https://cdn.simpleicons.org/';
  const TECH = {
    python:     { label: 'Python', src: DEVICON + 'python/python-original.svg' },
    django:     { label: 'Django', src: DEVICON + 'django/django-plain.svg' },
    flutter:    { label: 'Flutter', src: DEVICON + 'flutter/flutter-original.svg' },
    dart:       { label: 'Dart', src: DEVICON + 'dart/dart-original.svg' },
    bootstrap:  { label: 'Bootstrap', src: DEVICON + 'bootstrap/bootstrap-original.svg' },
    qt:         { label: 'Qt / PyQt', src: DEVICON + 'qt/qt-original.svg' },
    mysql:      { label: 'MySQL', src: DEVICON + 'mysql/mysql-original.svg' },
    mongodb:    { label: 'MongoDB', src: DEVICON + 'mongodb/mongodb-original.svg' },
    redis:      { label: 'Redis', src: DEVICON + 'redis/redis-original.svg' },
    docker:     { label: 'Docker', src: DEVICON + 'docker/docker-original.svg' },
    linux:      { label: 'Linux', src: DEVICON + 'linux/linux-original.svg' },
    git:        { label: 'Git', src: DEVICON + 'git/git-original.svg' },
    selenium:   { label: 'Selenium', src: DEVICON + 'selenium/selenium-original.svg' },
    csharp:     { label: 'C#', src: DEVICON + 'csharp/csharp-original.svg' },
    dotnet:     { label: '.NET', src: DEVICON + 'dot-net/dot-net-original.svg' },
    sqlserver:  { label: 'SQL Server', src: DEVICON + 'microsoftsqlserver/microsoftsqlserver-plain.svg' },
    ml:         { label: 'Machine Learning', src: DEVICON + 'scikitlearn/scikitlearn-original.svg' },
    celery:     { label: 'Celery', src: SIMPLE_ICONS + 'celery/37814A', text: 'Ce' },
    channels:   { label: 'Django Channels', text: 'CH' },
    websocket:  { label: 'WebSocket', text: 'WS' },
    drf:        { label: 'Django REST Framework', text: 'DRF' },
    kivy:       { label: 'Kivy', text: 'KV' },
    beautifulsoup: { label: 'BeautifulSoup', text: 'BS4' },
    bs4:        { label: 'BeautifulSoup', text: 'BS4' },
    wpf:        { label: 'WPF', text: 'WPF' }
  };

  function createIcon(key, className) {
    const tech = TECH[key];
    if (!tech) return null;
    if (tech.src) {
      const img = document.createElement('img');
      img.className = className;
      img.src = tech.src;
      img.alt = '';
      img.loading = 'lazy';
      img.width = 20;
      img.height = 20;
      img.decoding = 'async';
      img.addEventListener('error', function () {
        const fallback = document.createElement('span');
        fallback.className = 'tech-fallback';
        fallback.textContent = tech.text || tech.label;
        fallback.setAttribute('aria-hidden', 'true');
        img.replaceWith(fallback);
      }, { once: true });
      return img;
    }
    const fallback = document.createElement('span');
    fallback.className = 'tech-fallback';
    fallback.textContent = tech.text || tech.label;
    fallback.setAttribute('aria-hidden', 'true');
    return fallback;
  }

  document.querySelectorAll('[data-tech]').forEach(function (skill) {
    const key = skill.getAttribute('data-tech').trim().toLowerCase();
    const tech = TECH[key];
    if (!tech) return;
    const icon = document.createElement('span');
    icon.className = 'skill-icon';
    icon.setAttribute('aria-hidden', 'true');
    const logo = createIcon(key, 'tech-logo');
    if (logo) icon.appendChild(logo);
    skill.insertBefore(icon, skill.firstChild);
  });

  document.querySelectorAll('[data-stack]').forEach(function (card) {
    const wrap = document.createElement('div');
    wrap.className = 'tech-stack';
    wrap.setAttribute('role', 'list');
    const seen = new Set();

    card.getAttribute('data-stack').split(',').forEach(function (rawKey) {
      const key = rawKey.trim().toLowerCase();
      const tech = TECH[key];
      // Project stacks show only the same colorful logo assets used by Skills.
      // Avoid text-only badges for technologies without a recognizable logo.
      if (!tech || !tech.src || seen.has(key)) return;
      seen.add(key);

      const item = document.createElement('span');
      item.className = 'tech';
      item.setAttribute('role', 'listitem');
      item.title = tech.label;
      item.setAttribute('aria-label', tech.label);
      const logo = createIcon(key, 'tech-logo');
      if (logo) item.appendChild(logo);
      wrap.appendChild(item);
    });

    if (wrap.childElementCount) card.appendChild(wrap);
  });

  function syncMoreButtons() {
    document.querySelectorAll('.project-more').forEach(function (button) {
      const details = document.getElementById(button.getAttribute('aria-controls'));
      const label = button.querySelector('[data-more-label]');
      if (!details || !label) return;
      const expanded = button.getAttribute('aria-expanded') === 'true';
      label.textContent = document.documentElement.lang === 'fa'
        ? (expanded ? 'نمایش کمتر' : 'نمایش بیشتر')
        : (expanded ? 'Show less' : 'Show more');
      button.querySelector('.project-more-icon').textContent = expanded ? '−' : '+';
    });
  }

  document.querySelectorAll('.project-more').forEach(function (button) {
    button.addEventListener('click', function () {
      const details = document.getElementById(button.getAttribute('aria-controls'));
      if (!details) return;
      const expanded = button.getAttribute('aria-expanded') !== 'true';
      button.setAttribute('aria-expanded', String(expanded));
      details.hidden = !expanded;
      syncMoreButtons();
    });
  });

  document.addEventListener('site:languagechange', syncMoreButtons);
  syncMoreButtons();
})();