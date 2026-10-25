import { FluentElement } from '../../core/fluent-element.js';

const styles = ":host { display: inline-flex; }\r\n\r\n.root {\r\n  display: inline-flex;\r\n  color: var(--colorNeutralForeground1);\r\n  cursor: pointer;\r\n  font-family: var(--fontFamilyBase);\r\n  font-size: var(--fontSizeBase300);\r\n  font-weight: var(--fontWeightRegular);\r\n  line-height: var(--lineHeightBase300);\r\n  user-select: none;\r\n}\r\n\r\n.asterisk {\r\n  color: var(--colorPaletteRedForeground1);\r\n  margin-inline-start: var(--spacingHorizontalXS);\r\n}\r\n\r\n:host(:not([required])) .root .asterisk {\r\n  display: none;\r\n}\r\n\r\n:host([size='small']) .root {\r\n  font-size: var(--fontSizeBase200);\r\n  line-height: var(--lineHeightBase200);\r\n}\r\n\r\n:host([size='large']) .root {\r\n  font-size: var(--fontSizeBase400);\r\n  line-height: var(--lineHeightBase400);\r\n}\r\n\r\n:host(:is([size='large'], [weight='semibold'])) .root {\r\n  font-weight: var(--fontWeightSemibold);\r\n}\r\n\r\n:host([disabled]) .root,\r\n:host([disabled]) .root .asterisk {\r\n  color: var(--colorNeutralForegroundDisabled);\r\n}\r\n\r\n@media (forced-colors: active) {\r\n  :host([disabled]) .root,\r\n  :host([disabled]) .root .asterisk {\r\n    color: GrayText;\r\n  }\r\n}\r\n";

class FluentLabel extends FluentElement {
  static styles = styles;
  static template = `
    <label class="root">
      <slot></slot>
      <span class="asterisk" part="asterisk" aria-hidden="true">*</span>
    </label>
  `;

  static get observedAttributes() {
    return ['disabled', 'required', 'size', 'weight', 'for'];
  }

  connectedCallback() {
    super.connectedCallback();
    requestAnimationFrame(() => {
      this._updateFor();
      this._updateRequired();
    });
  }

  changed(name, oldVal, newVal) {
    switch (name) {
      case 'for':
        this._updateFor();
        break;
      case 'required':
        this._updateRequired();
        break;
      case 'disabled':
      case 'size':
      case 'weight':
        break;
    }
  }

  _updateFor() {
    const label = this._root?.querySelector('.root');
    if (!label) return;
    const forAttr = this.getAttribute('for');
    if (forAttr) {
      label.setAttribute('for', forAttr);
    } else {
      label.removeAttribute('for');
    }
  }

  _updateRequired() {
    const label = this._root?.querySelector('.root');
    if (!label) return;
    const asterisk = label.querySelector('.asterisk');
    if (!asterisk) return;
    asterisk.style.display = this.hasAttribute('required') ? 'inline' : 'none';
  }
}

customElements.define('fluent-label', FluentLabel);
