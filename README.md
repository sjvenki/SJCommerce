# SJCommerce

A quick-commerce grocery delivery web app built with React, TypeScript, Vite, and Tailwind CSS v4 — implemented from the [Figma design](https://www.figma.com/make/l8CISck07KH5CyK2hX9pmP/SJCommerce-Website-Design).

A dark, green-themed storefront promising 10-minute grocery delivery, with a full shopping flow: browse → cart → payment → order confirmation.

## Pages

- **Home** — sticky nav with search, rotating hero banner, delivery highlight strip, category filter pills, and a responsive product grid with add-to-cart controls and a floating cart bar.
- **Cart** — line-item list with quantity steppers, coupon field, and an order summary panel with free-delivery threshold messaging.
- **Payment** — delivery address form and four payment methods (Card, UPI, Wallet, Cash on Delivery) with inline validation, plus a live order summary.
- **Order Success** — confirmation screen with animated status ripple, ETA, and delivery progress.

## Stack

- React 19 + TypeScript
- Vite 6
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Client-side page state (no router) — cart state lives in `App.tsx` and is passed down as props

## Getting started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```
