# fluentui-webcomponents

Vanilla Custom Elements rewrite of `@fluentui/web-components` — zero dependencies, zero build tools.

## Quick Start

```html
<script type="module" src="core/fluent-element.js"></script>
<script type="module" src="components/button/fluent-button.js"></script>
<script type="module" src="components/badge/fluent-badge.js"></script>

<fluent-button appearance="primary">Click me</fluent-button>
<fluent-badge color="danger">New</fluent-badge>
```

CSS design tokens are defined in `tokens.css`. Each component's CSS imports it via `@import` — no `<link>` needed in your page.

## Gallery

```bash
npx serve .
```

Open `http://localhost:3000/gallery.html` — a single-page showcase of all 26 components with a theme picker.

## Customization

**Accent color** (instant, no JS math):
```css
:root { --accent-base: #e3008c; }
```

The entire 16-stop brand palette derives from this single CSS variable via `color-mix(in oklch, ...)`. All component colors update automatically.

**Dark theme**:
```html
<body class="dark">
```

**Theme picker** (optional):
```html
<script type="module" src="theme/theme-picker.js"></script>
<fluent-theme-picker></fluent-theme-picker>
```

## Components

| Component | Tag |
|---|---|
| Button | `<fluent-button>` |
| Badge | `<fluent-badge>` |
| Link | `<fluent-link>` |
| Divider | `<fluent-divider>` |
| Spinner | `<fluent-spinner>` |
| Avatar | `<fluent-avatar>` |
| Checkbox | `<fluent-checkbox>` |
| Radio | `<fluent-radio>` |
| Switch | `<fluent-switch>` |
| Slider | `<fluent-slider>` |
| TextInput | `<fluent-text-input>` |
| Textarea | `<fluent-textarea>` |
| Select | `<fluent-select>` |
| Card | `<fluent-card>` |
| Label | `<fluent-label>` |
| Text | `<fluent-text>` |
| Image | `<fluent-image>` |
| Dialog | `<fluent-dialog trigger="#btn" close-on="#cancel">` |
| Tooltip | `<fluent-tooltip anchor="btn-id">` |
| Menu | `<fluent-menu>` |
| Breadcrumb | `<fluent-breadcrumb>` |
| Tree | `<fluent-tree>` |

## File Structure

```
fluentui-webcomponents/
├── tokens.css              # All design tokens (colors, spacing, type, shadows...)
├── gallery.html            # Component showcase
├── core/
│   └── fluent-element.js   # Base class (~30 lines)
├── components/
│   ├── button/
│   │   ├── fluent-button.js
│   │   └── fluent-button.css   # @import url('../../tokens.css');
│   ├── badge/
│   ├── ...
│   └── tree/
└── theme/
    └── theme-picker.js     # Optional accent/theme switcher
```

Each component is self-contained: one `.js` file (class + `customElements.define`) and one `.css` file. No bundler, no framework, no external dependencies.

## Architecture

- **`FluentElement`** — base class extends `HTMLElement`, attaches shadow DOM, injects `<link rel="stylesheet">` for the component's CSS
- **CSS-only state** — `:host([disabled])`, `:host([appearance="primary"])`, etc. Zero JS for visual updates
- **Form association** — native `this.attachInternals()` + `setFormValue` + `setValidity`
- **Design tokens** — `color-mix(in oklch, var(--accent-base), ...)` palette, CSS `var()` throughout
