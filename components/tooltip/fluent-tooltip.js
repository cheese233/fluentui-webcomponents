import { FluentElement } from '../../core/fluent-element.js';

const stylesUrl = new URL('./fluent-tooltip.css', import.meta.url).href;

let _tooltipIdCounter = 0;

class FluentTooltip extends FluentElement {
  static stylesUrl = stylesUrl;
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
