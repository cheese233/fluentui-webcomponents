import { FluentElement } from '../../core/fluent-element.js';

const styles = ":host { display: block; }\r\n\r\n.root {\r\n  --indent: 0;\r\n  display: grid;\r\n  align-items: center;\r\n  background: var(--colorNeutralBackground1);\r\n  border-radius: var(--borderRadiusMedium);\r\n  color: var(--colorNeutralForeground2);\r\n  cursor: pointer;\r\n  flex-shrink: 0;\r\n  font: var(--fontWeightRegular) var(--fontSizeBase300) / var(--lineHeightBase300) var(--fontFamilyBase);\r\n  grid-gap: 4px;\r\n  grid-template-columns: 20px 20px auto 20px;\r\n  height: 32px;\r\n  overflow: visible;\r\n  padding: 0 10px;\r\n}\r\n\r\n.root:hover {\r\n  background: var(--colorNeutralBackground1Hover);\r\n  color: var(--colorNeutralForeground2Hover);\r\n}\r\n\r\n.root:active {\r\n  background-color: var(--colorNeutralBackground1Selected);\r\n  color: var(--colorNeutralForeground2Pressed);\r\n}\r\n\r\n:host(:active) ::slotted([slot='start']) {\r\n  color: var(--colorCompoundBrandForeground1Pressed);\r\n}\r\n\r\n:host(:state(disabled)) .root {\r\n  background-color: var(--colorNeutralBackgroundDisabled);\r\n  color: var(--colorNeutralForegroundDisabled);\r\n}\r\n\r\n:host(:state(disabled)) ::slotted([slot='start']),\r\n:host(:state(disabled)) ::slotted([slot='end']) {\r\n  color: var(--colorNeutralForegroundDisabled);\r\n}\r\n\r\n.root:focus-visible {\r\n  border-radius: var(--borderRadiusMedium);\r\n  outline: var(--strokeWidthThick) solid var(--colorStrokeFocus2);\r\n}\r\n\r\n.content {\r\n  white-space: nowrap;\r\n  flex-grow: 1;\r\n  grid-column: auto / span 2;\r\n  padding: 0 2px;\r\n}\r\n\r\n:host(:not(:state(checked))) .indicator,\r\n:host(:not(:state(checked))) ::slotted([slot='indicator']),\r\n:host(:not(:state(submenu))) .submenu-glyph,\r\n:host(:not(:state(submenu))) ::slotted([slot='submenu-glyph']) {\r\n  display: none;\r\n}\r\n\r\n::slotted([slot='end']) {\r\n  color: var(--colorNeutralForeground3);\r\n  font: var(--fontWeightRegular) var(--fontSizeBase200) / var(--lineHeightBase200) var(--fontFamilyBase);\r\n  white-space: nowrap;\r\n}\r\n\r\n:host([data-indent='1']) {\r\n  --indent: 1;\r\n}\r\n\r\n:host([data-indent='2']) .root {\r\n  --indent: 2;\r\n  grid-template-columns: 20px 20px auto auto;\r\n}\r\n\r\n:host(:state(submenu)) .root {\r\n  grid-template-columns: 20px auto auto 20px;\r\n}\r\n\r\n:host([data-indent='2']:state(submenu)) .root {\r\n  grid-template-columns: 20px 20px auto auto 20px;\r\n}\r\n\r\n.indicator,\r\n::slotted([slot='indicator']) {\r\n  grid-column: 1 / span 1;\r\n  width: 20px;\r\n}\r\n\r\n::slotted([slot='start']) {\r\n  display: inline-flex;\r\n  grid-column: calc(var(--indent)) / span 1;\r\n}\r\n\r\n.content {\r\n  grid-column: calc(var(--indent) + 1) / span 1;\r\n}\r\n\r\n::slotted([slot='end']) {\r\n  grid-column: calc(var(--indent) + 2) / span 1;\r\n  justify-self: end;\r\n}\r\n\r\n.submenu-glyph,\r\n::slotted([slot='submenu-glyph']) {\r\n  grid-column: -2 / span 1;\r\n  justify-self: end;\r\n}\r\n\r\n/* Submenu popover positioning */\r\n@layer popover {\r\n  :host {\r\n    anchor-name: --menu-trigger;\r\n    position: relative;\r\n  }\r\n\r\n  ::slotted([popover]) {\r\n    margin: 0;\r\n    max-height: var(--menu-max-height, auto);\r\n    position: absolute;\r\n    position-anchor: --menu-trigger;\r\n    position-area: inline-end span-block-end;\r\n    position-try-fallbacks: flip-inline, block-start, block-end;\r\n    z-index: 1;\r\n  }\r\n\r\n  ::slotted([popover]:not(:popover-open)) {\r\n    display: none;\r\n  }\r\n\r\n  ::slotted([popover]:popover-open) {\r\n    inset: unset;\r\n  }\r\n\r\n  @supports not (anchor-name: --menu-trigger) {\r\n    ::slotted([popover]) {\r\n      align-self: start;\r\n    }\r\n  }\r\n}\r\n\r\n@media (forced-colors: active) {\r\n  :host(:state(disabled)),\r\n  :host(:state(disabled)) ::slotted([slot='start']),\r\n  :host(:state(disabled)) ::slotted([slot='end']) {\r\n    color: GrayText;\r\n  }\r\n}\r\n";

