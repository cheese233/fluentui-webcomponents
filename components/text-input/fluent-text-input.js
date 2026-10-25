import { FluentElement } from '../../core/fluent-element.js';

const styles = ":host { display: inline-flex; }\r\n\r\n.label {\r\n  display: flex;\r\n  color: var(--colorNeutralForeground1);\r\n  padding-bottom: var(--spacingVerticalXS);\r\n  flex-shrink: 0;\r\n  padding-inline-end: var(--spacingHorizontalXS);\r\n}\r\n\r\n.label[hidden],\r\n:host(:empty) .label {\r\n  display: none;\r\n}\r\n\r\n.root {\r\n  align-items: center;\r\n  background-color: var(--colorNeutralBackground1);\r\n  border: var(--strokeWidthThin) solid var(--colorNeutralStroke1);\r\n  border-bottom-color: var(--colorNeutralStrokeAccessible);\r\n  border-radius: var(--borderRadiusMedium);\r\n  box-sizing: border-box;\r\n  height: 32px;\r\n  display: inline-flex;\r\n  flex-direction: row;\r\n  font-family: var(--fontFamilyBase);\r\n  font-size: var(--fontSizeBase300);\r\n  font-weight: var(--fontWeightRegular);\r\n  gap: var(--spacingHorizontalXXS);\r\n  line-height: var(--lineHeightBase300);\r\n  max-width: 400px;\r\n  padding: 0 var(--spacingHorizontalMNudge);\r\n  position: relative;\r\n  width: 100%;\r\n}\r\n\r\n.root::after {\r\n  box-sizing: border-box;\r\n  content: '';\r\n  position: absolute;\r\n  left: -1px;\r\n  bottom: 0px;\r\n  right: -1px;\r\n  height: max(2px, var(--borderRadiusMedium));\r\n  border-radius: 0 0 var(--borderRadiusMedium) var(--borderRadiusMedium);\r\n  border-bottom: 2px solid var(--colorCompoundBrandStroke);\r\n  clip-path: inset(calc(100% - 2px) 1px 0px);\r\n  transform: scaleX(0);\r\n  transition-property: transform;\r\n  transition-duration: var(--durationUltraFast);\r\n  transition-delay: var(--curveAccelerateMid);\r\n}\r\n\r\n.control {\r\n  width: 100%;\r\n  height: 100%;\r\n  box-sizing: border-box;\r\n  color: var(--colorNeutralForeground1);\r\n  border-radius: var(--borderRadiusMedium);\r\n  background: var(--colorTransparentBackground);\r\n  font-family: var(--fontFamilyBase);\r\n  font-weight: var(--fontWeightRegular);\r\n  font-size: var(--fontSizeBase300);\r\n  border: none;\r\n  vertical-align: center;\r\n}\r\n\r\n.control:focus-visible {\r\n  outline: 0;\r\n  border: 0;\r\n}\r\n\r\n.control::placeholder {\r\n  color: var(--colorNeutralForeground4);\r\n}\r\n\r\n:host ::slotted([slot='start']),\r\n:host ::slotted([slot='end']) {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  color: var(--colorNeutralForeground3);\r\n  font-size: var(--fontSizeBase500);\r\n}\r\n\r\n:host ::slotted([slot='start']) {\r\n  padding-right: var(--spacingHorizontalXXS);\r\n}\r\n\r\n:host ::slotted([slot='end']) {\r\n  padding-left: var(--spacingHorizontalXXS);\r\n  gap: var(--spacingHorizontalXS);\r\n}\r\n\r\n.root:hover {\r\n  border-color: var(--colorNeutralStroke1Hover);\r\n  border-bottom-color: var(--colorNeutralStrokeAccessibleHover);\r\n}\r\n\r\n.root:active {\r\n  border-color: var(--colorNeutralStroke1Pressed);\r\n}\r\n\r\n.root:focus-within {\r\n  outline: transparent solid 2px;\r\n  border-bottom: 0;\r\n}\r\n\r\n.root:focus-within::after {\r\n  transform: scaleX(1);\r\n  transition-property: transform;\r\n  transition-duration: var(--durationNormal);\r\n  transition-delay: var(--curveDecelerateMid);\r\n}\r\n\r\n.root:focus-within:active::after {\r\n  border-bottom-color: var(--colorCompoundBrandStrokePressed);\r\n}\r\n\r\n.root:user-invalid {\r\n  border-color: var(--colorPaletteRedBorder2);\r\n}\r\n\r\n.root:focus-within .control {\r\n  color: var(--colorNeutralForeground1);\r\n}\r\n\r\n:host([disabled]) .root {\r\n  background: var(--colorTransparentBackground);\r\n  border: var(--strokeWidthThin) solid var(--colorNeutralStrokeDisabled);\r\n}\r\n\r\n:host([disabled]) .control::placeholder,\r\n:host([disabled]) ::slotted([slot='start']),\r\n:host([disabled]) ::slotted([slot='end']) {\r\n  color: var(--colorNeutralForegroundDisabled);\r\n}\r\n\r\n::selection {\r\n  color: var(--colorNeutralForegroundInverted);\r\n  background-color: var(--colorNeutralBackgroundInverted);\r\n}\r\n\r\n:host([control-size='small']) .control {\r\n  font-size: var(--fontSizeBase200);\r\n  font-weight: var(--fontWeightRegular);\r\n  line-height: var(--lineHeightBase200);\r\n}\r\n\r\n:host([control-size='small']) .root {\r\n  height: 24px;\r\n  gap: var(--spacingHorizontalXXS);\r\n  padding: 0 var(--spacingHorizontalSNudge);\r\n}\r\n\r\n:host([control-size='small']) ::slotted([slot='start']),\r\n:host([control-size='small']) ::slotted([slot='end']) {\r\n  font-size: var(--fontSizeBase400);\r\n}\r\n\r\n:host([control-size='large']) .control {\r\n  font-size: var(--fontSizeBase400);\r\n  font-weight: var(--fontWeightRegular);\r\n  line-height: var(--lineHeightBase400);\r\n}\r\n\r\n:host([control-size='large']) .root {\r\n  height: 40px;\r\n  gap: var(--spacingHorizontalS);\r\n  padding: 0 var(--spacingHorizontalM);\r\n}\r\n\r\n:host([control-size='large']) ::slotted([slot='start']),\r\n:host([control-size='large']) ::slotted([slot='end']) {\r\n  font-size: var(--fontSizeBase600);\r\n}\r\n\r\n:host([appearance='underline']) .root {\r\n  background: var(--colorTransparentBackground);\r\n  border: 0;\r\n  border-radius: 0;\r\n  border-bottom: var(--strokeWidthThin) solid var(--colorNeutralStrokeAccessible);\r\n}\r\n\r\n:host([appearance='underline']) .root:hover {\r\n  border-bottom-color: var(--colorNeutralStrokeAccessibleHover);\r\n}\r\n\r\n:host([appearance='underline']) .root:active {\r\n  border-bottom-color: var(--colorNeutralStrokeAccessiblePressed);\r\n}\r\n\r\n:host([appearance='underline']) .root:focus-within {\r\n  border: 0;\r\n  border-bottom-color: var(--colorNeutralStrokeAccessiblePressed);\r\n}\r\n\r\n:host([appearance='underline'][disabled]) .root {\r\n  border-bottom-color: var(--colorNeutralStrokeDisabled);\r\n}\r\n\r\n:host([appearance='filled-lighter']) .root,\r\n:host([appearance='filled-darker']) .root {\r\n  border: var(--strokeWidthThin) solid var(--colorTransparentStroke);\r\n  box-shadow: var(--shadow2);\r\n}\r\n\r\n:host([appearance='filled-lighter']) .root {\r\n  background: var(--colorNeutralBackground1);\r\n}\r\n\r\n:host([appearance='filled-darker']) .root {\r\n  background: var(--colorNeutralBackground3);\r\n}\r\n\r\n:host([appearance='filled-lighter']) .root:hover,\r\n:host([appearance='filled-darker']) .root:hover {\r\n  border-color: var(--colorTransparentStrokeInteractive);\r\n}\r\n\r\n:host([appearance='filled-lighter']) .root:active,\r\n:host([appearance='filled-darker']) .root:active {\r\n  border-color: var(--colorTransparentStrokeInteractive);\r\n  background: var(--colorNeutralBackground3);\r\n}\r\n";

