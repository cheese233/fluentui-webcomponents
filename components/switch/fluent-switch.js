import { FluentElement } from '../../core/fluent-element.js';

const stylesUrl = new URL('./fluent-switch.css', import.meta.url).href;

class FluentSwitch extends FluentElement {
  static stylesUrl = stylesUrl;
  static formAssociated = true;

  static template = `
    <div class="root">
      <slot name="switch">
        <span class="checked-indicator" part="checked-indicator"></span>
      </slot>
    </div>
  `;

  static get observedAttributes() {
    return ['checked', 'disabled', 'required', 'value', 'name', 'label-position'];
  }

  constructor() {
    super();
    this._internals = this.attachInternals();
    this._internals.role = 'switch';
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
        }
        break;
      case 'disabled':
        this._updateDisabled();
        break;
      case 'required':
        this._setValidity();
        break;
      case 'value':
        this._value = newVal || 'on';
        break;
      case 'name':
      case 'label-position':
        break;
    }
  }

  get checked() {
    return this._checked;
  }

  set checked(val) {
    this._checked = !!val;
    this._setAriaChecked();
    this._setFormValue(this._checked ? this._value : null);
    this._setValidity();
    if (this._checked) {
      this.setAttribute('checked', '');
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
    if (this._checked) {
      this._setFormValue(val);
    }
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
    if (this._internals.validationMessage) {
      return this._internals.validationMessage;
    }
    if (!this._validationFallbackMessage) {
      const el = document.createElement('input');
      el.type = 'checkbox';
      el.required = true;
      el.checked = false;
      this._validationFallbackMessage = el.validationMessage;
    }
    return this._validationFallbackMessage;
  }

  get willValidate() {
    return this._internals.willValidate;
  }

  toggleChecked(force) {
    this._checked = typeof force === 'boolean' ? force : !this._checked;
    this._dirtyChecked = true;
    this._setAriaChecked();
    this._setFormValue(this._checked ? this._value : null);
    this._setValidity();
    if (this._checked) {
      this.setAttribute('checked', '');
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
    if (this.disabled) return;
    this._dirtyChecked = true;
    const prev = this._checked;
    this.toggleChecked();
    if (prev !== this._checked) {
      this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
      this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    }
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

  _setFormValue(value) {
    this._internals.setFormValue(value, value);
  }

  _setValidity() {
    if (this.disabled || !this.required) {
      this._internals.setValidity({});
      return;
    }
    const msg = this.validationMessage;
    this._internals.setValidity(
      { valueMissing: !!this.required && !this._checked },
      msg || undefined
    );
  }

  formResetCallback() {
    this._checked = this.hasAttribute('checked');
    this._dirtyChecked = false;
    this._setAriaChecked();
    this._setValidity();
  }
}

customElements.define('fluent-switch', FluentSwitch);
