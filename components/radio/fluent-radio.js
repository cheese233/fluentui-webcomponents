import { FluentElement } from '../../core/fluent-element.js';

const styles = ":host { display: inline-flex; }\r\n\r\n:host([hidden]) .root {\r\n  display: none;\r\n}\r\n\r\n.root {\r\n  --size: 16px;\r\n  aspect-ratio: 1;\r\n  background-color: var(--colorNeutralBackground1);\r\n  border: var(--strokeWidthThin) solid var(--colorNeutralStrokeAccessible);\r\n  border-radius: var(--borderRadiusCircular);\r\n  box-sizing: border-box;\r\n  position: relative;\r\n  width: var(--size);\r\n  display: inline-flex;\r\n  cursor: pointer;\r\n}\r\n\r\n:host([size='large']) .root {\r\n  --size: 20px;\r\n}\r\n\r\n.checked-indicator {\r\n  aspect-ratio: 1;\r\n  border-radius: var(--borderRadiusCircular);\r\n  color: var(--colorNeutralForegroundInverted);\r\n  inset: 0;\r\n  margin: auto;\r\n  position: absolute;\r\n  width: calc(var(--size) * 0.625);\r\n}\r\n\r\n:host(:not([slot='input'])) .root::after {\r\n  content: '';\r\n  position: absolute;\r\n  display: block;\r\n  inset: -8px;\r\n  box-sizing: border-box;\r\n  outline: none;\r\n  border: var(--strokeWidthThick) solid var(--colorTransparentStroke);\r\n  border-radius: var(--borderRadiusMedium);\r\n}\r\n\r\n:host(:not([slot='input'])) .root:focus-visible::after {\r\n  border-color: var(--colorStrokeFocus2);\r\n}\r\n\r\n.root:hover {\r\n  border-color: var(--colorNeutralStrokeAccessibleHover);\r\n}\r\n\r\n:host([checked]) .root {\r\n  border-color: var(--colorCompoundBrandStroke);\r\n}\r\n\r\n:host([checked]) .root .checked-indicator {\r\n  background-color: var(--colorCompoundBrandBackground);\r\n}\r\n\r\n:host([checked]) .root:hover .checked-indicator {\r\n  background-color: var(--colorCompoundBrandBackgroundHover);\r\n}\r\n\r\n.root:active {\r\n  border-color: var(--colorNeutralStrokeAccessiblePressed);\r\n}\r\n\r\n:host([checked]) .root:active .checked-indicator {\r\n  background-color: var(--colorCompoundBrandBackgroundPressed);\r\n}\r\n\r\n.root:focus-visible {\r\n  outline: none;\r\n}\r\n\r\n:host([disabled]) .root {\r\n  background-color: var(--colorNeutralBackgroundDisabled);\r\n  border-color: var(--colorNeutralStrokeDisabled);\r\n  cursor: unset;\r\n}\r\n\r\n:host([checked][disabled]) .root .checked-indicator {\r\n  background-color: var(--colorNeutralStrokeDisabled);\r\n}\r\n\r\n@media (forced-colors: active) {\r\n  .root {\r\n    border-color: FieldText;\r\n  }\r\n\r\n  :host(:not([slot='input']:focus-visible)) .root::after {\r\n    border-color: Canvas;\r\n  }\r\n\r\n  :host(:not([disabled])) .root:hover,\r\n  :host(:not([slot='input'])) .root:focus-visible::after {\r\n    border-color: Highlight;\r\n  }\r\n\r\n  .checked-indicator {\r\n    color: HighlightText;\r\n  }\r\n\r\n  :host([checked]) .root .checked-indicator {\r\n    background-color: FieldText;\r\n  }\r\n\r\n  :host([checked]:not([disabled])) .root:hover .checked-indicator {\r\n    background-color: Highlight;\r\n  }\r\n\r\n  :host([disabled]) .root {\r\n    border-color: GrayText;\r\n    color: GrayText;\r\n  }\r\n\r\n  :host([disabled][checked]) .root .checked-indicator {\r\n    background-color: GrayText;\r\n  }\r\n}\r\n";

class FluentRadio extends FluentElement {
  static styles = styles;
  static formAssociated = true;

  static template = `
    <div class="root">
      <slot name="checked-indicator">
        <span part="checked-indicator" class="checked-indicator" role="presentation"></span>
      </slot>
    </div>
  `;

  static get observedAttributes() {
    return ['checked', 'disabled', 'required', 'value', 'name', 'size', 'shape', 'autofocus'];
  }

  constructor() {
    super();
    this._internals = this.attachInternals();
    this._internals.role = 'radio';
    this._checked = false;
    this._dirtyChecked = false;
    this._keydownPressed = false;
    this._value = 'on';
    this._name = '';
    this._size = 'medium';
    this._shape = 'circular';
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
      case 'size':
        this._size = newVal || 'medium';
        break;
      case 'shape':
        this._shape = newVal || 'circular';
        break;
      case 'autofocus':
        if (newVal !== null && !this.disabled) {
          this.focus();
        }
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
    if (this.disabled || !this.required) {
      this._internals.setValidity({});
      return;
    }
    this._internals.setValidity(
      { valueMissing: !!this.required && !this._checked },
      this.validationMessage || undefined
    );
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
