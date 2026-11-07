import tailwindcss from "@tailwindcss/vite";

// Konfigurasi utama Nuxt 3 untuk platform dokumentasi KopiKode
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },

  modules: ["@nuxt/content", "@pinia/nuxt", "@vueuse/nuxt"],

  css: ["~/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  content: {
    highlight: {
      theme: {
        default: "github-light",
        dark: "github-dark",
      },
      preload: ["html", "css", "javascript", "json", "bash"],
    },
    markdown: {
      toc: {
        depth: 3,
        searchDepth: 3,
      },
    },
  },

  app: {
    head: {
      htmlAttrs: {
        lang: "id",
      },
      title: "KopiKode - Pusat Dokumentasi Programmer",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Pusat dokumentasi terpadu untuk belajar HTML, CSS, dan JavaScript secara praktis, terstruktur, dan interaktif.",
        },
        { name: "theme-color", content: "#141210" },
        { property: "og:site_name", content: "KopiKode" },
        {
          property: "og:title",
          content: "KopiKode - Pusat Dokumentasi Programmer",
        },
        {
          property: "og:description",
          content:
            "Dokumentasi pemrograman yang rapi, lengkap, dan dilengkapi playground kode interaktif.",
        },
        { property: "og:image", content: "/Logo.png" },
        { property: "og:type", content: "website" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Newsreader:ital,opsz,wght@0,6..72,500;0,6..72,600;1,6..72,400&display=swap",
        },
      ],
    },
  },
});
