import { FluentElement } from '../../core/fluent-element.js';

const styles = ":host { display: inline; }\r\n\r\n:host([hidden]) .root {\r\n  display: none;\r\n}\r\n\r\n.root {\r\n  display: inline;\r\n  box-sizing: border-box;\r\n  background-color: transparent;\r\n  color: var(--colorBrandForegroundLink);\r\n  cursor: pointer;\r\n  font-family: var(--fontFamilyBase);\r\n  font-size: var(--fontSizeBase300);\r\n  font-weight: var(--fontWeightRegular);\r\n  text-align: start;\r\n  text-decoration: none;\r\n  text-decoration-thickness: var(--strokeWidthThin);\r\n  user-select: text;\r\n}\r\n\r\n.root:is(:hover, :focus-visible) {\r\n  outline: none;\r\n  text-decoration-line: underline;\r\n}\r\n\r\n@media (hover: hover) {\r\n  .root:hover {\r\n    color: var(--colorBrandForegroundLinkHover);\r\n  }\r\n\r\n  .root:active {\r\n    color: var(--colorBrandForegroundLinkPressed);\r\n  }\r\n\r\n  :host([appearance='subtle']) .root:hover {\r\n    color: var(--colorNeutralForeground2LinkHover);\r\n  }\r\n\r\n  :host([appearance='subtle']) .root:active {\r\n    color: var(--colorNeutralForeground2LinkPressed);\r\n  }\r\n}\r\n\r\n:host([appearance='subtle']) .root {\r\n  color: var(--colorNeutralForeground2Link);\r\n}\r\n\r\n:host-context(:is(h1, h2, h3, h4, h5, h6, p, fluent-text)),\r\n:host([inline]) .root {\r\n  font: inherit;\r\n  text-decoration: underline;\r\n}\r\n\r\n:host(:not([href])) .root {\r\n  color: inherit;\r\n  text-decoration: none;\r\n  pointer-events: none;\r\n}\r\n\r\n:host([disabled]) .root {\r\n  color: var(--colorNeutralForegroundDisabled);\r\n  text-decoration: none;\r\n}\r\n\r\n@media (forced-colors: active) {\r\n  .root {\r\n    color: LinkText;\r\n  }\r\n}\r\n";

class FluentLink extends FluentElement {
  static styles = styles;
  static template = `<a class="root"><slot></slot></a>`;

  static get observedAttributes() {
    return ['appearance', 'inline', 'disabled', 'href', 'target', 'rel', 'hreflang', 'ping', 'referrerpolicy', 'type', 'download'];
  }

  constructor() {
    super();
    this._boundClick = this._handleClick.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this._root.addEventListener('click', this._boundClick);
    const anchor = this._root.querySelector('.root');
    if (anchor) {
      this._syncAllAttrs(anchor);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._root.removeEventListener('click', this._boundClick);
  }

  changed(name, oldVal, newVal) {
    const anchor = this._root.querySelector('.root');
    if (!anchor) return;

    switch (name) {
      case 'href':
        anchor.href = newVal || '';
        break;
      case 'target':
        anchor.target = newVal || '';
        break;
      case 'rel':
        anchor.rel = newVal || '';
        break;
      case 'hreflang':
        anchor.hreflang = newVal || '';
        break;
      case 'ping':
        anchor.ping = newVal || '';
        break;
      case 'referrerpolicy':
        anchor.referrerPolicy = newVal || '';
        break;
      case 'type':
        anchor.type = newVal || '';
        break;
      case 'download':
        anchor.download = newVal || '';
        break;
      case 'disabled':
        if (newVal !== null) {
          anchor.removeAttribute('href');
          anchor.style.pointerEvents = 'none';
          anchor.style.cursor = 'default';
        } else {
          const href = this.getAttribute('href');
          if (href) anchor.href = href;
          anchor.style.pointerEvents = '';
          anchor.style.cursor = '';
        }
        break;
    }
  }

  _syncAllAttrs(anchor) {
    const href = this.getAttribute('href');
    if (href) anchor.href = href;
    const target = this.getAttribute('target');
    if (target) anchor.target = target;
    const rel = this.getAttribute('rel');
    if (rel) anchor.rel = rel;
    const hreflang = this.getAttribute('hreflang');
    if (hreflang) anchor.hreflang = hreflang;
    const ping = this.getAttribute('ping');
    if (ping) anchor.ping = ping;
    const referrerpolicy = this.getAttribute('referrerpolicy');
    if (referrerpolicy) anchor.referrerPolicy = referrerpolicy;
    const type = this.getAttribute('type');
    if (type) anchor.type = type;
    const download = this.getAttribute('download');
    if (download) anchor.download = download;
    if (this.hasAttribute('disabled')) {
      anchor.removeAttribute('href');
      anchor.style.pointerEvents = 'none';
      anchor.style.cursor = 'default';
    }
  }

  _handleClick(e) {
    if (this.hasAttribute('disabled')) {
      e.preventDefault();
      e.stopImmediatePropagation();
      return;
    }
  }
}

customElements.define('fluent-link', FluentLink);
