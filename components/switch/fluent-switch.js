import { FluentElement } from '../../core/fluent-element.js';

const styles = ":host { display: inline-flex; }\r\n\r\n:host([hidden]) .root {\r\n  display: none;\r\n}\r\n\r\n.root {\r\n  box-sizing: border-box;\r\n  align-items: center;\r\n  flex-direction: row;\r\n  outline: none;\r\n  user-select: none;\r\n  padding: 0 var(--spacingHorizontalXXS);\r\n  width: 40px;\r\n  height: 20px;\r\n  background-color: var(--colorTransparentBackground);\r\n  border: 1px solid var(--colorNeutralStrokeAccessible);\r\n  border-radius: var(--borderRadiusCircular);\r\n  display: inline-flex;\r\n  position: relative;\r\n}\r\n\r\n:host(:enabled) .root {\r\n  cursor: pointer;\r\n}\r\n\r\n.root:hover {\r\n  background: none;\r\n  border-color: var(--colorNeutralStrokeAccessibleHover);\r\n}\r\n\r\n.root:active {\r\n  border-color: var(--colorNeutralStrokeAccessiblePressed);\r\n}\r\n\r\n:host([disabled]) .root,\r\n:host([readonly]) .root {\r\n  border: 1px solid var(--colorNeutralStrokeDisabled);\r\n  background-color: transparent;\r\n  cursor: default;\r\n}\r\n\r\n:host([checked]) .root {\r\n  background: var(--colorCompoundBrandBackground);\r\n  border-color: var(--colorCompoundBrandBackground);\r\n}\r\n\r\n:host([checked]) .root:hover {\r\n  background: var(--colorCompoundBrandBackgroundHover);\r\n  border-color: var(--colorCompoundBrandBackgroundHover);\r\n}\r\n\r\n:host([checked]) .root:active {\r\n  background: var(--colorCompoundBrandBackgroundPressed);\r\n  border-color: var(--colorCompoundBrandBackgroundPressed);\r\n}\r\n\r\n:host([checked][disabled]) .root {\r\n  background: var(--colorNeutralBackgroundDisabled);\r\n  border-color: var(--colorNeutralStrokeDisabled);\r\n}\r\n\r\n.checked-indicator {\r\n  height: 14px;\r\n  width: 14px;\r\n  border-radius: 50%;\r\n  margin: auto 0 auto 0;\r\n  background-color: var(--colorNeutralForeground3);\r\n  transition-duration: var(--durationNormal);\r\n  transition-timing-function: var(--curveEasyEase);\r\n  transition-property: margin-left, margin-right;\r\n  display: block;\r\n  flex-shrink: 0;\r\n}\r\n\r\n:host([checked]) .root .checked-indicator {\r\n  background-color: var(--colorNeutralForegroundInverted);\r\n  margin-left: calc(100% - 14px);\r\n  margin-right: 0;\r\n}\r\n\r\n:host([checked]) .root:hover .checked-indicator {\r\n  background: var(--colorNeutralForegroundInvertedHover);\r\n}\r\n\r\n:host([checked]) .root:active .checked-indicator {\r\n  background: var(--colorNeutralForegroundInvertedPressed);\r\n}\r\n\r\n.root:hover .checked-indicator {\r\n  background-color: var(--colorNeutralForeground3Hover);\r\n}\r\n\r\n.root:active .checked-indicator {\r\n  background-color: var(--colorNeutralForeground3Pressed);\r\n}\r\n\r\n:host([disabled]) .root .checked-indicator,\r\n:host([readonly]) .root .checked-indicator {\r\n  background: var(--colorNeutralForegroundDisabled);\r\n}\r\n\r\n:host([checked][disabled]) .root .checked-indicator {\r\n  background: var(--colorNeutralForegroundDisabled);\r\n}\r\n\r\n.root:focus-visible {\r\n  outline: none;\r\n}\r\n\r\n:host(:not([slot='input'])) .root:focus-visible {\r\n  border-color: var(--colorTransparentStroke);\r\n  outline: var(--strokeWidthThick) solid var(--colorTransparentStroke);\r\n  outline-offset: 1px;\r\n  box-shadow: var(--shadow4), 0 0 0 2px var(--colorStrokeFocus2);\r\n}\r\n\r\n@media (forced-colors: active) {\r\n  .root {\r\n    border-color: InactiveBorder;\r\n  }\r\n\r\n  :host([checked]) .root,\r\n  :host([checked]) .root:active,\r\n  :host([checked]) .root:hover {\r\n    background: Highlight;\r\n    border-color: Highlight;\r\n  }\r\n\r\n  .checked-indicator,\r\n  .root:hover .checked-indicator,\r\n  .root:active .checked-indicator {\r\n    background-color: ActiveCaption;\r\n  }\r\n\r\n  :host([checked]) .root .checked-indicator,\r\n  :host([checked]) .root:hover .checked-indicator,\r\n  :host([checked]) .root:active .checked-indicator {\r\n    background-color: ButtonFace;\r\n  }\r\n\r\n  :host([disabled]) .root .checked-indicator,\r\n  :host([checked][disabled]) .root .checked-indicator {\r\n    background-color: GrayText;\r\n  }\r\n}\r\n\r\n@media screen and (prefers-reduced-motion: reduce) {\r\n  .checked-indicator {\r\n    transition-duration: 0.01ms;\r\n  }\r\n}\r\n";

class FluentSwitch extends FluentElement {
  static styles = styles;
  static formAssociated = true;

  static template = `
    <div class="root">
      <slot name="switch">
        <span class="checked-indicator" part="checked-indicator"></span>
      </slot>
    </div>
  `;

  static get observedAttributes() {
    return ['checked', 'disabled', 'required', 'value', 'name', 'label-position', 'autofocus', 'size', 'shape'];
  }

  constructor() {
    super();
    this._internals = this.attachInternals();
    this._internals.role = 'switch';
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
        }
        break;
      case 'disabled':
        this._updateDisabled();
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
      case 'label-position':
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
        this._shape = newVal || 'circular';
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
