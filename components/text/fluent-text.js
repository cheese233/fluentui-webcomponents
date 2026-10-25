import { FluentElement } from '../../core/fluent-element.js';

import styles from "./fluent-text.css";

class FluentText extends FluentElement {
  static styles = styles;
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
