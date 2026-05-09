import { FluentElement } from '../../core/fluent-element.js';

const stylesUrl = new URL('./fluent-breadcrumb-item.css', import.meta.url).href;

class FluentBreadcrumbItem extends FluentElement {
  static stylesUrl = stylesUrl;
  static template = `
    <div class="root">
      <li class="item" part="item">
        <slot name="separator">
          <span class="separator" part="separator" aria-hidden="true">
            <svg class="separator-icon" fill="currentColor" viewBox="0 0 12 12">
              <path d="M4.65 2.15a.5.5 0 000 .7L7.79 6 4.65 9.15a.5.5 0 10.7.7l3.5-3.5a.5.5 0 000-.7l-3.5-3.5a.5.5 0 00-.7 0z"/>
            </svg>
          </span>
        </slot>
        <a class="link" part="link">
          <slot></slot>
        </a>
      </li>
    </div>
  `;

  static get observedAttributes() {
    return ['href', 'current'];
  }

  connectedCallback() {
    super.connectedCallback();
    this._linkEl = this._root.querySelector('.link');
    this._syncLink();
    this._updatePosition();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeAttribute('data-position');
  }

  _updatePosition() {
    const parent = this.parentElement;
    if (!parent) return;
    const siblings = Array.from(parent.children).filter(c => c.tagName === this.tagName);
    const index = siblings.indexOf(this);
    if (index === 0) this.setAttribute('data-position', 'first');
    else if (index === siblings.length - 1) this.setAttribute('data-position', 'last');
    else this.setAttribute('data-position', 'middle');
  }

  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (name === 'href' || name === 'current') {
      this._syncLink();
    }
  }

  _syncLink() {
    if (!this._linkEl) return;
    const href = this.getAttribute('href');
    const isCurrent = this.hasAttribute('current');

    if (href && !isCurrent) {
      this._linkEl.href = href;
      this._linkEl.removeAttribute('aria-current');
      this._linkEl.removeAttribute('role');
    } else {
      this._linkEl.removeAttribute('href');
      if (isCurrent) {
        this._linkEl.setAttribute('aria-current', 'page');
      } else {
        this._linkEl.removeAttribute('aria-current');
      }
    }
  }
}

customElements.define('fluent-breadcrumb-item', FluentBreadcrumbItem);
