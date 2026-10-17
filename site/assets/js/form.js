/* ==========================================================================
   Formulario de contacto: validación en el cliente y estados claros.

   IMPORTANTE: el sitio es estático y NO tiene backend. Mientras FORM_ENDPOINT
   esté vacío, el formulario valida los datos pero NO envía nada y lo informa
   con claridad, ofreciendo abrir el correo como alternativa real.
   Para activar el envío, completar FORM_ENDPOINT (ver README.md).
   ========================================================================== */
(function () {
  'use strict';

  var FORM_ENDPOINT = ''; // PENDIENTE DE CONEXIÓN. Ej.: 'https://formspree.io/f/xxxxxxxx'
  var MAIL_TO = 'info@moliendaschana.com';

  var form = document.getElementById('contact-form');
  if (!form) { return; }
  var status = document.getElementById('form-status');
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  var rules = {
    nombre: function (v) { return v.trim().length >= 2 ? '' : 'Ingresá tu nombre y apellido.'; },
    email: function (v) { return EMAIL_RE.test(v.trim()) ? '' : 'Ingresá un correo electrónico válido, por ejemplo nombre@empresa.com.'; },
    telefono: function (v) { return /^[+\d][\d\s().-]{6,}$/.test(v.trim()) ? '' : 'Ingresá un teléfono con código de área o de país.'; },
    asunto: function (v) { return v ? '' : 'Elegí un asunto.'; },
    mensaje: function (v) { return v.trim().length >= 10 ? '' : 'Escribí tu consulta (mínimo 10 caracteres).'; },
    privacidad: function (v, el) { return el.checked ? '' : 'Tenés que aceptar la Política de privacidad para continuar.'; }
  };

  function field(el) { return el.closest('.field'); }
  function setError(el, msg) {
    var f = field(el);
    var err = f.querySelector('.field-error');
    f.classList.toggle('has-error', !!msg);
    el.setAttribute('aria-invalid', msg ? 'true' : 'false');
    if (err) { err.textContent = msg; }
  }
  function validate(el) {
    var rule = rules[el.name];
    if (!rule) { return true; }
    var msg = rule(el.value, el);
    setError(el, msg);
    return !msg;
  }
  function showStatus(kind, html) {
    status.className = 'form-status form-status--' + kind + ' is-visible';
    status.innerHTML = html;
    status.setAttribute('tabindex', '-1');
    status.focus();
  }
  function mailtoLink(d) {
    var body = 'Nombre: ' + d.nombre + '\nCorreo: ' + d.email + '\nTeléfono: ' + d.telefono + '\n\n' + d.mensaje;
    return 'mailto:' + MAIL_TO + '?subject=' + encodeURIComponent('[' + d.asunto + '] Consulta desde el sitio web') + '&body=' + encodeURIComponent(body);
  }

  Array.prototype.forEach.call(form.elements, function (el) {
    if (!el.name || !rules[el.name]) { return; }
    el.addEventListener('blur', function () { validate(el); });
    el.addEventListener('input', function () { if (field(el).classList.contains('has-error')) { validate(el); } });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    status.className = 'form-status';
    var firstInvalid = null;
    Array.prototype.forEach.call(form.elements, function (el) {
      if (!el.name || !rules[el.name]) { return; }
      if (!validate(el) && !firstInvalid) { firstInvalid = el; }
    });
    if (firstInvalid) {
      firstInvalid.focus();
      showStatus('error', '<strong>Revisá el formulario.</strong> Hay campos incompletos o con errores, marcados en rojo.');
      return;
    }
    if (form.elements.empresa_web.value) { return; } // señuelo anti-spam

    var data = {
      nombre: form.elements.nombre.value.trim(),
      email: form.elements.email.value.trim(),
      telefono: form.elements.telefono.value.trim(),
      asunto: form.elements.asunto.value,
      mensaje: form.elements.mensaje.value.trim()
    };

    if (!FORM_ENDPOINT) {
      showStatus('pending',
        '<strong>Tu mensaje todavía no se envió.</strong> El envío desde este formulario aún no está conectado a un servicio. ' +
        'Tus datos son correctos; para contactarnos ahora podés <a href="' + mailtoLink(data) + '">abrir tu correo con el mensaje ya redactado</a> ' +
        'o escribirnos a <a href="mailto:' + MAIL_TO + '">' + MAIL_TO + '</a>.');
      return;
    }

    var btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Enviando…';
    fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    }).then(function (res) {
      if (!res.ok) { throw new Error('HTTP ' + res.status); }
      form.reset();
      showStatus('ok', '<strong>Mensaje enviado.</strong> Gracias por escribirnos; te responderemos a la brevedad.');
    }).catch(function () {
      showStatus('error', '<strong>No pudimos enviar el mensaje.</strong> Probá de nuevo en unos minutos o escribinos a <a href="mailto:' + MAIL_TO + '">' + MAIL_TO + '</a>.');
    }).then(function () {
      btn.disabled = false;
      btn.textContent = 'Enviar mensaje';
    });
  });
})();
