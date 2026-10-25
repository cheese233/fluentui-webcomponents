import { FluentElement } from '../../core/fluent-element.js';

const styles = ":host { display: inline; }\r\n\r\n.root {\r\n  display: inline;\r\n  font-family: var(--fontFamilyBase);\r\n  font-size: var(--fontSizeBase300);\r\n  line-height: var(--lineHeightBase300);\r\n  font-weight: var(--fontWeightRegular);\r\n  text-align: start;\r\n}\r\n\r\n:host([nowrap]) .root,\r\n:host([nowrap]) .root ::slotted(*) {\r\n  white-space: nowrap;\r\n  overflow: hidden;\r\n}\r\n\r\n:host([truncate]) .root,\r\n:host([truncate]) .root ::slotted(*) {\r\n  text-overflow: ellipsis;\r\n}\r\n\r\n:host([block]) .root {\r\n  display: block;\r\n}\r\n\r\n:host([italic]) .root {\r\n  font-style: italic;\r\n}\r\n\r\n:host([underline]) .root {\r\n  text-decoration-line: underline;\r\n}\r\n\r\n:host([strikethrough]) .root {\r\n  text-decoration-line: line-through;\r\n}\r\n\r\n:host([underline][strikethrough]) .root {\r\n  text-decoration-line: line-through underline;\r\n}\r\n\r\n:host([size='100']) .root {\r\n  font-size: var(--fontSizeBase100);\r\n  line-height: var(--lineHeightBase100);\r\n}\r\n\r\n:host([size='200']) .root {\r\n  font-size: var(--fontSizeBase200);\r\n  line-height: var(--lineHeightBase200);\r\n}\r\n\r\n:host([size='400']) .root {\r\n  font-size: var(--fontSizeBase400);\r\n  line-height: var(--lineHeightBase400);\r\n}\r\n\r\n:host([size='500']) .root {\r\n  font-size: var(--fontSizeBase500);\r\n  line-height: var(--lineHeightBase500);\r\n}\r\n\r\n:host([size='600']) .root {\r\n  font-size: var(--fontSizeBase600);\r\n  line-height: var(--lineHeightBase600);\r\n}\r\n\r\n:host([size='700']) .root {\r\n  font-size: var(--fontSizeBase700);\r\n  line-height: var(--lineHeightBase700);\r\n}\r\n\r\n:host([size='800']) .root {\r\n  font-size: var(--fontSizeBase800);\r\n  line-height: var(--lineHeightBase800);\r\n}\r\n\r\n:host([size='900']) .root {\r\n  font-size: var(--fontSizeBase900);\r\n  line-height: var(--lineHeightBase900);\r\n}\r\n\r\n:host([size='1000']) .root {\r\n  font-size: var(--fontSizeBase1000);\r\n  line-height: var(--lineHeightBase1000);\r\n}\r\n\r\n:host([font='monospace']) .root {\r\n  font-family: var(--fontFamilyMonospace);\r\n}\r\n\r\n:host([font='numeric']) .root {\r\n  font-family: var(--fontFamilyNumeric);\r\n}\r\n\r\n:host([weight='medium']) .root {\r\n  font-weight: var(--fontWeightMedium);\r\n}\r\n\r\n:host([weight='semibold']) .root {\r\n  font-weight: var(--fontWeightSemibold);\r\n}\r\n\r\n:host([weight='bold']) .root {\r\n  font-weight: var(--fontWeightBold);\r\n}\r\n\r\n:host([align='center']) .root {\r\n  text-align: center;\r\n}\r\n\r\n:host([align='end']) .root {\r\n  text-align: end;\r\n}\r\n\r\n:host([align='justify']) .root {\r\n  text-align: justify;\r\n}\r\n\r\n::slotted(*) {\r\n  font: inherit;\r\n  line-height: inherit;\r\n  text-decoration-line: inherit;\r\n  text-align: inherit;\r\n  margin: 0;\r\n}\r\n";

class FluentText extends FluentElement {
  static styles = styles;
  static template = `<div class="root"><slot></slot></div>`;

  static formAssociated = true;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  static get observedAttributes() {
    return ['size', 'weight', 'font', 'align', 'nowrap', 'truncate', 'italic', 'underline', 'strikethrough', 'block'];
  }
}

customElements.define('fluent-text', FluentText);
