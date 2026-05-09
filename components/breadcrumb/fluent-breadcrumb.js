import { FluentElement } from '../../core/fluent-element.js';

const stylesUrl = new URL('./fluent-breadcrumb.css', import.meta.url).href;

class FluentBreadcrumb extends FluentElement {
  static stylesUrl = stylesUrl;
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
