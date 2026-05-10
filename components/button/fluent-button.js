import { FluentElement } from '../../core/fluent-element.js';

const stylesUrl = new URL('./fluent-button.css', import.meta.url).href;

const ButtonType = {
  submit: 'submit',
  reset: 'reset',
  button: 'button',
};

class FluentButton extends FluentElement {
  static formAssociated = true;
  static stylesUrl = stylesUrl;
  static template = `
    <div class="root" part="content">
      <slot name="start"></slot>
      <slot></slot>
      <slot name="end"></slot>
      <slot name="internal"></slot>
    </div>
  `;

  static get observedAttributes() {
    return ['disabled', 'appearance', 'shape', 'size', 'icon-only', 'disabled-focusable', 'autofocus',
      'type', 'name', 'value', 'form', 'formaction', 'formenctype', 'formmethod', 'formnovalidate', 'formtarget'];
  }

  constructor() {
    super();
    this._internals = this.attachInternals();
    this._internals.role = 'button';
    this._type = 'submit';
    this._name = '';
    this._value = '';
    this._disabled = false;
    this._disabledFocusable = false;
    this._autofocus = false;
    this._formAction = '';
    this._formEnctype = '';
    this._formMethod = '';
    this._formNoValidate = false;
    this._formTarget = '';
    this._formId = '';
    this._formSubmissionFallback = null;

    this._boundKeydown = this._handleKeydown.bind(this);
    this._boundClick = this._handleClick.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this._root.addEventListener('keydown', this._boundKeydown);
    this._root.addEventListener('click', this._boundClick);
    this._updateTabIndex();
    this._updateAriaDisabled();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._root.removeEventListener('keydown', this._boundKeydown);
    this._root.removeEventListener('click', this._boundClick);
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal === newVal) return;

