import { FluentElement } from '../../core/fluent-element.js';

const stylesUrl = new URL('./fluent-dialog.css', import.meta.url).href;

class FluentDialog extends FluentElement {
  static stylesUrl = stylesUrl;
  static template = `
    <div class="root">
      <dialog class="dialog" part="dialog">
        <slot></slot>
      </dialog>
    </div>
  `;

  static get observedAttributes() {
    return ['type', 'trigger', 'close-on', 'aria-label', 'aria-labelledby', 'aria-describedby'];
  }

  connectedCallback() {
    super.connectedCallback();
    this._dialog = this._root.querySelector('dialog');
    if (this._dialog) {
      this._dialog.addEventListener('click', (e) => this._clickHandler(e));
      this._dialog.addEventListener('cancel', () => this.hide());
      this._updateDialogAttributes();
    }
    requestAnimationFrame(() => this._wireTrigger());
    requestAnimationFrame(() => this._wireCloseOn());
  }

  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (name === 'type') {
      this._updateDialogAttributes();
    }
    if (name === 'trigger' && oldVal !== newVal) {
      this._wireTrigger();
    }
    if (name === 'close-on' && oldVal !== newVal) {
      this._wireCloseOn();
    }
    if (this._dialog && (name === 'aria-label' || name === 'aria-labelledby' || name === 'aria-describedby')) {
      if (newVal !== null) {
        this._dialog.setAttribute(name, newVal);
      } else {
        this._dialog.removeAttribute(name);
      }
    }
  }

  show() {
    if (!this._dialog) return;
    this.setAttribute('open', '');
    this.dispatchEvent(new CustomEvent('beforetoggle', {
      detail: { oldState: this._dialog.open ? 'open' : 'closed', newState: this._dialog.open ? 'closed' : 'open' }
    }));
    const type = this.getAttribute('type') || 'modal';
    if (type === 'alert' || type === 'modal') {
      this._dialog.showModal();
    } else {
      this._dialog.show();
    }
    this.dispatchEvent(new CustomEvent('toggle', {
      detail: { oldState: 'closed', newState: 'open' }
    }));
  }

  hide() {
    if (!this._dialog) return;
    this.removeAttribute('open');
    this.dispatchEvent(new CustomEvent('beforetoggle', {
      detail: { oldState: 'open', newState: 'closed' }
    }));
    this._dialog.close();
    this.dispatchEvent(new CustomEvent('toggle', {
      detail: { oldState: 'open', newState: 'closed' }
    }));
  }

  _wireTrigger() {
    const sel = this.getAttribute('trigger');
    if (!sel) return;
    if (this._triggerEl) {
      this._triggerEl.removeEventListener('click', this._onTriggerClick);
    }
    const el = this._root.host?.ownerDocument?.querySelector(sel) ?? document.querySelector(sel);
    if (el) {
      this._triggerEl = el;
      this._onTriggerClick = () => this.show();
      el.addEventListener('click', this._onTriggerClick);
    }
  }

  _wireCloseOn() {
    const sel = this.getAttribute('close-on');
    if (!sel) return;
    if (this._closeOnCleanups) {
      this._closeOnCleanups.forEach(fn => fn());
    }
    this._closeOnCleanups = [];
    sel.split(',').forEach(s => {
      const p = s.trim();
      if (!p) return;
      const doc = this._root.host?.ownerDocument ?? document;
      const els = doc.querySelectorAll(p);
      els.forEach(el => {
        const handler = () => this.hide();
        el.addEventListener('click', handler);
        this._closeOnCleanups.push(() => el.removeEventListener('click', handler));
      });
    });
  }

  _clickHandler(event) {
    const type = this.getAttribute('type') || 'modal';
    if (this._dialog.open && type !== 'alert' && event.target === this._dialog) {
      this.hide();
    }
  }

  _updateDialogAttributes() {
    if (!this._dialog) return;
    const type = this.getAttribute('type') || 'modal';
    if (type === 'alert') {
      this._dialog.setAttribute('role', 'alertdialog');
    } else {
      this._dialog.removeAttribute('role');
    }
    if (type !== 'non-modal') {
      this._dialog.setAttribute('aria-modal', 'true');
    } else {
      this._dialog.removeAttribute('aria-modal');
    }
  }
}

customElements.define('fluent-dialog', FluentDialog);
