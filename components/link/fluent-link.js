import { FluentElement } from '../../core/fluent-element.js';

const stylesUrl = new URL('./fluent-link.css', import.meta.url).href;

class FluentLink extends FluentElement {
  static stylesUrl = stylesUrl;
  static template = `<div class="root"><slot></slot></div>`;

  static get observedAttributes() {
    return ['appearance', 'inline', 'href', 'target', 'rel', 'hreflang', 'ping', 'referrerpolicy', 'type', 'download'];
  }
}

customElements.define('fluent-link', FluentLink);
