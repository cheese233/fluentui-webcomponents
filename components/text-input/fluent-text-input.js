import { FluentElement } from '../../core/fluent-element.js';

const stylesUrl = new URL('./fluent-text-input.css', import.meta.url).href;

class FluentTextInput extends FluentElement {
  static stylesUrl = stylesUrl;
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