class FluentMenuItem extends FluentElement {
  static styles = styles;
  static template = `
    <div class="root">
      <slot name="indicator">
        <svg class="indicator" fill="currentColor" aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.05 3.49c.28.3.27.77-.04 1.06l-7.93 7.47A.85.85 0 014.9 12L2.22 9.28a.75.75 0 111.06-1.06l2.24 2.27 7.47-7.04a.75.75 0 011.06.04z" fill="currentColor"/>
        </svg>
      </slot>
      <slot name="start"></slot>
      <div class="content" part="content">
        <slot></slot>
      </div>
      <slot name="end"></slot>
      <slot name="submenu-glyph">
        <svg class="submenu-glyph" fill="currentColor" aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.74 3.2a.75.75 0 00-.04 1.06L9.23 8 5.7 11.74a.75.75 0 101.1 1.02l4-4.25a.75.75 0 000-1.02l-4-4.25a.75.75 0 00-1.06-.04z" fill="currentColor"/>
        </svg>
      </slot>
      <slot name="submenu"></slot>
    </div>
  `;

  static formAssociated = true;

  static get observedAttributes() {
    return ['checked', 'disabled', 'role'];
  }

  constructor() {
    super();
    this._internals = this.attachInternals();
    this._internals.role = 'menuitem';
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('tabindex', '0');
    this.addEventListener('keydown', this._handleKeyDown);
    this.addEventListener('click', this._handleClick);
    this.addEventListener('mouseover', this._handleMouseOver);
    this.addEventListener('mouseout', this._handleMouseOut);
    this.addEventListener('toggle', this._handleToggle);

    this._internals.role = this.getAttribute('role') || 'menuitem';

    const role = this._internals.role;
    if (role === 'menuitemcheckbox' || role === 'menuitemradio') {
      this._internals.ariaChecked = String(!!this.hasAttribute('checked'));
    }
  }

  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (name === 'disabled') {
      const isDisabled = newVal !== null;
      this._internals.ariaDisabled = isDisabled ? 'true' : null;
      this._toggleState('disabled', isDisabled);
    }
    if (name === 'checked') {
      const isChecked = newVal !== null;
      const checkable = this._internals.role === 'menuitemcheckbox' || this._internals.role === 'menuitemradio';
      this._internals.ariaChecked = checkable ? String(isChecked) : null;
      this._toggleState('checked', checkable ? isChecked : false);
    }
    if (name === 'role' && newVal) {
      this._internals.role = newVal;
    }
  }

  _toggleState(name, value) {
    try {
      if (value) {
        this._internals.states.add(name);
      } else {
        this._internals.states.delete(name);
      }
    } catch (e) { /* states API may not be supported */ }
  }

  _handleKeyDown = (e) => {
    if (e.defaultPrevented) return;
    switch (e.key) {
      case 'Enter':
      case ' ':
        this._invoke();
        break;
      case 'ArrowRight':
        if (!this.hasAttribute('disabled')) {
          const submenu = this.querySelector('[slot="submenu"]');
          if (submenu) {
            try { submenu.togglePopover(true); } catch (ex) { }
            submenu.focus();
          }
        }
        break;
      case 'ArrowLeft':
        if (this.parentElement && this.parentElement.hasAttribute('popover')) {
          try { this.parentElement.togglePopover(false); } catch (ex) { }
          if (this.parentElement.parentElement) {
            this.parentElement.parentElement.focus();
          }
        }
        break;
      default:
        return;
    }
    e.preventDefault();
  };

  _handleClick = (e) => {
    if (e.defaultPrevented || this.hasAttribute('disabled')) return;
    this._invoke();
  };

  _handleMouseOver = (e) => {
    if (this.hasAttribute('disabled')) return;
    const submenu = this.querySelector('[slot="submenu"]');
    if (submenu) {
      try { submenu.togglePopover(true); } catch (ex) { }
    }
  };

  _handleMouseOut = (e) => {
    const submenu = this.querySelector('[slot="submenu"]');
    if (submenu && !this.contains(document.activeElement)) {
      try { submenu.togglePopover(false); } catch (ex) { }
    }
  };

  _handleToggle = (e) => {
    if (!(e instanceof ToggleEvent)) return;
    const submenu = this.querySelector('[slot="submenu"]');
    if (!submenu) return;

    if (e.newState === 'open') {
      this._internals.ariaExpanded = 'true';
    } else if (e.newState === 'closed') {
      this._internals.ariaExpanded = 'false';
    }
    submenu.setAttribute('focusgroup', e.newState === 'open' ? 'menu' : 'none');
  };

  _invoke() {
    if (this.hasAttribute('disabled')) return;
    const role = this._internals.role;

    if (role === 'menuitemcheckbox') {
      const checked = this.hasAttribute('checked');
      if (checked) {
        this.removeAttribute('checked');
      } else {
        this.setAttribute('checked', '');
      }
      this.dispatchEvent(new CustomEvent('change', { bubbles: true, detail: !checked }));
    } else if (role === 'menuitemradio') {
      if (!this.hasAttribute('checked')) {
        this.setAttribute('checked', '');
        this.dispatchEvent(new CustomEvent('change', { bubbles: true, detail: true }));
      }
    } else if (role === 'menuitem') {
      const submenu = this.querySelector('[slot="submenu"]');
      if (submenu) {
        try { submenu.togglePopover(true); } catch (ex) { }
        submenu.focus();
      } else {
        this.dispatchEvent(new CustomEvent('change', { bubbles: true }));
      }
    }
  }
}

customElements.define('fluent-menu-item', FluentMenuItem);
