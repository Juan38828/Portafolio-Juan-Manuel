# Portafolio — Juan Manuel Franco

Portafolio personal construido con React 19, Vite, Tailwind CSS v4, Framer Motion, React Icons y React Type Animation.

## Desarrollo local

```bash
npm install
npm run dev
```

## Antes de desplegar: datos pendientes por completar

1. **Foto de perfil** — reemplaza `src/assets/images/profile-placeholder.svg` por tu foto real (usada en Hero y About).
2. **CV en PDF** — coloca tu CV en `public/cv.pdf` (los botones "Descargar CV" ya apuntan ahí).
3. **Certificados en PDF** — colócalos en `public/certificates/` y actualiza las rutas en `src/data/certificates.js`.
4. **Proyectos** — edita `src/data/projects.js` con tus proyectos reales, capturas incluidas (impórtalas desde `src/assets/images`).
5. **Experiencia y educación** — edita `src/data/timeline.js`.
6. **Redes sociales** — edita `src/data/socials.js` (GitHub, LinkedIn, correo, WhatsApp).

## Formulario de contacto (envío real de correo)

El formulario usa [EmailJS](https://www.emailjs.com/) para enviar correos reales sin necesidad de un backend propio.

1. Copia `.env.example` como `.env`.
2. Crea una cuenta gratuita en EmailJS y sigue las instrucciones dentro de `.env.example` para obtener tu `SERVICE_ID`, `TEMPLATE_ID` y `PUBLIC_KEY`.
3. Completa `.env` con esos valores.
4. Al desplegar en Vercel o Netlify, agrega esas mismas 3 variables en la configuración de "Environment Variables" del proyecto.

Sin estas variables, el formulario muestra un mensaje de error claro en vez de fallar en silencio.

## Build de producción

```bash
npm run build
```

Genera la carpeta `dist/`, lista para desplegar en Vercel o Netlify.
