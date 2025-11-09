export default [
  "strapi::logger",
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "script-src": ["'self'", "'unsafe-inline'", "https://unpkg.com"],
          "style-src": ["'self'", "'unsafe-inline'", "https://unpkg.com"],
          "connect-src": ["'self'", "https:"],
          "img-src": ["'self'", "data:", "blob:", "https:", "http://localhost:9000"],
          "media-src": ["'self'", "data:", "blob:", "http://localhost:9000"],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
