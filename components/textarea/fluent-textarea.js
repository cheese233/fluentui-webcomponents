import { FluentElement } from '../../core/fluent-element.js';

const styles = ":host { display: block; }\r\n\r\n.root {\r\n  --font-size: var(--fontSizeBase300);\r\n  --line-height: var(--lineHeightBase300);\r\n  --padding-inline: var(--spacingHorizontalMNudge);\r\n  --padding-block: var(--spacingVerticalSNudge);\r\n  --min-block-size: 52px;\r\n  --block-size: var(--min-block-size);\r\n  --inline-size: 18rem;\r\n  --border-width: var(--strokeWidthThin);\r\n  --control-padding-inline: var(--spacingHorizontalXXS);\r\n  --color: var(--colorNeutralForeground1);\r\n  --background-color: var(--colorNeutralBackground1);\r\n  --border-color: var(--colorNeutralStroke1);\r\n  --border-block-end-color: var(--colorNeutralStrokeAccessible);\r\n  --placeholder-color: var(--colorNeutralForeground4);\r\n  --focus-indicator-color: var(--colorCompoundBrandStroke);\r\n  --box-shadow: none;\r\n  --contain-size: size;\r\n  --resize: none;\r\n\r\n  color: var(--color);\r\n  font-family: var(--fontFamilyBase);\r\n  font-size: var(--font-size);\r\n  font-weight: var(--fontWeightRegular);\r\n  line-height: var(--line-height);\r\n  background-color: var(--background-color);\r\n  border: var(--border-width) solid var(--border-color);\r\n  border-block-end-color: var(--border-block-end-color);\r\n  border-radius: var(--borderRadiusMedium);\r\n  box-sizing: border-box;\r\n  box-shadow: var(--box-shadow);\r\n  display: grid;\r\n  grid-template: 1fr / 1fr;\r\n  inline-size: var(--inline-size);\r\n  min-block-size: var(--min-block-size);\r\n  block-size: var(--block-size);\r\n  overflow: hidden;\r\n  padding: var(--padding-block) var(--padding-inline);\r\n  position: relative;\r\n  resize: var(--resize);\r\n}\r\n\r\n.root::after {\r\n  border-bottom: 2px solid var(--focus-indicator-color);\r\n  border-radius: 0 0 var(--borderRadiusMedium) var(--borderRadiusMedium);\r\n  box-sizing: border-box;\r\n  clip-path: inset(calc(100% - 2px) 1px 0px);\r\n  content: '';\r\n  height: max(2px, var(--borderRadiusMedium));\r\n  inset: auto -1px 0;\r\n  position: absolute;\r\n  transform: scaleX(0);\r\n  transition-delay: var(--curveAccelerateMid);\r\n  transition-duration: var(--durationUltraFast);\r\n  transition-property: transform;\r\n}\r\n\r\n.root:hover {\r\n  --border-color: var(--colorNeutralStroke1Hover);\r\n  --border-block-end-color: var(--colorNeutralStrokeAccessibleHover);\r\n}\r\n\r\n.root:active {\r\n  --border-color: var(--colorNeutralStroke1Pressed);\r\n  --border-block-end-color: var(--colorNeutralStrokeAccessiblePressed);\r\n}\r\n\r\n.root:focus-within {\r\n  outline: none;\r\n}\r\n\r\n:host([block]:not([hidden])) .root {\r\n  display: block;\r\n}\r\n\r\n:host([size='small']) .root {\r\n  --font-size: var(--fontSizeBase200);\r\n  --line-height: var(--lineHeightBase200);\r\n  --min-block-size: 40px;\r\n  --padding-block: var(--spacingVerticalXS);\r\n  --padding-inline: var(--spacingHorizontalSNudge);\r\n  --control-padding-inline: var(--spacingHorizontalXXS);\r\n}\r\n\r\n:host([size='large']) .root {\r\n  --font-size: var(--fontSizeBase400);\r\n  --line-height: var(--lineHeightBase400);\r\n  --min-block-size: 64px;\r\n  --padding-block: var(--spacingVerticalS);\r\n  --padding-inline: var(--spacingHorizontalM);\r\n  --control-padding-inline: var(--spacingHorizontalSNudge);\r\n}\r\n\r\n:host([resize='both']:not(:disabled)) .root {\r\n  --resize: both;\r\n}\r\n\r\n:host([resize='horizontal']:not(:disabled)) .root {\r\n  --resize: horizontal;\r\n}\r\n\r\n:host([resize='vertical']:not(:disabled)) .root {\r\n  --resize: vertical;\r\n}\r\n\r\n:host([auto-resize]) .root {\r\n  --block-size: auto;\r\n  --contain-size: inline-size;\r\n}\r\n\r\n:host([appearance='filled-darker']) .root {\r\n  --background-color: var(--colorNeutralBackground3);\r\n  --border-color: var(--background-color);\r\n  --border-block-end-color: var(--border-color);\r\n}\r\n\r\n:host([appearance='filled-lighter']) .root {\r\n  --border-color: var(--background-color);\r\n  --border-block-end-color: var(--border-color);\r\n}\r\n\r\n:host([appearance='filled-darker'][display-shadow]) .root,\r\n:host([appearance='filled-lighter'][display-shadow]) .root {\r\n  --box-shadow: var(--shadow2);\r\n}\r\n\r\n.root.user-invalid {\r\n  --border-color: var(--colorPaletteRedBorder2);\r\n  --border-block-end-color: var(--colorPaletteRedBorder2);\r\n}\r\n\r\n.root:disabled {\r\n  --color: var(--colorNeutralForegroundDisabled);\r\n  --background-color: var(--colorTransparentBackground);\r\n  --border-color: var(--colorNeutralStrokeDisabled);\r\n  --border-block-end-color: var(--border-color);\r\n  --box-shadow: none;\r\n  --placeholder-color: var(--colorNeutralForegroundDisabled);\r\n  cursor: no-drop;\r\n  user-select: none;\r\n}\r\n\r\n:host([block]) .root {\r\n  inline-size: auto;\r\n}\r\n\r\n.root:focus-within::after {\r\n  transform: scaleX(1);\r\n  transition-property: transform;\r\n  transition-duration: var(--durationNormal);\r\n  transition-delay: var(--curveDecelerateMid);\r\n}\r\n\r\n:host([readonly]) .root::after,\r\n.root:disabled::after {\r\n  content: none;\r\n}\r\n\r\nlabel {\r\n  color: var(--color);\r\n  display: flex;\r\n  inline-size: fit-content;\r\n  padding-block-end: var(--spacingVerticalXS);\r\n  padding-inline-end: var(--spacingHorizontalXS);\r\n}\r\n\r\n:host(:empty) label,\r\nlabel[hidden] {\r\n  display: none;\r\n}\r\n\r\n.control {\r\n  appearance: none;\r\n  background-color: transparent;\r\n  border: 0;\r\n  color: inherit;\r\n  field-sizing: content;\r\n  max-block-size: 100%;\r\n  outline: 0;\r\n  resize: none;\r\n  text-align: inherit;\r\n  box-sizing: border-box;\r\n  font: inherit;\r\n  grid-column: 1 / -1;\r\n  grid-row: 1 / -1;\r\n  padding: 0 var(--control-padding-inline);\r\n}\r\n\r\n.control:disabled {\r\n  cursor: inherit;\r\n}\r\n\r\n.control::placeholder {\r\n  color: var(--placeholder-color);\r\n}\r\n\r\n::selection {\r\n  color: var(--colorNeutralForegroundInverted);\r\n  background-color: var(--colorNeutralBackgroundInverted);\r\n}\r\n\r\n@media (forced-colors: active) {\r\n  .root {\r\n    --border-color: FieldText;\r\n    --border-block-end-color: FieldText;\r\n    --focus-indicator-color: Highlight;\r\n    --placeholder-color: FieldText;\r\n  }\r\n\r\n  .root:hover,\r\n  .root:active,\r\n  .root:focus-within {\r\n    --border-color: Highlight;\r\n    --border-block-end-color: Highlight;\r\n  }\r\n\r\n  .root:disabled {\r\n    --color: GrayText;\r\n    --border-color: GrayText;\r\n    --border-block-end-color: GrayText;\r\n    --placeholder-color: GrayText;\r\n  }\r\n}\r\n";

