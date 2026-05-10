import { FluentElement } from '../../core/fluent-element.js';

const stylesUrl = new URL('./fluent-link.css', import.meta.url).href;

class FluentLink extends FluentElement {
  static stylesUrl = stylesUrl;
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
