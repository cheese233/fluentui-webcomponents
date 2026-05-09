import { FluentElement } from '../../core/fluent-element.js';

const stylesUrl = new URL('./fluent-text.css', import.meta.url).href;

class FluentText extends FluentElement {
  static stylesUrl = stylesUrl;
  static template = `<div class="root"><slot></slot></div>`;

  static formAssociated = true;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  static get observedAttributes() {
    return ['size', 'weight', 'font', 'align', 'nowrap', 'truncate', 'italic', 'underline', 'strikethrough', 'block'];
  }
}

customElements.define('fluent-text', FluentText);
