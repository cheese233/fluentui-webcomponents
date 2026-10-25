import { FluentElement } from '../../core/fluent-element.js';

const styles = ":host { display: inline-flex; }\r\n\r\n:host([hidden]) .root {\r\n  display: none;\r\n}\r\n\r\n.root {\r\n  position: relative;\r\n  display: inline-flex;\r\n  --duration: 1.5s;\r\n  --indicatorSize: var(--strokeWidthThicker);\r\n  --size: 32px;\r\n  height: var(--size);\r\n  width: var(--size);\r\n}\r\n\r\n:host([size='tiny']) .root {\r\n  --indicatorSize: var(--strokeWidthThick);\r\n  --size: 20px;\r\n}\r\n:host([size='extra-small']) .root {\r\n  --indicatorSize: var(--strokeWidthThick);\r\n  --size: 24px;\r\n}\r\n:host([size='small']) .root {\r\n  --indicatorSize: var(--strokeWidthThick);\r\n  --size: 28px;\r\n}\r\n:host([size='large']) .root {\r\n  --indicatorSize: var(--strokeWidthThicker);\r\n  --size: 36px;\r\n}\r\n:host([size='extra-large']) .root {\r\n  --indicatorSize: var(--strokeWidthThicker);\r\n  --size: 40px;\r\n}\r\n:host([size='huge']) .root {\r\n  --indicatorSize: var(--strokeWidthThickest);\r\n  --size: 44px;\r\n}\r\n\r\n.progress,\r\n.background,\r\n.spinner,\r\n.start,\r\n.end,\r\n.indicator {\r\n  position: absolute;\r\n  inset: 0;\r\n}\r\n\r\n.progress,\r\n.spinner,\r\n.indicator {\r\n  animation: none var(--duration) infinite var(--curveEasyEase);\r\n}\r\n\r\n.progress {\r\n  animation-timing-function: linear;\r\n  animation-name: spin-linear;\r\n}\r\n\r\n.background {\r\n  border: var(--indicatorSize) solid var(--colorBrandStroke2);\r\n  border-radius: 50%;\r\n}\r\n\r\n:host([appearance='inverted']) .root .background {\r\n  border-color: rgba(255, 255, 255, 0.2);\r\n}\r\n\r\n.spinner {\r\n  animation-name: spin-swing;\r\n}\r\n\r\n.start {\r\n  overflow: hidden;\r\n  right: 50%;\r\n}\r\n\r\n.end {\r\n  overflow: hidden;\r\n  left: 50%;\r\n}\r\n\r\n.indicator {\r\n  color: var(--colorBrandStroke1);\r\n  box-sizing: border-box;\r\n  border-radius: 50%;\r\n  border: var(--indicatorSize) solid transparent;\r\n  border-block-start-color: currentcolor;\r\n  border-right-color: currentcolor;\r\n}\r\n\r\n:host([appearance='inverted']) .root .indicator {\r\n  color: var(--colorNeutralStrokeOnBrand2);\r\n}\r\n\r\n.start .indicator {\r\n  rotate: 135deg;\r\n  inset: 0 -100% 0 0;\r\n  animation-name: spin-start;\r\n}\r\n\r\n.end .indicator {\r\n  rotate: 135deg;\r\n  inset: 0 0 0 -100%;\r\n  animation-name: spin-end;\r\n}\r\n\r\n@keyframes spin-linear {\r\n  100% {\r\n    transform: rotate(360deg);\r\n  }\r\n}\r\n\r\n@keyframes spin-swing {\r\n  0% {\r\n    transform: rotate(-135deg);\r\n  }\r\n  50% {\r\n    transform: rotate(0deg);\r\n  }\r\n  100% {\r\n    transform: rotate(225deg);\r\n  }\r\n}\r\n\r\n@keyframes spin-start {\r\n  0%,\r\n  100% {\r\n    transform: rotate(0deg);\r\n  }\r\n  50% {\r\n    transform: rotate(-80deg);\r\n  }\r\n}\r\n\r\n@keyframes spin-end {\r\n  0%,\r\n  100% {\r\n    transform: rotate(0deg);\r\n  }\r\n  50% {\r\n    transform: rotate(70deg);\r\n  }\r\n}\r\n\r\n@media (forced-colors: active) {\r\n  .background {\r\n    display: none;\r\n  }\r\n  .indicator {\r\n    border-color: Canvas;\r\n    border-block-start-color: Highlight;\r\n    border-right-color: Highlight;\r\n  }\r\n}\r\n";

class FluentSpinner extends FluentElement {
  static styles = styles;
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
