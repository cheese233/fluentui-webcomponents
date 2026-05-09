import { FluentElement } from '../../core/fluent-element.js';

const stylesUrl = new URL('./fluent-spinner.css', import.meta.url).href;

class FluentSpinner extends FluentElement {
  static stylesUrl = stylesUrl;
  static template = `
    <div class="root">
      <slot name="indicator">
        <div class="background"></div>
        <div class="progress">
          <div class="spinner">
            <div class="start">
              <div class="indicator"></div>
            </div>
            <div class="end">
              <div class="indicator"></div>
            </div>
          </div>
        </div>
      </slot>
    </div>
  `;

  static get observedAttributes() {
    return ['size', 'appearance'];
  }
}

customElements.define('fluent-spinner', FluentSpinner);
