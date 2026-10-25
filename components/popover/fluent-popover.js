import { FluentElement } from '../../core/fluent-element.js';

const styles = ":host { display: block; }\r\n\r\n.root {\r\n  display: inline-block;\r\n  position: relative;\r\n}\r\n\r\n::slotted([slot='trigger']) {\r\n  cursor: pointer;\r\n}\r\n\r\n.popover {\r\n  display: none;\r\n  position: absolute;\r\n  inset: unset;\r\n  top: calc(100% + var(--spacingVerticalS));\r\n  left: 50%;\r\n  translate: -50% 0;\r\n  background: var(--colorNeutralBackground1);\r\n  border: var(--strokeWidthThin) solid var(--colorNeutralStroke1);\r\n  border-radius: var(--borderRadiusMedium);\r\n  box-shadow: var(--shadow16);\r\n  color: var(--colorNeutralForeground1);\r\n  font-family: var(--fontFamilyBase);\r\n  font-size: var(--fontSizeBase300);\r\n  line-height: var(--lineHeightBase300);\r\n  min-width: 120px;\r\n  padding: var(--spacingVerticalXS) 0;\r\n  z-index: 1000;\r\n  white-space: nowrap;\r\n}\r\n\r\n.arrow {\r\n  display: none;\r\n  position: absolute;\r\n  top: calc(-1 * var(--strokeWidthThick));\r\n  left: 50%;\r\n  translate: -50% 0;\r\n  width: 0;\r\n  height: 0;\r\n  border-left: 8px solid transparent;\r\n  border-right: 8px solid transparent;\r\n  border-bottom: 8px solid var(--colorNeutralStroke1);\r\n}\r\n\r\n.arrow::after {\r\n  content: '';\r\n  position: absolute;\r\n  top: var(--strokeWidthThin);\r\n  left: -8px;\r\n  width: 0;\r\n  height: 0;\r\n  border-left: 8px solid transparent;\r\n  border-right: 8px solid transparent;\r\n  border-bottom: 8px solid var(--colorNeutralBackground1);\r\n}\r\n\r\n:host([positioning='above']) .popover {\r\n  top: unset;\r\n  bottom: calc(100% + var(--spacingVerticalS));\r\n}\r\n\r\n:host([positioning='above']) .arrow {\r\n  top: unset;\r\n  bottom: calc(-1 * var(--strokeWidthThick));\r\n  border-bottom: none;\r\n  border-top: 8px solid var(--colorNeutralStroke1);\r\n}\r\n\r\n:host([positioning='above']) .arrow::after {\r\n  top: calc(-1 * (var(--strokeWidthThick) + var(--strokeWidthThin)));\r\n  border-bottom: none;\r\n  border-top: 8px solid var(--colorNeutralBackground1);\r\n}\r\n\r\n:host([positioning='before']) .popover {\r\n  left: unset;\r\n  top: 50%;\r\n  right: calc(100% + var(--spacingHorizontalS));\r\n  translate: 0 -50%;\r\n}\r\n\r\n:host([positioning='after']) .popover {\r\n  left: calc(100% + var(--spacingHorizontalS));\r\n  top: 50%;\r\n  translate: 0 -50%;\r\n}\r\n\r\n@media (forced-colors: active) {\r\n  .popover {\r\n    border-color: ButtonText;\r\n  }\r\n}\r\n";

class FluentPopover extends FluentElement {
  static styles = styles;
  static template = `
    <div class="root">
      <slot name="trigger"></slot>
      <div class="popover" part="popover">
        <div class="arrow"></div>
        <slot></slot>
      </div>
    </div>
  `;

  static get observedAttributes() {
    return ['open', 'anchor', 'positioning'];
  }

  connectedCallback() {
    super.connectedCallback();
    this._popover = this._root.querySelector('.popover');
    this._arrow = this._root.querySelector('.arrow');
    this._triggerSlot = this._root.querySelector('slot[name="trigger"]');

    this._triggerSlot.addEventListener('slotchange', () => {
      this._setupTrigger();
    });
    this._setupTrigger();

    this._popover.addEventListener('click', (e) => e.stopPropagation());
    document.addEventListener('click', this._documentClickHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._documentClickHandler);
  }

  _setupTrigger() {
    const assigned = this._triggerSlot.assignedElements();
    if (assigned.length > 0) {
      const trigger = assigned[0];
      trigger.setAttribute('aria-haspopup', 'true');
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggle();
      });
      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.close();
          trigger.focus();
        }
      });
    }
  }

  toggle() {
    const isOpen = this.hasAttribute('open');
    if (isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.setAttribute('open', '');
    this._popover.style.display = 'block';
    this._triggerSlot.assignedElements().forEach(el => {
      el.setAttribute('aria-expanded', 'true');
    });
  }

  close() {
    this.removeAttribute('open');
    this._popover.style.display = 'none';
    this._triggerSlot.assignedElements().forEach(el => {
      el.setAttribute('aria-expanded', 'false');
    });
  }

  _documentClickHandler = (e) => {
    if (!this.hasAttribute('open')) return;
    const path = e.composedPath();
    if (!path.includes(this)) {
      this.close();
    }
  };
}

customElements.define('fluent-popover', FluentPopover);
