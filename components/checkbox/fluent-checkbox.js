import { FluentElement } from '../../core/fluent-element.js';

const styles = ":host { display: inline-flex; }\r\n\r\n:host([hidden]) .root {\r\n  display: none;\r\n}\r\n\r\n.root {\r\n  --size: 16px;\r\n  background-color: var(--colorNeutralBackground1);\r\n  border-radius: var(--borderRadiusSmall);\r\n  border: var(--strokeWidthThin) solid var(--colorNeutralStrokeAccessible);\r\n  box-sizing: border-box;\r\n  cursor: pointer;\r\n  position: relative;\r\n  width: var(--size);\r\n  aspect-ratio: 1;\r\n  display: inline-flex;\r\n}\r\n\r\n.root:hover {\r\n  border-color: var(--colorNeutralStrokeAccessibleHover);\r\n}\r\n\r\n.root:active {\r\n  border-color: var(--colorNeutralStrokeAccessiblePressed);\r\n}\r\n\r\n:host([checked]) .root:hover {\r\n  background-color: var(--colorCompoundBrandBackgroundHover);\r\n  border-color: var(--colorCompoundBrandStrokeHover);\r\n}\r\n\r\n:host([checked]) .root:active {\r\n  background-color: var(--colorCompoundBrandBackgroundPressed);\r\n  border-color: var(--colorCompoundBrandStrokePressed);\r\n}\r\n\r\n.root:focus-visible {\r\n  outline: none;\r\n}\r\n\r\n:host(:not([slot='input'])) .root::after {\r\n  content: '';\r\n  position: absolute;\r\n  inset: -8px;\r\n  box-sizing: border-box;\r\n  outline: none;\r\n  border: var(--strokeWidthThick) solid var(--colorTransparentStroke);\r\n  border-radius: var(--borderRadiusMedium);\r\n}\r\n\r\n:host(:not([slot='input'])) .root:focus-visible::after {\r\n  border-color: var(--colorStrokeFocus2);\r\n}\r\n\r\n.indeterminate-indicator,\r\n.checked-indicator {\r\n  color: var(--colorNeutralForegroundInverted);\r\n  inset: 0;\r\n  margin: auto;\r\n  position: absolute;\r\n  aspect-ratio: 1;\r\n}\r\n\r\n::slotted([slot='checked-indicator']),\r\n.checked-indicator {\r\n  fill: currentColor;\r\n  display: inline-flex;\r\n  flex: 1 0 auto;\r\n  width: 12px;\r\n}\r\n\r\n:host(:not([checked])) .root ::slotted([slot='checked-indicator']),\r\n:host(:not([checked])) .root .checked-indicator {\r\n  display: none;\r\n}\r\n\r\n:host([checked]) .root,\r\n:host([indeterminate]) .root {\r\n  border-color: var(--colorCompoundBrandStroke);\r\n}\r\n\r\n:host([checked]) .root,\r\n:host([indeterminate]) .root .indeterminate-indicator {\r\n  background-color: var(--colorCompoundBrandBackground);\r\n}\r\n\r\n:host([indeterminate]) .root .indeterminate-indicator {\r\n  border-radius: var(--borderRadiusSmall);\r\n  position: absolute;\r\n  width: calc(var(--size) / 2);\r\n  inset: 0;\r\n}\r\n\r\n:host([size='large']) .root {\r\n  --size: 20px;\r\n}\r\n\r\n:host([size='large']) .root ::slotted([slot='checked-indicator']),\r\n:host([size='large']) .root .checked-indicator {\r\n  width: 16px;\r\n}\r\n\r\n:host([shape='circular']) .root,\r\n:host([shape='circular']) .root .indeterminate-indicator {\r\n  border-radius: var(--borderRadiusCircular);\r\n}\r\n\r\n:host([disabled]) .root,\r\n:host([disabled][checked]) .root {\r\n  background-color: var(--colorNeutralBackgroundDisabled);\r\n  border-color: var(--colorNeutralStrokeDisabled);\r\n}\r\n\r\n:host([disabled]) .root {\r\n  cursor: unset;\r\n}\r\n\r\n:host([disabled][indeterminate]) .root .indeterminate-indicator {\r\n  background-color: var(--colorNeutralStrokeDisabled);\r\n}\r\n\r\n:host([disabled][checked]) .root .checked-indicator {\r\n  color: var(--colorNeutralStrokeDisabled);\r\n}\r\n\r\n@media (forced-colors: active) {\r\n  .root {\r\n    border-color: FieldText;\r\n  }\r\n\r\n  :host(:not([slot='input']:focus-visible)) .root::after {\r\n    border-color: Canvas;\r\n  }\r\n\r\n  :host(:not([disabled])) .root:hover,\r\n  :host([checked]:not([disabled])) .root:hover,\r\n  :host(:not([slot='input'])) .root:focus-visible::after {\r\n    border-color: Highlight;\r\n  }\r\n\r\n  .indeterminate-indicator,\r\n  .checked-indicator {\r\n    color: HighlightText;\r\n  }\r\n\r\n  :host([checked]) .root,\r\n  :host([indeterminate]) .root .indeterminate-indicator {\r\n    background-color: FieldText;\r\n  }\r\n\r\n  :host([checked]:not([disabled])) .root:hover,\r\n  :host([indeterminate]:not([disabled])) .root:hover .indeterminate-indicator {\r\n    background-color: Highlight;\r\n  }\r\n\r\n  :host([disabled]) .root {\r\n    border-color: GrayText;\r\n  }\r\n\r\n  :host([disabled][indeterminate]) .root .indeterminate-indicator {\r\n    background-color: GrayText;\r\n  }\r\n\r\n  :host([disabled]) .root,\r\n  :host([disabled][checked]) .root .checked-indicator {\r\n    color: GrayText;\r\n  }\r\n}\r\n";

class FluentCheckbox extends FluentElement {
  static styles = styles;
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