    switch (name) {
      case 'disabled':
        this._disabled = this.hasAttribute('disabled');
        this._updateTabIndex();
        break;
      case 'disabled-focusable':
        this._disabledFocusable = this.hasAttribute('disabled-focusable');
        this._updateAriaDisabled();
        this._updateTabIndex();
        break;
      case 'autofocus':
        this._autofocus = this.hasAttribute('autofocus');
        break;
      case 'type':
        this._type = newVal || 'submit';
        this._removeFallbackControl();
        break;
      case 'name':
        this._name = newVal || '';
        this._updateFallbackControlName();
        break;
      case 'value':
        this._value = newVal || '';
        this._updateFallbackControlValue();
        break;
      case 'form':
        this._formId = newVal || '';
        this._updateFallbackControlForm();
        break;
      case 'formaction':
        this._formAction = newVal || '';
        this._updateFallbackControlFormAction();
        break;
      case 'formenctype':
        this._formEnctype = newVal || '';
        this._updateFallbackControlEnctype();
        break;
      case 'formmethod':
        this._formMethod = newVal || '';
        this._updateFallbackControlMethod();
        break;
      case 'formnovalidate':
        this._formNoValidate = this.hasAttribute('formnovalidate');
        this._updateFallbackControlNoValidate();
        break;
      case 'formtarget':
        this._formTarget = newVal || '';
        this._updateFallbackControlTarget();
        break;
      default:
        super.attributeChangedCallback(name, oldVal, newVal);
    }
  }

  get type() { return this._type; }
  set type(val) { this.setAttribute('type', val); }

  get name() { return this._name; }
  set name(val) { this.setAttribute('name', val); }

  get value() { return this._value; }
  set value(val) { this.setAttribute('value', val); }

  get form() { return this._internals.form; }

  get labels() { return Object.freeze(Array.from(this._internals.labels)); }

  formDisabledCallback(disabled) {
    if (disabled) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  _handleKeydown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!this._disabled || this._disabledFocusable) {
        this._root.click();
      }
    }
  }

  _handleClick(e) {
    if (this._disabled && !this._disabledFocusable) {
      e.stopImmediatePropagation();
      return;
    }

    if (this._type === ButtonType.submit) {
      this._submitForm();
    } else if (this._type === ButtonType.reset) {
      this._resetForm();
    }
  }

  _submitForm() {
    const form = this._internals.form;
    if (!form || this._disabled) return;

    const hasOverrides = this._name || this._formAction || this._formEnctype ||
      this._formMethod || this._formNoValidate || this._formTarget || this._formId;

    if (!hasOverrides) {
      form.requestSubmit();
      return;
    }

    try {
      this._internals.setFormValue(this._value || '');
      form.requestSubmit(this);
    } catch (err) {
      this._createFallbackControl();
      this._internals.setFormValue(null);
      form.requestSubmit(this._formSubmissionFallback);
    }
  }

  _resetForm() {
    this._internals.form?.reset();
  }

  _updateTabIndex() {
    if (this._disabled && !this._disabledFocusable) {
      this.removeAttribute('tabindex');
    } else {
      const authorTabindex = this.getAttribute('tabindex');
      if (authorTabindex !== null && Number(authorTabindex) < 0) {
        this.tabIndex = -1;
      } else {
        this.tabIndex = 0;
      }
    }
  }

  _updateAriaDisabled() {
    this._internals.ariaDisabled = this._disabledFocusable ? 'true' : 'false';
  }

  _needsFallbackControl() {
    return !!(this._name || this._formAction || this._formEnctype ||
      this._formMethod || this._formNoValidate || this._formTarget || this._formId);
  }

  _createFallbackControl() {
    if (this._formSubmissionFallback) return;

    const fallback = document.createElement('button');
    fallback.style.display = 'none';
    fallback.type = 'submit';
    fallback.setAttribute('slot', 'internal');

    this._updateFallbackControlAttributes(fallback);
    this._root.appendChild(fallback);
    this._formSubmissionFallback = fallback;
  }

  _removeFallbackControl() {
    if (this._type !== ButtonType.submit) {
      if (this._formSubmissionFallback) {
        this._formSubmissionFallback.remove();
        this._formSubmissionFallback = null;
      }
      const internalSlot = this._root.querySelector('slot[name="internal"]');
      if (internalSlot) internalSlot.remove();
    }
  }

  _updateFallbackControlName() {
    if (this._formSubmissionFallback) {
      if (this._name) {
        this._formSubmissionFallback.setAttribute('name', this._name);
      } else {
        this._formSubmissionFallback.removeAttribute('name');
      }
    }
  }

  _updateFallbackControlValue() {
    if (this._formSubmissionFallback) {
      if (this._value) {
        this._formSubmissionFallback.setAttribute('value', this._value);
      } else {
        this._formSubmissionFallback.removeAttribute('value');
      }
    }
  }

  _updateFallbackControlForm() {
    if (this._formSubmissionFallback && this._formId) {
      this._formSubmissionFallback.setAttribute('form', this._formId);
    } else if (this._formSubmissionFallback) {
      this._formSubmissionFallback.removeAttribute('form');
    }
  }

  _updateFallbackControlFormAction() {
    if (this._formSubmissionFallback) {
      if (this._formAction) {
        this._formSubmissionFallback.setAttribute('formaction', this._formAction);
      } else {
        this._formSubmissionFallback.removeAttribute('formaction');
      }
    }
  }

  _updateFallbackControlEnctype() {
    if (this._formSubmissionFallback) {
      if (this._formEnctype) {
        this._formSubmissionFallback.setAttribute('formenctype', this._formEnctype);
      } else {
        this._formSubmissionFallback.removeAttribute('formenctype');
      }
    }
  }

  _updateFallbackControlMethod() {
    if (this._formSubmissionFallback) {
      if (this._formMethod) {
        this._formSubmissionFallback.setAttribute('formmethod', this._formMethod);
      } else {
        this._formSubmissionFallback.removeAttribute('formmethod');
      }
    }
  }

  _updateFallbackControlNoValidate() {
    if (this._formSubmissionFallback) {
      if (this._formNoValidate) {
        this._formSubmissionFallback.setAttribute('formnovalidate', '');
      } else {
        this._formSubmissionFallback.removeAttribute('formnovalidate');
      }
    }
  }

  _updateFallbackControlTarget() {
    if (this._formSubmissionFallback) {
      if (this._formTarget) {
        this._formSubmissionFallback.setAttribute('formtarget', this._formTarget);
      } else {
        this._formSubmissionFallback.removeAttribute('formtarget');
      }
    }
  }

  _updateFallbackControlAttributes(fallback) {
    if (this._name) fallback.setAttribute('name', this._name);
    if (this._value) fallback.setAttribute('value', this._value);
    if (this._formId) fallback.setAttribute('form', this._formId);
    if (this._formAction) fallback.setAttribute('formaction', this._formAction);
    if (this._formEnctype) fallback.setAttribute('formenctype', this._formEnctype);
    if (this._formMethod) fallback.setAttribute('formmethod', this._formMethod);
    if (this._formNoValidate) fallback.setAttribute('formnovalidate', '');
    if (this._formTarget) fallback.setAttribute('formtarget', this._formTarget);
  }
}

customElements.define('fluent-button', FluentButton);
