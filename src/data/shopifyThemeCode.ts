export interface ShopifyFile {
  path: string;
  name: string;
  category: 'layout' | 'config' | 'assets' | 'templates' | 'sections' | 'snippets';
  description: string;
  content: string;
}

export const SHOPIFY_THEME_FILES: ShopifyFile[] = [
  {
  "path": "layout/theme.liquid",
  "name": "theme.liquid",
  "category": "layout",
  "description": "Mandatory Shopify master root template required for all theme uploads. Houses the <head>, stylesheet links, announcement-bar, header, {{ content_for_layout }}, and footer.",
  "content": "<!doctype html>\n<html class=\"js\" lang=\"{{ request.locale.iso_code }}\">\n  <head>\n    <meta charset=\"utf-8\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n    <meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n    <meta name=\"theme-color\" content=\"\">\n    <link rel=\"canonical\" href=\"{{ canonical_url }}\">\n\n    {%- if settings.favicon != blank -%}\n      <link rel=\"icon\" type=\"image/png\" href=\"{{ settings.favicon | image_url: width: 32, height: 32 }}\">\n    {%- endif -%}\n\n    {%- unless settings.type_header_font.system? and settings.type_body_font.system? -%}\n      <link rel=\"preconnect\" href=\"https://fonts.shopifycdn.com\" crossorigin>\n    {%- endunless -%}\n\n    <title>\n      {{ page_title }}\n      {%- if current_tags %} &ndash; tagged \"{{ current_tags | join: ', ' }}\"{% endif -%}\n      {%- if current_page != 1 %} &ndash; Page {{ current_page }}{% endif -%}\n      {%- unless page_title contains shop.name %} &ndash; {{ shop.name }}{% endunless -%}\n    </title>\n\n    {% if page_description %}\n      <meta name=\"description\" content=\"{{ page_description | escape }}\">\n    {% endif %}\n\n    {% render 'meta-tags' %}\n\n    <script type=\"module\">\n      import * as StandardEvents from 'https://cdn.shopify.com/storefront/standard-events.js';\n\n      window.StandardEvents = StandardEvents;\n\n      customElements.define('collection-component', StandardEvents.createViewEventElement());\n      customElements.define(\n        'product-component',\n        StandardEvents.createViewEventElement(HTMLElement, { defaultTrigger: 'intersect' }),\n      );\n\n      document.addEventListener('DOMContentLoaded', () => {\n        const template = document.querySelector('main[data-template]')?.dataset.template || '';\n        document.dispatchEvent(\n          new StandardEvents.PageViewEvent({\n            page: { template, title: document.title, url: window.location.href },\n          })\n        );\n      }, { once: true });\n    </script>\n\n    <script src=\"{{ 'constants.js' | asset_url }}\" defer=\"defer\"></script>\n    <script src=\"{{ 'pubsub.js' | asset_url }}\" defer=\"defer\"></script>\n    <script src=\"{{ 'global.js' | asset_url }}\" defer=\"defer\"></script>\n    <script src=\"{{ 'cart-disclosure-modal.js' | asset_url }}\" defer=\"defer\"></script>\n    <script src=\"{{ 'cart-disclosure-tooltip.js' | asset_url }}\" defer=\"defer\"></script>\n    <script src=\"{{ 'details-disclosure.js' | asset_url }}\" defer=\"defer\"></script>\n    <script src=\"{{ 'details-modal.js' | asset_url }}\" defer=\"defer\"></script>\n    <script src=\"{{ 'search-form.js' | asset_url }}\" defer=\"defer\"></script>\n    <script src=\"{{ 'standard-actions-override.js' | asset_url }}\" defer=\"defer\"></script>\n\n    {%- if settings.animations_reveal_on_scroll -%}\n      <script src=\"{{ 'animations.js' | asset_url }}\" defer=\"defer\"></script>\n    {%- endif -%}\n\n    {{ content_for_header }}\n\n    {%- liquid\n      assign body_font_bold = settings.type_body_font | font_modify: 'weight', 'bold'\n      assign body_font_italic = settings.type_body_font | font_modify: 'style', 'italic'\n      assign body_font_bold_italic = body_font_bold | font_modify: 'style', 'italic'\n    %}\n\n    {% style %}\n      {{ settings.type_body_font | font_face: font_display: 'swap' }}\n      {{ body_font_bold | font_face: font_display: 'swap' }}\n      {{ body_font_italic | font_face: font_display: 'swap' }}\n      {{ body_font_bold_italic | font_face: font_display: 'swap' }}\n      {{ settings.type_header_font | font_face: font_display: 'swap' }}\n\n      {% for scheme in settings.color_schemes -%}\n        {% assign scheme_classes = scheme_classes | append: ', .color-' | append: scheme.id %}\n        {% if forloop.index == 1 -%}\n          :root,\n        {%- endif %}\n        .color-{{ scheme.id }} {\n          --color-background: {{ scheme.settings.background.red }},{{ scheme.settings.background.green }},{{ scheme.settings.background.blue }};\n        {% if scheme.settings.background_gradient != empty %}\n          --gradient-background: {{ scheme.settings.background_gradient }};\n        {% else %}\n          --gradient-background: {{ scheme.settings.background }};\n        {% endif %}\n\n        {% liquid\n          assign background_color = scheme.settings.background\n          assign background_color_brightness = background_color | color_brightness\n          if background_color_brightness <= 26\n            assign background_color_contrast = background_color | color_lighten: 50\n          elsif background_color_brightness <= 65\n            assign background_color_contrast = background_color | color_lighten: 5\n          else\n            assign background_color_contrast = background_color | color_darken: 25\n          endif\n        %}\n\n        --color-foreground: {{ scheme.settings.text.red }},{{ scheme.settings.text.green }},{{ scheme.settings.text.blue }};\n        --color-background-contrast: {{ background_color_contrast.red }},{{ background_color_contrast.green }},{{ background_color_contrast.blue }};\n        --color-shadow: {{ scheme.settings.shadow.red }},{{ scheme.settings.shadow.green }},{{ scheme.settings.shadow.blue }};\n        --color-button: {{ scheme.settings.button.red }},{{ scheme.settings.button.green }},{{ scheme.settings.button.blue }};\n        --color-button-text: {{ scheme.settings.button_label.red }},{{ scheme.settings.button_label.green }},{{ scheme.settings.button_label.blue }};\n        --color-secondary-button: {{ scheme.settings.background.red }},{{ scheme.settings.background.green }},{{ scheme.settings.background.blue }};\n        --color-secondary-button-text: {{ scheme.settings.secondary_button_label.red }},{{ scheme.settings.secondary_button_label.green }},{{ scheme.settings.secondary_button_label.blue }};\n        --color-link: {{ scheme.settings.secondary_button_label.red }},{{ scheme.settings.secondary_button_label.green }},{{ scheme.settings.secondary_button_label.blue }};\n        --color-badge-foreground: {{ scheme.settings.text.red }},{{ scheme.settings.text.green }},{{ scheme.settings.text.blue }};\n        --color-badge-background: {{ scheme.settings.background.red }},{{ scheme.settings.background.green }},{{ scheme.settings.background.blue }};\n        --color-badge-border: {{ scheme.settings.text.red }},{{ scheme.settings.text.green }},{{ scheme.settings.text.blue }};\n        --payment-terms-background-color: rgb({{ scheme.settings.background.rgb }});\n      }\n      {% endfor %}\n\n      {{ scheme_classes | prepend: 'body' }} {\n        color: rgba(var(--color-foreground), 0.75);\n        background-color: rgb(var(--color-background));\n      }\n\n      :root {\n        --font-body-family: {{ settings.type_body_font.family }}, {{ settings.type_body_font.fallback_families }};\n        --font-body-style: {{ settings.type_body_font.style }};\n        --font-body-weight: {{ settings.type_body_font.weight }};\n        --font-body-weight-bold: {{ settings.type_body_font.weight | plus: 300 | at_most: 1000 }};\n\n        --font-heading-family: {{ settings.type_header_font.family }}, {{ settings.type_header_font.fallback_families }};\n        --font-heading-style: {{ settings.type_header_font.style }};\n        --font-heading-weight: {{ settings.type_header_font.weight }};\n\n        --font-body-scale: {{ settings.body_scale | divided_by: 100.0 }};\n        --font-heading-scale: {{ settings.heading_scale | times: 1.0 | divided_by: settings.body_scale }};\n\n        --media-padding: {{ settings.media_padding }}px;\n        --media-border-opacity: {{ settings.media_border_opacity | divided_by: 100.0 }};\n        --media-border-width: {{ settings.media_border_thickness }}px;\n        --media-radius: {{ settings.media_radius }}px;\n        --media-shadow-opacity: {{ settings.media_shadow_opacity | divided_by: 100.0 }};\n        --media-shadow-horizontal-offset: {{ settings.media_shadow_horizontal_offset }}px;\n        --media-shadow-vertical-offset: {{ settings.media_shadow_vertical_offset }}px;\n        --media-shadow-blur-radius: {{ settings.media_shadow_blur }}px;\n        --media-shadow-visible: {% if settings.media_shadow_opacity > 0 %}1{% else %}0{% endif %};\n\n        --page-width: {{ settings.page_width | divided_by: 10 }}rem;\n        --page-width-margin: {% if settings.page_width == '1600' %}2{% else %}0{% endif %}rem;\n\n        --product-card-image-padding: {{ settings.card_image_padding | divided_by: 10.0 }}rem;\n        --product-card-corner-radius: {{ settings.card_corner_radius | divided_by: 10.0 }}rem;\n        --product-card-text-alignment: {{ settings.card_text_alignment }};\n        --product-card-border-width: {{ settings.card_border_thickness | divided_by: 10.0 }}rem;\n        --product-card-border-opacity: {{ settings.card_border_opacity | divided_by: 100.0 }};\n        --product-card-shadow-opacity: {{ settings.card_shadow_opacity | divided_by: 100.0 }};\n        --product-card-shadow-visible: {% if settings.card_shadow_opacity > 0 %}1{% else %}0{% endif %};\n        --product-card-shadow-horizontal-offset: {{ settings.card_shadow_horizontal_offset | divided_by: 10.0 }}rem;\n        --product-card-shadow-vertical-offset: {{ settings.card_shadow_vertical_offset | divided_by: 10.0 }}rem;\n        --product-card-shadow-blur-radius: {{ settings.card_shadow_blur | divided_by: 10.0 }}rem;\n\n        --collection-card-image-padding: {{ settings.collection_card_image_padding | divided_by: 10.0 }}rem;\n        --collection-card-corner-radius: {{ settings.collection_card_corner_radius | divided_by: 10.0 }}rem;\n        --collection-card-text-alignment: {{ settings.collection_card_text_alignment }};\n        --collection-card-border-width: {{ settings.collection_card_border_thickness | divided_by: 10.0 }}rem;\n        --collection-card-border-opacity: {{ settings.collection_card_border_opacity | divided_by: 100.0 }};\n        --collection-card-shadow-opacity: {{ settings.collection_card_shadow_opacity | divided_by: 100.0 }};\n        --collection-card-shadow-visible: {% if settings.collection_card_shadow_opacity > 0 %}1{% else %}0{% endif %};\n        --collection-card-shadow-horizontal-offset: {{ settings.collection_card_shadow_horizontal_offset | divided_by: 10.0 }}rem;\n        --collection-card-shadow-vertical-offset: {{ settings.collection_card_shadow_vertical_offset | divided_by: 10.0 }}rem;\n        --collection-card-shadow-blur-radius: {{ settings.collection_card_shadow_blur | divided_by: 10.0 }}rem;\n\n        --blog-card-image-padding: {{ settings.blog_card_image_padding | divided_by: 10.0 }}rem;\n        --blog-card-corner-radius: {{ settings.blog_card_corner_radius | divided_by: 10.0 }}rem;\n        --blog-card-text-alignment: {{ settings.blog_card_text_alignment }};\n        --blog-card-border-width: {{ settings.blog_card_border_thickness | divided_by: 10.0 }}rem;\n        --blog-card-border-opacity: {{ settings.blog_card_border_opacity | divided_by: 100.0 }};\n        --blog-card-shadow-opacity: {{ settings.blog_card_shadow_opacity | divided_by: 100.0 }};\n        --blog-card-shadow-visible: {% if settings.blog_card_shadow_opacity > 0 %}1{% else %}0{% endif %};\n        --blog-card-shadow-horizontal-offset: {{ settings.blog_card_shadow_horizontal_offset | divided_by: 10.0 }}rem;\n        --blog-card-shadow-vertical-offset: {{ settings.blog_card_shadow_vertical_offset | divided_by: 10.0 }}rem;\n        --blog-card-shadow-blur-radius: {{ settings.blog_card_shadow_blur | divided_by: 10.0 }}rem;\n\n        --badge-corner-radius: {{ settings.badge_corner_radius | divided_by: 10.0 }}rem;\n\n        --popup-border-width: {{ settings.popup_border_thickness }}px;\n        --popup-border-opacity: {{ settings.popup_border_opacity | divided_by: 100.0 }};\n        --popup-corner-radius: {{ settings.popup_corner_radius }}px;\n        --popup-shadow-opacity: {{ settings.popup_shadow_opacity | divided_by: 100.0 }};\n        --popup-shadow-horizontal-offset: {{ settings.popup_shadow_horizontal_offset }}px;\n        --popup-shadow-vertical-offset: {{ settings.popup_shadow_vertical_offset }}px;\n        --popup-shadow-blur-radius: {{ settings.popup_shadow_blur }}px;\n\n        --drawer-border-width: {{ settings.drawer_border_thickness }}px;\n        --drawer-border-opacity: {{ settings.drawer_border_opacity | divided_by: 100.0 }};\n        --drawer-shadow-opacity: {{ settings.drawer_shadow_opacity | divided_by: 100.0 }};\n        --drawer-shadow-horizontal-offset: {{ settings.drawer_shadow_horizontal_offset }}px;\n        --drawer-shadow-vertical-offset: {{ settings.drawer_shadow_vertical_offset }}px;\n        --drawer-shadow-blur-radius: {{ settings.drawer_shadow_blur }}px;\n\n        --spacing-sections-desktop: {{ settings.spacing_sections }}px;\n        --spacing-sections-mobile: {% if settings.spacing_sections < 24 %}{{ settings.spacing_sections }}{% else %}{{ settings.spacing_sections | times: 0.7 | round | at_least: 20 }}{% endif %}px;\n\n        --grid-desktop-vertical-spacing: {{ settings.spacing_grid_vertical }}px;\n        --grid-desktop-horizontal-spacing: {{ settings.spacing_grid_horizontal }}px;\n        --grid-mobile-vertical-spacing: {{ settings.spacing_grid_vertical | divided_by: 2 }}px;\n        --grid-mobile-horizontal-spacing: {{ settings.spacing_grid_horizontal | divided_by: 2 }}px;\n\n        --text-boxes-border-opacity: {{ settings.text_boxes_border_opacity | divided_by: 100.0 }};\n        --text-boxes-border-width: {{ settings.text_boxes_border_thickness }}px;\n        --text-boxes-radius: {{ settings.text_boxes_radius }}px;\n        --text-boxes-shadow-opacity: {{ settings.text_boxes_shadow_opacity | divided_by: 100.0 }};\n        --text-boxes-shadow-visible: {% if settings.text_boxes_shadow_opacity > 0 %}1{% else %}0{% endif %};\n        --text-boxes-shadow-horizontal-offset: {{ settings.text_boxes_shadow_horizontal_offset }}px;\n        --text-boxes-shadow-vertical-offset: {{ settings.text_boxes_shadow_vertical_offset }}px;\n        --text-boxes-shadow-blur-radius: {{ settings.text_boxes_shadow_blur }}px;\n\n        --buttons-radius: {{ settings.buttons_radius }}px;\n        --buttons-radius-outset: {% if settings.buttons_radius > 0 %}{{ settings.buttons_radius | plus: settings.buttons_border_thickness }}{% else %}0{% endif %}px;\n        --buttons-border-width: {% if settings.buttons_border_opacity > 0 %}{{ settings.buttons_border_thickness }}{% else %}0{% endif %}px;\n        --buttons-border-opacity: {{ settings.buttons_border_opacity | divided_by: 100.0 }};\n        --buttons-shadow-opacity: {{ settings.buttons_shadow_opacity | divided_by: 100.0 }};\n        --buttons-shadow-visible: {% if settings.buttons_shadow_opacity > 0 %}1{% else %}0{% endif %};\n        --buttons-shadow-horizontal-offset: {{ settings.buttons_shadow_horizontal_offset }}px;\n        --buttons-shadow-vertical-offset: {{ settings.buttons_shadow_vertical_offset }}px;\n        --buttons-shadow-blur-radius: {{ settings.buttons_shadow_blur }}px;\n        --buttons-border-offset: {% if settings.buttons_radius > 0 or settings.buttons_shadow_opacity > 0 %}0.3{% else %}0{% endif %}px;\n\n        --inputs-radius: {{ settings.inputs_radius }}px;\n        --inputs-border-width: {{ settings.inputs_border_thickness }}px;\n        --inputs-border-opacity: {{ settings.inputs_border_opacity | divided_by: 100.0 }};\n        --inputs-shadow-opacity: {{ settings.inputs_shadow_opacity | divided_by: 100.0 }};\n        --inputs-shadow-horizontal-offset: {{ settings.inputs_shadow_horizontal_offset }}px;\n        --inputs-margin-offset: {% if settings.inputs_shadow_vertical_offset != 0 and settings.inputs_shadow_opacity > 0 %}{{ settings.inputs_shadow_vertical_offset | abs }}{% else %}0{% endif %}px;\n        --inputs-shadow-vertical-offset: {{ settings.inputs_shadow_vertical_offset }}px;\n        --inputs-shadow-blur-radius: {{ settings.inputs_shadow_blur }}px;\n        --inputs-radius-outset: {% if settings.inputs_radius > 0 %}{{ settings.inputs_radius | plus: settings.inputs_border_thickness }}{% else %}0{% endif %}px;\n\n        --variant-pills-radius: {{ settings.variant_pills_radius }}px;\n        --variant-pills-border-width: {{ settings.variant_pills_border_thickness }}px;\n        --variant-pills-border-opacity: {{ settings.variant_pills_border_opacity | divided_by: 100.0 }};\n        --variant-pills-shadow-opacity: {{ settings.variant_pills_shadow_opacity | divided_by: 100.0 }};\n        --variant-pills-shadow-horizontal-offset: {{ settings.variant_pills_shadow_horizontal_offset }}px;\n        --variant-pills-shadow-vertical-offset: {{ settings.variant_pills_shadow_vertical_offset }}px;\n        --variant-pills-shadow-blur-radius: {{ settings.variant_pills_shadow_blur }}px;\n      }\n\n      *,\n      *::before,\n      *::after {\n        box-sizing: inherit;\n      }\n\n      html {\n        box-sizing: border-box;\n        font-size: calc(var(--font-body-scale) * 62.5%);\n        height: 100%;\n      }\n\n      body {\n        display: flex;\n        flex-direction: column;\n        min-height: 100%;\n        margin: 0;\n        font-size: 1.5rem;\n        letter-spacing: 0.06rem;\n        line-height: calc(1 + 0.8 / var(--font-body-scale));\n        font-family: var(--font-body-family);\n        font-style: var(--font-body-style);\n        font-weight: var(--font-body-weight);\n      }\n\n      @media screen and (min-width: 750px) {\n        body {\n          font-size: 1.6rem;\n        }\n      }\n    {% endstyle %}\n\n    {{ 'base.css' | asset_url | stylesheet_tag }}\n    <link rel=\"stylesheet\" href=\"{{ 'component-cart-items.css' | asset_url }}\" media=\"print\" onload=\"this.media='all'\">\n\n    {%- if settings.cart_type == 'drawer' -%}\n      {{ 'component-cart-drawer.css' | asset_url | stylesheet_tag }}\n      {{ 'component-cart.css' | asset_url | stylesheet_tag }}\n      {{ 'component-totals.css' | asset_url | stylesheet_tag }}\n      {{ 'component-price.css' | asset_url | stylesheet_tag }}\n      {{ 'component-discounts.css' | asset_url | stylesheet_tag }}\n    {%- endif -%}\n\n    {%- unless settings.type_body_font.system? -%}\n      {% comment %}theme-check-disable AssetPreload{% endcomment %}\n      <link rel=\"preload\" as=\"font\" href=\"{{ settings.type_body_font | font_url }}\" type=\"font/woff2\" crossorigin>\n      {% comment %}theme-check-enable AssetPreload{% endcomment %}\n    {%- endunless -%}\n    {%- unless settings.type_header_font.system? -%}\n      {% comment %}theme-check-disable AssetPreload{% endcomment %}\n      <link rel=\"preload\" as=\"font\" href=\"{{ settings.type_header_font | font_url }}\" type=\"font/woff2\" crossorigin>\n      {% comment %}theme-check-enable AssetPreload{% endcomment %}\n    {%- endunless -%}\n\n    {%- if localization.available_countries.size > 1 or localization.available_languages.size > 1 -%}\n      {{ 'component-localization-form.css' | asset_url | stylesheet_tag: preload: true }}\n      <script src=\"{{ 'localization-form.js' | asset_url }}\" defer=\"defer\"></script>\n    {%- endif -%}\n\n    {%- if settings.predictive_search_enabled -%}\n      <link\n        rel=\"stylesheet\"\n        href=\"{{ 'component-predictive-search.css' | asset_url }}\"\n        media=\"print\"\n        onload=\"this.media='all'\"\n      >\n    {%- endif -%}\n\n    <script>\n      if (Shopify.designMode) {\n        document.documentElement.classList.add('shopify-design-mode');\n      }\n    </script>\n  </head>\n\n  <body class=\"gradient{% if settings.animations_hover_elements != 'none' %} animate--hover-{{ settings.animations_hover_elements }}{% endif %}\">\n    <a class=\"skip-to-content-link button visually-hidden\" href=\"#MainContent\">\n      {{ 'accessibility.skip_to_text' | t }}\n    </a>\n\n    {%- if settings.cart_type == 'drawer' -%}\n      {%- render 'cart-drawer' -%}\n    {%- endif -%}\n\n    {% sections 'header-group' %}\n\n    <main\n      id=\"MainContent\"\n      class=\"content-for-layout focus-none\"\n      role=\"main\"\n      tabindex=\"-1\"\n      data-template=\"{{ template.name }}\"\n    >\n      {{ content_for_layout }}\n    </main>\n\n    {% sections 'footer-group' %}\n\n    <ul hidden>\n      <li id=\"a11y-refresh-page-message\">{{ 'accessibility.refresh_page' | t }}</li>\n      <li id=\"a11y-new-window-message\">{{ 'accessibility.link_messages.new_window' | t }}</li>\n    </ul>\n\n    <script>\n      window.shopUrl = '{{ request.origin }}';\n      window.routes = {\n        cart_add_url: '{{ routes.cart_add_url }}',\n        cart_change_url: '{{ routes.cart_change_url }}',\n        cart_update_url: '{{ routes.cart_update_url }}',\n        cart_url: '{{ routes.cart_url }}',\n        predictive_search_url: '{{ routes.predictive_search_url }}',\n      };\n\n      window.cartStrings = {\n        error: `{{ 'sections.cart.cart_error' | t }}`,\n        quantityError: `{{ 'sections.cart.cart_quantity_error_html' | t: quantity: '[quantity]' }}`,\n      };\n\n      window.variantStrings = {\n        addToCart: `{{ 'products.product.add_to_cart' | t }}`,\n        soldOut: `{{ 'products.product.sold_out' | t }}`,\n        unavailable: `{{ 'products.product.unavailable' | t }}`,\n        unavailable_with_option: `{{ 'products.product.value_unavailable' | t: option_value: '[value]' }}`,\n      };\n\n      window.quickOrderListStrings = {\n        itemsAdded: `{{ 'sections.quick_order_list.items_added.other' | t: quantity: '[quantity]' }}`,\n        itemAdded: `{{ 'sections.quick_order_list.items_added.one' | t: quantity: '[quantity]' }}`,\n        itemsRemoved: `{{ 'sections.quick_order_list.items_removed.other' | t: quantity: '[quantity]' }}`,\n        itemRemoved: `{{ 'sections.quick_order_list.items_removed.one' | t: quantity: '[quantity]' }}`,\n        viewCart: `{{- 'sections.quick_order_list.view_cart' | t -}}`,\n        each: `{{- 'sections.quick_order_list.each' | t: money: '[money]' }}`,\n        min_error: `{{- 'sections.quick_order_list.min_error' | t: min: '[min]' }}`,\n        max_error: `{{- 'sections.quick_order_list.max_error' | t: max: '[max]' }}`,\n        step_error: `{{- 'sections.quick_order_list.step_error' | t: step: '[step]' }}`,\n      };\n\n      window.accessibilityStrings = {\n        imageAvailable: `{{ 'products.product.media.image_available' | t: index: '[index]' }}`,\n        shareSuccess: `{{ 'general.share.success_message' | t }}`,\n        pauseSlideshow: `{{ 'sections.slideshow.pause_slideshow' | t }}`,\n        playSlideshow: `{{ 'sections.slideshow.play_slideshow' | t }}`,\n        recipientFormExpanded: `{{ 'recipient.form.expanded' | t }}`,\n        recipientFormCollapsed: `{{ 'recipient.form.collapsed' | t }}`,\n        countrySelectorSearchCount: `{{ 'localization.country_results_count' | t: count: '[count]' }}`,\n      };\n    </script>\n\n    {%- if settings.predictive_search_enabled -%}\n      <script src=\"{{ 'predictive-search.js' | asset_url }}\" defer=\"defer\"></script>\n    {%- endif -%}\n\n    {%- if settings.cart_type == 'drawer' -%}\n      <script src=\"{{ 'cart-drawer.js' | asset_url }}\" defer=\"defer\"></script>\n    {%- endif -%}\n  </body>\n</html>\n"
},
  {
    path: 'config/settings_data.json',
    name: 'settings_data.json',
    category: 'config',
    description: 'Global color schemes (Obsidian #08080D, Electric Cyan #00D9FF, Neon Magenta #FF00D4), Outfit & Plus Jakarta Sans typography scaling, 12px card border radius, and drawer cart.',
    content: `{
  "current": {
    "colors_solid_button_labels": "#08080D",
    "colors_accent_1": "#00D9FF",
    "colors_accent_2": "#FF00D4",
    "colors_text": "#FFFFFF",
    "colors_outline_button_labels": "#00D9FF",
    "colors_background_1": "#08080D",
    "colors_background_2": "#11111A",
    "gradient_accent_1": "linear-gradient(135deg, #00D9FF 0%, #792BFF 50%, #FF00D4 100%)",
    "gradient_accent_2": "linear-gradient(135deg, #FF00D4 0%, #792BFF 100%)",
    "gradient_background_1": "linear-gradient(180deg, #08080D 0%, #11111A 100%)",
    "gradient_background_2": "linear-gradient(180deg, #11111A 0%, #171722 100%)",
    "color_schemes": {
      "scheme-1": {
        "color_scheme_id": "scheme-1",
        "settings": {
          "background": "#08080D",
          "background_gradient": "",
          "text": "#FFFFFF",
          "button": "#00D9FF",
          "button_label": "#08080D",
          "secondary_button_label": "#00D9FF",
          "shadow": "#000000"
        }
      },
      "scheme-2": {
        "color_scheme_id": "scheme-2",
        "settings": {
          "background": "#11111A",
          "background_gradient": "",
          "text": "#FFFFFF",
          "button": "#FF00D4",
          "button_label": "#FFFFFF",
          "secondary_button_label": "#FF00D4",
          "shadow": "#000000"
        }
      },
      "scheme-3": {
        "color_scheme_id": "scheme-3",
        "settings": {
          "background": "#171722",
          "background_gradient": "",
          "text": "#FFFFFF",
          "button": "#00D9FF",
          "button_label": "#08080D",
          "secondary_button_label": "#00D9FF",
          "shadow": "#000000"
        }
      },
      "scheme-4": {
        "color_scheme_id": "scheme-4",
        "settings": {
          "background": "#00D9FF",
          "background_gradient": "linear-gradient(135deg, #00D9FF 0%, #792BFF 50%, #FF00D4 100%)",
          "text": "#08080D",
          "button": "#08080D",
          "button_label": "#FFFFFF",
          "secondary_button_label": "#08080D",
          "shadow": "#000000"
        }
      },
      "scheme-5": {
        "color_scheme_id": "scheme-5",
        "settings": {
          "background": "#050508",
          "background_gradient": "",
          "text": "#B8B8C8",
          "button": "#171722",
          "button_label": "#FFFFFF",
          "secondary_button_label": "#00D9FF",
          "shadow": "#000000"
        }
      }
    },
    "type_header_font": "outfit_n8",
    "heading_scale": 105,
    "type_body_font": "assistant_n4",
    "body_scale": 100,
    "page_width": 1280,
    "spacing_sections": 36,
    "spacing_grid_horizontal": 24,
    "spacing_grid_vertical": 24,
    "buttons_border_thickness": 1,
    "buttons_border_opacity": 20,
    "buttons_radius": 8,
    "buttons_shadow_opacity": 15,
    "buttons_shadow_horizontal_offset": 0,
    "buttons_shadow_vertical_offset": 4,
    "buttons_shadow_blur": 12,
    "variant_pills_border_thickness": 1,
    "variant_pills_border_opacity": 30,
    "variant_pills_radius": 8,
    "inputs_border_thickness": 1,
    "inputs_border_opacity": 35,
    "inputs_radius": 8,
    "card_style": "card",
    "card_image_padding": 0,
    "card_text_alignment": "left",
    "card_color_scheme": "scheme-2",
    "card_border_thickness": 1,
    "card_border_opacity": 25,
    "card_corner_radius": 12,
    "card_shadow_opacity": 10,
    "card_shadow_blur": 20,
    "collection_card_style": "card",
    "collection_card_color_scheme": "scheme-2",
    "collection_card_corner_radius": 12,
    "badge_corner_radius": 6,
    "sale_badge_color_scheme": "scheme-2",
    "sold_out_badge_color_scheme": "scheme-5",
    "cart_type": "drawer",
    "show_cart_note": true,
    "show_vendor": false,
    "show_rating": false,
    "currency_code_enabled": true,
    "predictive_search_enabled": true,
    "predictive_search_show_price": true,
    "brand_headline": "L&M 3D Print Store",
    "brand_description": "Unique designs. Bold colours. Made to stand out. Precision 3D printing studio in the UK."
  }
}`
  },
  {
    path: 'assets/base.css',
    name: 'base.css',
    category: 'assets',
    description: 'Custom styling rules for the L&M 3D Print Store: dark canvas overrides, cyan/magenta button gradients, product card hover micro-animations, tabular prices, and glassmorphism header.',
    content: `/* ==========================================================================
   L&M 3D PRINT STORE — PREMIUM DAWN THEME OVERRIDES
   Brand Colors: Obsidian (#08080D), Surface (#11111A), Card (#171722),
   Electric Cyan (#00D9FF), Neon Magenta (#FF00D4), Purple (#792BFF)
   ========================================================================== */

:root {
  --lm-bg-primary: #08080D;
  --lm-bg-secondary: #11111A;
  --lm-bg-card: #171722;
  --lm-border: #232334;
  --lm-cyan: #00D9FF;
  --lm-magenta: #FF00D4;
  --lm-purple: #792BFF;
  --lm-text-primary: #FFFFFF;
  --lm-text-muted: #B8B8C8;
  --lm-gradient-brand: linear-gradient(135deg, #00D9FF 0%, #792BFF 50%, #FF00D4 100%);
}

/* Global Dark Mode Canvas */
body,
.gradient {
  background-color: var(--lm-bg-primary) !important;
  color: var(--lm-text-primary) !important;
}

/* Selection Color */
::selection {
  background: rgba(0, 217, 255, 0.25);
  color: #00D9FF;
}

/* Scrollbar Customization */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: #08080D;
}
::-webkit-scrollbar-thumb {
  background: #232334;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #36364e;
}

/* Typography Enhancements */
h1, h2, h3, h4, h5, h6,
.h1, .h2, .h3, .h4, .h5, .h6 {
  letter-spacing: -0.02em !important;
  color: var(--lm-text-primary) !important;
}

/* Header Glassmorphism & Branding */
.header-wrapper {
  background: rgba(8, 8, 13, 0.95) !important;
  backdrop-filter: blur(12px) !important;
  border-bottom: 1px solid var(--lm-border) !important;
}

.header__heading-logo-wrapper {
  transition: transform 0.25s ease;
}
.header__heading-logo-wrapper:hover {
  transform: scale(1.02);
}

.header__menu-item {
  color: var(--lm-text-muted) !important;
  font-weight: 500 !important;
  transition: color 0.2s ease !important;
}
.header__menu-item:hover,
.header__menu-item--active {
  color: var(--lm-cyan) !important;
}

/* Header Icons (Search, Account, Cart) */
.header__icon {
  color: var(--lm-text-muted) !important;
  transition: color 0.2s ease;
}
.header__icon:hover {
  color: var(--lm-cyan) !important;
}

.cart-count-bubble {
  background: var(--lm-gradient-brand) !important;
  color: #08080D !important;
  font-weight: 800 !important;
  border: none !important;
}

/* Announcement Bar */
.announcement-bar {
  background: var(--lm-bg-secondary) !important;
  border-bottom: 1px solid var(--lm-border) !important;
  color: var(--lm-text-primary) !important;
  font-size: 1.2rem !important;
}

/* Product Cards */
.card-wrapper {
  background: var(--lm-bg-secondary) !important;
  border: 1px solid var(--lm-border) !important;
  border-radius: 12px !important;
  overflow: hidden !important;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
}
.card-wrapper:hover {
  border-color: rgba(0, 217, 255, 0.45) !important;
  transform: translateY(-3px) !important;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 217, 255, 0.1) !important;
}

.card__media {
  background: var(--lm-bg-card) !important;
  border-bottom: 1px solid var(--lm-border) !important;
}

.card__heading a {
  color: var(--lm-text-primary) !important;
  font-weight: 700 !important;
  transition: color 0.2s ease !important;
}
.card__heading a:hover {
  color: var(--lm-cyan) !important;
}

/* Price Styling with Tabular Numbers */
.price {
  font-variant-numeric: tabular-nums !important;
}
.price__regular .price-item--regular {
  color: #FFFFFF !important;
  font-weight: 700 !important;
}
.price__sale .price-item--sale {
  color: var(--lm-cyan) !important;
  font-weight: 800 !important;
}
.price__sale .price-item--regular {
  color: var(--lm-text-muted) !important;
  text-decoration: line-through !important;
}

/* Badges */
.badge {
  border-radius: 4px !important;
  font-size: 1.1rem !important;
  font-weight: 700 !important;
  letter-spacing: 0.05em !important;
  text-transform: uppercase !important;
  padding: 0.3rem 0.8rem !important;
}
.badge--sale {
  background-color: var(--lm-magenta) !important;
  color: #FFFFFF !important;
  border: none !important;
}
.badge--soldout {
  background-color: var(--lm-bg-card) !important;
  color: var(--lm-text-muted) !important;
  border: 1px solid var(--lm-border) !important;
}

/* Primary Brand Buttons */
.button--primary {
  background: var(--lm-gradient-brand) !important;
  color: #08080D !important;
  font-weight: 800 !important;
  letter-spacing: 0.05em !important;
  text-transform: uppercase !important;
  border: none !important;
  border-radius: 8px !important;
  box-shadow: 0 4px 15px rgba(0, 217, 255, 0.25) !important;
  transition: transform 0.2s ease, opacity 0.2s ease !important;
}
.button--primary:hover {
  opacity: 0.95 !important;
  transform: translateY(-1px) !important;
  box-shadow: 0 6px 20px rgba(255, 0, 212, 0.3) !important;
}

/* Secondary Buttons */
.button--secondary {
  background: var(--lm-bg-card) !important;
  color: #FFFFFF !important;
  border: 1px solid var(--lm-border) !important;
  border-radius: 8px !important;
  font-weight: 700 !important;
}
.button--secondary:hover {
  border-color: var(--lm-cyan) !important;
  color: var(--lm-cyan) !important;
}

/* Product Detail Page (PDP) Layout */
.product__info-container {
  background: var(--lm-bg-secondary);
  border: 1px solid var(--lm-border);
  border-radius: 16px;
  padding: 2.5rem;
}

.product__title h1 {
  font-size: 2.8rem !important;
  font-weight: 800 !important;
}

/* Variant Pickers (Pills) */
.product-form__input input[type='radio'] + label {
  background: var(--lm-bg-card) !important;
  color: var(--lm-text-muted) !important;
  border: 1px solid var(--lm-border) !important;
  border-radius: 8px !important;
  font-weight: 600 !important;
  transition: all 0.2s ease !important;
}
.product-form__input input[type='radio']:checked + label {
  background: var(--lm-bg-primary) !important;
  color: #FFFFFF !important;
  border-color: var(--lm-cyan) !important;
  box-shadow: 0 0 10px rgba(0, 217, 255, 0.25) !important;
}

/* Cart Drawer */
.cart-drawer {
  background: var(--lm-bg-primary) !important;
  border-left: 1px solid var(--lm-border) !important;
}
.cart-drawer__collection {
  border-top: 1px solid var(--lm-border) !important;
}
.cart-drawer .drawer__heading {
  color: #FFFFFF !important;
  font-weight: 800 !important;
}

/* Footer Section */
.footer {
  background: var(--lm-bg-primary) !important;
  border-top: 1px solid var(--lm-border) !important;
  color: var(--lm-text-muted) !important;
}
.footer__heading {
  color: #FFFFFF !important;
  font-weight: 700 !important;
}
.footer__list-social .list-social__link {
  color: var(--lm-text-muted) !important;
}
.footer__list-social .list-social__link:hover {
  color: var(--lm-cyan) !important;
}`
  },
  {
    path: 'templates/index.json',
    name: 'index.json',
    category: 'templates',
    description: 'Homepage section structure: Hero Banner, 6 Featured Categories collection list, Best Sellers grid, Halloween spotlight, Brand Story, and Newsletter.',
    content: `{
  "sections": {
    "announcement_bar": {
      "type": "announcement-bar",
      "blocks": {
        "announcement_1": {
          "type": "announcement",
          "settings": {
            "text": "Discover something different.",
            "text_alignment": "center",
            "color_scheme": "scheme-2"
          }
        },
        "announcement_2": {
          "type": "announcement",
          "settings": {
            "text": "Unique 3D-printed designs · Made with care, one print at a time.",
            "text_alignment": "center",
            "color_scheme": "scheme-2"
          }
        },
        "announcement_3": {
          "type": "announcement",
          "settings": {
            "text": "Free UK shipping on orders over £45",
            "text_alignment": "center",
            "color_scheme": "scheme-2"
          }
        }
      },
      "block_order": [
        "announcement_1",
        "announcement_2",
        "announcement_3"
      ],
      "settings": {
        "auto_rotate": true,
        "change_slides_speed": 5
      }
    },
    "hero_banner": {
      "type": "image-banner",
      "blocks": {
        "heading": {
          "type": "heading",
          "settings": {
            "heading": "PRINTED DIFFERENT.",
            "heading_size": "h0"
          }
        },
        "text": {
          "type": "text",
          "settings": {
            "text": "Unique designs. Bold colours. Made to stand out. Original 3D-printed collectibles, articulated figures, geometric planters and multi-layer artwork hand-finished in our UK studio.",
            "text_style": "subtitle"
          }
        },
        "buttons": {
          "type": "buttons",
          "settings": {
            "button_label_1": "SHOP ALL PRODUCTS",
            "button_link_1": "shopify:\/\/collections\/all",
            "button_style_secondary_1": false,
            "button_label_2": "EXPLORE COLLECTIONS",
            "button_link_2": "shopify:\/\/collections",
            "button_style_secondary_2": true
          }
        }
      },
      "block_order": [
        "heading",
        "text",
        "buttons"
      ],
      "settings": {
        "image_overlay_opacity": 40,
        "image_height": "large",
        "desktop_content_position": "middle-left",
        "show_text_box": false,
        "desktop_content_alignment": "left",
        "color_scheme": "scheme-1",
        "mobile_content_alignment": "center",
        "stack_images_on_mobile": true,
        "show_text_below": false
      }
    },
    "collection_list": {
      "type": "collection-list",
      "blocks": {
        "cat_pokemon": {
          "type": "featured_collection",
          "settings": {
            "collection": "pokemon-anime"
          }
        },
        "cat_halloween": {
          "type": "featured_collection",
          "settings": {
            "collection": "halloween-horror"
          }
        },
        "cat_multilayer": {
          "type": "featured_collection",
          "settings": {
            "collection": "multi-layer-prints"
          }
        },
        "cat_planters": {
          "type": "featured_collection",
          "settings": {
            "collection": "planters"
          }
        },
        "cat_flexis": {
          "type": "featured_collection",
          "settings": {
            "collection": "flexis-fidgets"
          }
        },
        "cat_household": {
          "type": "featured_collection",
          "settings": {
            "collection": "household-products"
          }
        }
      },
      "block_order": [
        "cat_pokemon",
        "cat_halloween",
        "cat_multilayer",
        "cat_planters",
        "cat_flexis",
        "cat_household"
      ],
      "settings": {
        "title": "EXPLORE BY CATEGORY",
        "heading_size": "h1",
        "image_ratio": "adapt",
        "columns_desktop": 3,
        "color_scheme": "scheme-1",
        "show_view_all": false,
        "columns_mobile": "2",
        "swipe_on_mobile": false
      }
    },
    "best_sellers": {
      "type": "featured-collection",
      "settings": {
        "title": "BEST SELLERS",
        "heading_size": "h1",
        "description": "Our most popular customer favorites, printed in iridescent dual-tone silk filaments.",
        "show_description": true,
        "description_style": "body",
        "collection": "best-sellers",
        "products_to_show": 6,
        "columns_desktop": 3,
        "full_width": false,
        "show_view_all": true,
        "view_all_style": "link",
        "enable_desktop_slider": false,
        "color_scheme": "scheme-1",
        "image_ratio": "portrait",
        "image_shape": "default",
        "show_secondary_image": true,
        "show_vendor": false,
        "show_rating": false,
        "enable_quick_add": true,
        "columns_mobile": "2",
        "swipe_on_mobile": false
      }
    },
    "seasonal_banner": {
      "type": "image-banner",
      "blocks": {
        "heading": {
          "type": "heading",
          "settings": {
            "heading": "SEASONAL SPOTLIGHT: HALLOWEEN & GOTHIC ARTIFACTS",
            "heading_size": "h1"
          }
        },
        "text": {
          "type": "text",
          "settings": {
            "text": "From filigree carved skull planters with integrated drainage trays to glowing low-poly ghost tealights that cast geometric shadows. Explore our curated spooky season collection.",
            "text_style": "body"
          }
        },
        "button": {
          "type": "buttons",
          "settings": {
            "button_label_1": "EXPLORE SPOOKY COLLECTION",
            "button_link_1": "shopify:\/\/collections\/halloween-horror",
            "button_style_secondary_1": false
          }
        }
      },
      "block_order": [
        "heading",
        "text",
        "button"
      ],
      "settings": {
        "image_overlay_opacity": 30,
        "image_height": "medium",
        "desktop_content_position": "middle-center",
        "show_text_box": true,
        "desktop_content_alignment": "center",
        "color_scheme": "scheme-2",
        "mobile_content_alignment": "center"
      }
    },
    "brand_story": {
      "type": "rich-text",
      "blocks": {
        "caption": {
          "type": "caption",
          "settings": {
            "text": "ABOUT L&M 3D PRINT STORE",
            "text_style": "uppercase",
            "text_size": "small"
          }
        },
        "heading": {
          "type": "heading",
          "settings": {
            "heading": "SMALL DETAILS. BIG PERSONALITY.",
            "heading_size": "h1"
          }
        },
        "text": {
          "type": "text",
          "settings": {
            "text": "<p>We started L&M 3D Print Store with a simple vision: to take 3D printing beyond grey prototypes and create vibrant, tactile objects you genuinely want to hold, display, and share. Whether it's a coiled crystal dragon that shimmers between cyan and magenta, a geometric succulent planter, or an illuminated multi-layer shadowbox, each design is individually inspected and carefully packaged right here in Britain.</p>"
          }
        },
        "button": {
          "type": "button",
          "settings": {
            "button_label": "BROWSE THE COMPLETE CATALOG",
            "button_link": "shopify:\/\/collections\/all",
            "button_style_secondary": true
          }
        }
      },
      "block_order": [
        "caption",
        "heading",
        "text",
        "button"
      ],
      "settings": {
        "desktop_content_position": "center",
        "content_alignment": "center",
        "color_scheme": "scheme-1",
        "full_width": true
      }
    },
    "newsletter": {
      "type": "newsletter",
      "blocks": {
        "heading": {
          "type": "heading",
          "settings": {
            "heading": "GET THE NEXT DROP.",
            "heading_size": "h1"
          }
        },
        "paragraph": {
          "type": "paragraph",
          "settings": {
            "text": "<p>Be the first to know when new articulated flexis, limited multi-layer prints, or seasonal items come off the build plate. No spam, only genuine workshop drops.</p>"
          }
        },
        "email_form": {
          "type": "email_form",
          "settings": {}
        }
      },
      "block_order": [
        "heading",
        "paragraph",
        "email_form"
      ],
      "settings": {
        "color_scheme": "scheme-2",
        "full_width": false
      }
    }
  },
  "order": [
    "announcement_bar",
    "hero_banner",
    "collection_list",
    "best_sellers",
    "seasonal_banner",
    "brand_story",
    "newsletter"
  ]
}`
  },
  {
    path: 'sections/announcement-bar.liquid',
    name: 'announcement-bar.liquid',
    category: 'sections',
    description: 'Rotating brand message bar with electric cyan accent bullets and dark background.',
    content: `{{ 'component-slideshow.css' | asset_url | stylesheet_tag }}
{{ 'component-slider.css' | asset_url | stylesheet_tag }}

<div class="announcement-bar-section" style="background-color: #11111A; border-bottom: 1px solid #232334;">
  <div class="page-width announcement-bar-wrapper" style="display: flex; align-items: center; justify-content: center; padding: 0.8rem 1.5rem; min-height: 38px;">
    {%- if section.blocks.size > 0 -%}
      <div class="announcement-bar" role="region" aria-label="{{ 'sections.header.announcement' | t }}">
        {%- for block in section.blocks -%}
          {%- case block.type -%}
            {%- when 'announcement' -%}
              <div class="announcement-bar__message" style="display: flex; align-items: center; justify-content: center; gap: 0.8rem; font-size: 1.2rem; font-weight: 500; letter-spacing: 0.03em;">
                <span style="width: 6px; height: 6px; border-radius: 50%; background-color: #00D9FF; display: inline-block;"></span>
                {%- if block.settings.text != blank -%}
                  {%- if block.settings.link != blank -%}
                    <a href="{{ block.settings.link }}" class="announcement-bar__link link link--text focus-inset animate-arrow" style="color: #FFFFFF; text-decoration: none;">
                      {{ block.settings.text | escape }}
                    </a>
                  {%- else -%}
                    <span style="color: #FFFFFF;">{{ block.settings.text | escape }}</span>
                  {%- endif -%}
                {%- endif -%}
              </div>
          {%- endcase -%}
        {%- endfor -%}
      </div>
    {%- endif -%}
  </div>
</div>`
  },
  {
    path: 'sections/header.liquid',
    name: 'header.liquid',
    category: 'sections',
    description: 'Header with official L&M circular badge logo lockup, category links, search modal, and live shopping bag count bubble.',
    content: `<link rel="stylesheet" href="{{ 'component-list-menu.css' | asset_url }}" media="print" onload="this.media='all'">
<link rel="stylesheet" href="{{ 'component-search.css' | asset_url }}" media="print" onload="this.media='all'">
<link rel="stylesheet" href="{{ 'component-menu-drawer.css' | asset_url }}" media="print" onload="this.media='all'">
<link rel="stylesheet" href="{{ 'component-cart-notification.css' | asset_url }}" media="print" onload="this.media='all'">
<link rel="stylesheet" href="{{ 'component-cart-items.css' | asset_url }}" media="print" onload="this.media='all'">

<header class="header header--middle-left header--mobile-center page-width header-wrapper" style="display: flex; align-items: center; justify-content: space-between; padding-top: 1.2rem; padding-bottom: 1.2rem;">
  {%- comment -%}Mobile Menu Drawer Trigger{%- endcomment -%}
  <header-drawer data-breakpoint="tablet">
    <details id="Details-menu-drawer-container" class="menu-drawer-container">
      <summary class="header__icon header__icon--menu header__icon--summary link focus-inset" aria-label="{{ 'sections.header.menu' | t }}">
        <span>
          {% render 'icon-hamburger' %}
          {% render 'icon-close' %}
        </span>
      </summary>
      <div id="menu-drawer" class="gradient menu-drawer motion-reduce color-{{ section.settings.menu_color_scheme }}" style="background-color: #08080D; border-right: 1px solid #232334;">
        <div class="menu-drawer__inner-container">
          <div class="menu-drawer__navigation-container">
            <nav class="menu-drawer__navigation">
              <ul class="menu-drawer__menu has-submenu list-menu" role="list">
                {%- for link in section.settings.menu.links -%}
                  <li>
                    <a href="{{ link.url }}" class="menu-drawer__menu-item list-menu__item link link--text focus-inset" style="color: #FFFFFF; font-size: 1.4rem; padding: 1.2rem 2rem;">
                      {{ link.title | escape }}
                    </a>
                  </li>
                {%- endfor -%}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </details>
  </header-drawer>

  {%- comment -%}L&M Brand Logo & Title{%- endcomment -%}
  <div class="header__heading">
    <a href="{{ routes.root_url }}" class="header__heading-link link link--text focus-inset" style="display: flex; align-items: center; gap: 1.2rem; text-decoration: none;">
      {%- if settings.logo != blank -%}
        <div style="position: relative; width: 44px; height: 44px; border-radius: 50%; padding: 2px; background: linear-gradient(135deg, #00D9FF 0%, #792BFF 50%, #FF00D4 100%);">
          <img
            src="{{ settings.logo | image_url: width: 120 }}"
            alt="{{ settings.logo.alt | default: shop.name | escape }}"
            style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;"
          >
        </div>
      {%- endif -%}
      <div style="display: flex; flex-direction: column; line-height: 1;">
        <span style="font-size: 1.8rem; font-weight: 900; letter-spacing: -0.02em; color: #FFFFFF;">
          <span style="color: #00D9FF;">L</span><span style="color: #FFFFFF;">&amp;</span><span style="color: #FF00D4;">M</span> 3D PRINT
        </span>
        <span style="font-size: 0.9rem; letter-spacing: 0.25em; text-transform: uppercase; color: #B8B8C8; font-weight: 700; margin-top: 2px;">
          STORE · UK STUDIO
        </span>
      </div>
    </a>
  </div>

  {%- comment -%}Desktop Navigation Links{%- endcomment -%}
  {%- if section.settings.menu != blank -%}
    <nav class="header__inline-menu">
      <ul class="list-menu list-menu--inline" role="list" style="display: flex; gap: 1.5rem; align-items: center;">
        {%- for link in section.settings.menu.links -%}
          <li>
            <a
              id="HeaderMenu-{{ link.handle }}"
              href="{{ link.url }}"
              class="header__menu-item list-menu__item link link--text focus-inset"
              {% if link.current %}
                aria-current="page"
                style="color: #00D9FF !important; font-weight: 700;"
              {% else %}
                style="color: #B8B8C8; font-size: 1.3rem; font-weight: 600; text-decoration: none;"
              {% endif %}
            >
              <span {%- if link.current %} class="header__active-menu-item"{% endif %}>
                {{- link.title | escape -}}
              </span>
            </a>
          </li>
        {%- endfor -%}
      </ul>
    </nav>
  {%- endif -%}

  {%- comment -%}Right Action Icons (Search, Account, Cart Drawer){%- endcomment -%}
  <div class="header__icons" style="display: flex; align-items: center; gap: 1rem;">
    {% render 'header-search', input_id: 'Search-In-Modal' %}

    {%- if shop.customer_accounts_enabled -%}
      <a href="{%- if customer -%}{{ routes.account_url }}{%- else -%}{{ routes.account_login_url }}{%- endif -%}" class="header__icon header__icon--account link focus-inset">
        {% render 'icon-account' %}
      </a>
    {%- endif -%}

    <a href="{{ routes.cart_url }}" class="header__icon header__icon--cart link focus-inset" id="cart-icon-bubble" style="background: #171722; border: 1px solid #232334; border-radius: 8px; padding: 0.8rem 1.2rem; display: flex; align-items: center; gap: 0.8rem; text-decoration: none;">
      {%- liquid
        if cart == empty
          render 'icon-cart-empty'
        else
          render 'icon-cart'
        endif
      -%}
      <span style="font-size: 1.1rem; font-weight: 700; color: #FFFFFF; text-transform: uppercase;">BAG</span>
      {%- if cart != empty -%}
        <div class="cart-count-bubble" style="position: static; min-width: 18px; height: 18px; font-size: 1rem; border-radius: 9px; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #00D9FF, #FF00D4); color: #08080D; font-weight: 900;">
          <span aria-hidden="true">{{ cart.item_count }}</span>
        </div>
      {%- endif -%}
    </a>
  </div>
</header>`
  },
  {
    path: 'sections/footer.liquid',
    name: 'footer.liquid',
    category: 'sections',
    description: 'Footer with 4-pillar quality strip (0.16mm layer slicing, dual-tone silk filaments, UK workshop crafted, safe UK delivery), contact details, and policy links.',
    content: `{{ 'section-footer.css' | asset_url | stylesheet_tag }}
{{ 'component-list-menu.css' | asset_url | stylesheet_tag }}
{{ 'component-list-payment.css' | asset_url | stylesheet_tag }}
{{ 'component-list-social.css' | asset_url | stylesheet_tag }}

<footer class="footer color-{{ section.settings.color_scheme }} gradient section-{{ section.id }}-padding" style="background-color: #08080D; border-top: 1px solid #232334;">
  {%- comment -%}Value Pillars Strip{%- endcomment -%}
  <div style="border-bottom: 1px solid #232334; background: rgba(17, 17, 26, 0.4); padding: 2rem 0;">
    <div class="page-width">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 2rem; align-items: center;">
        <div style="display: flex; align-items: center; gap: 1.2rem;">
          <div style="width: 40px; height: 40px; border-radius: 8px; background: #171722; border: 1px solid #232334; display: flex; align-items: center; justify-content: center; color: #00D9FF; font-weight: 800; font-size: 1.4rem;">
            µm
          </div>
          <div>
            <div style="font-size: 1.2rem; font-weight: 700; color: #FFFFFF; text-transform: uppercase;">0.16mm Layer Slicing</div>
            <div style="font-size: 1.1rem; color: #B8B8C8;">High resolution surface detail</div>
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 1.2rem;">
          <div style="width: 40px; height: 40px; border-radius: 8px; background: #171722; border: 1px solid #232334; display: flex; align-items: center; justify-content: center; color: #FF00D4; font-weight: 800; font-size: 1.4rem;">
            ✦
          </div>
          <div>
            <div style="font-size: 1.2rem; font-weight: 700; color: #FFFFFF; text-transform: uppercase;">Dual-Tone Silk Filaments</div>
            <div style="font-size: 1.1rem; color: #B8B8C8;">Premium iridescent finishes</div>
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 1.2rem;">
          <div style="width: 40px; height: 40px; border-radius: 8px; background: #171722; border: 1px solid #232334; display: flex; align-items: center; justify-content: center; color: #792BFF; font-weight: 800; font-size: 1.4rem;">
            UK
          </div>
          <div>
            <div style="font-size: 1.2rem; font-weight: 700; color: #FFFFFF; text-transform: uppercase;">UK Workshop Crafted</div>
            <div style="font-size: 1.1rem; color: #B8B8C8;">Inspected and packed in Britain</div>
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 1.2rem;">
          <div style="width: 40px; height: 40px; border-radius: 8px; background: #171722; border: 1px solid #232334; display: flex; align-items: center; justify-content: center; color: #00D9FF; font-weight: 800; font-size: 1.4rem;">
            ✓
          </div>
          <div>
            <div style="font-size: 1.2rem; font-weight: 700; color: #FFFFFF; text-transform: uppercase;">Safe UK Delivery</div>
            <div style="font-size: 1.1rem; color: #B8B8C8;">Protective bespoke packaging</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="footer__content-top page-width" style="padding-top: 4rem; padding-bottom: 4rem;">
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 3rem;">
      <div style="grid-column: span 1;">
        <h2 style="font-size: 1.8rem; font-weight: 800; color: #FFFFFF; margin-bottom: 1rem;">
          <span style="color: #00D9FF;">L</span>&amp;<span style="color: #FF00D4;">M</span> 3D PRINT STORE
        </h2>
        <p style="font-size: 1.2rem; color: #B8B8C8; line-height: 1.6; margin-bottom: 1.5rem;">
          Independent UK studio specialising in precision multi-colour 3D printing, articulated collectibles, sculptural homeware, and original multi-layer designs.
        </p>
        <div style="font-size: 1.1rem; color: #B8B8C8;">
          <div style="font-weight: 700; color: #FFFFFF; margin-bottom: 0.3rem;">UK STUDIO ENQUIRIES</div>
          <div>hello@lm3dprintstore.co.uk</div>
          <div>Mon–Fri, 9:00am – 5:00pm GMT</div>
        </div>
      </div>

      {%- for block in section.blocks -%}
        <div class="footer-block" {{ block.shopify_attributes }}>
          {%- if block.settings.heading != blank -%}
            <h2 class="footer-block__heading" style="font-size: 1.3rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #FFFFFF; margin-bottom: 1.5rem;">
              {{- block.settings.heading | escape -}}
            </h2>
          {%- endif -%}

          {%- case block.type -%}
            {%- when 'link_list' -%}
              {%- if block.settings.menu != blank -%}
                <ul class="footer-block__details-content list-unstyled" style="padding: 0; margin: 0; list-style: none;">
                  {%- for link in block.settings.menu.links -%}
                    <li style="margin-bottom: 0.8rem;">
                      <a href="{{ link.url }}" class="link link--text" style="color: #B8B8C8; text-decoration: none; font-size: 1.2rem;">
                        {{ link.title }}
                      </a>
                    </li>
                  {%- endfor -%}
                </ul>
              {%- endif -%}
          {%- endcase -%}
        </div>
      {%- endfor -%}
    </div>
  </div>

  <div class="footer__content-bottom" style="border-top: 1px solid #232334; padding: 2rem 0; font-size: 1.1rem; color: #B8B8C8;">
    <div class="page-width" style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1.5rem;">
      <div>
        &copy; {{ 'now' | date: '%Y' }} L&amp;M 3D Print Store. Hand-finished in the UK.
      </div>
      <div style="display: flex; align-items: center; gap: 1rem;">
        <span style="color: #00D9FF;">Prices displayed in GBP (£)</span>
        <span>·</span>
        <span>Powered by Shopify Online Store 2.0</span>
      </div>
    </div>
  </div>
</footer>`
  },
  {
    path: 'snippets/card-product.liquid',
    name: 'card-product.liquid',
    category: 'snippets',
    description: 'Product card with dark background #171722, unboxed category metadata, sale badges, tabular GBP price, and quick-add button.',
    content: `{% comment %}
  L&M 3D Print Store Product Card Snippet for Dawn
{% endcomment %}
{{ 'component-price.css' | asset_url | stylesheet_tag }}

{%- if card_product and card_product != empty -%}
  <div class="card-wrapper product-card-wrapper" style="background-color: #11111A; border: 1px solid #232334; border-radius: 12px; overflow: hidden; display: flex; flex-direction: column; height: 100%;">
    <div class="card card--media" style="position: relative; overflow: hidden; background-color: #171722;">
      <div class="card__media" style="position: relative; aspect-ratio: 4/3; overflow: hidden;">
        <img
          src="{{ card_product.featured_media | image_url: width: 600 }}"
          alt="{{ card_product.featured_media.alt | escape }}"
          loading="lazy"
          style="width: 100%; height: 100%; object-fit: cover;"
        >
        {%- if card_product.compare_at_price > card_product.price and card_product.available -%}
          <span style="position: absolute; top: 1rem; left: 1rem; background-color: #FF00D4; color: #FFFFFF; border-radius: 4px; padding: 0.3rem 0.8rem; font-size: 1.1rem; font-weight: 700; text-transform: uppercase;">
            SALE
          </span>
        {%- endif -%}
      </div>

      <div class="card__content" style="padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between; flex-grow: 1;">
        <div>
          <div style="font-size: 1.1rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #B8B8C8; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
            <span>{{ card_product.type | default: '3D Print' }}</span>
            <span style="color: #232334;">·</span>
            <span style="color: #00D9FF;">UK Studio</span>
          </div>

          <h3 style="margin: 0; font-size: 1.5rem; font-weight: 700; line-height: 1.3;">
            <a href="{{ card_product.url }}" style="color: #FFFFFF; text-decoration: none;">
              {{ card_product.title | escape }}
            </a>
          </h3>

          <div style="margin-top: 0.8rem; border-top: 1px solid #232334; padding-top: 0.8rem; display: flex; align-items: center; justify-content: space-between;">
            {% render 'price', product: card_product, price_class: '', show_compare_at_price: true %}
          </div>
        </div>

        <div style="margin-top: 1.2rem;">
          <form method="post" action="/cart/add">
            <input type="hidden" name="id" value="{{ card_product.selected_or_first_available_variant.id }}">
            <button
              type="submit"
              class="button button--full-width"
              style="width: 100%; background: #FFFFFF; color: #08080D; font-weight: 700; font-size: 1.2rem; border-radius: 8px; border: none; padding: 0.8rem 1.5rem; cursor: pointer;"
              onmouseover="this.style.background='#00D9FF'"
              onmouseout="this.style.background='#FFFFFF'"
            >
              QUICK ADD
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
{%- endif -%}
`
  }
];
