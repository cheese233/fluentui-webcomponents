import { FluentElement } from '../../core/fluent-element.js';

const stylesUrl = new URL('./fluent-slider.css', import.meta.url).href;

function limit(min, max, value) {
  return Math.max(min, Math.min(max, value));
}

function convertPixelToPercent(pixelPos, minPosition, maxPosition, direction) {
  let pct = limit(0, 1, (pixelPos - minPosition) / (maxPosition - minPosition));
  if (direction === 'rtl') {
    pct = 1 - pct;
  }
  return pct;
}

class FluentSlider extends FluentElement {
  static stylesUrl = stylesUrl;
  static formAssociated = true;

  static template = `
    <div class="root">
      <div part="track-container" class="track" ref="track"></div>
      <div part="thumb-container" class="thumb-container" ref="thumbContainer">
        <slot name="thumb">
          <div class="thumb"></div>
        </slot>
      </div>
    </div>
  `;

  static get observedAttributes() {
    return ['min', 'max', 'step', 'value', 'disabled', 'orientation', 'size', 'mode'];
  }

  constructor() {
    super();
    this._internals = this.attachInternals();
    this._internals.role = 'slider';
    this._internals.ariaOrientation = 'horizontal';
    this._value = '';
    this._isDragging = false;
    this._stepMultiplier = 1;
    this._direction = 'ltr';
    this._trackWidth = 0;
    this._trackMinWidth = 0;
    this._trackHeight = 0;
    this._trackMinHeight = 0;
    this._trackLeft = 0;
    this._boundPointerDown = this._handlePointerDown.bind(this);
    this._boundPointerMove = this._handlePointerMove.bind(this);
    this._boundPointerUp = this._handleWindowPointerUp.bind(this);
    this._boundKeydown = this._handleKeydown.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this._shadowRoot = this._root;
    requestAnimationFrame(() => {
      if (!this.isConnected) return;
      this._direction = getComputedStyle(this).direction;
      this._updateDisabled();
      this._updateStepMultiplier();
      this._setupTrackConstraints();
      this._setupDefaultValue();
      this._setSliderPosition();
      this._handleStepStyles();
      this.addEventListener('pointerdown', this._boundPointerDown);
      this.addEventListener('keydown', this._boundKeydown);
    });
  }

  changed(name, oldVal, newVal) {
    switch (name) {
      case 'min':
        this._internals.ariaValueMin = this._minAsNumber + '';
        if (this.isConnected && this._minAsNumber > this._valueAsNumber) {
          this.value = this.getAttribute('min');
        }
        this._setSliderPosition();
        break;
      case 'max':
        this._internals.ariaValueMax = this._maxAsNumber + '';
        if (this.isConnected && this._maxAsNumber < this._valueAsNumber) {
          this.value = this.getAttribute('max');
        }
        this._setSliderPosition();
        break;
      case 'step':
        this._updateStepMultiplier();
        if (this.isConnected) {
          this.value = this._value;
        }
        this._handleStepStyles();
        break;
      case 'value':
        if (!this._dirtyValue) {
          this._value = newVal || '';
          this._setupDefaultValue();
          this._setSliderPosition();
        }
        break;
      case 'disabled':
        this._updateDisabled();
        break;
      case 'orientation':
        this._internals.ariaOrientation = newVal || 'horizontal';
        if (this.isConnected) this._setSliderPosition();
        break;
      case 'size':
      case 'mode':
        break;
    }
  }

  get value() {
    return this._value || '';
  }

