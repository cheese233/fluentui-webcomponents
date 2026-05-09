import { FluentElement } from '../../core/fluent-element.js';

const stylesUrl = new URL('./fluent-select.css', import.meta.url).href;

class FluentSelect extends FluentElement {
  static stylesUrl = stylesUrl;
  static formAssociated = true;

  static template = `
    <label for="control" part="label">
      <slot name="label"></slot>
    </label>
    <div class="root" part="root">
      <select id="control" class="control" part="control"></select>
      <span class="icon" part="icon">
        <slot name="icon">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
            <path d="M2.15 4.65a.5.5 0 0 1 .7-.7L6 7.09l3.15-3.14a.5.5 0 1 1 .7.7l-3.5 3.5a.5.5 0 0 1-.7 0l-3.5-3.5Z"></path>
          </svg>
        </slot>
      </span>
    </div>
    <div hidden>
      <slot></slot>
    </div>
  `;

  static get observedAttributes() {
    return [
      'disabled', 'required', 'name', 'value',
      'appearance', 'control-size', 'autofocus', 'autocomplete',
      'aria-label', 'aria-labelledby', 'aria-describedby'
    ];
  }

  constructor() {
    super();
    this._internals = this.attachInternals();
    this._userInteracted = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this._shadowRoot = this._root;

    requestAnimationFrame(() => {
      if (!this.isConnected) return;

      const selectEl = this._shadowRoot.querySelector('.control');
      if (!selectEl) return;
      this._selectEl = selectEl;

      this._moveOptionsToNativeSelect();
      this._syncAllAttrs();

      const initialVal = this.getAttribute('value') || '';
      if (initialVal) {
        this._selectEl.value = initialVal;
      }

      this._setFormValue(this._selectEl.value);
      this._setValidity();

      this._selectEl.addEventListener('input', this._handleInput.bind(this));
      this._selectEl.addEventListener('change', this._handleChange.bind(this));

      this._updateLabelVisibility();
    });
  }

  changed(name, oldVal, newVal) {
    if (!this._selectEl) return;
    switch (name) {
      case 'disabled':
        this._selectEl.disabled = newVal !== null;
        this._internals.ariaDisabled = newVal !== null ? 'true' : 'false';
        break;
      case 'required':
        this._selectEl.required = newVal !== null;
        this._internals.ariaRequired = newVal !== null ? 'true' : 'false';
        this._setValidity();
        break;
      case 'name':
        this._selectEl.name = newVal || '';
        break;
      case 'value':
        if (!this._userInteracted && newVal !== null) {
          this._selectEl.value = newVal;
        }
        break;
      case 'autocomplete':
        this._selectEl.autocomplete = newVal || 'off';
        break;
      case 'aria-label':
      case 'aria-labelledby':
      case 'aria-describedby':
      case 'appearance':
      case 'control-size':
      case 'autofocus':
        break;
    }
  }

  get value() {
    return this._selectEl ? this._selectEl.value : (this.getAttribute('value') || '');
  }

  set value(val) {
    if (this._selectEl) {
      this._selectEl.value = val;
      this._setFormValue(val);
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
    return this._internals.validationMessage || (this._selectEl ? this._selectEl.validationMessage : '');
  }

  get willValidate() {
    return this._internals.willValidate;
  }

  checkValidity() {
    return this._internals.checkValidity();
  }

  reportValidity() {
    return this._internals.reportValidity();
  }

  setCustomValidity(message) {
    this._internals.setValidity({ customError: !!message }, message || undefined);
    this.reportValidity();
  }

  _moveOptionsToNativeSelect() {
    const defaultSlot = this._root.querySelector('slot:not([name])');
    if (!defaultSlot) return;

    const nodes = defaultSlot.assignedNodes();
    nodes.forEach(node => {
      if (node.tagName === 'OPTION' || node.tagName === 'OPTGROUP') {
        this._selectEl.appendChild(node.cloneNode(true));
      }
    });
  }

  _syncAllAttrs() {
    const sel = this._selectEl;
    if (!sel) return;
    sel.disabled = this.hasAttribute('disabled');
    sel.required = this.hasAttribute('required');
    sel.name = this.getAttribute('name') || '';
    sel.autocomplete = this.getAttribute('autocomplete') || 'off';
    if (this.hasAttribute('autofocus')) sel.autofocus = true;
    this._internals.ariaDisabled = this.hasAttribute('disabled') ? 'true' : 'false';
    this._internals.ariaRequired = this.hasAttribute('required') ? 'true' : 'false';
  }

  _handleInput(e) {
    this._userInteracted = true;
    this._setFormValue(this._selectEl.value);
    this._setValidity();
    this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
  }

  _handleChange(e) {
    this._setValidity();
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  _setFormValue(value) {
    this._internals.setFormValue(value, value);
  }

  _setValidity() {
    if (!this.isConnected) return;
    if (this.disabled) {
      this._internals.setValidity({});
      return;
    }
    if (this._selectEl) {
      const { valid, valueMissing } = this._selectEl.validity;
      if (!valid) {
        const msg = this._selectEl.validationMessage || 'Invalid value';
        this._internals.setValidity({ valueMissing }, msg, this._selectEl);
      } else {
        this._internals.setValidity({});
      }
    }
  }

  _updateLabelVisibility() {
    const label = this._shadowRoot.querySelector('label');
    if (!label) return;
    const labelSlot = this._root.querySelector('slot[name="label"]');
    if (!labelSlot) return;
    const nodes = labelSlot.assignedNodes();
    const hasContent = nodes.some(n =>
      n.nodeType === Node.ELEMENT_NODE ||
      (n.nodeType === Node.TEXT_NODE && n.textContent.trim())
    );
    label.hidden = !hasContent;
  }

  formResetCallback() {
    if (this._selectEl) {
      this._selectEl.value = this.getAttribute('value') || '';
      this._userInteracted = false;
      this._setValidity();
    }
  }

  formDisabledCallback(disabled) {
    if (this._selectEl) {
      this._selectEl.disabled = disabled;
    }
    this._internals.ariaDisabled = disabled ? 'true' : 'false';
    this._setValidity();
  }
}

customElements.define('fluent-select', FluentSelect);
