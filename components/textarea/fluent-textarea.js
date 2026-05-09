import { FluentElement } from '../../core/fluent-element.js';

const stylesUrl = new URL('./fluent-textarea.css', import.meta.url).href;

class FluentTextArea extends FluentElement {
  static stylesUrl = stylesUrl;
  static formAssociated = true;

  static template = `
    <label for="control" part="label">
      <slot name="label"></slot>
    </label>
    <div class="root" part="root">
      <textarea
        id="control"
        class="control"
        part="control"
      ></textarea>
    </div>
    <div hidden>
      <slot></slot>
    </div>
  `;

  static get observedAttributes() {
    return [
      'disabled', 'readonly', 'placeholder', 'value',
      'appearance', 'size', 'resize', 'rows', 'cols',
      'maxlength', 'minlength', 'name', 'required',
      'autocomplete', 'spellcheck', 'block', 'auto-resize',
      'display-shadow', 'form', 'dirname'
    ];
  }

  constructor() {
    super();
    this._internals = this.attachInternals();
    this._userInteracted = false;
    this._preConnectEl = document.createElement('textarea');
  }

  connectedCallback() {
    super.connectedCallback();
    this._shadowRoot = this._root;

    requestAnimationFrame(() => {
      if (!this.isConnected) return;

      const textarea = this._shadowRoot.querySelector('.control');
      if (!textarea) return;
      this._textarea = textarea;

      const content = this._getContent();
      this._defaultValue = content || this._preConnectEl.defaultValue || '';
      this._textarea.defaultValue = this._defaultValue;
      this._textarea.value = this._preConnectEl.value || this._defaultValue;

      this._syncAllAttrs();
      this._setFormValue(this._textarea.value);
      this._setValidity();
      this._preConnectEl = null;

      this._textarea.addEventListener('input', this._handleControlInput.bind(this));
      this._textarea.addEventListener('change', this._handleControlChange.bind(this));
      this._textarea.addEventListener('select', this._handleControlSelect.bind(this));

      new MutationObserver(() => this._setValidity()).observe(this._textarea, {
        attributes: true,
        attributeFilter: ['disabled', 'required', 'readonly', 'maxlength', 'minlength']
      });

      this._updateLabelVisibility();
    });
  }

  changed(name, oldVal, newVal) {
    if (!this._textarea) return;
    switch (name) {
      case 'disabled':
        this._textarea.disabled = newVal !== null;
        this._internals.ariaDisabled = newVal !== null ? 'true' : 'false';
        if (this._labelSlottedNodes) {
          this._labelSlottedNodes.forEach(n => n.disabled = newVal !== null);
        }
        break;
      case 'readonly':
        this._textarea.readOnly = newVal !== null;
        this._internals.ariaReadOnly = newVal !== null ? 'true' : 'false';
        this._setValidity();
        break;
      case 'placeholder':
        this._textarea.placeholder = newVal || '';
        break;
      case 'value':
        if (!this._userInteracted) {
          this._textarea.value = newVal || '';
        }
        break;
      case 'resize':
        break;
      case 'required':
        this._textarea.required = newVal !== null;
        this._internals.ariaRequired = newVal !== null ? 'true' : 'false';
        if (this._filteredLabelSlottedNodes) {
          this._filteredLabelSlottedNodes.forEach(n => n.required = newVal !== null);
        }
        break;
      case 'maxlength':
        this._textarea.maxLength = newVal ? parseInt(newVal) : -1;
        break;
      case 'minlength':
        this._textarea.minLength = newVal ? parseInt(newVal) : -1;
        break;
      case 'name':
        this._textarea.name = newVal || '';
        break;
      case 'autocomplete':
        this._textarea.autocomplete = newVal || '';
        break;
      case 'spellcheck':
        this._textarea.spellcheck = newVal !== null;
        break;
      case 'rows':
        this._textarea.rows = newVal ? parseInt(newVal) : 2;
        break;
      case 'cols':
        this._textarea.cols = newVal ? parseInt(newVal) : 20;
        break;
      case 'appearance':
      case 'size':
      case 'block':
      case 'auto-resize':
      case 'display-shadow':
      case 'dirname':
        break;
    }
  }

  get value() {
    return this._textarea ? this._textarea.value : (this._preConnectEl ? this._preConnectEl.value : '');
  }

