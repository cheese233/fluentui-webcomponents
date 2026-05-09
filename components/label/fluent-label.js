import { FluentElement } from '../../core/fluent-element.js';

const stylesUrl = new URL('./fluent-label.css', import.meta.url).href;

class FluentLabel extends FluentElement {
  static stylesUrl = stylesUrl;
  static template = `
    <div class="root">
      <slot></slot>
      <span class="asterisk" part="asterisk" aria-hidden="true">*</span>
    </div>
  `;

  static get observedAttributes() {
    return ['disabled', 'required', 'size', 'weight'];
  }
}

customElements.define('fluent-label', FluentLabel);
