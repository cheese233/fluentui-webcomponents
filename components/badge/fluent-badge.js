import { FluentElement } from '../../core/fluent-element.js';

const stylesUrl = new URL('./fluent-badge.css', import.meta.url).href;

class FluentBadge extends FluentElement {
  static stylesUrl = stylesUrl;
  static template = `
    <div class="root">
      <slot name="start"></slot>
      <slot></slot>
      <slot name="end"></slot>
    </div>
  `;

  static get observedAttributes() {
    return ['appearance', 'color', 'shape', 'size'];
  }
}

customElements.define('fluent-badge', FluentBadge);
