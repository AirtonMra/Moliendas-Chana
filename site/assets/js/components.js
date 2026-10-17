/* ==========================================================================
   Componentes compartidos: encabezado y pie de página.
   Única fuente de verdad para la navegación del sitio.
   Cada página declara en <body>:
     data-root="../"   -> ruta relativa hasta la raíz del sitio ("" en la portada)
     data-nav="..."    -> identificador de la sección activa
   ========================================================================== */
(function () {
  'use strict';

  var root = document.body.getAttribute('data-root') || '';
  var current = document.body.getAttribute('data-nav') || '';

  var SITE = {
    phone: '+54 9 3548 439941',
    phoneHref: '+5493548439941',
    email: 'info@moliendaschana.com',
    social: [
      { name: 'Facebook', href: 'https://www.facebook.com/Moliendas-Chaná-783495288668410/',
        path: 'M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z' },
      { name: 'Instagram', href: 'https://www.instagram.com/moliendaschana/?hl=es',
        path: 'M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z' },
      { name: 'LinkedIn', href: 'https://www.linkedin.com/in/ma-isabel-barrionuevo-ab6b80b7/',
        path: 'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4V21H3V9.75zm6.5 0h3.83v1.54h.05c.53-1 1.84-2.07 3.78-2.07 4.04 0 4.79 2.66 4.79 6.12V21h-4v-4.9c0-1.17-.02-2.67-1.63-2.67-1.63 0-1.88 1.27-1.88 2.59V21h-4V9.75z' }
    ]
  };

  var NAV = [
    { id: 'inicio', label: 'Inicio', href: '' },
    { id: 'productos', label: 'Productos', children: [
      { id: 'cascara', label: 'Cáscara de nuez', href: 'venta-cascara-de-nuez/' },
      { id: 'carozo', label: 'Carozo de aceituna', href: 'venta-hueso-de-aceituna/' }
    ] },
    { id: 'nosotros', label: 'Nosotros', href: 'nosotros/' },
    { id: 'aplicaciones', label: 'Aplicaciones', children: [
      { id: 'biocompuestos', label: 'Bio-compuestos', href: 'biocompuestos-con-cascara-de-nuez/' },
      { id: 'abrasivos', label: 'Abrasivos', href: 'abrasivos-de-cascara-de-nuez/' },
      { id: 'filtros', label: 'Filtros', href: 'filtros-con-cascara-de-nuez/' },
      { id: 'biomasa', label: 'Biomasa', href: 'biomasa-cascara-de-nuez/' },
      { id: 'cosmetologia', label: 'Cosmetología', href: 'cosmetologia-exfoliantes-de-cascara-de-nuez/' }
    ] }
  ];
  var CONTACT = { id: 'contacto', label: 'Contacto', href: 'contacto/' };

  function isActive(item) {
    if (item.children) {
      return item.children.some(function (c) { return c.id === current; });
    }
    return item.id === current;
  }

  function link(item, extra) {
    var cur = item.id === current ? ' aria-current="page"' : '';
    return '<a href="' + root + item.href + '"' + cur + (extra || '') + '>' + item.label + '</a>';
  }

  function buildNav() {
    var html = '<ul>';
    NAV.forEach(function (item, i) {
      if (item.children) {
        var open = isActive(item);
        var subId = 'submenu-' + i;
        html += '<li class="has-sub">' +
          '<button class="nav-trigger" type="button" aria-expanded="false" aria-controls="' + subId + '"' +
          (open ? ' data-section-active="true"' : '') + '>' + item.label + '</button>' +
          '<ul class="sub-menu" id="' + subId + '">';
        item.children.forEach(function (c) { html += '<li>' + link(c) + '</li>'; });
        html += '</ul></li>';
      } else {
        html += '<li>' + link(item) + '</li>';
      }
    });
    html += '<li class="nav-cta">' + link(CONTACT) + '</li></ul>';
    return html;
  }

  function buildHeader() {
    return '<a class="skip-link" href="#contenido">Ir al contenido</a>' +
      '<header class="site-header"><div class="wrap site-header__inner">' +
      '<a class="brand" href="' + root + '" aria-label="Moliendas Chaná, ir al inicio">' +
      '<img src="' + root + 'assets/img/logo.svg" alt="Moliendas Chaná" width="190" height="44"></a>' +
      '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav">' +
      '<span class="nav-toggle__bars" aria-hidden="true"><span></span></span><span>Menú</span></button>' +
      '<nav class="primary-nav" id="primary-nav" aria-label="Principal">' + buildNav() + '</nav>' +
      '</div></header>';
  }

  function footerList(items) {
    return '<ul>' + items.map(function (i) {
      return '<li><a href="' + root + i.href + '">' + i.label + '</a></li>';
    }).join('') + '</ul>';
  }

  function buildFooter() {
    var socials = SITE.social.map(function (s) {
      return '<a href="' + s.href + '" target="_blank" rel="noopener noreferrer" aria-label="' + s.name + ' (se abre en una pestaña nueva)">' +
        '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="' + s.path + '"/></svg></a>';
    }).join('');
    return '<footer class="site-footer"><div class="wrap">' +
      '<div class="footer-grid">' +
      '<div class="footer-brand"><img src="' + root + 'assets/img/logo-claro.svg" alt="Moliendas Chaná" width="190" height="48">' +
      '<p>Molienda de cáscara de nuez y carozo de aceituna para la industria. Empresa argentina fundada en 2006.</p>' +
      '<p><a href="tel:' + SITE.phoneHref + '">' + SITE.phone + '</a><br><a href="mailto:' + SITE.email + '">' + SITE.email + '</a></p>' +
      '<div class="social">' + socials + '</div></div>' +
      '<div><h2>Productos</h2>' + footerList(NAV[1].children) + '</div>' +
      '<div><h2>Aplicaciones</h2>' + footerList(NAV[3].children) + '</div>' +
      '<div><h2>Empresa</h2>' + footerList([
        { label: 'Inicio', href: '' },
        { label: 'Nosotros', href: 'nosotros/' },
        { label: 'Contacto', href: 'contacto/' },
        { label: 'Política de privacidad', href: 'politica-privacidad/' }
      ]) + '</div></div>' +
      '<div class="footer-bottom"><p>© ' + new Date().getFullYear() + ' Moliendas Chaná. Todos los derechos reservados.</p>' +
      '<p>Córdoba y La Rioja, Argentina · Filial en São Paulo, Brasil</p></div>' +
      '</div></footer>';
  }

  var headerHost = document.getElementById('site-header');
  var footerHost = document.getElementById('site-footer');
  if (headerHost) { headerHost.innerHTML = buildHeader(); }
  if (footerHost) { footerHost.innerHTML = buildFooter(); }

  /* ---------- Comportamiento del menú ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');
  if (!toggle || !nav) { return; }

  function setSub(li, open) {
    var btn = li.querySelector('.nav-trigger');
    li.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  function closeAllSubs(except) {
    nav.querySelectorAll('.has-sub').forEach(function (li) { if (li !== except) { setSub(li, false); } });
  }
  function setNav(open) {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  toggle.addEventListener('click', function () { setNav(!nav.classList.contains('is-open')); });

  nav.querySelectorAll('.has-sub').forEach(function (li) {
    var btn = li.querySelector('.nav-trigger');
    btn.addEventListener('click', function () {
      var open = !li.classList.contains('is-open');
      closeAllSubs(li);
      setSub(li, open);
    });
    // Apertura con el mouse en escritorio (el botón sigue siendo operable con teclado y táctil)
    li.addEventListener('mouseenter', function () {
      if (window.matchMedia('(min-width: 961px) and (hover: hover)').matches) { closeAllSubs(li); setSub(li, true); }
    });
    li.addEventListener('mouseleave', function () {
      if (window.matchMedia('(min-width: 961px) and (hover: hover)').matches) { setSub(li, false); }
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') { return; }
    var openSub = nav.querySelector('.has-sub.is-open');
    if (openSub) { setSub(openSub, false); openSub.querySelector('.nav-trigger').focus(); return; }
    if (nav.classList.contains('is-open')) { setNav(false); toggle.focus(); }
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.has-sub')) { closeAllSubs(null); }
    if (!e.target.closest('.site-header')) { setNav(false); }
  });
  nav.addEventListener('focusout', function (e) {
    var li = e.target.closest('.has-sub');
    if (li && !li.contains(e.relatedTarget) && window.matchMedia('(min-width: 961px)').matches) { setSub(li, false); }
  });
  window.addEventListener('resize', function () {
    if (window.matchMedia('(min-width: 961px)').matches) { setNav(false); }
  });
})();