  set value(val) {
    if (!this.isConnected) {
      this._value = val;
      return;
    }
    const nextAsNumber = parseFloat(val) || 0;
    const constrained = this._convertToConstrainedValue(nextAsNumber);
    const newVal = limit(this._minAsNumber, this._maxAsNumber, constrained).toString();

    if (newVal !== val && !isNaN(parseFloat(val))) {
      this.value = newVal;
      return;
    }

    this._value = val;
    this._internals.ariaValueNow = this._value;
    this._setSliderPosition();
    this._setFormValue(this._value);
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  get valueAsNumber() {
    return parseFloat(this.value) || 0;
  }

  set valueAsNumber(next) {
    this.value = next.toString();
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  get form() {
    return this._internals.form;
  }

  get labels() {
    return Object.freeze(Array.from(this._internals.labels));
  }

  get validity() {
    return this._internals.validity;
  }

  get validationMessage() {
    return this._internals.validationMessage;
  }

  get willValidate() {
    return this._internals.willValidate;
  }

  get orientation() {
    return this.getAttribute('orientation') || 'horizontal';
  }

  checkValidity() {
    return this._internals.checkValidity();
  }

  reportValidity() {
    return this._internals.reportValidity();
  }

  setCustomValidity(message) {
    this._setValidity({ customError: !!message }, message);
  }

  increment() {
    const newVal = this._direction === 'rtl' && this.orientation !== 'vertical'
      ? this.valueAsNumber - this._stepAsNumber
      : this.valueAsNumber + this._stepAsNumber;
    this.value = Math.min(this._maxAsNumber, this._convertToConstrainedValue(newVal)).toString();
  }

  decrement() {
    const newVal = this._direction === 'rtl' && this.orientation !== 'vertical'
      ? this.valueAsNumber + this._stepAsNumber
      : this.valueAsNumber - this._stepAsNumber;
    this.value = Math.max(this._minAsNumber, this._convertToConstrainedValue(newVal)).toString();
  }

  _handleKeydown(e) {
    if (this.disabled) return;
    switch (e.key) {
      case 'Home':
        e.preventDefault();
        this.value = this._direction !== 'rtl' && this.orientation !== 'vertical'
          ? this._minAsNumber.toString()
          : this._maxAsNumber.toString();
        break;
      case 'End':
        e.preventDefault();
        this.value = this._direction !== 'rtl' && this.orientation !== 'vertical'
          ? this._maxAsNumber.toString()
          : this._minAsNumber.toString();
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        if (!e.shiftKey) {
          e.preventDefault();
          this.increment();
        }
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        if (!e.shiftKey) {
          e.preventDefault();
          this.decrement();
        }
        break;
    }
  }

  _handlePointerDown(event) {
    if (event === null || this.disabled) return;

    const windowFn = event !== null ? window.addEventListener : window.removeEventListener;
    windowFn('pointerup', this._boundPointerUp);
    document.addEventListener('mouseleave', this._boundPointerUp);
    windowFn('pointermove', this._boundPointerMove);

    this._setupTrackConstraints();
    const track = this._shadowRoot.querySelector('.track');
    if (!track) return;

    const thumbEl = this._shadowRoot.querySelector('.thumb') || this._shadowRoot.querySelector('.thumb-container');
    const thumbWidth = thumbEl ? thumbEl.getBoundingClientRect().width : 0;

    const controlValue = this.orientation === 'vertical'
      ? event.pageY - document.documentElement.scrollTop
      : event.pageX - document.documentElement.scrollLeft - this._trackLeft - thumbWidth / 2;

    this.value = this._calculateNewValue(controlValue).toString();
    this._isDragging = true;
  }

  _handlePointerMove(event) {
    if (this.disabled || event.defaultPrevented) return;
    const sourceEvent = window.TouchEvent && event instanceof TouchEvent ? event.touches[0] : event;

    const track = this._shadowRoot.querySelector('.track');
    const thumbEl = this._shadowRoot.querySelector('.thumb') || this._shadowRoot.querySelector('.thumb-container');
    if (!track || !thumbEl) return;

    const thumbWidth = thumbEl.getBoundingClientRect().width;

    const eventValue = this.orientation === 'vertical'
      ? sourceEvent.pageY - document.documentElement.scrollTop
      : sourceEvent.pageX - document.documentElement.scrollLeft - this._trackLeft - thumbWidth / 2;

    this.value = this._calculateNewValue(eventValue).toString();
  }

  _handleWindowPointerUp() {
    this._isDragging = false;
    window.removeEventListener('pointerup', this._boundPointerUp);
    window.removeEventListener('pointermove', this._boundPointerMove);
    document.removeEventListener('mouseleave', this._boundPointerUp);
  }

  _calculateNewValue(rawValue) {
    this._setupTrackConstraints();
    const newPosition = convertPixelToPercent(
      rawValue,
      this.orientation === 'vertical' ? this._trackMinHeight : this._trackMinWidth,
      this.orientation === 'vertical' ? this._trackHeight : this._trackWidth,
      this.orientation === 'vertical' ? undefined : this._direction
    );
    const newValue = (this._maxAsNumber - this._minAsNumber) * newPosition + this._minAsNumber;
    return this._convertToConstrainedValue(newValue);
  }

  _convertToConstrainedValue(value) {
    if (isNaN(value)) value = this._minAsNumber;
    let constrained = value - this._minAsNumber;
    const rounded = Math.round(constrained / this._stepAsNumber);
    const remainder = constrained - (rounded * (this._stepMultiplier * this._stepAsNumber)) / this._stepMultiplier;
    constrained = remainder >= this._stepAsNumber / 2
      ? constrained - remainder + this._stepAsNumber
      : constrained - remainder;
    return constrained + this._minAsNumber;
  }

  _setSliderPosition() {
    const pct = convertPixelToPercent(
      parseFloat(this._value) || 0,
      this._minAsNumber,
      this._maxAsNumber,
      this.orientation === 'vertical' ? undefined : this._direction
    );
    const percentage = pct * 100;
    const root = this._root.querySelector('.root');
    if (root) {
      root.style.setProperty('--slider-thumb', percentage + '%');
      root.style.setProperty('--slider-progress', percentage + '%');
    }
    this.style.setProperty('--slider-thumb', percentage + '%');
    this.style.setProperty('--slider-progress', percentage + '%');
  }

  _setupTrackConstraints() {
    const track = this._shadowRoot.querySelector('.track');
    if (!track) return;
    const clientRect = track.getBoundingClientRect();
    this._trackWidth = track.clientWidth || 1;
    this._trackMinWidth = track.clientLeft;
    this._trackHeight = clientRect.top;
    this._trackMinHeight = clientRect.bottom;
    const root = this._root.querySelector('.root');
    this._trackLeft = root ? root.getBoundingClientRect().left : clientRect.left;
  }

  _setupDefaultValue() {
    if (!this._value) {
      const initialVal = this.getAttribute('value');
      this._value = initialVal || this._midpoint;
    }
    if (!isNaN(this._valueAsNumber) && (this._valueAsNumber < this._minAsNumber || this._valueAsNumber > this._maxAsNumber)) {
      this._value = this._midpoint;
    }
    this._internals.ariaValueNow = this._value;
  }

  _updateStepMultiplier() {
    const stepStr = this._stepAsNumber + '';
    const decimalPlaces = !!(this._stepAsNumber % 1) ? stepStr.length - stepStr.indexOf('.') - 1 : 0;
    this._stepMultiplier = Math.pow(10, decimalPlaces);
  }

  _updateDisabled() {
    const d = this.disabled;
    this._internals.ariaDisabled = d.toString();
    this.tabIndex = d ? -1 : 0;
  }

  _handleStepStyles() {
    const root = this._root.querySelector('.root');
    if (this.hasAttribute('step')) {
      const totalSteps = (100 / Math.floor((this._maxAsNumber - this._minAsNumber) / this._stepAsNumber));
      this.style.setProperty('--step-rate', totalSteps + '%');
      if (root) root.style.setProperty('--step-rate', totalSteps + '%');
    } else {
      this.style.removeProperty('--step-rate');
      if (root) root.style.removeProperty('--step-rate');
    }
  }

  _setFormValue(value) {
    this._internals.setFormValue(value, value);
  }

  _setValidity(flags, message) {
    if (this.isConnected) {
      if (this.disabled) {
        this._internals.setValidity({});
        return;
      }
      const msg = message || this.validationMessage;
      this._internals.setValidity(
        { customError: !!msg, ...flags },
        msg || undefined
      );
    }
  }

  formResetCallback() {
    this.value = this.getAttribute('value') || this._midpoint;
  }

  formDisabledCallback(disabled) {
    this._updateDisabled();
  }

  get _minAsNumber() {
    const min = this.getAttribute('min');
    if (min !== null && min !== undefined) {
      const parsed = parseFloat(min);
      if (!isNaN(parsed)) return parsed;
    }
    return 0;
  }

  get _maxAsNumber() {
    const max = this.getAttribute('max');
    if (max !== null && max !== undefined) {
      const parsed = parseFloat(max);
      if (!isNaN(parsed)) return parsed;
    }
    return 100;
  }

  get _stepAsNumber() {
    const step = this.getAttribute('step');
    if (step !== null && step !== undefined) {
      const parsed = parseFloat(step);
      if (!isNaN(parsed) && parsed > 0) return parsed;
    }
    return 1;
  }

  get _valueAsNumber() {
    return parseFloat(this._value);
  }

  get _midpoint() {
    return this._convertToConstrainedValue((this._maxAsNumber + this._minAsNumber) / 2).toString();
  }
}

customElements.define('fluent-slider', FluentSlider);