class FluentTextArea extends FluentElement {
  static styles = styles;
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
    this._autoSizerEl = null;
    this._autoSizerObserver = null;
    this._boundHandleInput = this._handleControlInput.bind(this);
    this._boundHandleChange = this._handleControlChange.bind(this);
    this._boundHandleSelect = this._handleControlSelect.bind(this);
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

      this._textarea.addEventListener('input', this._boundHandleInput);
      this._textarea.addEventListener('change', this._boundHandleChange);
      this._textarea.addEventListener('select', this._boundHandleSelect);

      new MutationObserver(() => this._setValidity()).observe(this._textarea, {
        attributes: true,
        attributeFilter: ['disabled', 'required', 'readonly', 'maxlength', 'minlength']
      });

      this._updateLabelVisibility();
      this._updateResize();
      this._maybeCreateAutoSizer();
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._autoSizerObserver?.disconnect();
    this._autoSizerObserver = null;
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
        this._updateResize();
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
        break;
      case 'auto-resize':
        this._maybeCreateAutoSizer();
        break;
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

  get textLength() {
    return this._textarea ? this._textarea.textLength : 0;
  }

  get type() {
    return 'textarea';
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
    if (this._autoSizerEl && this._textarea) {
      this._autoSizerEl.textContent = this._textarea.value + ' ';
    }
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

  _updateResize() {
    const ta = this._textarea;
    if (!ta) return;
    const resize = this.getAttribute('resize');
    ta.style.resize = resize || 'none';
  }

  _maybeCreateAutoSizer() {
    if (CSS.supports('field-sizing: content')) {
      if (this._autoSizerEl) {
        this._autoSizerEl.remove();
        this._autoSizerEl = null;
      }
      return;
    }

    const autoResize = this.hasAttribute('auto-resize');
    if (!autoResize) {
      if (this._autoSizerEl) {
        this._autoSizerEl.remove();
        this._autoSizerEl = null;
      }
      this._autoSizerObserver?.disconnect();
      return;
    }

    if (!this._autoSizerEl) {
      this._autoSizerEl = document.createElement('div');
      this._autoSizerEl.classList.add('auto-sizer');
      this._autoSizerEl.setAttribute('aria-hidden', 'true');
    }

    const root = this._shadowRoot?.querySelector('.root');
    if (root) {
      root.insertBefore(this._autoSizerEl, root.firstChild);
    }

    if (this._textarea) {
      this._autoSizerEl.textContent = this._textarea.value + ' ';
    }

    if (!this._autoSizerObserver) {
      this._autoSizerObserver = new ResizeObserver(() => {
        if (this._autoSizerEl && this._textarea) {
          this._autoSizerEl.textContent = this._textarea.value + ' ';
        }
      });
    }
    this._autoSizerObserver.observe(this._textarea);
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
