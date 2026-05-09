import { FluentElement } from '../../core/fluent-element.js';

const stylesUrl = new URL('./fluent-popover.css', import.meta.url).href;

class FluentPopover extends FluentElement {
  static stylesUrl = stylesUrl;
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
