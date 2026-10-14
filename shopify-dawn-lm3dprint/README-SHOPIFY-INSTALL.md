# L&M 3D PRINT STORE — SHOPIFY DAWN THEME CONVERSION GUIDE

This package contains the complete, production-ready modifications to transform the official **Shopify Dawn Theme (Online Store 2.0)** into the dark, vibrant, high-end storefront mockup created for **L&M 3D Print Store**.

---

## 🎨 Color & Aesthetic Foundation

* **Background (Obsidian Black):** `#08080D`
* **Surface Background (Deep Charcoal):** `#11111A`
* **Card & Container Background:** `#171722`
* **Hairline Border:** `#232334`
* **Electric Cyan Accent:** `#00D9FF`
* **Neon Magenta Accent:** `#FF00D4`
* **Royal Purple Transition:** `#792BFF`
* **Primary Text:** `#FFFFFF`
* **Secondary Text:** `#B8B8C8`

---

## 📁 Modified Files Overview

| File Path | Description |
| :--- | :--- |
| `config/settings_data.json` | Global theme settings: 5 bespoke color schemes, dark mode variables, Outfit & Plus Jakarta Sans typography scaling, 12px card radius, 8px button radius, drawer cart configuration. |
| `assets/base.css` | Comprehensive CSS styling: dark canvas overrides, cyan/magenta button gradients, product card hover micro-animations, tabular numeral prices, custom scrollbar. |
| `templates/index.json` | Pre-configured homepage section layout: Announcement bar, Hero banner (*"PRINTED DIFFERENT."*), 6-category collection grid, Best Sellers, Halloween seasonal spotlight, Brand Story (*"SMALL DETAILS. BIG PERSONALITY."*), and Newsletter. |
| `sections/announcement-bar.liquid` | Cycling brand messages with electric cyan bullet indicators. |
| `sections/header.liquid` | Clean 3-zone top bar with L&M 3D Print Store logo lockup, category links, search modal trigger, and live bag drawer counter. |
| `sections/footer.liquid` | Value pillars strip (0.16mm layer slicing, dual-tone silk filaments, UK workshop crafted, safe UK delivery), contact details, and policy links. |
| `snippets/card-product.liquid` | Dark card surface `#171722`, unboxed category metadata, sale badges, tabular price in GBP, and quick-add button. |

---

## 🚀 How to Apply to Your Shopify Store

### Method 1: 1-Click ZIP Download & Upload (Recommended)
1. In the L&M 3D Print Store preview app, click the **Shopify Theme Porter** tab in the top header.
2. Click **Download Modified Dawn Theme (.zip)**.
3. In your **Shopify Admin**, navigate to:
   **Online Store → Themes**
4. Under **Theme library**, click **Add theme → Upload zip file**.
5. Select the downloaded `.zip` file and click **Upload file**.
6. Click **Publish** or **Customize** to preview your store!

---

### Method 2: Manual File Replacement in Existing Dawn Theme
If you already have customizations in your current Dawn theme:
1. Go to **Online Store → Themes → Current theme → '...' → Edit code**.
2. Replace or update the following files:
   - `config/settings_data.json`
   - `assets/base.css` (or append the CSS rules from `assets/base.css` to the bottom of your existing `base.css`)
   - `templates/index.json`
   - `sections/announcement-bar.liquid`
   - `sections/header.liquid`
   - `sections/footer.liquid`
   - `snippets/card-product.liquid`
3. Click **Save** on each file.
