/* ==========================================================================
   Imágenes con marcador de posición.
   Cada <figure class="media" data-src="..."> muestra un marcador visible hasta
   que el archivo exista en assets/img/. Al copiar la foto con el nombre
   indicado, aparece automáticamente: no hace falta editar el HTML.
   ========================================================================== */
(function () {
  'use strict';
  var root = document.body.getAttribute('data-root') || '';

  document.querySelectorAll('.media[data-src]').forEach(function (fig) {
    var src = root + fig.getAttribute('data-src');
    var probe = new Image();
    probe.onload = function () {
      var img = document.createElement('img');
      img.src = src;
      img.alt = fig.getAttribute('data-alt') || '';
      img.width = probe.naturalWidth;
      img.height = probe.naturalHeight;
      if (!fig.hasAttribute('data-eager')) { img.loading = 'lazy'; }
      img.decoding = 'async';
      fig.insertBefore(img, fig.firstChild);
      fig.classList.add('is-loaded');
      var ph = fig.querySelector('.media__placeholder');
      if (ph) { ph.setAttribute('hidden', ''); }
    };
    probe.src = src;
  });
})();
