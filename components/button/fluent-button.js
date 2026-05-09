import { FluentElement } from '../../core/fluent-element.js';

const stylesUrl = new URL('./fluent-button.css', import.meta.url).href;

class FluentButton extends FluentElement {
  static stylesUrl = stylesUrl;
  static template = `
    <div class="root">
      <span class="content" part="content">
        <slot name="start"></slot>
        <slot></slot>
        <slot name="end"></slot>
      </span>
    </div>
  `;

  static get observedAttributes() {
    return ['disabled', 'appearance', 'shape', 'size', 'icon-only', 'disabled-focusable', 'autofocus'];
  }
}

customElements.define('fluent-button', FluentButton);
