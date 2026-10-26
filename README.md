# 🌿 Moody Landing — Santuario de Bienestar Emocional

Landing page oficial de **Moody**, construida con **Next.js 15 (App Router)** y **Tailwind CSS**, diseñada con estética *Japandi / Wabi-Sabi* ("Santuario Orgánico", género neutro).

Integrada de forma nativa con el backend de **LandingJ4F** (`services/landing-server`) para gestión de lista de espera (Waitlist) y votación comunitaria en el Roadmap público (Features).

---

## ✨ Características Principales

1. **Trilingüe (i18n):**
   - Español (`es`, idioma primario).
   - Inglés (`en`).
   - Portugués (`pt`).
   - Detección automática de idioma del navegador y selector manual persistido en el Navbar.

2. **2 Pestañas Dinámicas (Hero Compartido):**
   - **Explora Moody (Features):** Explicación de los 5 pilares de valor, demostración interactiva de respiración parasimpática 4-7-8, selector de emoción y mapeo somático en vivo, y **Roadmap público con votación de funcionalidades**.
   - **Lista de Espera (Waitlist):** Formulario de captura con email, nombre, referral code automático (`?ref=...`), contador dinámico de registrados, posición obtenida y generador de enlaces de recomendación para escalar turnos.

3. **Optimizado para SEO y Agentes LLM (LLMO):**
   - `/llms.txt` y `/llms-full.txt` estructurados para Perplexity, ChatGPT Search, Claude, Google Gemini y Applebot.
   - Datos estructurados JSON-LD (`SoftwareApplication`, `FAQPage`, `WebSite`).
   - Metadatos canónicos, OpenGraph, Twitter Cards y etiquetas `alternate hreflang`.
   - `/robots.txt` y `/sitemap.xml` dinámico.

4. **Marco Legal & Salud Mental:**
   - Modal interactivo y páginas dedicadas `/terms` y `/privacy`.
   - Manifiesto ético de **"Privacidad por defecto"** y cero venta de datos emocionales.
   - Directorio de líneas telefónicas gratuitas de crisis y salud mental por país (España, México, Colombia, Argentina, EE.UU., Brasil, Portugal, etc.).

5. **Integración Dual con LandingJ4F:**
   - Proxy server-side en `/api/waitlist` y `/api/features` con soporte para `LANDING_API_KEY` (`/api/public/v1/*`) o slug (`/p/:slug`).
   - Modo fallback transparente: si `landing-server` no está corriendo, funciona de forma fluida con datos simulados y almacenamiento local para desarrollo.

---

## 🚀 Puesta en Marcha

### Requisitos
- Node.js 20+ (o 22+)
- npm / pnpm

### Instalación
```bash
cd moody-landing
npm install
```

### Desarrollo
```bash
npm run dev
```
Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Compilación Standalone para Docker
```bash
npm run build
```
Genera la carpeta `.next/standalone` lista para correr con `node server.js` o empaquetar con el `Dockerfile` en el deployer de LandingJ4F.
