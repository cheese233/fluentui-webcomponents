import { FluentElement } from '../../core/fluent-element.js';

const styles = ":host { display: flex; }\r\n\r\n.root {\r\n  display: block;\r\n}\r\n\r\n.breadcrumb {\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n  align-items: center;\r\n  list-style: none;\r\n  margin: 0;\r\n  padding: 0;\r\n  gap: var(--spacingHorizontalXS);\r\n  font-size: var(--fontSizeBase300);\r\n  line-height: var(--lineHeightBase300);\r\n}\r\n\r\n:host([size='large']) .breadcrumb {\r\n  font-size: var(--fontSizeBase400);\r\n  line-height: var(--lineHeightBase400);\r\n}\r\n\r\n:host([size='small']) .breadcrumb {\r\n  font-size: var(--fontSizeBase200);\r\n  line-height: var(--lineHeightBase200);\r\n}\r\n";

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
