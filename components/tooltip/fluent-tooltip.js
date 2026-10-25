import { FluentElement } from '../../core/fluent-element.js';

const styles = ":host(:not(:popover-open)) {\r\n  display: none;\r\n}\r\n\r\n:host {\r\n  inset-area: block-start;\r\n  position-try-options: flip-block;\r\n  inset: unset;\r\n  margin: 0;\r\n  width: max-content;\r\n}\r\n\r\n.root {\r\n  background: var(--colorNeutralBackground1);\r\n  border-radius: var(--borderRadiusMedium);\r\n  border: var(--strokeWidthThin) solid var(--colorTransparentStroke);\r\n  box-sizing: border-box;\r\n  color: var(--colorNeutralForeground1);\r\n  font-family: var(--fontFamilyBase);\r\n  font-size: var(--fontSizeBase200);\r\n  line-height: var(--lineHeightBase200);\r\n  max-width: 240px;\r\n  padding: 4px var(--spacingHorizontalMNudge) 6px;\r\n  box-shadow: var(--shadow4);\r\n}\r\n\r\n:host([positioning='above-start'])   { inset-area: block-start span-inline-end; }\r\n:host([positioning='above'])         { inset-area: block-start; }\r\n:host([positioning='above-end'])     { inset-area: block-start span-inline-start; }\r\n:host([positioning='below-start'])   { inset-area: block-end span-inline-end; }\r\n:host([positioning='below'])         { inset-area: block-end; }\r\n:host([positioning='below-end'])     { inset-area: block-end span-inline-start; }\r\n:host([positioning='before-top'])    { inset-area: inline-start span-block-end; }\r\n:host([positioning='before'])        { inset-area: inline-start; }\r\n:host([positioning='before-bottom']) { inset-area: inline-start span-block-start; }\r\n:host([positioning='after-top'])     { inset-area: inline-end span-block-end; }\r\n:host([positioning='after'])         { inset-area: inline-end; }\r\n:host([positioning='after-bottom'])  { inset-area: inline-end span-block-start; }\r\n\r\n@supports not (inset-area: block-start) {\r\n  :host {\r\n    position-area: block-start;\r\n    position-try-options: flip-block;\r\n  }\r\n  :host([positioning='above-start'])   { position-area: block-start span-inline-end; }\r\n  :host([positioning='above'])         { position-area: block-start; }\r\n  :host([positioning='above-end'])     { position-area: block-start span-inline-start; }\r\n  :host([positioning='below-start'])   { position-area: block-end span-inline-end; }\r\n  :host([positioning='below'])         { position-area: block-end; }\r\n  :host([positioning='below-end'])     { position-area: block-end span-inline-start; }\r\n  :host([positioning='before-top'])    { position-area: inline-start span-block-end; }\r\n  :host([positioning='before'])        { position-area: inline-start; }\r\n  :host([positioning='before-bottom']) { position-area: inline-start span-block-start; }\r\n  :host([positioning='after-top'])     { position-area: inline-end span-block-end; }\r\n  :host([positioning='after'])         { position-area: inline-end; }\r\n  :host([positioning='after-bottom'])  { position-area: inline-end span-block-start; }\r\n}\r\n\r\n@media (forced-colors: active) {\r\n  .root {\r\n    border-color: ButtonText;\r\n  }\r\n}\r\n";

let _tooltipIdCounter = 0;

class FluentTooltip extends FluentElement {
  static styles = styles;
  static template = `<div class="root"><slot></slot></div>`;

  static formAssociated = true;

  static get observedAttributes() {
    return ['visible', 'anchor', 'positioning', 'delay'];
  }

  constructor() {
    super();
    this._internals = this.attachInternals();
    this._internals.role = 'tooltip';
    this._id = `fluent-tooltip-${++_tooltipIdCounter}`;
    this._defaultDelay = 250;
    this._anchorElement = null;
    this._timer = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('id', this._id);
    this.setAttribute('aria-hidden', 'true');
    this.setAttribute('popover', 'manual');
    this._resolveAnchor();
    this._addAnchorListeners();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._removeAnchorListeners();
    if (this._anchorElement) {
      this._anchorElement.style.removeProperty('anchor-name');
    }
  }

  _resolveAnchor() {
    const anchorId = this.getAttribute('anchor');
    if (!anchorId) return;
    const rootNode = this.getRootNode();
    this._anchorElement = (rootNode instanceof ShadowRoot ? rootNode : document).getElementById(anchorId);
    if (this._anchorElement) {
      this._anchorElement.style.setProperty('anchor-name', `--${this._id}`);
      this.style.setProperty('position-anchor', `--${this._id}`);
      const describedBy = this._anchorElement.getAttribute('aria-describedby');
      this._anchorElement.setAttribute('aria-describedby',
        describedBy ? `${describedBy} ${this._id}` : this._id);
    }
  }

  _addAnchorListeners() {
    if (!this._anchorElement) return;
    this._anchorElement.addEventListener('focus', this._focusHandler);
    this._anchorElement.addEventListener('blur', this._blurHandler);
    this._anchorElement.addEventListener('mouseenter', this._mouseenterHandler);
    this._anchorElement.addEventListener('mouseleave', this._mouseleaveHandler);
  }

  _removeAnchorListeners() {
    if (!this._anchorElement) return;
    this._anchorElement.removeEventListener('focus', this._focusHandler);
    this._anchorElement.removeEventListener('blur', this._blurHandler);
    this._anchorElement.removeEventListener('mouseenter', this._mouseenterHandler);
    this._anchorElement.removeEventListener('mouseleave', this._mouseleaveHandler);
  }

  show(delay) {
    clearTimeout(this._timer);
    const d = delay != null ? Number(delay) : this._defaultDelay;
    this._timer = setTimeout(() => {
      this.setAttribute('aria-hidden', 'false');
      this.showPopover();
    }, d);
  }

  hide(delay) {
    clearTimeout(this._timer);
    const d = delay != null ? Number(delay) : this._defaultDelay;
    this._timer = setTimeout(() => {
      if (this.matches(':hover') || (this._anchorElement && this._anchorElement.matches(':hover'))) {
        this.hide(d);
        return;
      }
      this.setAttribute('aria-hidden', 'true');
      this.hidePopover();
    }, d);
  }

  _focusHandler = () => this.show(0);
  _blurHandler = () => this.hide(0);
  _mouseenterHandler = () => this.show(this.getAttribute('delay'));
  _mouseleaveHandler = () => this.hide(this.getAttribute('delay'));
}

customElements.define('fluent-tooltip', FluentTooltip);
