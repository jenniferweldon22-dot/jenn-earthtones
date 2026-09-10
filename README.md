# Jenn Earthtones

A React + Tailwind CSS ecommerce site for the Jenn Earthtones art brand.

## Quick start

```bash
npm install
npm run dev
```

Visit http://localhost:5173

## Project structure

```
src/
  components/     Reusable UI pieces (Navbar, Footer, ProductCard, Button, etc.)
  pages/          One file per route (Home, Shop, ProductDetail, Cart, Checkout, About, Contact)
  data/products.js  <-- All artwork lives here. Add/edit/remove pieces by editing this file.
  context/CartContext.jsx  Global shopping cart state (persisted to localStorage)
server/
  index.js        Express server that creates real Stripe Checkout Sessions
public/
  favicon.svg, robots.txt
```

## Adding new artwork

Open `src/data/products.js` and copy an existing object in the `PRODUCTS` array.
Give it a unique `id` and `slug`, then fill in the title, price, description,
sizes, and palette. Every page in the site — shop grid, product page, related
artwork, homepage sections — reads from this one file, so a new entry shows up
everywhere automatically. No other code changes are needed.

## Replacing placeholder images with real photography

Every artwork image is currently a generated placeholder (`PlaceholderArt.jsx`)
so the site looks intentional before real photos exist. To swap in real photos:

1. Add your image files to `public/images/artwork/`.
2. In `src/data/products.js`, set each product's `images` array to the real
   file paths, e.g. `images: ['/images/artwork/terracotta-dawn-1.jpg']`.
3. In `src/components/ProductCard.jsx` and `src/pages/ProductDetail.jsx`,
   replace the `<PlaceholderArt ... />` usage with a plain `<img>` tag — the
   exact spot is marked with a `REPLACE` comment in both files.

The same pattern applies to your own portrait photo on the About page
(`src/pages/About.jsx`).

## Connecting Stripe for real payments

This site is built so payments are handled securely on a server — **no
payment logic or secret keys ever live in the browser code.**

1. `cd server && npm install express stripe cors dotenv` (or run
   `npm install` from the project root — these are already listed as
   dependencies).
2. Copy `.env.example` to `.env` and add your Stripe secret key from
   https://dashboard.stripe.com/apikeys.
3. Run the server: `npm run server` (defaults to port 4242).
4. During local development, proxy `/api/*` requests from the Vite dev
   server to `http://localhost:4242`, or update the `fetch` call in
   `src/pages/Checkout.jsx` to point directly at your server's URL.
5. In production, deploy `server/index.js` (Render, Railway, Fly.io, a
   Vercel/Netlify serverless function, etc.) and set `SITE_URL` in its
   environment to your live domain.
6. Optional but recommended: set up a Stripe webhook pointing at
   `/api/stripe-webhook` with the `checkout.session.completed` event, and
   add your webhook signing secret to `.env`. This is where you'd trigger
   order confirmation emails and mark one-of-a-kind originals as sold.

Until the server is deployed and configured, the Checkout page will show a
clear message explaining that payments aren't connected yet — it will never
pretend an order succeeded.

## Connecting the newsletter and contact forms

Both `src/components/Newsletter.jsx` and `src/components/ContactForm.jsx`
currently simulate submission. Each file has a comment showing where to add
a real `fetch()` call to your email provider (Mailchimp, Klaviyo, Resend,
Postmark, etc.) or a server endpoint you build yourself.

## SEO

- Each page sets its own `<title>` and meta description via
  `src/components/Seo.jsx`.
- The product page includes JSON-LD structured data for search engines.
- `public/robots.txt` is included; add a real `sitemap.xml` once the site
  has a live domain (many hosts, e.g. Vercel/Netlify, can generate one from
  your routes automatically).
- Because this is a client-rendered single-page app, meta tags update after
  JavaScript runs. Most modern crawlers (including Google) handle this fine,
  but for the strongest SEO and social-preview support, consider migrating
  to Next.js or adding a prerendering step (e.g. `vite-plugin-ssr`,
  `react-snap`) before launch.

## Analytics

Add your Google Analytics (GA4) snippet in `index.html` where marked, and
uncomment the `gtag` calls already placed at the key events worth tracking:
add-to-cart (`CartContext.jsx`) and begin-checkout (`Checkout.jsx`). You can
also fire a `page_view` event on route change inside `App.jsx`'s
`ScrollToTop` component.

## Deployment

This is a standard Vite app — `npm run build` outputs a static `dist/`
folder deployable to Vercel, Netlify, Cloudflare Pages, or any static host.
The `server/` folder is a separate small Node service and should be deployed
independently (see the Stripe section above).
