import { FluentElement } from '../../core/fluent-element.js';

const stylesUrl = new URL('./fluent-tree.css', import.meta.url).href;

class FluentTree extends FluentElement {
  static stylesUrl = stylesUrl;
  static template = `<div class="root"><slot></slot></div>`;

  static get observedAttributes() {
    return ['appearance', 'size'];
  }

  constructor() {
    super();
    this._currentSelected = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'tree');
    this.setAttribute('tabindex', '0');
    this.addEventListener('click', this._clickHandler);
    this.addEventListener('keydown', this._keydownHandler);
    this.addEventListener('change', this._changeHandler);
    this._propagateAppearanceAndSize();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this._clickHandler);
    this.removeEventListener('keydown', this._keydownHandler);
    this.removeEventListener('change', this._changeHandler);
  }

  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (name === 'appearance' || name === 'size') {
      this._propagateAppearanceAndSize();
    }
  }

  _propagateAppearanceAndSize() {
    const appearance = this.getAttribute('appearance');
    const size = this.getAttribute('size');
    const items = this.querySelectorAll('fluent-tree-item');
    items.forEach(item => {
      if (appearance && !item.hasAttribute('appearance')) {
        item.setAttribute('appearance', appearance);
      }
      if (size && !item.hasAttribute('size')) {
        item.setAttribute('size', size);
      }
    });
  }

  _getVisibleItems() {
    const items = [];
    const walk = el => {
      for (const child of el.children) {
        if (child.tagName.toLowerCase() === 'fluent-tree-item') {
          if (!child.isHidden) {
            items.push(child);
            if (child.hasAttribute('expanded')) {
              walk(child);
            }
          }
        }
      }
    };
    walk(this);
    return items;
  }

  _clickHandler = e => {
    const item = e.target.closest('fluent-tree-item');
    if (!item || item.disabled) return;
    item.toggleExpansion();
    this._selectItem(item);
  };

  _changeHandler = e => {
    const item = e.target;
    if (!item || item.tagName.toLowerCase() !== 'fluent-tree-item') return;
    if (item.selected) {
      if (this._currentSelected && this._currentSelected !== item) {
        this._currentSelected.selected = false;
      }
      this._currentSelected = item;
    } else if (!item.selected && this._currentSelected === item) {
      this._currentSelected = null;
    }
  };

  _selectItem(item) {
    if (item.disabled) return;
    if (this._currentSelected && this._currentSelected !== item) {
      this._currentSelected.selected = false;
    }
    item.selected = true;
    this._currentSelected = item;
  }

  _keydownHandler = e => {
    if (e.defaultPrevented) return;

    const visibleItems = this._getVisibleItems();
    const focused = this._root.activeElement || document.activeElement;
    let idx = visibleItems.indexOf(focused);
    if (idx === -1) idx = visibleItems.indexOf(this._currentSelected);

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        if (idx > 0) visibleItems[idx - 1].focus();
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (idx >= 0 && idx < visibleItems.length - 1) visibleItems[idx + 1].focus();
        break;
      case 'ArrowLeft': {
        e.preventDefault();
        const item = visibleItems[idx] || this._currentSelected;
        if (item) {
          if (item.childTreeItems && item.childTreeItems.length && item.hasAttribute('expanded')) {
            item.expanded = false;
          } else {
            const parent = item.parentElement && item.parentElement.closest('fluent-tree-item');
            if (parent) parent.focus();
          }
        }
        break;
      }
      case 'ArrowRight': {
        e.preventDefault();
        const item = visibleItems[idx] || this._currentSelected;
        if (item) {
          if (item.childTreeItems && item.childTreeItems.length) {
            if (!item.hasAttribute('expanded')) {
              item.expanded = true;
            } else if (item.childTreeItems.length > 0) {
              item.childTreeItems[0].focus();
            }
          }
        }
        break;
      }
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (idx >= 0 && idx < visibleItems.length) {
          visibleItems[idx].toggleExpansion();
          this._selectItem(visibleItems[idx]);
        }
        break;
      case 'Home':
        e.preventDefault();
        if (visibleItems.length > 0) visibleItems[0].focus();
        break;
      case 'End':
        e.preventDefault();
        if (visibleItems.length > 0) visibleItems[visibleItems.length - 1].focus();
        break;
    }
  };
}

customElements.define('fluent-tree', FluentTree);
