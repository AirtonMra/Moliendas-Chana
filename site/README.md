# Moliendas Chaná · Sitio web

Sitio corporativo estático en **HTML, CSS y JavaScript vanilla**. Sin frameworks, sin dependencias y sin paso de compilación.

## Ejecutar en Visual Studio Code
1. Abrí la carpeta en VS Code.
2. Instalá la extensión **Live Server** y hacé clic en *Go Live* sobre `index.html`.
   (Alternativa: `python3 -m http.server 8000` y abrir http://localhost:8000).

> No abras los archivos con doble clic (`file://`): los enlaces a carpetas (`/nosotros/`) necesitan un servidor, local o de hosting.

## Estructura
```
index.html                         Portada
nosotros/  contacto/  politica-privacidad/
venta-cascara-de-nuez/  venta-hueso-de-aceituna/          Productos
biocompuestos-con-cascara-de-nuez/  abrasivos-de-cascara-de-nuez/
filtros-con-cascara-de-nuez/  biomasa-cascara-de-nuez/
cosmetologia-exfoliantes-de-cascara-de-nuez/              Aplicaciones
404.html  sitemap.xml  robots.txt
assets/css/styles.css              Sistema de diseño (variables, componentes)
assets/js/components.js            Encabezado, menú y footer (única fuente de la navegación)
assets/js/media.js                 Muestra cada foto cuando existe el archivo
assets/js/form.js                  Validación y estados del formulario
assets/img/                        Logos provisorios + README.md con la lista de fotos
```
Las carpetas conservan las **mismas URLs del sitio original**, por lo que el SEO y los enlaces existentes se mantienen.

## Para completar antes de publicar
- **Fotografías y logotipo:** ver `assets/img/README.md`. Copiá cada foto con el nombre indicado y aparece sola. `logo.svg` y `logo-claro.svg` son provisorios.
- **Formulario de contacto:** valida los datos pero **no envía nada** (el sitio no tiene backend). Para activarlo, completá `FORM_ENDPOINT` en `assets/js/form.js` con un servicio como Formspree o Getform. Mientras esté vacío, informa que el envío está pendiente y ofrece abrir el correo con el mensaje redactado.
- **Dominio:** `sitemap.xml`, `robots.txt` y las URLs canónicas usan `https://moliendaschana.com`. Si el dominio cambia, reemplazalo en esos archivos.
- **Política de privacidad:** se conservó el texto original, que menciona una ley mexicana y un correo ajeno (`legal@vicadelicias.com`). Requiere revisión legal.

## Despliegue
Cualquier hosting estático sirve (copiar la carpeta completa):
- **GitHub Pages:** subir a un repositorio, *Settings → Pages → Deploy from branch → main / root*. Si se publica en una subruta (`usuario.github.io/repo/`), el sitio funciona porque los recursos usan rutas relativas; solo `404.html` usa rutas absolutas desde la raíz.
- **Netlify / Cloudflare Pages / hosting con cPanel:** arrastrar la carpeta o subirla por FTP a `public_html`.
