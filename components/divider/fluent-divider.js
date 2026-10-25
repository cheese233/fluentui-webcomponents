import { FluentElement } from '../../core/fluent-element.js';

import styles from "./fluent-divider.css";

class FluentDivider extends FluentElement {
  static styles = styles;
  static template = `<div class="root"><slot></slot></div>`;

  static get observedAttributes() {
    return ['role', 'orientation', 'align-content', 'appearance', 'inset'];
  }
}

customElements.define('fluent-divider', FluentDivider);