  set value(val) {
    if (this._textarea) {
      this._textarea.value = val;
      this._setFormValue(val);
      this._setValidity();
    } else if (this._preConnectEl) {
      this._preConnectEl.value = val;
    }
  }

  get defaultValue() {
    return this._textarea ? this._textarea.defaultValue : (this._preConnectEl ? this._preConnectEl.defaultValue : '');
  }

  set defaultValue(val) {
    if (this._textarea) {
      this._textarea.defaultValue = val;
      if (!this._userInteracted) this._textarea.value = val;
    } else if (this._preConnectEl) {
      this._preConnectEl.defaultValue = val;
    }
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  get form() {
    return this._internals.form;
  }

  get labels() {
    return this._internals.labels;
  }

  get validity() {
    return this._internals.validity;
  }

  get validationMessage() {
    return this._internals.validationMessage || (this._textarea ? this._textarea.validationMessage : '');
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

  select() {
    if (this._textarea) this._textarea.select();
  }

  _syncAllAttrs() {
    const ta = this._textarea;
    if (!ta) return;
    ta.disabled = this.hasAttribute('disabled');
    ta.readOnly = this.hasAttribute('readonly');
    ta.placeholder = this.getAttribute('placeholder') || '';
    ta.required = this.hasAttribute('required');
    ta.autocomplete = this.getAttribute('autocomplete') || '';
    ta.spellcheck = this.hasAttribute('spellcheck');
    ta.name = this.getAttribute('name') || '';
    const ml = this.getAttribute('maxlength');
    if (ml) ta.maxLength = parseInt(ml);
    const minl = this.getAttribute('minlength');
    if (minl) ta.minLength = parseInt(minl);
    const r = this.getAttribute('rows');
    if (r) ta.rows = parseInt(r);
    const c = this.getAttribute('cols');
    if (c) ta.cols = parseInt(c);
    this._internals.ariaDisabled = this.hasAttribute('disabled') ? 'true' : 'false';
    this._internals.ariaReadOnly = this.hasAttribute('readonly') ? 'true' : 'false';
    this._internals.ariaRequired = this.hasAttribute('required') ? 'true' : 'false';
  }

  _handleControlInput() {
    this._userInteracted = true;
    this._setFormValue(this._textarea.value);
    this._setValidity();
  }

  _handleControlChange() {
    this._toggleUserValidityState();
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  _handleControlSelect() {
    this.dispatchEvent(new Event('select', { bubbles: true, composed: true }));
  }

  _getContent() {
    const slot = this._root.querySelector('slot:not([name])');
    if (!slot) return '';
    return slot.assignedNodes().map(node => {
      if (node.nodeType === Node.ELEMENT_NODE) return node.outerHTML;
      if (node.nodeType === Node.TEXT_NODE) return node.textContent.trim();
      return '';
    }).join('');
  }

  _setFormValue(value) {
    this._internals.setFormValue(value, value);
  }

  _setValidity() {
    if (!this.isConnected) return;
    if (this.disabled || this.hasAttribute('readonly')) {
      this._internals.setValidity({});
    } else if (this._textarea) {
      const { valid, valueMissing, typeMismatch, patternMismatch, tooLong, tooShort } = this._textarea.validity;
      if (!valid) {
        const msg = this._textarea.validationMessage || 'Invalid value';
        this._internals.setValidity(
          { valueMissing, typeMismatch, patternMismatch, tooLong, tooShort },
          msg,
          this._textarea
        );
      } else {
        this._internals.setValidity({});
      }
    }
    if (this._userInteracted) {
      this._toggleUserValidityState();
    }
  }

  _toggleUserValidityState() {
    const valid = this._internals.validity.valid;
    if (!valid) {
      this.classList.add('user-invalid');
      this.classList.remove('user-valid');
    } else {
      this.classList.add('user-valid');
      this.classList.remove('user-invalid');
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
    if (this._textarea) {
      this._textarea.value = this.defaultValue;
      this._userInteracted = false;
    }
  }

  formDisabledCallback(disabled) {
    if (this._textarea) {
      this._textarea.disabled = disabled;
    }
    this._internals.ariaDisabled = disabled ? 'true' : 'false';
    this._setValidity();
  }
}

customElements.define('fluent-textarea', FluentTextArea);
