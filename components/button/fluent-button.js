import { FluentElement } from '../../core/fluent-element.js';

const styles = ":host { display: inline-flex; }\r\n\r\n.root {\r\n  --icon-spacing: var(--spacingHorizontalSNudge);\r\n  position: relative;\r\n  display: inline-flex;\r\n  vertical-align: middle;\r\n  align-items: center;\r\n  box-sizing: border-box;\r\n  justify-content: center;\r\n  text-align: center;\r\n  text-decoration-line: none;\r\n  margin: 0;\r\n  min-height: 32px;\r\n  outline-style: none;\r\n  background-color: var(--colorNeutralBackground1);\r\n  color: var(--colorNeutralForeground1);\r\n  border: var(--strokeWidthThin) solid var(--colorNeutralStroke1);\r\n  padding: 0 var(--spacingHorizontalM);\r\n  min-width: 96px;\r\n  border-radius: var(--borderRadiusMedium);\r\n  font-size: var(--fontSizeBase300);\r\n  font-family: var(--fontFamilyBase);\r\n  font-weight: var(--fontWeightSemibold);\r\n  line-height: var(--lineHeightBase300);\r\n  transition-duration: var(--durationFaster);\r\n  transition-property: background, border, color;\r\n  transition-timing-function: var(--curveEasyEase);\r\n  cursor: pointer;\r\n  user-select: none;\r\n}\r\n\r\n.content {\r\n  display: inherit;\r\n}\r\n\r\n.root:hover {\r\n  background-color: var(--colorNeutralBackground1Hover);\r\n  color: var(--colorNeutralForeground1Hover);\r\n  border-color: var(--colorNeutralStroke1Hover);\r\n}\r\n\r\n.root:hover:active {\r\n  background-color: var(--colorNeutralBackground1Pressed);\r\n  border-color: var(--colorNeutralStroke1Pressed);\r\n  color: var(--colorNeutralForeground1Pressed);\r\n  outline-style: none;\r\n}\r\n\r\n.root:focus-visible {\r\n  border-color: var(--colorTransparentStroke);\r\n  outline: var(--strokeWidthThick) solid var(--colorTransparentStroke);\r\n  box-shadow: var(--shadow4), 0 0 0 2px var(--colorStrokeFocus2);\r\n}\r\n\r\n::slotted(svg) {\r\n  font-size: 20px;\r\n  height: 20px;\r\n  width: 20px;\r\n  fill: currentColor;\r\n}\r\n\r\n::slotted([slot='start']) {\r\n  margin-inline-end: var(--icon-spacing);\r\n}\r\n\r\n::slotted([slot='end']),\r\n[slot='end'] {\r\n  flex-shrink: 0;\r\n  margin-inline-start: var(--icon-spacing);\r\n}\r\n\r\n:host([icon-only]) .root {\r\n  min-width: 32px;\r\n  max-width: 32px;\r\n}\r\n\r\n:host([size='small']) .root {\r\n  --icon-spacing: var(--spacingHorizontalXS);\r\n  min-height: 24px;\r\n  min-width: 64px;\r\n  padding: 0 var(--spacingHorizontalS);\r\n  border-radius: var(--borderRadiusSmall);\r\n  font-size: var(--fontSizeBase200);\r\n  line-height: var(--lineHeightBase200);\r\n  font-weight: var(--fontWeightRegular);\r\n}\r\n\r\n:host([size='small'][icon-only]) .root {\r\n  min-width: 24px;\r\n  max-width: 24px;\r\n}\r\n\r\n:host([size='large']) .root {\r\n  min-height: 40px;\r\n  border-radius: var(--borderRadiusLarge);\r\n  padding: 0 var(--spacingHorizontalL);\r\n  font-size: var(--fontSizeBase400);\r\n  line-height: var(--lineHeightBase400);\r\n}\r\n\r\n:host([size='large'][icon-only]) .root {\r\n  min-width: 40px;\r\n  max-width: 40px;\r\n}\r\n\r\n:host([size='large']) ::slotted(svg) {\r\n  font-size: 24px;\r\n  height: 24px;\r\n  width: 24px;\r\n}\r\n\r\n:host(:is([shape='circular'], [shape='circular']:focus-visible)) .root {\r\n  border-radius: var(--borderRadiusCircular);\r\n}\r\n\r\n:host(:is([shape='square'], [shape='square']:focus-visible)) .root {\r\n  border-radius: var(--borderRadiusNone);\r\n}\r\n\r\n:host([appearance='primary']) .root {\r\n  background-color: var(--colorBrandBackground);\r\n  color: var(--colorNeutralForegroundOnBrand);\r\n  border-color: transparent;\r\n}\r\n\r\n:host([appearance='primary']) .root:hover {\r\n  background-color: var(--colorBrandBackgroundHover);\r\n}\r\n\r\n:host([appearance='primary']) .root:is(:hover, :hover:active):not(:focus-visible) {\r\n  border-color: transparent;\r\n}\r\n\r\n:host([appearance='primary']) .root:is(:hover, :hover:active) {\r\n  color: var(--colorNeutralForegroundOnBrand);\r\n}\r\n\r\n:host([appearance='primary']) .root:hover:active {\r\n  background-color: var(--colorBrandBackgroundPressed);\r\n}\r\n\r\n:host([appearance='primary']) .root:focus-visible {\r\n  border-color: var(--colorNeutralForegroundOnBrand);\r\n  box-shadow: var(--shadow2), 0 0 0 2px var(--colorStrokeFocus2);\r\n}\r\n\r\n:host([appearance='outline']) .root {\r\n  background-color: var(--colorTransparentBackground);\r\n}\r\n\r\n:host([appearance='outline']) .root:hover {\r\n  background-color: var(--colorTransparentBackgroundHover);\r\n}\r\n\r\n:host([appearance='outline']) .root:hover:active {\r\n  background-color: var(--colorTransparentBackgroundPressed);\r\n}\r\n\r\n:host([appearance='subtle']) .root {\r\n  background-color: var(--colorSubtleBackground);\r\n  color: var(--colorNeutralForeground2);\r\n  border-color: transparent;\r\n}\r\n\r\n:host([appearance='subtle']) .root:hover {\r\n  background-color: var(--colorSubtleBackgroundHover);\r\n  color: var(--colorNeutralForeground2Hover);\r\n  border-color: transparent;\r\n}\r\n\r\n:host([appearance='subtle']) .root:hover:active {\r\n  background-color: var(--colorSubtleBackgroundPressed);\r\n  color: var(--colorNeutralForeground2Pressed);\r\n  border-color: transparent;\r\n}\r\n\r\n:host([appearance='subtle']) .root:hover ::slotted(svg) {\r\n  fill: var(--colorNeutralForeground2BrandHover);\r\n}\r\n\r\n:host([appearance='subtle']) .root:hover:active ::slotted(svg) {\r\n  fill: var(--colorNeutralForeground2BrandPressed);\r\n}\r\n\r\n:host([appearance='transparent']) .root {\r\n  background-color: var(--colorTransparentBackground);\r\n  color: var(--colorNeutralForeground2);\r\n}\r\n\r\n:host([appearance='transparent']) .root:hover {\r\n  background-color: var(--colorTransparentBackgroundHover);\r\n  color: var(--colorNeutralForeground2BrandHover);\r\n}\r\n\r\n:host([appearance='transparent']) .root:hover:active {\r\n  background-color: var(--colorTransparentBackgroundPressed);\r\n  color: var(--colorNeutralForeground2BrandPressed);\r\n}\r\n\r\n:host(:is([appearance='transparent'], [appearance='transparent']:is(:hover, :active))) .root {\r\n  border-color: transparent;\r\n}\r\n\r\n:host(:is(:disabled, [disabled-focusable], [appearance]:disabled, [appearance][disabled-focusable])) .root,\r\n:host(:is(:disabled, [disabled-focusable], [appearance]:disabled, [appearance][disabled-focusable])) .root:hover,\r\n:host(:is(:disabled, [disabled-focusable], [appearance]:disabled, [appearance][disabled-focusable])) .root:hover:active {\r\n  background-color: var(--colorNeutralBackgroundDisabled);\r\n  border-color: var(--colorNeutralStrokeDisabled);\r\n  color: var(--colorNeutralForegroundDisabled);\r\n  cursor: not-allowed;\r\n}\r\n\r\n:host([appearance='primary']:is(:disabled, [disabled-focusable])) .root,\r\n:host([appearance='primary']:is(:disabled, [disabled-focusable])) .root:is(:hover, :hover:active) {\r\n  border-color: transparent;\r\n}\r\n\r\n:host([appearance='outline']:is(:disabled, [disabled-focusable])) .root,\r\n:host([appearance='outline']:is(:disabled, [disabled-focusable])) .root:is(:hover, :hover:active) {\r\n  background-color: var(--colorTransparentBackground);\r\n}\r\n\r\n:host([appearance='subtle']:is(:disabled, [disabled-focusable])) .root,\r\n:host([appearance='subtle']:is(:disabled, [disabled-focusable])) .root:is(:hover, :hover:active) {\r\n  background-color: var(--colorTransparentBackground);\r\n  border-color: transparent;\r\n}\r\n\r\n:host([appearance='transparent']:is(:disabled, [disabled-focusable])) .root,\r\n:host([appearance='transparent']:is(:disabled, [disabled-focusable])) .root:is(:hover, :hover:active) {\r\n  border-color: transparent;\r\n  background-color: var(--colorTransparentBackground);\r\n}\r\n\r\n@media (forced-colors: active) {\r\n  .root {\r\n    background-color: ButtonFace;\r\n    color: ButtonText;\r\n  }\r\n\r\n  .root:is(:hover, :focus-visible) {\r\n    border-color: Highlight !important;\r\n  }\r\n\r\n  :host([appearance='primary']) .root:not(:is(:hover, :focus-visible)) {\r\n    background-color: Highlight;\r\n    color: HighlightText;\r\n    forced-color-adjust: none;\r\n  }\r\n\r\n  :host(:is(:disabled, [disabled-focusable], [appearance]:disabled, [appearance][disabled-focusable])) .root {\r\n    background-color: ButtonFace;\r\n    color: GrayText;\r\n    border-color: ButtonText;\r\n  }\r\n}\r\n\r\n@media screen and (prefers-reduced-motion: reduce) {\r\n  .root {\r\n    transition-duration: 0.01ms;\r\n  }\r\n}\r\n";

const ButtonType = {
  submit: 'submit',
  reset: 'reset',
  button: 'button',
};

class FluentButton extends FluentElement {
  static formAssociated = true;
  static styles = styles;
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
