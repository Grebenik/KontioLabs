# Kontio Labs

Central website for **Kontio Labs**, the app studio of **Kontio Power, LLC**. It
showcases our mobile apps (starting with **Financial Freedom**) with install links
for iOS and Android, plus About and Contact pages.

- **Live domain:** kontiolabs.com (Azure Static Web App — to be provisioned)
- **Stack:** pure HTML / CSS / JS, no build step
- **Site content:** [`site/`](site/) — Azure `app_location: ./site`, `output_location: .`

## Structure

```
site/
├── index.html            App showcase (home)
├── about.html            About the studio
├── contact.html          Contact form (Formspree)
├── privacy-policy.html   Privacy policy
├── terms.html            Terms of use
├── 404.html              Custom error page
├── favicon.svg
├── robots.txt
├── sitemap.xml
├── staticwebapp.config.json
├── css/style.css
└── images/og-default.svg
```

## Before / after launch — TODO

- [ ] Set the real **GA4 Measurement ID** — replace every `G-XXXXXXXXXX` in the HTML.
- [ ] Confirm the **Formspree** form ID (`xdavyzlj`, Kontio Power account) is correct.
- [ ] When **Financial Freedom** goes live, replace each app's
      `<span class="store-badge is-soon">…</span>` in `index.html` with an
      `<a class="store-badge" href="STORE_URL" target="_blank" rel="noopener">…</a>`.
- [ ] Replace `images/og-default.svg` with a 1200×630 PNG/JPG (some platforms
      don't render SVG Open Graph images).
- [ ] Confirm **governing law** in `terms.html` (defaults to State of Florida, USA).
- [ ] Provision the Azure Static Web App and point the custom domain.

## Deploy (Azure Static Web Apps)

1. Azure Portal → Static Web Apps → Create → link this GitHub repo.
2. `app_location: ./site`, `output_location: .` (no build).
3. Azure auto-generates the deploy workflow; every push to `main` redeploys.

© 2026 Kontio Power, LLC
