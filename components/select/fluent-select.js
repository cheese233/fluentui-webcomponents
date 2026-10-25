import { FluentElement } from '../../core/fluent-element.js';

const styles = ":host { display: inline-flex; }\r\n\r\nlabel {\r\n  display: flex;\r\n  color: var(--colorNeutralForeground1);\r\n  padding-bottom: var(--spacingVerticalXS);\r\n  flex-shrink: 0;\r\n  padding-inline-end: var(--spacingHorizontalXS);\r\n}\r\n\r\nlabel[hidden],\r\n:host(:empty) label {\r\n  display: none;\r\n}\r\n\r\n.root {\r\n  align-items: center;\r\n  background-color: var(--colorNeutralBackground1);\r\n  border: var(--strokeWidthThin) solid var(--colorNeutralStroke1);\r\n  border-bottom-color: var(--colorNeutralStrokeAccessible);\r\n  border-radius: var(--borderRadiusMedium);\r\n  box-sizing: border-box;\r\n  height: 32px;\r\n  display: inline-flex;\r\n  flex-direction: row;\r\n  font-family: var(--fontFamilyBase);\r\n  font-size: var(--fontSizeBase300);\r\n  font-weight: var(--fontWeightRegular);\r\n  gap: var(--spacingHorizontalXXS);\r\n  line-height: var(--lineHeightBase300);\r\n  max-width: 400px;\r\n  padding: 0 var(--spacingHorizontalMNudge);\r\n  position: relative;\r\n  width: 100%;\r\n}\r\n\r\n.root::after {\r\n  box-sizing: border-box;\r\n  content: '';\r\n  position: absolute;\r\n  left: -1px;\r\n  bottom: 0px;\r\n  right: -1px;\r\n  height: max(2px, var(--borderRadiusMedium));\r\n  border-radius: 0 0 var(--borderRadiusMedium) var(--borderRadiusMedium);\r\n  border-bottom: 2px solid var(--colorCompoundBrandStroke);\r\n  clip-path: inset(calc(100% - 2px) 1px 0px);\r\n  transform: scaleX(0);\r\n  transition-property: transform;\r\n  transition-duration: var(--durationUltraFast);\r\n  transition-delay: var(--curveAccelerateMid);\r\n}\r\n\r\n.root:focus-within::after {\r\n  transform: scaleX(1);\r\n  transition-property: transform;\r\n  transition-duration: var(--durationNormal);\r\n  transition-delay: var(--curveDecelerateMid);\r\n}\r\n\r\n.control {\r\n  appearance: none;\r\n  width: 100%;\r\n  height: 100%;\r\n  box-sizing: border-box;\r\n  color: var(--colorNeutralForeground1);\r\n  border-radius: var(--borderRadiusMedium);\r\n  background: var(--colorTransparentBackground);\r\n  font-family: var(--fontFamilyBase);\r\n  font-weight: var(--fontWeightRegular);\r\n  font-size: var(--fontSizeBase300);\r\n  border: none;\r\n  outline: none;\r\n  cursor: pointer;\r\n  padding-right: 24px;\r\n}\r\n\r\n.control:focus-visible {\r\n  outline: 0;\r\n}\r\n\r\n.icon {\r\n  position: absolute;\r\n  right: var(--spacingHorizontalMNudge);\r\n  top: 50%;\r\n  transform: translateY(-50%);\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  color: var(--colorNeutralForeground3);\r\n  pointer-events: none;\r\n  font-size: var(--fontSizeBase500);\r\n}\r\n\r\n.root:hover {\r\n  border-color: var(--colorNeutralStroke1Hover);\r\n  border-bottom-color: var(--colorNeutralStrokeAccessibleHover);\r\n}\r\n\r\n.root:active {\r\n  border-color: var(--colorNeutralStroke1Pressed);\r\n}\r\n\r\n.root:focus-within {\r\n  outline: transparent solid 2px;\r\n  border-bottom: 0;\r\n}\r\n\r\n:host([disabled]) .root {\r\n  background: var(--colorTransparentBackground);\r\n  border: var(--strokeWidthThin) solid var(--colorNeutralStrokeDisabled);\r\n}\r\n\r\n:host([disabled]) .control {\r\n  color: var(--colorNeutralForegroundDisabled);\r\n  cursor: not-allowed;\r\n}\r\n\r\n:host([disabled]) .icon {\r\n  color: var(--colorNeutralForegroundDisabled);\r\n}\r\n\r\n:host([control-size='small']) .control {\r\n  font-size: var(--fontSizeBase200);\r\n  font-weight: var(--fontWeightRegular);\r\n  line-height: var(--lineHeightBase200);\r\n}\r\n\r\n:host([control-size='small']) .root {\r\n  height: 24px;\r\n  gap: var(--spacingHorizontalXXS);\r\n  padding: 0 var(--spacingHorizontalSNudge);\r\n}\r\n\r\n:host([control-size='large']) .control {\r\n  font-size: var(--fontSizeBase400);\r\n  font-weight: var(--fontWeightRegular);\r\n  line-height: var(--lineHeightBase400);\r\n}\r\n\r\n:host([control-size='large']) .root {\r\n  height: 40px;\r\n  gap: var(--spacingHorizontalS);\r\n  padding: 0 var(--spacingHorizontalM);\r\n}\r\n\r\n:host([appearance='underline']) .root {\r\n  background: var(--colorTransparentBackground);\r\n  border: 0;\r\n  border-radius: 0;\r\n  border-bottom: var(--strokeWidthThin) solid var(--colorNeutralStrokeAccessible);\r\n}\r\n\r\n:host([appearance='underline']) .root:hover {\r\n  border-bottom-color: var(--colorNeutralStrokeAccessibleHover);\r\n}\r\n\r\n:host([appearance='underline']) .root:active {\r\n  border-bottom-color: var(--colorNeutralStrokeAccessiblePressed);\r\n}\r\n\r\n:host([appearance='underline']) .root:focus-within {\r\n  border: 0;\r\n  border-bottom-color: var(--colorNeutralStrokeAccessiblePressed);\r\n}\r\n\r\n:host([appearance='underline'][disabled]) .root {\r\n  border-bottom-color: var(--colorNeutralStrokeDisabled);\r\n}\r\n\r\n:host([appearance='filled-lighter']) .root {\r\n  background: var(--colorNeutralBackground1);\r\n  border: var(--strokeWidthThin) solid var(--colorTransparentStroke);\r\n  box-shadow: var(--shadow2);\r\n}\r\n\r\n:host([appearance='filled-darker']) .root {\r\n  background: var(--colorNeutralBackground3);\r\n  border: var(--strokeWidthThin) solid var(--colorTransparentStroke);\r\n  box-shadow: var(--shadow2);\r\n}\r\n\r\n:host([appearance='filled-lighter']) .root:hover,\r\n:host([appearance='filled-darker']) .root:hover {\r\n  border-color: var(--colorTransparentStrokeInteractive);\r\n}\r\n\r\n:host([appearance='filled-lighter']) .root:active,\r\n:host([appearance='filled-darker']) .root:active {\r\n  border-color: var(--colorTransparentStrokeInteractive);\r\n  background: var(--colorNeutralBackground3);\r\n}\r\n";

class FluentSelect extends FluentElement {
  static styles = styles;
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
    this._boundHandleInput = this._handleInput.bind(this);
    this._boundHandleChange = this._handleChange.bind(this);
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

      this._selectEl.addEventListener('input', this._boundHandleInput);
      this._selectEl.addEventListener('change', this._boundHandleChange);

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
      case 'autofocus':
        if (newVal !== null) {
          this._selectEl.focus();
        }
        break;
      case 'aria-label':
      case 'aria-labelledby':
      case 'aria-describedby':
      case 'appearance':
      case 'control-size':
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

  get labels() {
    return this._internals.labels;
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
