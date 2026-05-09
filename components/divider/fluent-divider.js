import { FluentElement } from '../../core/fluent-element.js';

const stylesUrl = new URL('./fluent-divider.css', import.meta.url).href;

class FluentDivider extends FluentElement {
  static stylesUrl = stylesUrl;
  static template = `<div class="root"><slot></slot></div>`;

  static get observedAttributes() {
    return ['role', 'orientation', 'align-content', 'appearance', 'inset'];
  }
}

customElements.define('fluent-divider', FluentDivider);
