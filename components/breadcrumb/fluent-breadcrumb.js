import { FluentElement } from '../../core/fluent-element.js';

import styles from "./fluent-breadcrumb.css";

class FluentBreadcrumb extends FluentElement {
  static styles = styles;
  static template = `
    <div class="root">
      <ol class="breadcrumb" part="breadcrumb">
        <slot></slot>
      </ol>
    </div>
  `;

  static get observedAttributes() {
    return ['size', 'appearance'];
  }

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  connectedCallback() {
    super.connectedCallback();
    this._internals.role = 'navigation';
    if (!this.hasAttribute('aria-label')) {
      this._internals.ariaLabel = 'Breadcrumb';
    }
  }
}

customElements.define('fluent-breadcrumb', FluentBreadcrumb);
