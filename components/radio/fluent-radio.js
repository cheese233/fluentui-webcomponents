import { FluentElement } from '../../core/fluent-element.js';

const stylesUrl = new URL('./fluent-radio.css', import.meta.url).href;

class FluentRadio extends FluentElement {
  static stylesUrl = stylesUrl;
  static formAssociated = true;

  static template = `
    <div class="root">
      <slot name="checked-indicator">
        <span part="checked-indicator" class="checked-indicator" role="presentation"></span>
      </slot>
    </div>
  `;

  static get observedAttributes() {
    return ['checked', 'disabled', 'required', 'value', 'name'];
  }

  constructor() {
    super();
    this._internals = this.attachInternals();
    this._internals.role = 'radio';
    this._checked = false;
    this._dirtyChecked = false;
    this._keydownPressed = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this._updateDisabled();
    this._setAriaChecked();
    this.addEventListener('click', this._clickHandler.bind(this));
    this.addEventListener('keydown', this._keydownHandler.bind(this));
    this.addEventListener('keyup', this._keyupHandler.bind(this));
  }

  changed(name, oldVal, newVal) {
    switch (name) {
      case 'checked':
        if (!this._dirtyChecked) {
          this._checked = newVal !== null;
          this._setAriaChecked();
          if (this._checked) {
            this._uncheckSiblings();
          }
        }
        break;
      case 'disabled':
        this._updateDisabled();
        this.dispatchEvent(new Event('disabled', { bubbles: true }));
        break;
      case 'required':
        break;
      case 'value':
        this._value = newVal || 'on';
        break;
      case 'name':
        break;
    }
  }

  get checked() {
    return this._checked;
  }

  set checked(val) {
    this._checked = !!val;
    this._setAriaChecked();
    if (this._checked) {
      this.setAttribute('checked', '');
      this._uncheckSiblings();
    } else {
      this.removeAttribute('checked');
    }
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(val) {
    if (val) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  get required() {
    return this.hasAttribute('required');
  }

  get value() {
    return this._value || 'on';
  }

  set value(val) {
    this._value = val;
  }

  get name() {
    return this.getAttribute('name') || '';
  }

  get form() {
    return this._internals.form;
  }

  get labels() {
    return Object.freeze(Array.from(this._internals.labels));
  }

  get validity() {
    return this._internals.validity;
  }

  get validationMessage() {
    return this._internals.validationMessage;
  }

  get willValidate() {
    return this._internals.willValidate;
  }

  toggleChecked(force) {
    this._checked = typeof force === 'boolean' ? force : true;
    this._dirtyChecked = true;
    this._setAriaChecked();
    if (this._checked) {
      this.setAttribute('checked', '');
      this._uncheckSiblings();
    } else {
      this.removeAttribute('checked');
    }
  }

  checkValidity() {
    return this._internals.checkValidity();
  }

  reportValidity() {
    return this._internals.reportValidity();
  }

  setCustomValidity(message) {
    this._internals.setValidity({ customError: !!message }, message);
    this._setValidity();
  }

  _clickHandler(e) {
    if (this.disabled || this._checked) return;
    this._dirtyChecked = true;
    this.toggleChecked(true);
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
  }

  _keydownHandler(e) {
    if (e.key === ' ') {
      e.preventDefault();
      this._keydownPressed = true;
    }
  }

  _keyupHandler(e) {
    if (!this._keydownPressed || e.key !== ' ') return;
    this._keydownPressed = false;
    this.click();
  }

  _updateDisabled() {
    const d = this.hasAttribute('disabled');
    if (d) {
      this.removeAttribute('tabindex');
    } else {
      const t = this.getAttribute('tabindex');
      this.tabIndex = Number(t ?? 0) < 0 ? -1 : 0;
    }
    this._internals.ariaDisabled = d ? 'true' : 'false';
  }

  _setAriaChecked() {
    this._internals.ariaChecked = this._checked ? 'true' : 'false';
  }

  _setValidity() {
    this._internals.setValidity({});
  }

  _uncheckSiblings() {
    if (!this.name) return;
    const root = this.getRootNode();
    const radios = root.querySelectorAll(`fluent-radio[name="${this.name}"]`);
    radios.forEach(radio => {
      if (radio !== this && radio._checked) {
        radio._checked = false;
        radio._setAriaChecked();
        radio.removeAttribute('checked');
        radio._setFormValue(null);
      }
    });
  }

  _setFormValue(value) {
    this._internals.setFormValue(value, value);
  }

  formResetCallback() {
    this._checked = this.hasAttribute('checked');
    this._dirtyChecked = false;
    this._setAriaChecked();
    this._setValidity();
  }
}

customElements.define('fluent-radio', FluentRadio);
