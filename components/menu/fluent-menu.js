import { FluentElement } from '../../core/fluent-element.js';

const stylesUrl = new URL('./fluent-menu.css', import.meta.url).href;

class FluentMenu extends FluentElement {
  static stylesUrl = stylesUrl;
  static template = `
    <div class="root">
      <slot name="primary-action"></slot>
      <slot name="trigger"></slot>
      <slot></slot>
    </div>
  `;

  static get observedAttributes() {
    return ['open-on-hover', 'open-on-context', 'close-on-scroll', 'persist-on-item-click', 'split'];
  }

  constructor() {
    super();
    this._open = false;
    this._trigger = null;
    this._menuList = null;
    this._triggerAbortController = null;
    this._menuListAbortController = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this._setupSlots();
    this.setComponent();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._triggerAbortController) {
      this._triggerAbortController.abort();
      this._triggerAbortController = null;
    }
    if (this._menuListAbortController) {
      this._menuListAbortController.abort();
      this._menuListAbortController = null;
    }
  }

  setComponent() {
    this._setupTriggerSlot();
    this._setupMenuListSlot();
  }

  _setupSlots() {
    const triggerSlot = this._root.querySelector('slot[name="trigger"]');
    const defaultSlot = this._root.querySelector('slot:not([name])');

    if (triggerSlot) {
      triggerSlot.addEventListener('slotchange', () => this._setupTriggerSlot());
    }
    if (defaultSlot) {
      defaultSlot.addEventListener('slotchange', () => this._setupMenuListSlot());
    }

    this._setupTriggerSlot();
    this._setupMenuListSlot();
  }

  _setupTriggerSlot() {
    if (this._triggerAbortController) {
      this._triggerAbortController.abort();
      this._triggerAbortController = null;
    }

    const triggerSlot = this._root.querySelector('slot[name="trigger"]');
    if (!triggerSlot) return;
    const assigned = triggerSlot.assignedElements();
    if (assigned.length === 0) return;
    this._trigger = assigned[0];
    this._trigger.setAttribute('aria-haspopup', 'true');
    this._trigger.setAttribute('aria-expanded', String(this._open));

    this._triggerAbortController = new AbortController();
    const { signal } = this._triggerAbortController;

    this._trigger.addEventListener('keydown', this._triggerKeydownHandler, { signal });

    if (this.hasAttribute('open-on-hover')) {
      this._trigger.addEventListener('mouseover', this.openMenu, { signal });
    } else if (this.hasAttribute('open-on-context')) {
      this._trigger.addEventListener('contextmenu', this.openMenu, { signal });
      document.addEventListener('click', this._documentClickHandler, { signal });
    } else {
      this._trigger.addEventListener('click', this.toggleMenu, { signal });
    }
  }

  _setupMenuListSlot() {
    if (this._menuListAbortController) {
      this._menuListAbortController.abort();
      this._menuListAbortController = null;
    }

    const defaultSlot = this._root.querySelector('slot:not([name])');
    if (!defaultSlot) return;
    const assigned = defaultSlot.assignedElements();
    if (assigned.length === 0) return;

    // Use a wrapper div as menu list if first child is a menu-item
    if (assigned[0].tagName.toLowerCase() === 'fluent-menu-item') {
      // All children are menu items, render them directly
      this._menuList = this;
    } else {
      this._menuList = assigned[0];
    }

    if (this._menuList && this._menuList !== this) {
      this._menuList.setAttribute('popover', this.hasAttribute('open-on-context') ? 'manual' : '');
      this._menuListAbortController = new AbortController();
      const { signal } = this._menuListAbortController;

      this._menuList.addEventListener('toggle', this._toggleHandler, { signal });

      if (!this.hasAttribute('persist-on-item-click')) {
        this._menuList.addEventListener('change', this.closeMenu, { signal });
      }
    }
  }

  toggleMenu = () => {
    if (this._menuList && this._menuList !== this) {
      this._menuList.togglePopover(!this._open);
    }
  };

  closeMenu = (event) => {
    if (this._menuList && this._menuList !== this) {
      this._menuList.togglePopover(false);
    }
    if (this.hasAttribute('close-on-scroll')) {
      document.removeEventListener('scroll', this.closeMenu);
    }
  };

  openMenu = (e) => {
    if (this._menuList && this._menuList !== this) {
      this._menuList.togglePopover(true);
    }
    if (e && this.hasAttribute('open-on-context')) {
      e.preventDefault();
    }
    if (this.hasAttribute('close-on-scroll')) {
      document.addEventListener('scroll', this.closeMenu);
    }
  };

  focusMenuList() {
    if (this._menuList) {
      this._menuList.focus();
    }
  }

  focusTrigger() {
    if (this._trigger) {
      this._trigger.focus();
    }
  }

  _toggleHandler = (e) => {
    if (e.type === 'toggle' && e.newState) {
      const open = e.newState === 'open';
      if (this._trigger) {
        this._trigger.setAttribute('aria-expanded', String(open));
      }
      if (this._menuList) {
        this._menuList.setAttribute('focusgroup', open ? 'menu' : 'none');
      }
      this._open = open;
      if (this._open) {
        this.focusMenuList();
      }
    }
  };

  _triggerKeydownHandler = (e) => {
    if (e.defaultPrevented) return;
    switch (e.key) {
      case ' ':
      case 'Enter':
        e.preventDefault();
        this.toggleMenu();
        break;
      default:
        return true;
    }
  };

  _documentClickHandler = (e) => {
    if (!e.composedPath().some(el => el === this._trigger || el === this._menuList)) {
      this.closeMenu();
    }
  };
}

customElements.define('fluent-menu', FluentMenu);
