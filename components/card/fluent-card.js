import { FluentElement } from '../../core/fluent-element.js';

import styles from "./fluent-card.css";

class FluentCard extends FluentElement {
  static styles = styles;
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
