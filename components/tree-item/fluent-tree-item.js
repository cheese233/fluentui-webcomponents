import { FluentElement } from '../../core/fluent-element.js';

const stylesUrl = new URL('./fluent-tree-item.css', import.meta.url).href;

class FluentTreeItem extends FluentElement {
  static stylesUrl = stylesUrl;
  static template = `
    <div class="root">
      <div class="positioning-region" part="positioning-region">
        <div class="content" part="content">
          <span class="chevron" part="chevron" aria-hidden="true">
            <slot name="chevron">
              <svg viewBox="0 0 12 12" fill="currentColor" width="12" height="12">
                <path d="M4.65 2.15a.5.5 0 000 .7L7.79 6 4.65 9.15a.5.5 0 10.7.7l3.5-3.5a.5.5 0 000-.7l-3.5-3.5a.5.5 0 00-.7 0z"/>
              </svg>
            </slot>
          </span>
          <slot name="start"></slot>
          <slot></slot>
          <slot name="end"></slot>
        </div>
        <div class="aside" part="aside">
          <slot name="aside"></slot>
        </div>
      </div>
      <div role="group" class="items" part="items">
        <slot name="item"></slot>
      </div>
    </div>
  `;

  static get observedAttributes() {
    return ['expanded', 'selected', 'disabled', 'data-indent', 'appearance', 'size', 'empty'];
  }

  constructor() {
    super();
    this._internals = this.attachInternals();
    this._internals.role = 'treeitem';
    this.childTreeItems = [];
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.parentElement && this.parentElement.tagName.toLowerCase() === 'fluent-tree-item') {
      this.setAttribute('slot', 'item');
    }

    this.setAttribute('tabindex', '-1');

    const itemSlot = this._root.querySelector('slot[name="item"]');
    if (itemSlot) {
      itemSlot.addEventListener('slotchange', () => this._handleItemSlotChange());
    }

    this._handleItemSlotChange();
    this._updateEmpty();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);

    switch (name) {
      case 'expanded':
        this._internals.ariaExpanded = this.childTreeItems.length > 0
          ? String(newVal !== null)
          : null;
        this._toggleState('expanded', newVal !== null);
        break;
      case 'selected':
        this._internals.ariaSelected = String(newVal !== null);
        this._toggleState('selected', newVal !== null);
        if (oldVal !== newVal) {
          this.dispatchEvent(new CustomEvent('change', { bubbles: true }));
        }
        break;
      case 'disabled':
        this._internals.ariaDisabled = newVal !== null ? 'true' : null;
        this._toggleState('disabled', newVal !== null);
        break;
      case 'data-indent':
        this.style.setProperty('--indent', newVal || '0');
        break;
      case 'empty':
        this._toggleState('empty', newVal !== null);
        break;
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

  get selected() { return this.hasAttribute('selected'); }
  set selected(val) {
    if (val) { this.setAttribute('selected', ''); }
    else { this.removeAttribute('selected'); }
  }

  get expanded() { return this.hasAttribute('expanded'); }
  set expanded(val) {
    if (val) { this.setAttribute('expanded', ''); }
    else { this.removeAttribute('expanded'); }
  }

  get disabled() { return this.hasAttribute('disabled'); }

  toggleExpansion() {
    if (this.childTreeItems.length > 0) {
      this.expanded = !this.expanded;
    }
  }

  get isHidden() {
    let parent = this.parentElement;
    while (parent && parent.tagName.toLowerCase() === 'fluent-tree-item') {
      if (!parent.hasAttribute('expanded')) return true;
      parent = parent.parentElement && parent.parentElement.closest
        ? parent.parentElement.closest('fluent-tree-item')
        : null;
    }
    return false;
  }

  get isNestedItem() {
    const parent = this.parentElement;
    return parent && parent.tagName.toLowerCase() === 'fluent-tree-item';
  }

  _handleItemSlotChange() {
    const itemSlot = this._root.querySelector('slot[name="item"]');
    if (!itemSlot) return;
    this.childTreeItems = itemSlot.assignedElements().filter(
      el => el.tagName.toLowerCase() === 'fluent-tree-item',
    );
    this._updateEmpty();
    this._updateChildIndent();
  }

  _updateEmpty() {
    if (this.childTreeItems.length === 0) {
      this.setAttribute('empty', '');
    } else {
      this.removeAttribute('empty');
    }
  }

  _updateChildIndent() {
    const indent = parseInt(this.getAttribute('data-indent') || '0', 10);
    this.childTreeItems.forEach(item => {
      item.setAttribute('data-indent', String(indent + 1));
    });
  }
}

customElements.define('fluent-tree-item', FluentTreeItem);
