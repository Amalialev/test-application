# CLAUDE.md

## Project goals

- **Analytics on every page**: the owner wants analytics embedded in all of the app's pages.
  Whenever a new page/route that renders HTML is added (or an existing one is changed),
  include the analytics snippet/tracking in it. The analytics provider has not been chosen
  yet — ask before picking one.

## Project notes

- Express app, entry point `src/app.js`, listens on `PORT` (default 3000).
- Currently only a `/healthcheck` route exists (plain text, no pages yet).
