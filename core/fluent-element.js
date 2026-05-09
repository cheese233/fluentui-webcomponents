class FluentElement extends HTMLElement {
  static stylesUrl = '';
  static template = '';

  constructor() {
    super();
    this._root = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    if (this.constructor.stylesUrl) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = this.constructor.stylesUrl;
      this._root.appendChild(link);
    }

    const tmpl = document.createElement('template');
    tmpl.innerHTML = this.constructor.template;
    this._root.appendChild(tmpl.content.cloneNode(true));
  }

  static get observedAttributes() {
    return [];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal !== newVal) this.changed(name, oldVal, newVal);
  }

  changed() {}
}

export { FluentElement };
