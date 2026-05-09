import { FluentElement } from '../../core/fluent-element.js';

const stylesUrl = new URL('./fluent-card.css', import.meta.url).href;

class FluentCard extends FluentElement {
  static stylesUrl = stylesUrl;
  static template = `
    <div class="root">
      <slot name="preview"></slot>
      <slot name="header"></slot>
      <slot></slot>
      <slot name="footer"></slot>
    </div>
  `;

  static get observedAttributes() {
    return ['appearance', 'size'];
  }
}

customElements.define('fluent-card', FluentCard);
