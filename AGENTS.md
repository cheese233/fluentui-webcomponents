# Fluent UI Web Components — Agent Instructions

**These instructions are the source of truth.** All contributions must follow these principles.

## Critical Rules (never violate)

1. **Zero external dependencies.** No `@microsoft/fast-element`, no `@fluentui/tokens`, no Lit, no frameworks. Vanilla `HTMLElement` only.
2. **No build tools.** Plain `.js` + `.css` files. Native ES modules (`import`/`export`). No bundler, no TypeScript compiler, no CSS preprocessor.
3. **Design tokens are CSS custom properties.** All colors, spacing, typography, radii, shadows, durations, and curves are defined in `tokens.css` and referenced via `var(--tokenName)`. Never hardcode a value.
4. **`color-mix(in srgb, ...)` for palette derivation.** The 16-stop brand/neutral palettes derive from a single `--accent-base` / `--neutral-base` CSS variable using the `@microsoft/fast-colors` ColorPalette algorithm (trim-and-rescale with RGB interpolation). No JS color math, no lookup tables.
5. **Component CSS imports tokens.** Every `fluent-xxx.css` starts with `@import url('../../tokens.css');`. Browsers deduplicate by URL.

## Component Pattern

### JS Template

```js
import { FluentElement } from '../../core/fluent-element.js';

const stylesUrl = new URL('./fluent-xxx.css', import.meta.url).href;

class FluentXxx extends FluentElement {
  static stylesUrl = stylesUrl;
  static template = `
    <div class="root">
      <!-- shadow DOM content here -->
      <slot></slot>
    </div>
  `;

  static get observedAttributes() {
    return ['disabled', 'appearance', 'size', 'shape'];
  }
}

customElements.define('fluent-xxx', FluentXxx);
```

### CSS Template

```css
@import url('../../tokens.css');

:host {
  display: inline-flex;  /* host stays in layout tree for pointer events */
}

.root {
  /* ALL visual styles go here — colors, spacing, borders, shadows, fonts */
  background: var(--colorBrandBackground);
  padding: 0 var(--spacingHorizontalM);
  border-radius: var(--borderRadiusMedium);
}

/* State via host attributes targeting .root */
:host([disabled]) .root { opacity: 0.5; cursor: not-allowed; }
:host([appearance='primary']) .root { background: var(--colorBrandBackground); }

/* Pseudo-classes on .root */
.root:hover { background: var(--colorBrandBackgroundHover); }
.root:focus-visible { outline: 2px solid var(--colorStrokeFocus2); }
```

### Key Patterns

| Concern | Where | Why |
|---|---|---|
| Visual styles | `.root` div | Isolated from page CSS — page's `* { padding: 0 }` can't reach it |
| Layout / display | `:host` | Host must stay in layout tree for pointer events, `getBoundingClientRect()`, and CSS anchor positioning |
| State selectors | `:host([attr]) .root` | Host carries the attribute, `.root` receives the visual change |
| Slotted content | `::slotted(...)` | Stays as-is, no `.root` prefix needed |

### `FluentElement` Base Class

```js
// core/fluent-element.js — ~30 lines
class FluentElement extends HTMLElement {
  static stylesUrl = '';
  static template = '';

  constructor() {
    super();
    this._root = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    if (this.constructor.stylesUrl) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = this.constructor.stylesUrl;
      this._root.appendChild(link);
    }
    const tmpl = document.createElement('template');
    tmpl.innerHTML = this.constructor.template;
    this._root.appendChild(tmpl.content.cloneNode(true));
  }

  static get observedAttributes() { return []; }
  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal !== newVal) this.changed(name, oldVal, newVal);
  }
  changed() {}
}
```

## Design Tokens

### Palette Derivation

```
--accent-base (#0f6cbd)
  → trim endpoints (ColorPalette: clipLight=0.185, clipDark=0.16, RGB interp)
  → 16-stop ramp from trimDark through baseColor to trimLight
  → --brand-10 … --brand-160

--neutral-base (#808080)
  → same algorithm, trim endpoints
  → --neutral-10 … --neutral-160

Dark mode: clipLight=0 → trimLight = pure white (maximum contrast text)
```

Semantic tokens alias these stops:
```
--colorBrandBackground → --brand-80
--colorBrandBackgroundHover → --brand-70
--colorBrandBackgroundPressed → --brand-40
```

### Runtime Accent Change

```js
document.documentElement.style.setProperty('--accent-base', '#e3008c');
```

One line. Entire palette and all dependent tokens update instantly. Zero JS math.

### Theme Switching

```css
:root.dark { --accent-base: #479ef5; --neutral-base: #b0b0b0; }
body.dark { /* overrides for dark theme tokens */ }
```

## Form Association

```js
class FluentCheckbox extends FluentElement {
  static formAssociated = true;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  // Never pass empty second arg to setValidity when flags are truthy
  _setValidity() {
    const msg = this.validationMessage;
    this._internals.setValidity(
      { valueMissing: this.required && !this._checked },
      msg || undefined
    );
  }
}
```

## Component-Specific Exception Rules

### Dialog
- Host uses `:host { display: none; }` / `:host([open]) { display: block; }` for show/hide
- `trigger` and `close-on` attributes for declarative open/close wiring
- Uses native `<dialog>` element inside shadow DOM

### Tooltip / Popover
- Uses Popover API: `popover="manual"`, `showPopover()` / `hidePopover()`
- `inset-area` / `position-area` MUST stay on `:host`, not on `.root`
- JS sets `anchor-name` on the anchor element and `position-anchor` on the tooltip host

### Slider
- CSS custom properties (`--slider-thumb`, `--slider-progress`, `--step-rate`) set on `.root` via inline style to override CSS defaults
- Pointer event handlers bound once in constructor (`this._boundMove = this._handlePointerMove.bind(this)`) — never use `.bind()` in addEventListener arguments

## File Structure

```
fluentui-webcomponents/
├── tokens.css                    # All design tokens
├── gallery.html                  # Single-page component showcase
├── core/
│   └── fluent-element.js         # HTMLElement base class
├── components/
│   ├── button/   fluent-button.js + .css
│   ├── badge/    fluent-badge.js + .css
│   ├── checkbox/ fluent-checkbox.js + .css
│   ├── ...       (26 components total)
│   └── tree/     fluent-tree.js + .css
└── theme/
    └── theme-picker.js           # Accent color + theme switcher
```

## Quality Checklist

- [ ] Zero console errors in gallery
- [ ] Component has both `.js` and `.css` files
- [ ] CSS starts with `@import url('../../tokens.css');`
- [ ] Template wrapped in `<div class="root">...</div>`
- [ ] Visual styles on `.root`, not on `:host`
- [ ] No hardcoded colors/spacing/typography — all `var(--tokenName)`
- [ ] `:host` has a display mode (not `display: contents`)
- [ ] Form components use `static formAssociated = true` + `attachInternals()`
- [ ] `setValidity()` never passes empty second arg with truthy flags
- [ ] Event handlers (if any) bound once in constructor, not each call
