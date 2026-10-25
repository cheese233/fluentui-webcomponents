import { FluentElement } from '../../core/fluent-element.js';

import styles from "./fluent-badge.css";

class FluentBadge extends FluentElement {
  static styles = styles;
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
