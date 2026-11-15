# FoodHub final specification

Frontend React/Vite + Bootstrap. Nine pages, six categories, 24 local illustrated products. Cart and demo orders persisted in localStorage. All demo-only. Palette green #2E7D5B, off-white #F7F8F4, gold #E9B872. The system has no backend or payment processor.

## Core flow

Home → Menu → Food Details → Cart → Checkout → Order Tracking.

## Price rules

Subtotal = sum of each item price plus selected extras multiplied by quantity. `FOOD10` gives 10% off subtotal. Delivery is $3 when subtotal is below $40; free otherwise. No tax in this demo.

## Suggested Git commits

1. Project scaffold and routing
2. Food catalog and shared components
3. Home/About/Menu and product detail
4. Cart, checkout and demo order tracking
5. Responsive QA and documentation

Git history cannot be generated retrospectively as proof of development. Make real commits while working.
