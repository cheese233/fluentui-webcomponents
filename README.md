# fluentui-webcomponents
<img src="https://nodei.co/npm/fluentui-webcomponents.svg?style=shields&data=n,v&color=blue"/>

Vanilla Custom Elements rewrite of `@fluentui/web-components` — zero runtime dependencies.

## Quick Start

```html
<script type="module" src="gallery.bundle.js"></script>

<fluent-button appearance="primary">Click me</fluent-button>
<fluent-badge color="danger">New</fluent-badge>
```

CSS design tokens are defined in `tokens.css`. Components import their stylesheet with a standard default CSS import; configure your bundler to load `.css` as text (Rolldown: `moduleTypes: { ".css": "text" }`). `FluentElement` imports `tokens.css` itself and injects tokens plus the component styles into the shadow root. `gallery.bundle.js` is the prebuilt bundle for direct browser use; run `npm run build:gallery` after changing component sources.

## Gallery

```bash
npx serve .
```

Open `http://localhost:3000/gallery.html` — a single-page showcase of all 26 components with a theme picker.

## Customization

**Accent color** (instant, no JS math):
```css
:root { --accent-base-override: #e3008c; }
```
```js
document.documentElement.style.setProperty('--accent-base-override', '#e3008c');
```

The entire 16-stop brand palette derives from this single CSS variable via `color-mix(in srgb, ...)`. All component colors update automatically.

**Dark theme** (via `color-scheme` CSS property):
```css
:root { color-scheme: dark; }
```
```js
document.documentElement.style.colorScheme = 'dark';
```
Tokens use `light-dark(lightValue, darkValue)` — no class toggling needed.

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
├── standalone-example.html # Minimal usage (no page CSS needed)
├── core/
│   └── fluent-element.js   # Base class (~30 lines)
├── components/
│   ├── button/
│   │   ├── fluent-button.js
│   │   └── fluent-button.css   # imported as text by the bundler
│   ├── badge/
│   ├── ...
│   └── tree/
└── theme/
    └── theme-picker.js     # Optional accent/theme switcher
```

Each component is self-contained: one `.js` file (class + `customElements.define`) and one `.css` file. No framework and no external runtime dependencies; the stylesheet is loaded as text by the bundler.

## Architecture

- **`FluentElement`** — base class extends `HTMLElement`, attaches shadow DOM, injects a `<style>` containing imported tokens plus the component's CSS text
- **CSS-only state** — `:host([disabled])`, `:host([appearance="primary"])`, etc. Zero JS for visual updates
- **Form association** — native `this.attachInternals()` + `setFormValue` + `setValidity`
- **Design tokens** — `color-mix(in oklch, var(--accent-base), ...)` palette, CSS `var()` throughout
