import { FluentElement } from '../../core/fluent-element.js';

import styles from "./fluent-image.css";

class FluentImage extends FluentElement {
  static styles = styles;
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
