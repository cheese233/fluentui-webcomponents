import { FluentElement } from '../../core/fluent-element.js';

const styles = ":host { display: block; }\r\n\r\n.root {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  background-color: var(--colorNeutralBackground1);\r\n  border: var(--strokeWidthThin) solid var(--colorNeutralStroke2);\r\n  border-radius: var(--borderRadiusXLarge);\r\n  color: var(--colorNeutralForeground1);\r\n  font-family: var(--fontFamilyBase);\r\n  font-size: var(--fontSizeBase300);\r\n  line-height: var(--lineHeightBase300);\r\n  padding: var(--spacingVerticalL) var(--spacingHorizontalL);\r\n  overflow: hidden;\r\n  position: relative;\r\n}\r\n\r\n:host([appearance='filled-alternative']) .root {\r\n  background-color: var(--colorNeutralBackground2);\r\n  border-color: transparent;\r\n}\r\n\r\n:host([appearance='filled-alternative']) .root:hover {\r\n  background-color: var(--colorNeutralBackground2Hover);\r\n}\r\n\r\n:host([appearance='outline']) .root {\r\n  background-color: var(--colorTransparentBackground);\r\n}\r\n\r\n:host([appearance='outline']) .root:hover {\r\n  background-color: var(--colorTransparentBackgroundHover);\r\n}\r\n\r\n:host([appearance='subtle']) .root {\r\n  background-color: var(--colorSubtleBackground);\r\n  border-color: transparent;\r\n}\r\n\r\n:host([appearance='subtle']) .root:hover {\r\n  background-color: var(--colorSubtleBackgroundHover);\r\n}\r\n\r\n:host([size='small']) .root {\r\n  padding: var(--spacingVerticalM) var(--spacingHorizontalM);\r\n  border-radius: var(--borderRadiusLarge);\r\n  font-size: var(--fontSizeBase200);\r\n  line-height: var(--lineHeightBase200);\r\n}\r\n\r\n:host([size='large']) .root {\r\n  padding: var(--spacingVerticalXL) var(--spacingHorizontalXL);\r\n  font-size: var(--fontSizeBase400);\r\n  line-height: var(--lineHeightBase400);\r\n}\r\n\r\n::slotted([slot='preview']) {\r\n  margin: calc(-1 * var(--spacingVerticalL)) calc(-1 * var(--spacingHorizontalL)) var(--spacingVerticalL);\r\n  width: calc(100% + 2 * var(--spacingHorizontalL));\r\n  display: block;\r\n}\r\n\r\n::slotted([slot='header']) {\r\n  margin-bottom: var(--spacingVerticalM);\r\n}\r\n\r\n::slotted([slot='footer']) {\r\n  margin-top: var(--spacingVerticalM);\r\n  padding-top: var(--spacingVerticalM);\r\n  border-top: var(--strokeWidthThin) solid var(--colorNeutralStroke2);\r\n}\r\n\r\n@media (forced-colors: active) {\r\n  .root {\r\n    border-color: ButtonText;\r\n  }\r\n}\r\n\r\n@media screen and (prefers-reduced-motion: reduce) {\r\n  .root {\r\n    transition-duration: 0.01ms;\r\n  }\r\n}\r\n";

class FluentCard extends FluentElement {
  static styles = styles;
  static template = `
    <div class="root">
      <slot name="preview"></slot>
      <slot name="header"></slot>
      <slot></slot>
      <slot name="footer"></slot>
    </div>
  `;

  static get observedAttributes() {
    return ['appearance', 'size'];
  }
}

customElements.define('fluent-card', FluentCard);
