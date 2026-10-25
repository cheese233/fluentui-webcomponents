import { FluentElement } from '../../core/fluent-element.js';

const styles = ":host { display: flex; }\r\n\r\n.root {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: var(--spacingHorizontalXS);\r\n}\r\n\r\n.item {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: var(--spacingHorizontalXS);\r\n    list-style: none;\r\n}\r\n\r\n.link {\r\n    color: var(--colorNeutralForeground2);\r\n    text-decoration: none;\r\n    border-radius: var(--borderRadiusMedium);\r\n    padding: var(--spacingVerticalXXS) var(--spacingHorizontalXS);\r\n    transition:\r\n        color var(--durationFaster) var(--curveEasyEaseMax),\r\n        background var(--durationFaster) var(--curveEasyEaseMax);\r\n}\r\n\r\n.link:hover {\r\n    color: var(--colorNeutralForeground2Hover);\r\n    background: var(--colorSubtleBackgroundHover);\r\n}\r\n\r\n.link:active {\r\n    color: var(--colorNeutralForeground2Pressed);\r\n    background: var(--colorSubtleBackgroundPressed);\r\n}\r\n\r\n:host([current]) .link {\r\n    color: var(--colorNeutralForeground1);\r\n    font-weight: var(--fontWeightSemibold);\r\n    pointer-events: none;\r\n}\r\n\r\n:host([appearance=\"subtle\"]) .link:hover {\r\n    background: var(--colorSubtleBackgroundHover);\r\n}\r\n\r\n.separator {\r\n    display: flex;\r\n    align-items: center;\r\n    color: var(--colorNeutralForeground3);\r\n    flex-shrink: 0;\r\n}\r\n\r\n.separator-icon {\r\n    inline-size: 12px;\r\n    block-size: 12px;\r\n}\r\n\r\n:host(:first-child) .separator,\r\n:host([data-position=\"first\"]) .separator {\r\n    display: none;\r\n}\r\n\r\n@media (forced-colors: active) {\r\n    .link:hover {\r\n        background: Highlight;\r\n        color: HighlightText;\r\n    }\r\n}\r\n";

class FluentBreadcrumbItem extends FluentElement {
  static styles = styles;
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
