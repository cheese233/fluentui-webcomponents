import { FluentElement } from '../../core/fluent-element.js';

const stylesUrl = new URL('./fluent-image.css', import.meta.url).href;

class FluentImage extends FluentElement {
  static stylesUrl = stylesUrl;
  static template = `<div class="root"><slot></slot></div>`;

  static formAssociated = true;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  static get observedAttributes() {
    return ['src', 'alt', 'fit', 'shape', 'block', 'bordered', 'shadow'];
  }

  connectedCallback() {
    super.connectedCallback();
    const img = this.querySelector('img');
    if (!img) {
      const src = this.getAttribute('src');
      const alt = this.getAttribute('alt') || '';
      if (src) {
        const newImg = document.createElement('img');
        newImg.src = src;
        newImg.alt = alt;
        this.appendChild(newImg);
      }
    }
  }
}

customElements.define('fluent-image', FluentImage);