class FluentTextInput extends FluentElement {
  static styles = styles;
  static formAssociated = true;

  static template = `
    <label part="label" for="control" class="label">
      <slot></slot>
    </label>
    <div class="root" part="root">
      <slot name="start"></slot>
      <input
        class="control"
        part="control"
        id="control"
      />
      <slot name="end"></slot>
    </div>
  `;

  static get observedAttributes() {
    return [
      'disabled', 'readonly', 'placeholder', 'type', 'value',
      'appearance', 'control-size', 'autofocus', 'list', 'maxlength',
      'name', 'minlength', 'required', 'autocomplete', 'spellcheck',
      'pattern', 'multiple', 'size', 'dirname', 'form'
    ];
  }

  constructor() {
    super();
    this._internals = this.attachInternals();
    this._dirtyValue = false;
    this._boundInputHandler = this._inputHandler.bind(this);
    this._boundChangeHandler = this._changeHandler.bind(this);
    this._boundFocusinHandler = this._focusinHandler.bind(this);
    this._boundKeydownHandler = this._keydownHandler.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this._shadowRoot = this._root;

    const t = this.getAttribute('tabindex');
    this.tabIndex = Number(t ?? 0) < 0 ? -1 : 0;

    const input = this._shadowRoot.querySelector('.control');
    if (input) {
      this._input = input;
      this._syncAllAttrs();
      this._setFormValue(this.value);
      this._setValidity();

      input.addEventListener('input', this._boundInputHandler);
      input.addEventListener('change', this._boundChangeHandler);
      input.addEventListener('select', () => this.dispatchEvent(new Event('select')));
    }

    this.addEventListener('focusin', this._boundFocusinHandler);
    this.addEventListener('keydown', this._boundKeydownHandler);
    this._updateLabelVisibility();
  }

