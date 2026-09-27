# CLAUDE.md

## Project goals

- **Analytics on every page**: the owner wants analytics embedded in all of the app's pages.
  Whenever a new page/route that renders HTML is added (or an existing one is changed),
  make sure it gets analytics. Provider: **Google Analytics 4**.
- GA4 is wired in globally via `src/analytics.js` (middleware registered in `src/app.js`):
  it injects the gtag.js snippet before `</head>` of every HTML response sent with
  `res.send` / `res.render`. So every page MUST be a full HTML document with a `<head>`,
  and the middleware must stay registered before all routes. Do NOT serve pages with
  `res.sendFile` or `express.static` — they bypass `res.send`, so no snippet is injected.
  Read the HTML file and send it with `res.type("html").send(...)` (see the `/` route).
- Page HTML files live in `src/pages/`.
- Measurement ID comes from the `GA_MEASUREMENT_ID` env var (format `G-XXXXXXXXXX`);
  if unset, no snippet is injected. Never hardcode the ID.

## Project notes

- Express app, entry point `src/app.js`, listens on `PORT` (default 3000).
- Routes: `/` (home page, `src/pages/home.html`) and `/healthcheck` (plain text).
