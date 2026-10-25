import tokens from "../tokens.css";

class FluentElement extends HTMLElement {
  static styles = "";
  static template = "";

  constructor() {
    super();
    this._root = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (this.constructor.styles) {
      const style = document.createElement("style");
      style.textContent = tokens + this.constructor.styles;
      this._root.appendChild(style);
    }

    const tmpl = document.createElement("template");
    tmpl.innerHTML = this.constructor.template;
    this._root.appendChild(tmpl.content.cloneNode(true));
  }

  disconnectedCallback() {}

  static get observedAttributes() {
    return [];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal !== newVal) this.changed(name, oldVal, newVal);
  }

  changed() {}
}

export { FluentElement };