  changed(name, oldVal, newVal) {
    const input = this._input;
    if (!input) return;

    switch (name) {
      case 'value':
        if (!this._dirtyValue) {
          input.value = newVal || '';
        }
        break;
      case 'disabled':
        input.disabled = newVal !== null;
        break;
      case 'readonly':
        input.readOnly = newVal !== null;
        this._internals.ariaReadOnly = newVal !== null ? 'true' : 'false';
        break;
      case 'placeholder':
        input.placeholder = newVal || '';
        break;
      case 'type':
        input.type = newVal || 'text';
        break;
      case 'autofocus':
        if (newVal !== null) input.autofocus = true;
        break;
      case 'list':
        input.setAttribute('list', newVal || '');
        break;
      case 'maxlength':
        input.maxLength = newVal ? parseInt(newVal) : -1;
        break;
      case 'minlength':
        input.minLength = newVal ? parseInt(newVal) : -1;
        break;
      case 'name':
        input.name = newVal || '';
        break;
      case 'required':
        input.required = newVal !== null;
        this._internals.ariaRequired = newVal !== null ? 'true' : 'false';
        this._setValidity();
        break;
      case 'autocomplete':
        input.autocomplete = newVal || '';
        break;
      case 'spellcheck':
        input.spellcheck = newVal !== null;
        break;
      case 'pattern':
        input.pattern = newVal || '';
        break;
      case 'multiple':
        input.multiple = newVal !== null;
        break;
      case 'size':
        input.size = newVal ? parseInt(newVal) : 20;
        break;
      case 'dirname':
        input.setAttribute('dirname', newVal || '');
        break;
      case 'appearance':
      case 'control-size':
        break;
    }
  }

  get value() {
    return this._input ? this._input.value : (this.getAttribute('value') || '');
  }

