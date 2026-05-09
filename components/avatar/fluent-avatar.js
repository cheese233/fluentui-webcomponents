import { FluentElement } from '../../core/fluent-element.js';

const stylesUrl = new URL('./fluent-avatar.css', import.meta.url).href;

class FluentAvatar extends FluentElement {
  static stylesUrl = stylesUrl;
  static template = `
    <div class="root">
      <slot class="default-slot"></slot>
      <span class="monogram" part="monogram"></span>
      <svg width="1em" height="1em" viewBox="0 0 20 20" class="default-icon" fill="currentcolor" aria-hidden="true">
        <path d="M10 2a4 4 0 100 8 4 4 0 000-8zM7 6a3 3 0 116 0 3 3 0 01-6 0zm-2 5a2 2 0 00-2 2c0 1.7.83 2.97 2.13 3.8A9.14 9.14 0 0010 18c1.85 0 3.58-.39 4.87-1.2A4.35 4.35 0 0017 13a2 2 0 00-2-2H5zm-1 2a1 1 0 011-1h10a1 1 0 011 1c0 1.3-.62 2.28-1.67 2.95A8.16 8.16 0 0110 17a8.16 8.16 0 01-4.33-1.05A3.36 3.36 0 014 13z"></path>
      </svg>
      <slot name="badge"></slot>
    </div>
  `;

  static get observedAttributes() {
    return ['name', 'initials', 'active', 'shape', 'appearance', 'size', 'color', 'color-id'];
  }

  connectedCallback() {
    super.connectedCallback();
    this._updateMonogram();
    this._updateAriaLabel();
  }

  changed(name, oldVal, newVal) {
    if (name === 'initials' || name === 'name') {
      this._updateMonogram();
      this._updateAriaLabel();
    }
    if (name === 'active') {
      this._root.querySelector('.monogram')?.classList.toggle('active', this.hasAttribute('active'));
    }
    if (name === 'color' || name === 'color-id') {
      this._updateColor();
    }
  }

  _updateMonogram() {
    const monogram = this._root.querySelector('.monogram');
    if (!monogram) return;
    const initials = this.getAttribute('initials');
    if (initials) {
      monogram.textContent = initials;
      return;
    }
    const name = this.getAttribute('name');
    if (name) {
      const parts = name.split(/\s+/).filter(Boolean);
      const text = parts.length === 1
        ? parts[0].charAt(0)
        : parts[0].charAt(0) + parts[parts.length - 1].charAt(0);
      monogram.textContent = text.toUpperCase();
      return;
    }
    monogram.textContent = '';
  }

  _updateAriaLabel() {
    const name = this.getAttribute('name');
    if (name) {
      this.setAttribute('aria-label', name);
      this.setAttribute('role', 'img');
    }
  }

  _updateColor() {
    const color = this.getAttribute('color');
    const colorId = this.getAttribute('color-id');
    if (color === 'colorful' && colorId) {
      this.setAttribute('data-color', colorId);
    } else if (color && color !== 'colorful') {
      this.setAttribute('data-color', color);
    }
  }
}

customElements.define('fluent-avatar', FluentAvatar);
