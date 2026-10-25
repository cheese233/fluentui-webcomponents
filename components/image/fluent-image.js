import { FluentElement } from '../../core/fluent-element.js';

const styles = ":host { display: inline-block; }\r\n\r\n.root {\r\n  display: inline-block;\r\n}\r\n\r\n:host([block]) .root {\r\n  display: block;\r\n}\r\n\r\n:host ::slotted(img) {\r\n  box-sizing: border-box;\r\n  min-height: 8px;\r\n  min-width: 8px;\r\n  display: inline-block;\r\n}\r\n\r\n:host([block]) ::slotted(img) {\r\n  width: 100%;\r\n  height: auto;\r\n}\r\n\r\n:host([bordered]) ::slotted(img) {\r\n  border: var(--strokeWidthThin) solid var(--colorNeutralStroke2);\r\n}\r\n\r\n:host([fit='none']) ::slotted(img) {\r\n  object-fit: none;\r\n  object-position: top left;\r\n  height: 100%;\r\n  width: 100%;\r\n}\r\n\r\n:host([fit='center']) ::slotted(img) {\r\n  object-fit: none;\r\n  object-position: center;\r\n  height: 100%;\r\n  width: 100%;\r\n}\r\n\r\n:host([fit='contain']) ::slotted(img) {\r\n  object-fit: contain;\r\n  object-position: center;\r\n  height: 100%;\r\n  width: 100%;\r\n}\r\n\r\n:host([fit='cover']) ::slotted(img) {\r\n  object-fit: cover;\r\n  object-position: center;\r\n  height: 100%;\r\n  width: 100%;\r\n}\r\n\r\n:host([shadow]) ::slotted(img) {\r\n  box-shadow: var(--shadow4);\r\n}\r\n\r\n:host([shape='circular']) ::slotted(img) {\r\n  border-radius: var(--borderRadiusCircular);\r\n}\r\n\r\n:host([shape='rounded']) ::slotted(img) {\r\n  border-radius: var(--borderRadiusMedium);\r\n}\r\n\r\n@media (forced-colors: active) {\r\n  :host([bordered]) ::slotted(img) {\r\n    border-color: ButtonText;\r\n  }\r\n}\r\n";

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
