(function () {
  var CDN = 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/';

  // key: [label, devicon path]  — no path => small text badge instead of a logo
  var TECH = {
    python:    ['Python',     'python/python-original.svg'],
    django:    ['Django',     'django/django-plain.svg'],
    flutter:   ['Flutter',    'flutter/flutter-original.svg'],
    dart:      ['Dart',       'dart/dart-original.svg'],
    bootstrap: ['Bootstrap',  'bootstrap/bootstrap-original.svg'],
    qt:        ['Qt / PyQt',  'qt/qt-original.svg'],
    mysql:     ['MySQL',      'mysql/mysql-original.svg'],
    selenium:  ['Selenium',   'selenium/selenium-original.svg'],
    csharp:    ['C#',         'csharp/csharp-original.svg'],
    dotnet:    ['.NET',       'dot-net/dot-net-original.svg'],
    sqlserver: ['SQL Server', 'microsoftsqlserver/microsoftsqlserver-plain.svg'],
    kivy:      ['Kivy'],
    bs4:       ['BeautifulSoup', null, 'BS4'],
    wpf:       ['WPF'],
    drf:       ['Django REST Framework', null, 'DRF']
  };

  document.querySelectorAll('[data-stack]').forEach(function (card) {
    var wrap = document.createElement('div');
    wrap.className = 'tech-stack';
    wrap.setAttribute('role', 'list');

    card.getAttribute('data-stack').split(',').forEach(function (key) {
      var t = TECH[key.trim()];
      if (!t) return;
      var item = document.createElement('span');
      item.className = 'tech';
      item.setAttribute('role', 'listitem');
      item.title = t[0];
      item.setAttribute('aria-label', t[0]);

      if (t[1]) {
        var img = document.createElement('img');
        img.src = CDN + t[1];
        img.alt = '';
        img.loading = 'lazy';
        img.width = 16;
        img.height = 16;
        item.appendChild(img);
      } else {
        item.classList.add('tech-text');
        item.textContent = t[2] || t[0];
      }
      wrap.appendChild(item);
    });

    card.appendChild(wrap);
  });
})();
