import { FluentElement } from '../../core/fluent-element.js';

const stylesUrl = new URL('./fluent-checkbox.css', import.meta.url).href;

class FluentCheckbox extends FluentElement {
  static stylesUrl = stylesUrl;
  static formAssociated = true;

  static template = `
    <div class="root">
      <slot name="checked-indicator">
        <svg fill="currentColor" aria-hidden="true" class="checked-indicator" width="1em" height="1em" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.76 3.2c.3.29.32.76.04 1.06l-4.25 4.5a.75.75 0 0 1-1.08.02L2.22 6.53a.75.75 0 0 1 1.06-1.06l1.7 1.7L8.7 3.24a.75.75 0 0 1 1.06-.04Z" fill="currentColor"></path>
        </svg>
      </slot>
      <slot name="indeterminate-indicator">
        <span class="indeterminate-indicator"></span>
      </slot>
    </div>
  `;

  static get observedAttributes() {
    return ['checked', 'disabled', 'required', 'value', 'name', 'size', 'shape', 'autofocus', 'indeterminate'];
  }

  constructor() {
    super();
    this._internals = this.attachInternals();
    this._internals.role = 'checkbox';
    this._checked = false;
    this._dirtyChecked = false;
    this._keydownPressed = false;
    this._indeterminate = false;
    this._value = 'on';
    this._name = '';
    this._size = 'medium';
    this._shape = 'square';
  }

  connectedCallback() {
    super.connectedCallback();
    this._shadowRoot = this._root;
    this._updateDisabled();
    this._setAriaChecked();
    this._setValidity();
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
          this._setValidity();
        }
        break;
      case 'disabled':
        this._updateDisabled();
        break;
      case 'indeterminate':
        this._indeterminate = newVal !== null;
        this._setAriaChecked();
        break;
      case 'required':
        this._internals.ariaRequired = this.required ? 'true' : 'false';
        this._setValidity();
        break;
      case 'value':
        this._value = newVal || 'on';
        break;
      case 'name':
        this._name = newVal || '';
        if (this._name) {
          this.setAttribute('name', this._name);
        } else {
          this.removeAttribute('name');
        }
        break;
      case 'autofocus':
        if (newVal !== null && !this.disabled) {
          this.focus();
        }
        break;
      case 'size':
        this._size = newVal || 'medium';
        break;
      case 'shape':
        this._shape = newVal || 'square';
        break;
    }
  }

  get checked() {
    return this._checked;
  }

  set checked(val) {
    this._checked = !!val;
    this._setFormValue(this._checked ? this._value : null);
    this._setAriaChecked();
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

  get indeterminate() {
    return this.hasAttribute('indeterminate');
  }

  set indeterminate(val) {
    if (val) {
      this.setAttribute('indeterminate', '');
    } else {
      this.removeAttribute('indeterminate');
    }
    this._setAriaChecked();
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

  get name() {
    return this._name;
  }

  set name(val) {
    this._name = val;
    if (val) {
      this.setAttribute('name', val);
    } else {
      this.removeAttribute('name');
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
    this.indeterminate = false;
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
    if (this.indeterminate) {
      this._internals.ariaChecked = 'mixed';
    } else {
      this._internals.ariaChecked = this._checked ? 'true' : 'false';
    }
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
    const wasIndeterminate = this._indeterminate;
    this._checked = this.hasAttribute('checked');
    this._dirtyChecked = false;
    if (wasIndeterminate) {
      this._indeterminate = false;
      this.removeAttribute('indeterminate');
    }
    this._setAriaChecked();
    this._setValidity();
  }
}

customElements.define('fluent-checkbox', FluentCheckbox);
