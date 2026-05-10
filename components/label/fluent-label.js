import { FluentElement } from '../../core/fluent-element.js';

const stylesUrl = new URL('./fluent-label.css', import.meta.url).href;

class FluentLabel extends FluentElement {
  static stylesUrl = stylesUrl;
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