  set value(val) {
    if (this._input) {
      this._input.value = val;
      this._setFormValue(val);
      this._setValidity();
    }
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  get form() {
    return this._internals.form;
  }

  get validity() {
    return this._internals.validity;
  }

  get validationMessage() {
    return this._internals.validationMessage || (this._input ? this._input.validationMessage : '');
  }

  get willValidate() {
    return this._internals.willValidate;
  }

  get labels() {
    return Object.freeze(Array.from(this._internals.labels));
  }

  get type() {
    return this._input ? this._input.type : (this.getAttribute('type') || 'text');
  }

  get textLength() {
    return this._input ? this._input.textLength : 0;
  }

  checkValidity() {
    return this._internals.checkValidity();
  }

  reportValidity() {
    return this._internals.reportValidity();
  }

  setCustomValidity(message) {
    this._internals.setValidity({ customError: !!message }, message);
    this.reportValidity();
  }

  select() {
    if (this._input) {
      this._input.select();
      this.dispatchEvent(new Event('select'));
    }
  }

  _syncAllAttrs() {
    const input = this._input;
    if (!input) return;
    input.disabled = this.hasAttribute('disabled');
    input.readOnly = this.hasAttribute('readonly');
    input.placeholder = this.getAttribute('placeholder') || '';
    input.type = this.getAttribute('type') || 'text';
    input.name = this.getAttribute('name') || '';
    input.required = this.hasAttribute('required');
    input.autocomplete = this.getAttribute('autocomplete') || '';
    input.spellcheck = this.hasAttribute('spellcheck');
    input.multiple = this.hasAttribute('multiple');
    input.pattern = this.getAttribute('pattern') || '';
    input.value = this.getAttribute('value') || '';
    const ml = this.getAttribute('maxlength');
    if (ml) input.maxLength = parseInt(ml);
    const minl = this.getAttribute('minlength');
    if (minl) input.minLength = parseInt(minl);
    const sz = this.getAttribute('size');
    if (sz) input.size = parseInt(sz);
    const list = this.getAttribute('list');
    if (list) input.setAttribute('list', list);
    const dirname = this.getAttribute('dirname');
    if (dirname) input.setAttribute('dirname', dirname);
    if (this.hasAttribute('autofocus')) input.autofocus = true;
    this._internals.ariaReadOnly = this.hasAttribute('readonly') ? 'true' : 'false';
    this._internals.ariaRequired = this.hasAttribute('required') ? 'true' : 'false';
  }

  _inputHandler() {
    this._dirtyValue = true;
    this._setFormValue(this._input.value);
    this._setValidity();
  }

  _changeHandler(e) {
    this._setValidity();
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  _focusinHandler(e) {
    if (e.target === this && this._input) {
      this._input.focus();
    }
  }

  _keydownHandler(e) {
    if (e.key === 'Enter' && this._internals.form) {
      const form = this._internals.form;
      if (form.elements.length === 1) {
        form.requestSubmit();
      }
    }
  }

  _setFormValue(value) {
    this._internals.setFormValue(value, value);
  }

  _setValidity() {
    if (!this.isConnected || !this._input) return;
    if (this.disabled) {
      this._internals.setValidity({});
      return;
    }
    const { valid, valueMissing, typeMismatch, patternMismatch, tooLong, tooShort, rangeUnderflow, rangeOverflow, stepMismatch, badInput } = this._input.validity;
    const hasError = !valid;
    if (!hasError) {
      this._internals.setValidity({});
      return;
    }
    const msg = this._input.validationMessage || 'Invalid value';
    this._internals.setValidity(
      { valueMissing, typeMismatch, patternMismatch, tooLong, tooShort, rangeUnderflow, rangeOverflow, stepMismatch, badInput },
      msg,
      this._input
    );
  }

  _updateLabelVisibility() {
    const label = this._shadowRoot.querySelector('.label');
    if (!label) return;
    const slot = this._root.querySelector('slot:not([name])');
    if (!slot) return;
    const nodes = slot.assignedNodes();
    const hasContent = nodes.some(n =>
      n.nodeType === Node.ELEMENT_NODE ||
      (n.nodeType === Node.TEXT_NODE && n.textContent.trim())
    );
    label.hidden = !hasContent;
  }

  formResetCallback() {
    this._dirtyValue = false;
    if (this._input) {
      this._input.value = this.getAttribute('value') || '';
    }
  }
}

customElements.define('fluent-text-input', FluentTextInput);
