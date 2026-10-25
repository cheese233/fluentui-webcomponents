var e=class extends HTMLElement{static styles=``;static template=``;constructor(){super(),this._root=this.attachShadow({mode:`open`})}connectedCallback(){if(this.constructor.styles){let e=document.createElement(`style`);e.textContent=`/* ============================================================\r
   Fluent UI Web Components — Design Tokens\r
   Pure CSS, zero dependencies, zero build tools\r
\r
   Palette derivation ported from @microsoft/fast-colors\r
   ColorPalette algorithm:\r
     1. baseScale = [0:white, 0.5:baseColor, 1:black]\r
     2. clipLight = 0.185  (trim 18.5% from light end)\r
        clipDark  = 0.16   (trim 16%  from dark end)\r
     3. trimLight = baseScale.getColor(clipLight)   // segPos 0.37\r
        trimDark  = baseScale.getColor(1-clipDark)  // segPos 0.68\r
     4. Final scale: [0:trimLight, 0.5:baseColor, 1:trimDark]\r
     5. Generate stops at equal intervals between trimLight/trimDark\r
        through baseColor\r
\r
   Dark mode: clipLight = 0 so trimLight = white (pure foreground)\r
\r
   Theme switching: light-dark() CSS function + color-scheme property.\r
   Set color-scheme: light dark on :root for auto, override via JS.\r
   ============================================================ */\r
\r
:root {\r
    color-scheme: light dark;\r
}\r
\r
:host,\r
:root {\r
    /* ===== Base Colors ===== */\r
    /*\r
     * Use var(--foo-override, default) so page-level JS (theme picker)\r
     * can override --accent-base via --accent-base-override on :root,\r
     * which inherits through :host's var() fallback chain.\r
     * Direct :host definitions would block inheritance, so we delegate.\r
     */\r
    --accent-base: var(--accent-base-override, light-dark(#0f6cbd, #479ef5));\r
    --neutral-base: var(--neutral-base-override, light-dark(#808080, #b0b0b0));\r
\r
    /* ===== Trim Endpoints ===== */\r
    /*\r
     * trimLight = position 0.185 from white→base, segPos = 0.185/0.5 = 0.37\r
     * trimDark  = position 0.84  from base→black, segPos = (0.84-0.5)/0.5 = 0.68\r
     * In dark mode: trimLight = white (clipLight=0 for maximum foreground contrast)\r
     */\r
    --neutral-trim-light: light-dark(\r
        color-mix(in srgb, var(--neutral-base) 37%, white 63%),\r
        white\r
    );\r
    --neutral-trim-dark: color-mix(in srgb, black 68%, var(--neutral-base) 32%);\r
\r
    --brand-trim-light: light-dark(\r
        color-mix(in srgb, var(--accent-base) 37%, white 63%),\r
        white\r
    );\r
    --brand-trim-dark: color-mix(in srgb, black 68%, var(--accent-base) 32%);\r
\r
    /* ===== Neutral Palette (16 stops) ===== */\r
    /*\r
     * Scale direction: trimDark(0) → baseColor(0.5) → trimLight(1)\r
     * Mapping: N=10(darkest) … N=100(base) … N=160(lightest)\r
     * Dark side: segPos = (100 - N) / 90\r
     * Light side: segPos = (N - 100) / 60\r
     * All stops auto-adapt via --neutral-base and --neutral-trim-* light-dark() values.\r
     */\r
    --neutral-10: var(--neutral-trim-dark);\r
    --neutral-20: color-mix(in srgb, var(--neutral-trim-dark) 88.9%, var(--neutral-base) 11.1%);\r
    --neutral-30: color-mix(in srgb, var(--neutral-trim-dark) 77.8%, var(--neutral-base) 22.2%);\r
    --neutral-40: color-mix(in srgb, var(--neutral-trim-dark) 66.7%, var(--neutral-base) 33.3%);\r
    --neutral-50: color-mix(in srgb, var(--neutral-trim-dark) 55.6%, var(--neutral-base) 44.4%);\r
    --neutral-60: color-mix(in srgb, var(--neutral-trim-dark) 44.4%, var(--neutral-base) 55.6%);\r
    --neutral-70: color-mix(in srgb, var(--neutral-trim-dark) 33.3%, var(--neutral-base) 66.7%);\r
    --neutral-80: color-mix(in srgb, var(--neutral-trim-dark) 22.2%, var(--neutral-base) 77.8%);\r
    --neutral-90: color-mix(in srgb, var(--neutral-trim-dark) 11.1%, var(--neutral-base) 88.9%);\r
    --neutral-100: var(--neutral-base);\r
    --neutral-110: color-mix(in srgb, var(--neutral-trim-light) 16.7%, var(--neutral-base) 83.3%);\r
    --neutral-120: color-mix(in srgb, var(--neutral-trim-light) 33.3%, var(--neutral-base) 66.7%);\r
    --neutral-130: color-mix(in srgb, var(--neutral-trim-light) 50%, var(--neutral-base) 50%);\r
    --neutral-140: color-mix(in srgb, var(--neutral-trim-light) 66.7%, var(--neutral-base) 33.3%);\r
    --neutral-150: color-mix(in srgb, var(--neutral-trim-light) 83.3%, var(--neutral-base) 16.7%);\r
    --neutral-160: var(--neutral-trim-light);\r
\r
    /* ===== Brand Palette (16 stops) ===== */\r
    /*\r
     * Same algorithm as neutral. Saturation adjustments from fast-colors\r
     * (saturationLight=0.35, saturationDark=1.25, overlayDark=0.25)\r
     * are omitted — they require LCH/LAB color space not available in CSS.\r
     */\r
    --brand-10: var(--brand-trim-dark);\r
    --brand-20: color-mix(in srgb, var(--brand-trim-dark) 88.9%, var(--accent-base) 11.1%);\r
    --brand-30: color-mix(in srgb, var(--brand-trim-dark) 77.8%, var(--accent-base) 22.2%);\r
    --brand-40: color-mix(in srgb, var(--brand-trim-dark) 66.7%, var(--accent-base) 33.3%);\r
    --brand-50: color-mix(in srgb, var(--brand-trim-dark) 55.6%, var(--accent-base) 44.4%);\r
    --brand-60: color-mix(in srgb, var(--brand-trim-dark) 44.4%, var(--accent-base) 55.6%);\r
    --brand-70: color-mix(in srgb, var(--brand-trim-dark) 33.3%, var(--accent-base) 66.7%);\r
    --brand-80: color-mix(in srgb, var(--brand-trim-dark) 22.2%, var(--accent-base) 77.8%);\r
    --brand-90: color-mix(in srgb, var(--brand-trim-dark) 11.1%, var(--accent-base) 88.9%);\r
    --brand-100: var(--accent-base);\r
    --brand-110: color-mix(in srgb, var(--brand-trim-light) 16.7%, var(--accent-base) 83.3%);\r
    --brand-120: color-mix(in srgb, var(--brand-trim-light) 33.3%, var(--accent-base) 66.7%);\r
    --brand-130: color-mix(in srgb, var(--brand-trim-light) 50%, var(--accent-base) 50%);\r
    --brand-140: color-mix(in srgb, var(--brand-trim-light) 66.7%, var(--accent-base) 33.3%);\r
    --brand-150: color-mix(in srgb, var(--brand-trim-light) 83.3%, var(--accent-base) 16.7%);\r
    --brand-160: var(--brand-trim-light);\r
\r
    /* ===== Neutral Extensions (near-white / near-black) ===== */\r
    /*\r
     * Tint/Shade auto-adapt via --neutral-base (which is light-dark()).\r
     * --neutral-tint-N  = mix(base N%, white) → near-white\r
     * --neutral-shade-N = mix(black (100-N)%, base N%) → near-black\r
     */\r
    --neutral-tint-4:  color-mix(in srgb, var(--neutral-base) 4%, white 96%);\r
    --neutral-tint-8:  color-mix(in srgb, var(--neutral-base) 8%, white 92%);\r
    --neutral-tint-12: color-mix(in srgb, var(--neutral-base) 12%, white 88%);\r
    --neutral-tint-16: color-mix(in srgb, var(--neutral-base) 16%, white 84%);\r
    --neutral-tint-20: color-mix(in srgb, var(--neutral-base) 20%, white 80%);\r
    --neutral-tint-24: color-mix(in srgb, var(--neutral-base) 24%, white 76%);\r
    --neutral-tint-28: color-mix(in srgb, var(--neutral-base) 28%, white 72%);\r
    --neutral-tint-32: color-mix(in srgb, var(--neutral-base) 32%, white 68%);\r
\r
    --neutral-shade-2:  color-mix(in srgb, black 98%, var(--neutral-base) 2%);\r
    --neutral-shade-4:  color-mix(in srgb, black 96%, var(--neutral-base) 4%);\r
    --neutral-shade-6:  color-mix(in srgb, black 94%, var(--neutral-base) 6%);\r
    --neutral-shade-8:  color-mix(in srgb, black 92%, var(--neutral-base) 8%);\r
    --neutral-shade-10: color-mix(in srgb, black 90%, var(--neutral-base) 10%);\r
    --neutral-shade-12: color-mix(in srgb, black 88%, var(--neutral-base) 12%);\r
    --neutral-shade-14: color-mix(in srgb, black 86%, var(--neutral-base) 14%);\r
    --neutral-shade-16: color-mix(in srgb, black 84%, var(--neutral-base) 16%);\r
    --neutral-shade-18: color-mix(in srgb, black 82%, var(--neutral-base) 18%);\r
    --neutral-shade-20: color-mix(in srgb, black 80%, var(--neutral-base) 20%);\r
    --neutral-shade-22: color-mix(in srgb, black 78%, var(--neutral-base) 22%);\r
    --neutral-shade-24: color-mix(in srgb, black 76%, var(--neutral-base) 24%);\r
    --neutral-shade-26: color-mix(in srgb, black 74%, var(--neutral-base) 26%);\r
    --neutral-shade-28: color-mix(in srgb, black 72%, var(--neutral-base) 28%);\r
    --neutral-shade-30: color-mix(in srgb, black 70%, var(--neutral-base) 30%);\r
    --neutral-shade-32: color-mix(in srgb, black 68%, var(--neutral-base) 32%);\r
    --neutral-shade-34: color-mix(in srgb, black 66%, var(--neutral-base) 34%);\r
    --neutral-shade-36: color-mix(in srgb, black 64%, var(--neutral-base) 36%);\r
    --neutral-shade-38: color-mix(in srgb, black 62%, var(--neutral-base) 38%);\r
    --neutral-shade-40: color-mix(in srgb, black 60%, var(--neutral-base) 40%);\r
    --neutral-shade-42: color-mix(in srgb, black 58%, var(--neutral-base) 42%);\r
    --neutral-shade-44: color-mix(in srgb, black 56%, var(--neutral-base) 44%);\r
    --neutral-shade-46: color-mix(in srgb, black 54%, var(--neutral-base) 46%);\r
    --neutral-shade-48: color-mix(in srgb, black 52%, var(--neutral-base) 48%);\r
    --neutral-shade-50: color-mix(in srgb, black 50%, var(--neutral-base) 50%);\r
    --neutral-shade-52: color-mix(in srgb, black 48%, var(--neutral-base) 52%);\r
    --neutral-shade-54: color-mix(in srgb, black 46%, var(--neutral-base) 54%);\r
    --neutral-shade-56: color-mix(in srgb, black 44%, var(--neutral-base) 56%);\r
\r
    /* ===== Brand Color Tokens ===== */\r
    --colorBrandBackground: var(--brand-80);\r
    --colorBrandBackgroundHover: var(--brand-70);\r
    --colorBrandBackgroundPressed: var(--brand-40);\r
    --colorBrandBackgroundSelected: var(--brand-60);\r
    --colorBrandBackground2: var(--brand-160);\r
    --colorBrandBackground2Hover: var(--brand-150);\r
    --colorBrandBackground2Pressed: var(--brand-130);\r
    --colorBrandBackgroundStatic: var(--brand-80);\r
    --colorBrandBackgroundInverted: #fff;\r
    --colorBrandBackgroundInvertedHover: var(--brand-150);\r
    --colorBrandBackgroundInvertedPressed: var(--brand-140);\r
    --colorBrandBackgroundInvertedSelected: var(--brand-150);\r
    --colorBrandBackgroundDisabled: var(--neutral-150);\r
\r
    /* ===== Brand Foreground Tokens ===== */\r
    --colorBrandForeground1: light-dark(var(--brand-80), var(--brand-90));\r
    --colorBrandForeground2: var(--brand-110);\r
    --colorBrandForegroundLink: light-dark(var(--brand-70), var(--brand-100));\r
    --colorBrandForegroundLinkHover: light-dark(var(--brand-60), var(--brand-110));\r
    --colorBrandForegroundLinkPressed: light-dark(var(--brand-40), var(--brand-90));\r
    --colorBrandForegroundLinkSelected: light-dark(var(--brand-70), var(--brand-100));\r
    --colorBrandForegroundInverted: var(--brand-100);\r
    --colorBrandForegroundInvertedHover: var(--brand-110);\r
    --colorBrandForegroundInvertedPressed: var(--brand-100);\r
    --colorBrandForegroundOnLight: var(--brand-80);\r
\r
    /* ===== Brand Stroke Tokens ===== */\r
    --colorBrandStroke1: light-dark(var(--brand-80), var(--brand-100));\r
    --colorBrandStroke2: light-dark(var(--brand-140), var(--brand-50));\r
\r
    /* ===== Compound Brand Tokens ===== */\r
    --colorCompoundBrandBackground: var(--brand-80);\r
    --colorCompoundBrandBackgroundHover: var(--brand-70);\r
    --colorCompoundBrandBackgroundPressed: var(--brand-60);\r
    --colorCompoundBrandStroke: var(--brand-80);\r
    --colorCompoundBrandStrokeHover: var(--brand-70);\r
    --colorCompoundBrandStrokePressed: var(--brand-60);\r
    --colorCompoundBrandForeground1: var(--brand-80);\r
    --colorCompoundBrandForeground1Hover: var(--brand-70);\r
    --colorCompoundBrandForeground1Pressed: var(--brand-60);\r
\r
    /* ===== Neutral Foreground Tokens ===== */\r
    --colorNeutralForeground1: light-dark(var(--neutral-10), var(--neutral-160));\r
    --colorNeutralForeground1Hover: light-dark(var(--neutral-10), var(--neutral-150));\r
    --colorNeutralForeground1Pressed: light-dark(var(--neutral-10), var(--neutral-150));\r
    --colorNeutralForeground1Selected: light-dark(var(--neutral-10), var(--neutral-150));\r
    --colorNeutralForeground2: light-dark(var(--neutral-40), var(--neutral-130));\r
    --colorNeutralForeground2Hover: light-dark(var(--neutral-10), var(--neutral-140));\r
    --colorNeutralForeground2Pressed: light-dark(var(--neutral-10), var(--neutral-150));\r
    --colorNeutralForeground2Selected: light-dark(var(--neutral-10), var(--neutral-140));\r
    --colorNeutralForeground2BrandHover: light-dark(var(--brand-60), var(--brand-100));\r
    --colorNeutralForeground2BrandPressed: light-dark(var(--brand-40), var(--brand-110));\r
    --colorNeutralForeground2BrandSelected: light-dark(var(--brand-50), var(--brand-100));\r
    --colorNeutralForeground3: light-dark(var(--neutral-70), var(--neutral-90));\r
    --colorNeutralForeground3Hover: light-dark(var(--neutral-40), var(--neutral-100));\r
    --colorNeutralForeground3Pressed: light-dark(var(--neutral-40), var(--neutral-110));\r
    --colorNeutralForeground3Selected: light-dark(var(--neutral-40), var(--neutral-100));\r
    --colorNeutralForeground3BrandHover: light-dark(var(--brand-60), var(--brand-100));\r
    --colorNeutralForeground3BrandPressed: light-dark(var(--brand-40), var(--brand-110));\r
    --colorNeutralForeground3BrandSelected: light-dark(var(--brand-50), var(--brand-100));\r
    --colorNeutralForeground4: var(--neutral-80);\r
    --colorNeutralForegroundDisabled: light-dark(var(--neutral-150), var(--neutral-40));\r
    --colorNeutralForegroundOnBrand: #fff;\r
    --colorNeutralForegroundInverted: light-dark(white, var(--neutral-shade-22));\r
    --colorNeutralForegroundInvertedHover: light-dark(white, var(--neutral-shade-22));\r
    --colorNeutralForegroundInvertedPressed: light-dark(white, var(--neutral-shade-22));\r
    --colorNeutralForegroundInvertedSelected: light-dark(white, var(--neutral-shade-22));\r
    --colorNeutralForegroundInverted2: light-dark(white, var(--neutral-shade-22));\r
    --colorNeutralForegroundInvertedLink: light-dark(white, var(--neutral-shade-22));\r
    --colorNeutralForegroundInvertedLinkHover: light-dark(white, var(--neutral-shade-22));\r
    --colorNeutralForegroundInvertedLinkPressed: light-dark(white, var(--neutral-shade-22));\r
    --colorNeutralForegroundInvertedLinkSelected: light-dark(white, var(--neutral-shade-22));\r
    --colorNeutralForegroundInvertedDisabled: light-dark(white, var(--neutral-shade-44));\r
\r
    /* ===== Neutral Background Tokens ===== */\r
    --colorNeutralBackground1: light-dark(white, var(--neutral-shade-24));\r
    --colorNeutralBackground1Hover: light-dark(var(--neutral-tint-8), var(--neutral-shade-36));\r
    --colorNeutralBackground1Pressed: light-dark(var(--neutral-tint-24), var(--neutral-shade-18));\r
    --colorNeutralBackground1Selected: light-dark(var(--neutral-tint-16), var(--neutral-shade-32));\r
    --colorNeutralBackground2: light-dark(var(--neutral-tint-4), var(--neutral-shade-18));\r
    --colorNeutralBackground2Hover: light-dark(var(--neutral-tint-12), var(--neutral-shade-30));\r
    --colorNeutralBackground2Pressed: light-dark(var(--neutral-tint-28), var(--neutral-shade-12));\r
    --colorNeutralBackground2Selected: light-dark(var(--neutral-tint-20), var(--neutral-shade-26));\r
    --colorNeutralBackground3: light-dark(var(--neutral-tint-8), var(--neutral-shade-12));\r
    --colorNeutralBackground3Hover: light-dark(var(--neutral-tint-16), var(--neutral-shade-24));\r
    --colorNeutralBackground3Pressed: light-dark(var(--neutral-tint-32), var(--neutral-shade-6));\r
    --colorNeutralBackground3Selected: light-dark(var(--neutral-tint-24), var(--neutral-shade-20));\r
    --colorNeutralBackground4: light-dark(var(--neutral-tint-12), var(--neutral-shade-6));\r
    --colorNeutralBackground4Hover: light-dark(var(--neutral-tint-4), var(--neutral-shade-18));\r
    --colorNeutralBackground4Pressed: light-dark(var(--neutral-tint-8), black);\r
    --colorNeutralBackground4Selected: light-dark(white, var(--neutral-shade-16));\r
    --colorNeutralBackground5: light-dark(var(--neutral-tint-16), black);\r
    --colorNeutralBackground5Hover: light-dark(var(--neutral-tint-8), var(--neutral-shade-12));\r
    --colorNeutralBackground5Pressed: light-dark(var(--neutral-tint-12), var(--neutral-shade-4));\r
    --colorNeutralBackground5Selected: light-dark(var(--neutral-tint-4), var(--neutral-shade-8));\r
    --colorNeutralBackground6: light-dark(var(--neutral-tint-20), var(--neutral-shade-30));\r
    --colorNeutralBackground6Hover: light-dark(var(--neutral-tint-12), var(--neutral-shade-36));\r
    --colorNeutralBackground6Pressed: light-dark(var(--neutral-tint-24), var(--neutral-shade-42));\r
    --colorNeutralBackground6Selected: light-dark(var(--neutral-tint-16), var(--neutral-shade-38));\r
    --colorNeutralBackgroundDisabled: light-dark(var(--neutral-tint-12), var(--neutral-shade-12));\r
    --colorNeutralBackgroundInverted: light-dark(var(--neutral-10), white);\r
    --colorNeutralBackgroundInvertedHover: light-dark(var(--neutral-20), var(--neutral-tint-8));\r
    --colorNeutralBackgroundInvertedPressed: light-dark(var(--neutral-shade-24), var(--neutral-tint-16));\r
    --colorNeutralBackgroundInvertedSelected: light-dark(var(--neutral-shade-44), var(--neutral-tint-8));\r
\r
    /* ===== Neutral Stroke Tokens ===== */\r
    --colorNeutralStroke1: light-dark(var(--neutral-160), var(--neutral-70));\r
    --colorNeutralStroke1Hover: light-dark(var(--neutral-150), var(--neutral-60));\r
    --colorNeutralStroke1Pressed: light-dark(var(--neutral-140), var(--neutral-50));\r
    --colorNeutralStroke1Selected: light-dark(var(--neutral-150), var(--neutral-60));\r
    --colorNeutralStroke2: light-dark(var(--neutral-tint-24), var(--neutral-50));\r
    --colorNeutralStroke2Hover: light-dark(var(--neutral-tint-20), var(--neutral-60));\r
    --colorNeutralStroke2Pressed: light-dark(var(--neutral-tint-16), var(--neutral-70));\r
    --colorNeutralStroke2Selected: light-dark(var(--neutral-tint-20), var(--neutral-60));\r
    --colorNeutralStroke3: light-dark(var(--neutral-tint-12), var(--neutral-shade-36));\r
    --colorNeutralStroke3Hover: light-dark(var(--neutral-tint-8), var(--neutral-40));\r
    --colorNeutralStroke3Pressed: light-dark(var(--neutral-tint-4), var(--neutral-50));\r
    --colorNeutralStroke3Selected: light-dark(var(--neutral-tint-8), var(--neutral-40));\r
    --colorNeutralStrokeAccessible: light-dark(var(--neutral-70), var(--neutral-100));\r
    --colorNeutralStrokeAccessibleHover: light-dark(var(--neutral-60), var(--neutral-110));\r
    --colorNeutralStrokeAccessiblePressed: light-dark(var(--neutral-50), var(--neutral-120));\r
    --colorNeutralStrokeAccessibleSelected: light-dark(var(--brand-80), var(--brand-100));\r
    --colorNeutralStrokeDisabled: light-dark(var(--neutral-tint-24), var(--neutral-40));\r
    --colorNeutralStrokeInverted: var(--neutral-160);\r
    --colorNeutralStrokeInvertedHover: var(--neutral-160);\r
    --colorNeutralStrokeInvertedPressed: var(--neutral-160);\r
    --colorNeutralStrokeInvertedSelected: var(--neutral-160);\r
\r
    /* ===== Stroke Focus ===== */\r
    --colorStrokeFocus1: light-dark(white, black);\r
    --colorStrokeFocus2: light-dark(#000, white);\r
\r
    /* ===== Transparent Tokens ===== */\r
    --colorTransparentBackground: transparent;\r
    --colorTransparentBackgroundHover: light-dark(var(--neutral-tint-8), var(--neutral-shade-36));\r
    --colorTransparentBackgroundPressed: light-dark(var(--neutral-tint-16), var(--neutral-shade-24));\r
    --colorTransparentBackgroundSelected: light-dark(var(--neutral-tint-16), var(--neutral-shade-24));\r
    --colorTransparentStroke: transparent;\r
    --colorTransparentStrokeInteractive: transparent;\r
    --colorTransparentStrokeDisabled: transparent;\r
\r
    /* ===== Subtle Tokens ===== */\r
    --colorSubtleBackground: light-dark(var(--neutral-tint-8), var(--neutral-shade-36));\r
    --colorSubtleBackgroundHover: light-dark(var(--neutral-tint-16), var(--neutral-shade-24));\r
    --colorSubtleBackgroundPressed: light-dark(var(--neutral-tint-24), var(--neutral-shade-18));\r
    --colorSubtleBackgroundSelected: light-dark(var(--neutral-tint-24), var(--neutral-shade-30));\r
    --colorSubtleBackgroundInverted: light-dark(var(--neutral-shade-32), var(--neutral-tint-8));\r
    --colorSubtleBackgroundInvertedHover: light-dark(var(--neutral-shade-48), var(--neutral-tint-16));\r
    --colorSubtleBackgroundInvertedPressed: light-dark(var(--neutral-shade-28), var(--neutral-tint-24));\r
    --colorSubtleBackgroundInvertedSelected: light-dark(var(--neutral-shade-44), var(--neutral-tint-16));\r
\r
    /* ===== Scrollbar ===== */\r
    --colorScrollbarOverlay: light-dark(rgba(0, 0, 0, 0.5), rgba(255, 255, 255, 0.6));\r
\r
    /* ===== Static Neutral Tokens ===== */\r
    --colorNeutralForeground1Static: #242424;\r
    --colorNeutralForegroundStaticInverted: #ffffff;\r
\r
    /* ===== Status Tokens ===== */\r
    --colorPaletteRedBackground1: #fdf6f6;\r
    --colorPaletteRedBackground2: #f1bbbc;\r
    --colorPaletteRedBackground3: #d13438;\r
    --colorPaletteRedForeground1: #bc2f32;\r
    --colorPaletteRedForeground2: #751d1f;\r
    --colorPaletteRedForeground3: #e37d80;\r
    --colorPaletteRedBorder1: #f1bbbc;\r
    --colorPaletteRedBorder2: #d13438;\r
    --colorPaletteRedBorderActive: #d13438;\r
    --colorStatusDangerBackground1: var(--colorPaletteRedBackground1);\r
    --colorStatusDangerForeground1: var(--colorPaletteRedForeground1);\r
    --colorStatusDangerForeground3: var(--colorPaletteRedForeground1);\r
    --colorStatusDangerBorderActive: var(--colorPaletteRedBorderActive);\r
    --colorStatusDangerBorderHover: var(--colorPaletteRedBorderActive);\r
\r
    --colorPaletteGreenBackground1: #f1faf1;\r
    --colorPaletteGreenBackground2: #9fd89f;\r
    --colorPaletteGreenBackground3: #107c10;\r
    --colorPaletteGreenForeground1: #0e700e;\r
    --colorPaletteGreenForeground2: #094509;\r
    --colorPaletteGreenForeground3: #9fd89f;\r
    --colorPaletteGreenBorder1: #9fd89f;\r
    --colorPaletteGreenBorder2: #107c10;\r
    --colorStatusSuccessBackground1: var(--colorPaletteGreenBackground1);\r
    --colorStatusSuccessForeground1: var(--colorPaletteGreenForeground1);\r
    --colorStatusSuccessForeground3: var(--colorPaletteGreenForeground1);\r
\r
    --colorPaletteDarkOrangeBackground1: #fdf6f3;\r
    --colorPaletteDarkOrangeBackground2: #f4bfab;\r
    --colorPaletteDarkOrangeBackground3: #da3b01;\r
    --colorPaletteDarkOrangeForeground1: #c43501;\r
    --colorPaletteDarkOrangeForeground2: #7a2101;\r
    --colorPaletteDarkOrangeForeground3: #e9835e;\r
    --colorPaletteDarkOrangeBorder1: #f4bfab;\r
    --colorPaletteDarkOrangeBorder2: #da3b01;\r
    --colorPaletteDarkOrangeBorderActive: #da3b01;\r
    --colorStatusWarningBackground1: var(--colorPaletteDarkOrangeBackground1);\r
    --colorStatusWarningForeground1: var(--colorPaletteDarkOrangeForeground1);\r
    --colorStatusWarningForeground3: var(--colorPaletteDarkOrangeForeground1);\r
    --colorStatusWarningBorderActive: var(--colorPaletteDarkOrangeBorderActive);\r
    --colorStatusWarningBorderHover: var(--colorPaletteDarkOrangeBorderActive);\r
\r
    --colorPaletteYellowBackground1: #fffef5;\r
    --colorPaletteYellowBackground2: #fef7b2;\r
    --colorPaletteYellowBackground3: #fde300;\r
    --colorPaletteYellowForeground1: #817400;\r
    --colorPaletteYellowForeground2: #c0ad00;\r
    --colorPaletteYellowForeground3: #fde300;\r
    --colorPaletteYellowBorder1: #fef7b2;\r
    --colorPaletteYellowBorder2: #fde300;\r
    --colorStatusWarningBackground2: var(--colorPaletteYellowBackground1);\r
    --colorStatusWarningForeground2: var(--colorPaletteYellowForeground1);\r
\r
    --colorPaletteBerryForeground1: var(--brand-70);\r
    --colorPaletteBerryBackground1: var(--brand-140);\r
    --colorPaletteBerryBackground2: var(--brand-80);\r
    --colorPaletteBerryForeground2: var(--brand-70);\r
    --colorPaletteBerryForeground3: var(--brand-70);\r
    --colorPaletteBerryBorder1: var(--brand-130);\r
    --colorPaletteBerryBorder2: var(--brand-80);\r
\r
    --colorPaletteLightGreenForeground1: #0e700e;\r
    --colorPaletteLightGreenBackground1: #a1e3a1;\r
    --colorPaletteLightGreenBackground2: #0e700e;\r
    --colorPaletteLightGreenForeground2: #0e700e;\r
    --colorPaletteLightGreenBorder1: #b4dbb4;\r
    --colorPaletteLightGreenBorder2: #0e700e;\r
\r
    --colorPaletteMarigoldForeground1: #da3b01;\r
    --colorPaletteMarigoldBackground1: #fad3c5;\r
    --colorPaletteMarigoldBackground2: #da3b01;\r
    --colorPaletteMarigoldForeground2: #da3b01;\r
    --colorPaletteMarigoldForeground3: #da3b01;\r
    --colorPaletteMarigoldBorderActive: #da3b01;\r
    --colorPaletteMarigoldBorder1: #eab8a5;\r
    --colorPaletteMarigoldBorder2: #da3b01;\r
\r
    /* ===== Shadow Color Tokens ===== */\r
    --colorNeutralShadowAmbient: light-dark(rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0.24));\r
    --colorNeutralShadowKey: light-dark(rgba(0, 0, 0, 0.14), rgba(0, 0, 0, 0.28));\r
    --colorBrandShadowAmbient: rgba(0, 0, 0, 0.3);\r
    --colorBrandShadowKey: rgba(0, 0, 0, 0.25);\r
\r
    /* ===== Shadows ===== */\r
    --shadow2:  0 0 2px var(--colorNeutralShadowAmbient), 0 1px 2px var(--colorNeutralShadowKey);\r
    --shadow4:  0 0 2px var(--colorNeutralShadowAmbient), 0 2px 4px var(--colorNeutralShadowKey);\r
    --shadow8:  0 0 2px var(--colorNeutralShadowAmbient), 0 4px 8px var(--colorNeutralShadowKey);\r
    --shadow16: 0 0 2px var(--colorNeutralShadowAmbient), 0 8px 16px var(--colorNeutralShadowKey);\r
    --shadow28: 0 0 8px var(--colorNeutralShadowAmbient), 0 14px 28px var(--colorNeutralShadowKey);\r
    --shadow64: 0 0 8px var(--colorNeutralShadowAmbient), 0 32px 64px var(--colorNeutralShadowKey);\r
    --shadow2Brand:  0 0 2px var(--colorBrandShadowAmbient), 0 1px 2px var(--colorBrandShadowKey);\r
    --shadow4Brand:  0 0 2px var(--colorBrandShadowAmbient), 0 2px 4px var(--colorBrandShadowKey);\r
    --shadow8Brand:  0 0 2px var(--colorBrandShadowAmbient), 0 4px 8px var(--colorBrandShadowKey);\r
    --shadow16Brand: 0 0 2px var(--colorBrandShadowAmbient), 0 8px 16px var(--colorBrandShadowKey);\r
    --shadow28Brand: 0 0 8px var(--colorBrandShadowAmbient), 0 14px 28px var(--colorBrandShadowKey);\r
    --shadow64Brand: 0 0 8px var(--colorBrandShadowAmbient), 0 32px 64px var(--colorBrandShadowKey);\r
\r
    /* ===== Stroke Widths ===== */\r
    --strokeWidthNone: 0;\r
    --strokeWidthThin: 1px;\r
    --strokeWidthThick: 2px;\r
    --strokeWidthThicker: 3px;\r
    --strokeWidthThickest: 4px;\r
\r
    /* ===== Border Radii ===== */\r
    --borderRadiusNone: 0;\r
    --borderRadiusSmall: 2px;\r
    --borderRadiusMedium: 4px;\r
    --borderRadiusLarge: 6px;\r
    --borderRadiusXLarge: 8px;\r
    --borderRadiusCircular: 9999px;\r
\r
    /* ===== Spacing (8px grid) ===== */\r
    --spacingHorizontalNone: 0;\r
    --spacingHorizontalXXS: 2px;\r
    --spacingHorizontalXS: 4px;\r
    --spacingHorizontalSNudge: 6px;\r
    --spacingHorizontalS: 8px;\r
    --spacingHorizontalMNudge: 10px;\r
    --spacingHorizontalM: 12px;\r
    --spacingHorizontalL: 16px;\r
    --spacingHorizontalXL: 20px;\r
    --spacingHorizontalXXL: 24px;\r
    --spacingHorizontalXXXL: 32px;\r
    --spacingVerticalNone: 0;\r
    --spacingVerticalXXS: 2px;\r
    --spacingVerticalXS: 4px;\r
    --spacingVerticalSNudge: 6px;\r
    --spacingVerticalS: 8px;\r
    --spacingVerticalMNudge: 10px;\r
    --spacingVerticalM: 12px;\r
    --spacingVerticalL: 16px;\r
    --spacingVerticalXL: 20px;\r
    --spacingVerticalXXL: 24px;\r
    --spacingVerticalXXXL: 32px;\r
\r
    /* ===== Typography ===== */\r
    --fontSizeBase100: 10px;\r
    --fontSizeBase200: 12px;\r
    --fontSizeBase300: 14px;\r
    --fontSizeBase400: 16px;\r
    --fontSizeBase500: 20px;\r
    --fontSizeBase600: 24px;\r
    --fontSizeBase700: 28px;\r
    --fontSizeBase800: 32px;\r
    --fontSizeBase900: 40px;\r
    --fontSizeBase1000: 68px;\r
\r
    --lineHeightBase100: 14px;\r
    --lineHeightBase200: 16px;\r
    --lineHeightBase300: 20px;\r
    --lineHeightBase400: 22px;\r
    --lineHeightBase500: 28px;\r
    --lineHeightBase600: 32px;\r
    --lineHeightBase700: 36px;\r
    --lineHeightBase800: 40px;\r
    --lineHeightBase900: 52px;\r
    --lineHeightBase1000: 92px;\r
\r
    --fontFamilyBase: "Segoe UI", system-ui, -apple-system, BlinkMacSystemFont, sans-serif;\r
    --fontFamilyMonospace: "Cascadia Code", "Fira Code", Consolas, "Courier New", monospace;\r
    --fontFamilyNumeric: "Segoe UI", system-ui, -apple-system, BlinkMacSystemFont, sans-serif;\r
\r
    --fontWeightRegular: 400;\r
    --fontWeightMedium: 500;\r
    --fontWeightSemibold: 600;\r
    --fontWeightBold: 700;\r
\r
    /* ===== Duration ===== */\r
    --durationUltraFast: 50ms;\r
    --durationFaster: 100ms;\r
    --durationFast: 150ms;\r
    --durationNormal: 200ms;\r
    --durationGentle: 250ms;\r
    --durationSlow: 300ms;\r
    --durationSlower: 400ms;\r
    --durationUltraSlow: 500ms;\r
\r
    /* ===== Curves ===== */\r
    --curveAccelerateMax: cubic-bezier(1, 0, 1, 1);\r
    --curveAccelerateMid: cubic-bezier(0.7, 0, 1, 0.5);\r
    --curveAccelerateMin: cubic-bezier(0.8, 0, 1, 1);\r
    --curveDecelerateMax: cubic-bezier(0, 0, 0, 1);\r
    --curveDecelerateMid: cubic-bezier(0.1, 0.9, 0.2, 1);\r
    --curveDecelerateMin: cubic-bezier(0.33, 0, 0.1, 1);\r
    --curveEasyEaseMax: cubic-bezier(0.8, 0, 0.2, 1);\r
    --curveEasyEase: cubic-bezier(0.33, 0, 0.67, 1);\r
    --curveLinear: cubic-bezier(0, 0, 1, 1);\r
\r
    /* ===== Unstyled host default ===== */\r
    --colorNeutralForegroundOnBrand: #fff;\r
}\r
\r
/* ===== Forced Colors (High Contrast) ===== */\r
@media (forced-colors: active) {\r
    :host,\r
    :root {\r
        --colorNeutralForeground1: ButtonText;\r
        --colorNeutralBackground1: ButtonFace;\r
    }\r
}\r
\r
/* ===== Reduced Motion ===== */\r
@media (prefers-reduced-motion: reduce) {\r
    :host,\r
    :root {\r
        --durationUltraFast: 0.01ms;\r
        --durationFaster: 0.01ms;\r
        --durationFast: 0.01ms;\r
        --durationNormal: 0.01ms;\r
        --durationGentle: 0.01ms;\r
        --durationSlow: 0.01ms;\r
        --durationSlower: 0.01ms;\r
        --durationUltraSlow: 0.01ms;\r
    }\r
}\r
`+this.constructor.styles,this._root.appendChild(e)}let e=document.createElement(`template`);e.innerHTML=this.constructor.template,this._root.appendChild(e.content.cloneNode(!0))}disconnectedCallback(){}static get observedAttributes(){return[]}attributeChangedCallback(e,t,n){t!==n&&this.changed(e,t,n)}changed(){}},t=`:host { display: inline-flex; }\r
\r
.root {\r
  --icon-spacing: var(--spacingHorizontalSNudge);\r
  position: relative;\r
  display: inline-flex;\r
  vertical-align: middle;\r
  align-items: center;\r
  box-sizing: border-box;\r
  justify-content: center;\r
  text-align: center;\r
  text-decoration-line: none;\r
  margin: 0;\r
  min-height: 32px;\r
  outline-style: none;\r
  background-color: var(--colorNeutralBackground1);\r
  color: var(--colorNeutralForeground1);\r
  border: var(--strokeWidthThin) solid var(--colorNeutralStroke1);\r
  padding: 0 var(--spacingHorizontalM);\r
  min-width: 96px;\r
  border-radius: var(--borderRadiusMedium);\r
  font-size: var(--fontSizeBase300);\r
  font-family: var(--fontFamilyBase);\r
  font-weight: var(--fontWeightSemibold);\r
  line-height: var(--lineHeightBase300);\r
  transition-duration: var(--durationFaster);\r
  transition-property: background, border, color;\r
  transition-timing-function: var(--curveEasyEase);\r
  cursor: pointer;\r
  user-select: none;\r
}\r
\r
.content {\r
  display: inherit;\r
}\r
\r
.root:hover {\r
  background-color: var(--colorNeutralBackground1Hover);\r
  color: var(--colorNeutralForeground1Hover);\r
  border-color: var(--colorNeutralStroke1Hover);\r
}\r
\r
.root:hover:active {\r
  background-color: var(--colorNeutralBackground1Pressed);\r
  border-color: var(--colorNeutralStroke1Pressed);\r
  color: var(--colorNeutralForeground1Pressed);\r
  outline-style: none;\r
}\r
\r
.root:focus-visible {\r
  border-color: var(--colorTransparentStroke);\r
  outline: var(--strokeWidthThick) solid var(--colorTransparentStroke);\r
  box-shadow: var(--shadow4), 0 0 0 2px var(--colorStrokeFocus2);\r
}\r
\r
::slotted(svg) {\r
  font-size: 20px;\r
  height: 20px;\r
  width: 20px;\r
  fill: currentColor;\r
}\r
\r
::slotted([slot='start']) {\r
  margin-inline-end: var(--icon-spacing);\r
}\r
\r
::slotted([slot='end']),\r
[slot='end'] {\r
  flex-shrink: 0;\r
  margin-inline-start: var(--icon-spacing);\r
}\r
\r
:host([icon-only]) .root {\r
  min-width: 32px;\r
  max-width: 32px;\r
}\r
\r
:host([size='small']) .root {\r
  --icon-spacing: var(--spacingHorizontalXS);\r
  min-height: 24px;\r
  min-width: 64px;\r
  padding: 0 var(--spacingHorizontalS);\r
  border-radius: var(--borderRadiusSmall);\r
  font-size: var(--fontSizeBase200);\r
  line-height: var(--lineHeightBase200);\r
  font-weight: var(--fontWeightRegular);\r
}\r
\r
:host([size='small'][icon-only]) .root {\r
  min-width: 24px;\r
  max-width: 24px;\r
}\r
\r
:host([size='large']) .root {\r
  min-height: 40px;\r
  border-radius: var(--borderRadiusLarge);\r
  padding: 0 var(--spacingHorizontalL);\r
  font-size: var(--fontSizeBase400);\r
  line-height: var(--lineHeightBase400);\r
}\r
\r
:host([size='large'][icon-only]) .root {\r
  min-width: 40px;\r
  max-width: 40px;\r
}\r
\r
:host([size='large']) ::slotted(svg) {\r
  font-size: 24px;\r
  height: 24px;\r
  width: 24px;\r
}\r
\r
:host(:is([shape='circular'], [shape='circular']:focus-visible)) .root {\r
  border-radius: var(--borderRadiusCircular);\r
}\r
\r
:host(:is([shape='square'], [shape='square']:focus-visible)) .root {\r
  border-radius: var(--borderRadiusNone);\r
}\r
\r
:host([appearance='primary']) .root {\r
  background-color: var(--colorBrandBackground);\r
  color: var(--colorNeutralForegroundOnBrand);\r
  border-color: transparent;\r
}\r
\r
:host([appearance='primary']) .root:hover {\r
  background-color: var(--colorBrandBackgroundHover);\r
}\r
\r
:host([appearance='primary']) .root:is(:hover, :hover:active):not(:focus-visible) {\r
  border-color: transparent;\r
}\r
\r
:host([appearance='primary']) .root:is(:hover, :hover:active) {\r
  color: var(--colorNeutralForegroundOnBrand);\r
}\r
\r
:host([appearance='primary']) .root:hover:active {\r
  background-color: var(--colorBrandBackgroundPressed);\r
}\r
\r
:host([appearance='primary']) .root:focus-visible {\r
  border-color: var(--colorNeutralForegroundOnBrand);\r
  box-shadow: var(--shadow2), 0 0 0 2px var(--colorStrokeFocus2);\r
}\r
\r
:host([appearance='outline']) .root {\r
  background-color: var(--colorTransparentBackground);\r
}\r
\r
:host([appearance='outline']) .root:hover {\r
  background-color: var(--colorTransparentBackgroundHover);\r
}\r
\r
:host([appearance='outline']) .root:hover:active {\r
  background-color: var(--colorTransparentBackgroundPressed);\r
}\r
\r
:host([appearance='subtle']) .root {\r
  background-color: var(--colorSubtleBackground);\r
  color: var(--colorNeutralForeground2);\r
  border-color: transparent;\r
}\r
\r
:host([appearance='subtle']) .root:hover {\r
  background-color: var(--colorSubtleBackgroundHover);\r
  color: var(--colorNeutralForeground2Hover);\r
  border-color: transparent;\r
}\r
\r
:host([appearance='subtle']) .root:hover:active {\r
  background-color: var(--colorSubtleBackgroundPressed);\r
  color: var(--colorNeutralForeground2Pressed);\r
  border-color: transparent;\r
}\r
\r
:host([appearance='subtle']) .root:hover ::slotted(svg) {\r
  fill: var(--colorNeutralForeground2BrandHover);\r
}\r
\r
:host([appearance='subtle']) .root:hover:active ::slotted(svg) {\r
  fill: var(--colorNeutralForeground2BrandPressed);\r
}\r
\r
:host([appearance='transparent']) .root {\r
  background-color: var(--colorTransparentBackground);\r
  color: var(--colorNeutralForeground2);\r
}\r
\r
:host([appearance='transparent']) .root:hover {\r
  background-color: var(--colorTransparentBackgroundHover);\r
  color: var(--colorNeutralForeground2BrandHover);\r
}\r
\r
:host([appearance='transparent']) .root:hover:active {\r
  background-color: var(--colorTransparentBackgroundPressed);\r
  color: var(--colorNeutralForeground2BrandPressed);\r
}\r
\r
:host(:is([appearance='transparent'], [appearance='transparent']:is(:hover, :active))) .root {\r
  border-color: transparent;\r
}\r
\r
:host(:is(:disabled, [disabled-focusable], [appearance]:disabled, [appearance][disabled-focusable])) .root,\r
:host(:is(:disabled, [disabled-focusable], [appearance]:disabled, [appearance][disabled-focusable])) .root:hover,\r
:host(:is(:disabled, [disabled-focusable], [appearance]:disabled, [appearance][disabled-focusable])) .root:hover:active {\r
  background-color: var(--colorNeutralBackgroundDisabled);\r
  border-color: var(--colorNeutralStrokeDisabled);\r
  color: var(--colorNeutralForegroundDisabled);\r
  cursor: not-allowed;\r
}\r
\r
:host([appearance='primary']:is(:disabled, [disabled-focusable])) .root,\r
:host([appearance='primary']:is(:disabled, [disabled-focusable])) .root:is(:hover, :hover:active) {\r
  border-color: transparent;\r
}\r
\r
:host([appearance='outline']:is(:disabled, [disabled-focusable])) .root,\r
:host([appearance='outline']:is(:disabled, [disabled-focusable])) .root:is(:hover, :hover:active) {\r
  background-color: var(--colorTransparentBackground);\r
}\r
\r
:host([appearance='subtle']:is(:disabled, [disabled-focusable])) .root,\r
:host([appearance='subtle']:is(:disabled, [disabled-focusable])) .root:is(:hover, :hover:active) {\r
  background-color: var(--colorTransparentBackground);\r
  border-color: transparent;\r
}\r
\r
:host([appearance='transparent']:is(:disabled, [disabled-focusable])) .root,\r
:host([appearance='transparent']:is(:disabled, [disabled-focusable])) .root:is(:hover, :hover:active) {\r
  border-color: transparent;\r
  background-color: var(--colorTransparentBackground);\r
}\r
\r
@media (forced-colors: active) {\r
  .root {\r
    background-color: ButtonFace;\r
    color: ButtonText;\r
  }\r
\r
  .root:is(:hover, :focus-visible) {\r
    border-color: Highlight !important;\r
  }\r
\r
  :host([appearance='primary']) .root:not(:is(:hover, :focus-visible)) {\r
    background-color: Highlight;\r
    color: HighlightText;\r
    forced-color-adjust: none;\r
  }\r
\r
  :host(:is(:disabled, [disabled-focusable], [appearance]:disabled, [appearance][disabled-focusable])) .root {\r
    background-color: ButtonFace;\r
    color: GrayText;\r
    border-color: ButtonText;\r
  }\r
}\r
\r
@media screen and (prefers-reduced-motion: reduce) {\r
  .root {\r
    transition-duration: 0.01ms;\r
  }\r
}\r
`;const n={submit:`submit`,reset:`reset`,button:`button`};var r=class extends e{static formAssociated=!0;static styles=t;static template=`
    <div class="root" part="content">
      <slot name="start"></slot>
      <slot></slot>
      <slot name="end"></slot>
      <slot name="internal"></slot>
    </div>
  `;static get observedAttributes(){return[`disabled`,`appearance`,`shape`,`size`,`icon-only`,`disabled-focusable`,`autofocus`,`type`,`name`,`value`,`form`,`formaction`,`formenctype`,`formmethod`,`formnovalidate`,`formtarget`]}constructor(){super(),this._internals=this.attachInternals(),this._internals.role=`button`,this._type=`submit`,this._name=``,this._value=``,this._disabled=!1,this._disabledFocusable=!1,this._autofocus=!1,this._formAction=``,this._formEnctype=``,this._formMethod=``,this._formNoValidate=!1,this._formTarget=``,this._formId=``,this._formSubmissionFallback=null,this._boundKeydown=this._handleKeydown.bind(this),this._boundClick=this._handleClick.bind(this)}connectedCallback(){super.connectedCallback(),this._root.addEventListener(`keydown`,this._boundKeydown),this._root.addEventListener(`click`,this._boundClick),this._updateTabIndex(),this._updateAriaDisabled()}disconnectedCallback(){super.disconnectedCallback(),this._root.removeEventListener(`keydown`,this._boundKeydown),this._root.removeEventListener(`click`,this._boundClick)}attributeChangedCallback(e,t,n){if(t!==n)switch(e){case`disabled`:this._disabled=this.hasAttribute(`disabled`),this._updateTabIndex();break;case`disabled-focusable`:this._disabledFocusable=this.hasAttribute(`disabled-focusable`),this._updateAriaDisabled(),this._updateTabIndex();break;case`autofocus`:this._autofocus=this.hasAttribute(`autofocus`);break;case`type`:this._type=n||`submit`,this._removeFallbackControl();break;case`name`:this._name=n||``,this._updateFallbackControlName();break;case`value`:this._value=n||``,this._updateFallbackControlValue();break;case`form`:this._formId=n||``,this._updateFallbackControlForm();break;case`formaction`:this._formAction=n||``,this._updateFallbackControlFormAction();break;case`formenctype`:this._formEnctype=n||``,this._updateFallbackControlEnctype();break;case`formmethod`:this._formMethod=n||``,this._updateFallbackControlMethod();break;case`formnovalidate`:this._formNoValidate=this.hasAttribute(`formnovalidate`),this._updateFallbackControlNoValidate();break;case`formtarget`:this._formTarget=n||``,this._updateFallbackControlTarget();break;default:super.attributeChangedCallback(e,t,n)}}get type(){return this._type}set type(e){this.setAttribute(`type`,e)}get name(){return this._name}set name(e){this.setAttribute(`name`,e)}get value(){return this._value}set value(e){this.setAttribute(`value`,e)}get form(){return this._internals.form}get labels(){return Object.freeze(Array.from(this._internals.labels))}formDisabledCallback(e){e?this.setAttribute(`disabled`,``):this.removeAttribute(`disabled`)}_handleKeydown(e){(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),(!this._disabled||this._disabledFocusable)&&this._root.click())}_handleClick(e){this._disabled&&!this._disabledFocusable?e.stopImmediatePropagation():this._type===n.submit?this._submitForm():this._type===n.reset&&this._resetForm()}_submitForm(){let e=this._internals.form;if(e&&!this._disabled){if(!(this._name||this._formAction||this._formEnctype||this._formMethod||this._formNoValidate||this._formTarget||this._formId))e.requestSubmit();else try{this._internals.setFormValue(this._value||``),e.requestSubmit(this)}catch{this._createFallbackControl(),this._internals.setFormValue(null),e.requestSubmit(this._formSubmissionFallback)}}}_resetForm(){this._internals.form?.reset()}_updateTabIndex(){if(this._disabled&&!this._disabledFocusable)this.removeAttribute(`tabindex`);else{let e=this.getAttribute(`tabindex`);this.tabIndex=e!==null&&Number(e)<0?-1:0}}_updateAriaDisabled(){this._internals.ariaDisabled=this._disabledFocusable?`true`:`false`}_needsFallbackControl(){return!!(this._name||this._formAction||this._formEnctype||this._formMethod||this._formNoValidate||this._formTarget||this._formId)}_createFallbackControl(){if(this._formSubmissionFallback)return;let e=document.createElement(`button`);e.style.display=`none`,e.type=`submit`,e.setAttribute(`slot`,`internal`),this._updateFallbackControlAttributes(e),this._root.appendChild(e),this._formSubmissionFallback=e}_removeFallbackControl(){if(this._type!==n.submit){this._formSubmissionFallback&&=(this._formSubmissionFallback.remove(),null);let e=this._root.querySelector(`slot[name="internal"]`);e&&e.remove()}}_updateFallbackControlName(){this._formSubmissionFallback&&(this._name?this._formSubmissionFallback.setAttribute(`name`,this._name):this._formSubmissionFallback.removeAttribute(`name`))}_updateFallbackControlValue(){this._formSubmissionFallback&&(this._value?this._formSubmissionFallback.setAttribute(`value`,this._value):this._formSubmissionFallback.removeAttribute(`value`))}_updateFallbackControlForm(){this._formSubmissionFallback&&this._formId?this._formSubmissionFallback.setAttribute(`form`,this._formId):this._formSubmissionFallback&&this._formSubmissionFallback.removeAttribute(`form`)}_updateFallbackControlFormAction(){this._formSubmissionFallback&&(this._formAction?this._formSubmissionFallback.setAttribute(`formaction`,this._formAction):this._formSubmissionFallback.removeAttribute(`formaction`))}_updateFallbackControlEnctype(){this._formSubmissionFallback&&(this._formEnctype?this._formSubmissionFallback.setAttribute(`formenctype`,this._formEnctype):this._formSubmissionFallback.removeAttribute(`formenctype`))}_updateFallbackControlMethod(){this._formSubmissionFallback&&(this._formMethod?this._formSubmissionFallback.setAttribute(`formmethod`,this._formMethod):this._formSubmissionFallback.removeAttribute(`formmethod`))}_updateFallbackControlNoValidate(){this._formSubmissionFallback&&(this._formNoValidate?this._formSubmissionFallback.setAttribute(`formnovalidate`,``):this._formSubmissionFallback.removeAttribute(`formnovalidate`))}_updateFallbackControlTarget(){this._formSubmissionFallback&&(this._formTarget?this._formSubmissionFallback.setAttribute(`formtarget`,this._formTarget):this._formSubmissionFallback.removeAttribute(`formtarget`))}_updateFallbackControlAttributes(e){this._name&&e.setAttribute(`name`,this._name),this._value&&e.setAttribute(`value`,this._value),this._formId&&e.setAttribute(`form`,this._formId),this._formAction&&e.setAttribute(`formaction`,this._formAction),this._formEnctype&&e.setAttribute(`formenctype`,this._formEnctype),this._formMethod&&e.setAttribute(`formmethod`,this._formMethod),this._formNoValidate&&e.setAttribute(`formnovalidate`,``),this._formTarget&&e.setAttribute(`formtarget`,this._formTarget)}};customElements.define(`fluent-button`,r);var i=`:host { display: inline-flex; }\r
\r
.root {\r
  position: relative;\r
  display: inline-flex;\r
  box-sizing: border-box;\r
  align-items: center;\r
  justify-content: center;\r
  font-family: var(--fontFamilyBase);\r
  font-weight: var(--fontWeightSemibold);\r
  font-size: var(--fontSizeBase200);\r
  line-height: var(--lineHeightBase200);\r
  min-width: 20px;\r
  height: 20px;\r
  padding-inline: calc(var(--spacingHorizontalXS) + var(--spacingHorizontalXXS));\r
  border-radius: var(--borderRadiusCircular);\r
  border: 1px solid var(--colorTransparentStroke);\r
  background-color: var(--colorBrandBackground);\r
  color: var(--colorNeutralForegroundOnBrand);\r
}\r
\r
::slotted(svg) {\r
  font-size: 12px;\r
}\r
\r
:host(:not([appearance='ghost'])) .root::after {\r
  position: absolute;\r
  content: '';\r
  top: 0;\r
  left: 0;\r
  bottom: 0;\r
  right: 0;\r
  border-style: solid;\r
  border-width: var(--strokeWidthThin);\r
  border-color: inherit;\r
  border-radius: inherit;\r
}\r
\r
/* ===== Shapes ===== */\r
:host([shape='square']) .root {\r
  border-radius: var(--borderRadiusNone);\r
}\r
\r
:host([shape='rounded']) .root {\r
  border-radius: var(--borderRadiusMedium);\r
}\r
\r
:host([shape='rounded']:is([size='tiny'], [size='extra-small'], [size='small'])) .root {\r
  border-radius: var(--borderRadiusSmall);\r
}\r
\r
/* ===== Sizes ===== */\r
:host([size='tiny']) .root {\r
  width: 6px;\r
  height: 6px;\r
  font-size: 4px;\r
  line-height: 4px;\r
  padding-inline: 0;\r
  min-width: unset;\r
}\r
\r
:host([size='tiny']) ::slotted(svg) {\r
  font-size: 6px;\r
}\r
\r
:host([size='extra-small']) .root {\r
  width: 10px;\r
  height: 10px;\r
  font-size: 6px;\r
  line-height: 6px;\r
  padding-inline: 0;\r
  min-width: unset;\r
}\r
\r
:host([size='extra-small']) ::slotted(svg) {\r
  font-size: 10px;\r
}\r
\r
:host([size='small']) .root {\r
  min-width: 16px;\r
  height: 16px;\r
  font-size: var(--fontSizeBase100);\r
  line-height: var(--lineHeightBase100);\r
  padding-inline: calc(var(--spacingHorizontalXXS) + var(--spacingHorizontalXXS));\r
}\r
\r
:host([size='small']) ::slotted(svg) {\r
  font-size: 12px;\r
}\r
\r
:host([size='large']) .root {\r
  min-width: 24px;\r
  height: 24px;\r
  font-size: var(--fontSizeBase200);\r
  line-height: var(--lineHeightBase200);\r
  padding-inline: calc(var(--spacingHorizontalXS) + var(--spacingHorizontalXXS));\r
}\r
\r
:host([size='large']) ::slotted(svg) {\r
  font-size: 16px;\r
}\r
\r
:host([size='extra-large']) .root {\r
  min-width: 32px;\r
  height: 32px;\r
  font-size: var(--fontSizeBase200);\r
  line-height: var(--lineHeightBase200);\r
  padding-inline: calc(var(--spacingHorizontalSNudge) + var(--spacingHorizontalXXS));\r
}\r
\r
:host([size='extra-large']) ::slotted(svg) {\r
  font-size: 20px;\r
}\r
\r
/* ===== Filled Appearance (default, no attribute) ===== */\r
:host([color='danger']) .root {\r
  background-color: var(--colorPaletteRedBackground3);\r
  color: var(--colorNeutralForegroundOnBrand);\r
}\r
\r
:host([color='important']) .root {\r
  background-color: var(--colorNeutralForeground1);\r
  color: var(--colorNeutralBackground1);\r
}\r
\r
:host([color='informative']) .root {\r
  background-color: var(--colorNeutralBackground5);\r
  color: var(--colorNeutralForeground3);\r
}\r
\r
:host([color='severe']) .root {\r
  background-color: var(--colorPaletteDarkOrangeBackground3);\r
  color: var(--colorNeutralForegroundOnBrand);\r
}\r
\r
:host([color='subtle']) .root {\r
  background-color: var(--colorNeutralBackground1);\r
  color: var(--colorNeutralForeground1);\r
}\r
\r
:host([color='success']) .root {\r
  background-color: var(--colorPaletteGreenBackground3);\r
  color: var(--colorNeutralForegroundOnBrand);\r
}\r
\r
:host([color='warning']) .root {\r
  background-color: var(--colorPaletteYellowBackground3);\r
  color: var(--colorNeutralForeground1Static);\r
}\r
\r
/* ===== Ghost Appearance ===== */\r
:host([appearance='ghost']) .root {\r
  color: var(--colorBrandForeground1);\r
  background-color: initial;\r
}\r
\r
:host([appearance='ghost'][color='danger']) .root {\r
  color: var(--colorPaletteRedForeground3);\r
}\r
\r
:host([appearance='ghost'][color='important']) .root {\r
  color: var(--colorNeutralForeground1);\r
}\r
\r
:host([appearance='ghost'][color='informative']) .root {\r
  color: var(--colorNeutralForeground3);\r
}\r
\r
:host([appearance='ghost'][color='severe']) .root {\r
  color: var(--colorPaletteDarkOrangeForeground3);\r
}\r
\r
:host([appearance='ghost'][color='subtle']) .root {\r
  color: var(--colorNeutralForegroundInverted);\r
}\r
\r
:host([appearance='ghost'][color='success']) .root {\r
  color: var(--colorPaletteGreenForeground3);\r
}\r
\r
:host([appearance='ghost'][color='warning']) .root {\r
  color: var(--colorPaletteYellowForeground2);\r
}\r
\r
/* ===== Outline Appearance ===== */\r
:host([appearance='outline']) .root {\r
  border-color: currentColor;\r
  color: var(--colorBrandForeground1);\r
  background-color: initial;\r
}\r
\r
:host([appearance='outline'][color='danger']) .root {\r
  color: var(--colorPaletteRedForeground3);\r
}\r
\r
:host([appearance='outline'][color='important']) .root {\r
  color: var(--colorNeutralForeground3);\r
  border-color: var(--colorNeutralStrokeAccessible);\r
}\r
\r
:host([appearance='outline'][color='informative']) .root {\r
  color: var(--colorNeutralForeground3);\r
  border-color: var(--colorNeutralStroke2);\r
}\r
\r
:host([appearance='outline'][color='severe']) .root {\r
  color: var(--colorPaletteDarkOrangeForeground3);\r
}\r
\r
:host([appearance='outline'][color='subtle']) .root {\r
  color: var(--colorNeutralForegroundStaticInverted);\r
}\r
\r
:host([appearance='outline'][color='success']) .root {\r
  color: var(--colorPaletteGreenForeground2);\r
}\r
\r
:host([appearance='outline'][color='warning']) .root {\r
  color: var(--colorPaletteYellowForeground2);\r
}\r
\r
/* ===== Tint Appearance ===== */\r
:host([appearance='tint']) .root {\r
  background-color: var(--colorBrandBackground2);\r
  color: var(--colorBrandForeground2);\r
  border-color: var(--colorBrandStroke2);\r
}\r
\r
:host([appearance='tint'][color='danger']) .root {\r
  background-color: var(--colorPaletteRedBackground1);\r
  color: var(--colorPaletteRedForeground1);\r
  border-color: var(--colorPaletteRedBorder1);\r
}\r
\r
:host([appearance='tint'][color='important']) .root {\r
  background-color: var(--colorNeutralForeground3);\r
  color: var(--colorNeutralBackground1);\r
  border-color: var(--colorTransparentStroke);\r
}\r
\r
:host([appearance='tint'][color='informative']) .root {\r
  background-color: var(--colorNeutralBackground4);\r
  color: var(--colorNeutralForeground3);\r
  border-color: var(--colorNeutralStroke2);\r
}\r
\r
:host([appearance='tint'][color='severe']) .root {\r
  background-color: var(--colorPaletteDarkOrangeBackground1);\r
  color: var(--colorPaletteDarkOrangeForeground1);\r
  border-color: var(--colorPaletteDarkOrangeBorder1);\r
}\r
\r
:host([appearance='tint'][color='subtle']) .root {\r
  background-color: var(--colorNeutralBackground1);\r
  color: var(--colorNeutralForeground3);\r
  border-color: var(--colorNeutralStroke2);\r
}\r
\r
:host([appearance='tint'][color='success']) .root {\r
  background-color: var(--colorPaletteGreenBackground1);\r
  color: var(--colorPaletteGreenForeground1);\r
  border-color: var(--colorPaletteGreenBorder2);\r
}\r
\r
:host([appearance='tint'][color='warning']) .root {\r
  background-color: var(--colorPaletteYellowBackground1);\r
  color: var(--colorPaletteYellowForeground2);\r
  border-color: var(--colorPaletteYellowBorder1);\r
}\r
\r
/* ===== Slot ===== */\r
::slotted([slot='start']) {\r
  margin-inline-end: var(--spacingHorizontalXXS);\r
}\r
\r
::slotted([slot='end']) {\r
  margin-inline-start: var(--spacingHorizontalXXS);\r
}\r
\r
/* ===== Forced Colors ===== */\r
@media (forced-colors: active) {\r
  .root,\r
  :host([appearance='outline']) .root,\r
  :host([appearance='tint']) .root {\r
    border-color: CanvasText;\r
  }\r
}\r
`,a=class extends e{static styles=i;static template=`
    <div class="root">
      <slot name="start"></slot>
      <slot></slot>
      <slot name="end"></slot>
    </div>
  `;static get observedAttributes(){return[`appearance`,`color`,`shape`,`size`]}};customElements.define(`fluent-badge`,a);var o=`:host { display: inline; }\r
\r
:host([hidden]) .root {\r
  display: none;\r
}\r
\r
.root {\r
  display: inline;\r
  box-sizing: border-box;\r
  background-color: transparent;\r
  color: var(--colorBrandForegroundLink);\r
  cursor: pointer;\r
  font-family: var(--fontFamilyBase);\r
  font-size: var(--fontSizeBase300);\r
  font-weight: var(--fontWeightRegular);\r
  text-align: start;\r
  text-decoration: none;\r
  text-decoration-thickness: var(--strokeWidthThin);\r
  user-select: text;\r
}\r
\r
.root:is(:hover, :focus-visible) {\r
  outline: none;\r
  text-decoration-line: underline;\r
}\r
\r
@media (hover: hover) {\r
  .root:hover {\r
    color: var(--colorBrandForegroundLinkHover);\r
  }\r
\r
  .root:active {\r
    color: var(--colorBrandForegroundLinkPressed);\r
  }\r
\r
  :host([appearance='subtle']) .root:hover {\r
    color: var(--colorNeutralForeground2LinkHover);\r
  }\r
\r
  :host([appearance='subtle']) .root:active {\r
    color: var(--colorNeutralForeground2LinkPressed);\r
  }\r
}\r
\r
:host([appearance='subtle']) .root {\r
  color: var(--colorNeutralForeground2Link);\r
}\r
\r
:host-context(:is(h1, h2, h3, h4, h5, h6, p, fluent-text)),\r
:host([inline]) .root {\r
  font: inherit;\r
  text-decoration: underline;\r
}\r
\r
:host(:not([href])) .root {\r
  color: inherit;\r
  text-decoration: none;\r
  pointer-events: none;\r
}\r
\r
:host([disabled]) .root {\r
  color: var(--colorNeutralForegroundDisabled);\r
  text-decoration: none;\r
}\r
\r
@media (forced-colors: active) {\r
  .root {\r
    color: LinkText;\r
  }\r
}\r
`,s=class extends e{static styles=o;static template=`<a class="root"><slot></slot></a>`;static get observedAttributes(){return[`appearance`,`inline`,`disabled`,`href`,`target`,`rel`,`hreflang`,`ping`,`referrerpolicy`,`type`,`download`]}constructor(){super(),this._boundClick=this._handleClick.bind(this)}connectedCallback(){super.connectedCallback(),this._root.addEventListener(`click`,this._boundClick);let e=this._root.querySelector(`.root`);e&&this._syncAllAttrs(e)}disconnectedCallback(){super.disconnectedCallback(),this._root.removeEventListener(`click`,this._boundClick)}changed(e,t,n){let r=this._root.querySelector(`.root`);if(r)switch(e){case`href`:r.href=n||``;break;case`target`:r.target=n||``;break;case`rel`:r.rel=n||``;break;case`hreflang`:r.hreflang=n||``;break;case`ping`:r.ping=n||``;break;case`referrerpolicy`:r.referrerPolicy=n||``;break;case`type`:r.type=n||``;break;case`download`:r.download=n||``;break;case`disabled`:if(n!==null)r.removeAttribute(`href`),r.style.pointerEvents=`none`,r.style.cursor=`default`;else{let e=this.getAttribute(`href`);e&&(r.href=e),r.style.pointerEvents=``,r.style.cursor=``}}}_syncAllAttrs(e){let t=this.getAttribute(`href`);t&&(e.href=t);let n=this.getAttribute(`target`);n&&(e.target=n);let r=this.getAttribute(`rel`);r&&(e.rel=r);let i=this.getAttribute(`hreflang`);i&&(e.hreflang=i);let a=this.getAttribute(`ping`);a&&(e.ping=a);let o=this.getAttribute(`referrerpolicy`);o&&(e.referrerPolicy=o);let s=this.getAttribute(`type`);s&&(e.type=s);let c=this.getAttribute(`download`);c&&(e.download=c),this.hasAttribute(`disabled`)&&(e.removeAttribute(`href`),e.style.pointerEvents=`none`,e.style.cursor=`default`)}_handleClick(e){this.hasAttribute(`disabled`)&&(e.preventDefault(),e.stopImmediatePropagation())}};customElements.define(`fluent-link`,s);var c=`:host { display: flex; }\r
\r
:host([hidden]) .root {\r
  display: none;\r
}\r
\r
.root {\r
  display: flex;\r
}\r
\r
.root::after,\r
.root::before {\r
  align-self: center;\r
  background: var(--colorNeutralStroke2);\r
  box-sizing: border-box;\r
  content: '';\r
  display: flex;\r
  flex-grow: 1;\r
  height: var(--strokeWidthThin);\r
}\r
\r
:host([inset]) .root {\r
  padding: 0 12px;\r
}\r
\r
.root ::slotted(*) {\r
  color: var(--colorNeutralForeground2);\r
  font-family: var(--fontFamilyBase);\r
  font-size: var(--fontSizeBase200);\r
  font-weight: var(--fontWeightRegular);\r
  margin: 0;\r
  padding: 0 12px;\r
}\r
\r
:host([align-content='start']) .root::before,\r
:host([align-content='end']) .root::after {\r
  flex-basis: 12px;\r
  flex-grow: 0;\r
  flex-shrink: 0;\r
}\r
\r
:host([orientation='vertical']) .root {\r
  align-items: center;\r
  flex-direction: column;\r
  height: 100%;\r
  min-height: 84px;\r
}\r
\r
:host([orientation='vertical']:empty) .root {\r
  min-height: 20px;\r
}\r
\r
:host([orientation='vertical'][inset]) .root::before {\r
  margin-top: 12px;\r
}\r
:host([orientation='vertical'][inset]) .root::after {\r
  margin-bottom: 12px;\r
}\r
\r
:host([orientation='vertical']:empty) .root::before,\r
:host([orientation='vertical']:empty) .root::after {\r
  height: 10px;\r
  min-height: 10px;\r
  flex-grow: 0;\r
}\r
\r
:host([orientation='vertical']) .root::before,\r
:host([orientation='vertical']) .root::after {\r
  width: var(--strokeWidthThin);\r
  min-height: 20px;\r
  height: 100%;\r
}\r
\r
:host([orientation='vertical']) .root ::slotted(*) {\r
  display: flex;\r
  flex-direction: column;\r
  padding: 12px 0;\r
  line-height: 20px;\r
}\r
\r
:host([orientation='vertical'][align-content='start']) .root::before {\r
  min-height: 8px;\r
}\r
:host([orientation='vertical'][align-content='end']) .root::after {\r
  min-height: 8px;\r
}\r
\r
:host([appearance='strong']) .root::before,\r
:host([appearance='strong']) .root::after {\r
  background: var(--colorNeutralStroke1);\r
}\r
:host([appearance='strong']) .root ::slotted(*) {\r
  color: var(--colorNeutralForeground1);\r
}\r
:host([appearance='brand']) .root::before,\r
:host([appearance='brand']) .root::after {\r
  background: var(--colorBrandStroke1);\r
}\r
:host([appearance='brand']) .root ::slotted(*) {\r
  color: var(--colorBrandForeground1);\r
}\r
:host([appearance='subtle']) .root::before,\r
:host([appearance='subtle']) .root::after {\r
  background: var(--colorNeutralStroke3);\r
}\r
:host([appearance='subtle']) .root ::slotted(*) {\r
  color: var(--colorNeutralForeground3);\r
}\r
\r
@media (forced-colors: active) {\r
  :host([appearance='strong']) .root::before,\r
  :host([appearance='strong']) .root::after,\r
  :host([appearance='brand']) .root::before,\r
  :host([appearance='brand']) .root::after,\r
  :host([appearance='subtle']) .root::before,\r
  :host([appearance='subtle']) .root::after,\r
  .root::after,\r
  .root::before {\r
    background: WindowText;\r
    color: WindowText;\r
  }\r
}\r
`,l=class extends e{static styles=c;static template=`<div class="root"><slot></slot></div>`;static get observedAttributes(){return[`role`,`orientation`,`align-content`,`appearance`,`inset`]}};customElements.define(`fluent-divider`,l);var u=`:host { display: inline-flex; }\r
\r
:host([hidden]) .root {\r
  display: none;\r
}\r
\r
.root {\r
  position: relative;\r
  display: inline-flex;\r
  --duration: 1.5s;\r
  --indicatorSize: var(--strokeWidthThicker);\r
  --size: 32px;\r
  height: var(--size);\r
  width: var(--size);\r
}\r
\r
:host([size='tiny']) .root {\r
  --indicatorSize: var(--strokeWidthThick);\r
  --size: 20px;\r
}\r
:host([size='extra-small']) .root {\r
  --indicatorSize: var(--strokeWidthThick);\r
  --size: 24px;\r
}\r
:host([size='small']) .root {\r
  --indicatorSize: var(--strokeWidthThick);\r
  --size: 28px;\r
}\r
:host([size='large']) .root {\r
  --indicatorSize: var(--strokeWidthThicker);\r
  --size: 36px;\r
}\r
:host([size='extra-large']) .root {\r
  --indicatorSize: var(--strokeWidthThicker);\r
  --size: 40px;\r
}\r
:host([size='huge']) .root {\r
  --indicatorSize: var(--strokeWidthThickest);\r
  --size: 44px;\r
}\r
\r
.progress,\r
.background,\r
.spinner,\r
.start,\r
.end,\r
.indicator {\r
  position: absolute;\r
  inset: 0;\r
}\r
\r
.progress,\r
.spinner,\r
.indicator {\r
  animation: none var(--duration) infinite var(--curveEasyEase);\r
}\r
\r
.progress {\r
  animation-timing-function: linear;\r
  animation-name: spin-linear;\r
}\r
\r
.background {\r
  border: var(--indicatorSize) solid var(--colorBrandStroke2);\r
  border-radius: 50%;\r
}\r
\r
:host([appearance='inverted']) .root .background {\r
  border-color: rgba(255, 255, 255, 0.2);\r
}\r
\r
.spinner {\r
  animation-name: spin-swing;\r
}\r
\r
.start {\r
  overflow: hidden;\r
  right: 50%;\r
}\r
\r
.end {\r
  overflow: hidden;\r
  left: 50%;\r
}\r
\r
.indicator {\r
  color: var(--colorBrandStroke1);\r
  box-sizing: border-box;\r
  border-radius: 50%;\r
  border: var(--indicatorSize) solid transparent;\r
  border-block-start-color: currentcolor;\r
  border-right-color: currentcolor;\r
}\r
\r
:host([appearance='inverted']) .root .indicator {\r
  color: var(--colorNeutralStrokeOnBrand2);\r
}\r
\r
.start .indicator {\r
  rotate: 135deg;\r
  inset: 0 -100% 0 0;\r
  animation-name: spin-start;\r
}\r
\r
.end .indicator {\r
  rotate: 135deg;\r
  inset: 0 0 0 -100%;\r
  animation-name: spin-end;\r
}\r
\r
@keyframes spin-linear {\r
  100% {\r
    transform: rotate(360deg);\r
  }\r
}\r
\r
@keyframes spin-swing {\r
  0% {\r
    transform: rotate(-135deg);\r
  }\r
  50% {\r
    transform: rotate(0deg);\r
  }\r
  100% {\r
    transform: rotate(225deg);\r
  }\r
}\r
\r
@keyframes spin-start {\r
  0%,\r
  100% {\r
    transform: rotate(0deg);\r
  }\r
  50% {\r
    transform: rotate(-80deg);\r
  }\r
}\r
\r
@keyframes spin-end {\r
  0%,\r
  100% {\r
    transform: rotate(0deg);\r
  }\r
  50% {\r
    transform: rotate(70deg);\r
  }\r
}\r
\r
@media (forced-colors: active) {\r
  .background {\r
    display: none;\r
  }\r
  .indicator {\r
    border-color: Canvas;\r
    border-block-start-color: Highlight;\r
    border-right-color: Highlight;\r
  }\r
}\r
`,d=class extends e{static styles=u;static template=`
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
  `;static get observedAttributes(){return[`size`,`appearance`]}};customElements.define(`fluent-spinner`,d);var f=`:host { display: inline-grid; }\r
\r
:host([hidden]) .root {\r
  display: none;\r
}\r
\r
.root {\r
  display: inline-grid;\r
  position: relative;\r
  place-items: center;\r
  place-content: center;\r
  grid-template: 1fr / 1fr;\r
  flex-shrink: 0;\r
  width: 32px;\r
  height: 32px;\r
  font-family: var(--fontFamilyBase);\r
  font-weight: var(--fontWeightSemibold);\r
  font-size: var(--fontSizeBase300);\r
  border-radius: var(--borderRadiusCircular);\r
  color: var(--colorNeutralForeground3);\r
  background-color: var(--colorNeutralBackground6);\r
}\r
\r
.monogram,\r
.default-icon {\r
  grid-area: 1 / 1 / -1 / -1;\r
}\r
\r
.monogram:empty {\r
  display: none;\r
}\r
\r
.default-slot:is(.has-slotted, :has-slotted) ~ .default-icon,\r
.default-slot:is(.has-slotted, :has-slotted) ~ .monogram,\r
:host(:is([name]):not([name=''])) .root .default-icon,\r
:host(:is([initials]):not([initials=''])) .root .default-icon {\r
  display: none;\r
}\r
\r
.default-icon,\r
::slotted(svg) {\r
  width: 20px;\r
  height: 20px;\r
  font-size: 20px;\r
}\r
\r
::slotted(img) {\r
  box-sizing: border-box;\r
  width: 100%;\r
  height: 100%;\r
  border-radius: var(--borderRadiusCircular);\r
}\r
\r
::slotted([slot='badge']) {\r
  position: absolute;\r
  bottom: 0;\r
  right: 0;\r
  box-shadow: 0 0 0 var(--strokeWidthThin) var(--colorNeutralBackground1);\r
}\r
\r
:host([size='64']) .root ::slotted([slot='badge']),\r
:host([size='72']) .root ::slotted([slot='badge']),\r
:host([size='96']) .root ::slotted([slot='badge']),\r
:host([size='120']) .root ::slotted([slot='badge']),\r
:host([size='128']) .root ::slotted([slot='badge']) {\r
  box-shadow: 0 0 0 var(--strokeWidthThick) var(--colorNeutralBackground1);\r
}\r
\r
:host([size='16']) .root,\r
:host([size='20']) .root,\r
:host([size='24']) .root {\r
  font-size: var(--fontSizeBase100);\r
  font-weight: var(--fontWeightRegular);\r
}\r
\r
:host([size='16']) .root {\r
  width: 16px;\r
  height: 16px;\r
}\r
\r
:host([size='20']) .root {\r
  width: 20px;\r
  height: 20px;\r
}\r
\r
:host([size='24']) .root {\r
  width: 24px;\r
  height: 24px;\r
}\r
\r
:host([size='16']) .root .default-icon,\r
:host([size='16']) .root ::slotted(svg) {\r
  width: 12px;\r
  height: 12px;\r
  font-size: 12px;\r
}\r
\r
:host([size='20']) .root .default-icon,\r
:host([size='24']) .root .default-icon,\r
:host([size='20']) .root ::slotted(svg),\r
:host([size='24']) .root ::slotted(svg) {\r
  width: 16px;\r
  height: 16px;\r
  font-size: 16px;\r
}\r
\r
:host([size='28']) .root {\r
  width: 28px;\r
  height: 28px;\r
  font-size: var(--fontSizeBase200);\r
}\r
\r
:host([size='36']) .root {\r
  width: 36px;\r
  height: 36px;\r
}\r
\r
:host([size='40']) .root {\r
  width: 40px;\r
  height: 40px;\r
}\r
\r
:host([size='48']) .root,\r
:host([size='56']) .root {\r
  font-size: var(--fontSizeBase400);\r
}\r
\r
:host([size='48']) .root {\r
  width: 48px;\r
  height: 48px;\r
}\r
\r
:host([size='48']) .root .default-icon,\r
:host([size='48']) .root ::slotted(svg) {\r
  width: 24px;\r
  height: 24px;\r
  font-size: 24px;\r
}\r
\r
:host([size='56']) .root {\r
  width: 56px;\r
  height: 56px;\r
}\r
\r
:host([size='56']) .root .default-icon,\r
:host([size='56']) .root ::slotted(svg) {\r
  width: 28px;\r
  height: 28px;\r
  font-size: 28px;\r
}\r
\r
:host([size='64']) .root,\r
:host([size='72']) .root,\r
:host([size='96']) .root {\r
  font-size: var(--fontSizeBase500);\r
}\r
\r
:host([size='64']) .root .default-icon,\r
:host([size='72']) .root .default-icon,\r
:host([size='64']) .root ::slotted(svg),\r
:host([size='72']) .root ::slotted(svg) {\r
  width: 32px;\r
  height: 32px;\r
  font-size: 32px;\r
}\r
\r
:host([size='64']) .root {\r
  width: 64px;\r
  height: 64px;\r
}\r
\r
:host([size='72']) .root {\r
  width: 72px;\r
  height: 72px;\r
}\r
\r
:host([size='96']) .root {\r
  width: 96px;\r
  height: 96px;\r
}\r
\r
:host([size='96']) .root .default-icon,\r
:host([size='120']) .root .default-icon,\r
:host([size='128']) .root .default-icon,\r
:host([size='96']) .root ::slotted(svg),\r
:host([size='120']) .root ::slotted(svg),\r
:host([size='128']) .root ::slotted(svg) {\r
  width: 48px;\r
  height: 48px;\r
  font-size: 48px;\r
}\r
\r
:host([size='120']) .root,\r
:host([size='128']) .root {\r
  font-size: var(--fontSizeBase600);\r
}\r
\r
:host([size='120']) .root {\r
  width: 120px;\r
  height: 120px;\r
}\r
\r
:host([size='128']) .root {\r
  width: 128px;\r
  height: 128px;\r
}\r
\r
:host([shape='square']) .root {\r
  border-radius: var(--borderRadiusMedium);\r
}\r
\r
:host([shape='square'][size='20']) .root,\r
:host([shape='square'][size='24']) .root {\r
  border-radius: var(--borderRadiusSmall);\r
}\r
\r
:host([shape='square'][size='56']) .root,\r
:host([shape='square'][size='64']) .root,\r
:host([shape='square'][size='72']) .root {\r
  border-radius: var(--borderRadiusLarge);\r
}\r
:host([shape='square'][size='96']) .root,\r
:host([shape='square'][size='120']) .root,\r
:host([shape='square'][size='128']) .root {\r
  border-radius: var(--borderRadiusXLarge);\r
}\r
\r
:host([data-color='brand']) .root {\r
  color: var(--colorNeutralForegroundStaticInverted);\r
  background-color: var(--colorBrandBackgroundStatic);\r
}\r
\r
:host([data-color='dark-red']) .root {\r
  color: var(--colorPaletteDarkRedForeground2);\r
  background-color: var(--colorPaletteDarkRedBackground2);\r
}\r
\r
:host([data-color='cranberry']) .root {\r
  color: var(--colorPaletteCranberryForeground2);\r
  background-color: var(--colorPaletteCranberryBackground2);\r
}\r
\r
:host([data-color='red']) .root {\r
  color: var(--colorPaletteRedForeground2);\r
  background-color: var(--colorPaletteRedBackground2);\r
}\r
\r
:host([data-color='pumpkin']) .root {\r
  color: var(--colorPalettePumpkinForeground2);\r
  background-color: var(--colorPalettePumpkinBackground2);\r
}\r
\r
:host([data-color='peach']) .root {\r
  color: var(--colorPalettePeachForeground2);\r
  background-color: var(--colorPalettePeachBackground2);\r
}\r
\r
:host([data-color='marigold']) .root {\r
  color: var(--colorPaletteMarigoldForeground2);\r
  background-color: var(--colorPaletteMarigoldBackground2);\r
}\r
\r
:host([data-color='gold']) .root {\r
  color: var(--colorPaletteGoldForeground2);\r
  background-color: var(--colorPaletteGoldBackground2);\r
}\r
\r
:host([data-color='brass']) .root {\r
  color: var(--colorPaletteBrassForeground2);\r
  background-color: var(--colorPaletteBrassBackground2);\r
}\r
\r
:host([data-color='brown']) .root {\r
  color: var(--colorPaletteBrownForeground2);\r
  background-color: var(--colorPaletteBrownBackground2);\r
}\r
\r
:host([data-color='forest']) .root {\r
  color: var(--colorPaletteForestForeground2);\r
  background-color: var(--colorPaletteForestBackground2);\r
}\r
\r
:host([data-color='seafoam']) .root {\r
  color: var(--colorPaletteSeafoamForeground2);\r
  background-color: var(--colorPaletteSeafoamBackground2);\r
}\r
\r
:host([data-color='dark-green']) .root {\r
  color: var(--colorPaletteDarkGreenForeground2);\r
  background-color: var(--colorPaletteDarkGreenBackground2);\r
}\r
\r
:host([data-color='light-teal']) .root {\r
  color: var(--colorPaletteLightTealForeground2);\r
  background-color: var(--colorPaletteLightTealBackground2);\r
}\r
\r
:host([data-color='teal']) .root {\r
  color: var(--colorPaletteTealForeground2);\r
  background-color: var(--colorPaletteTealBackground2);\r
}\r
\r
:host([data-color='steel']) .root {\r
  color: var(--colorPaletteSteelForeground2);\r
  background-color: var(--colorPaletteSteelBackground2);\r
}\r
\r
:host([data-color='blue']) .root {\r
  color: var(--colorPaletteBlueForeground2);\r
  background-color: var(--colorPaletteBlueBackground2);\r
}\r
\r
:host([data-color='royal-blue']) .root {\r
  color: var(--colorPaletteRoyalBlueForeground2);\r
  background-color: var(--colorPaletteRoyalBlueBackground2);\r
}\r
\r
:host([data-color='cornflower']) .root {\r
  color: var(--colorPaletteCornflowerForeground2);\r
  background-color: var(--colorPaletteCornflowerBackground2);\r
}\r
\r
:host([data-color='navy']) .root {\r
  color: var(--colorPaletteNavyForeground2);\r
  background-color: var(--colorPaletteNavyBackground2);\r
}\r
\r
:host([data-color='lavender']) .root {\r
  color: var(--colorPaletteLavenderForeground2);\r
  background-color: var(--colorPaletteLavenderBackground2);\r
}\r
\r
:host([data-color='purple']) .root {\r
  color: var(--colorPalettePurpleForeground2);\r
  background-color: var(--colorPalettePurpleBackground2);\r
}\r
\r
:host([data-color='grape']) .root {\r
  color: var(--colorPaletteGrapeForeground2);\r
  background-color: var(--colorPaletteGrapeBackground2);\r
}\r
\r
:host([data-color='lilac']) .root {\r
  color: var(--colorPaletteLilacForeground2);\r
  background-color: var(--colorPaletteLilacBackground2);\r
}\r
\r
:host([data-color='pink']) .root {\r
  color: var(--colorPalettePinkForeground2);\r
  background-color: var(--colorPalettePinkBackground2);\r
}\r
\r
:host([data-color='magenta']) .root {\r
  color: var(--colorPaletteMagentaForeground2);\r
  background-color: var(--colorPaletteMagentaBackground2);\r
}\r
\r
:host([data-color='plum']) .root {\r
  color: var(--colorPalettePlumForeground2);\r
  background-color: var(--colorPalettePlumBackground2);\r
}\r
\r
:host([data-color='beige']) .root {\r
  color: var(--colorPaletteBeigeForeground2);\r
  background-color: var(--colorPaletteBeigeBackground2);\r
}\r
\r
:host([data-color='mink']) .root {\r
  color: var(--colorPaletteMinkForeground2);\r
  background-color: var(--colorPaletteMinkBackground2);\r
}\r
\r
:host([data-color='platinum']) .root {\r
  color: var(--colorPalettePlatinumForeground2);\r
  background-color: var(--colorPalettePlatinumBackground2);\r
}\r
\r
:host([data-color='anchor']) .root {\r
  color: var(--colorPaletteAnchorForeground2);\r
  background-color: var(--colorPaletteAnchorBackground2);\r
}\r
\r
:host([active]) .root {\r
  transform: perspective(1px);\r
  transition-property: transform, opacity;\r
  transition-duration: var(--durationUltraSlow), var(--durationFaster);\r
  transition-delay: var(--curveEasyEaseMax), var(--curveLinear);\r
}\r
\r
:host([active]) .root::before {\r
  content: '';\r
  position: absolute;\r
  top: 0;\r
  left: 0;\r
  bottom: 0;\r
  right: 0;\r
  border-radius: inherit;\r
  transition-property: margin, opacity;\r
  transition-duration: var(--durationUltraSlow), var(--durationSlower);\r
  transition-delay: var(--curveEasyEaseMax), var(--curveLinear);\r
}\r
:host([active]) .root::before {\r
  box-shadow: var(--shadow8);\r
  border-style: solid;\r
  border-color: var(--colorBrandBackgroundStatic);\r
}\r
\r
:host([active][appearance='shadow']) .root::before {\r
  border-style: none;\r
  border-color: none;\r
}\r
\r
:host([active]:not([appearance='shadow'])) .root::before {\r
  margin: calc(-2 * var(--strokeWidthThick));\r
  border-width: var(--strokeWidthThick);\r
}\r
\r
:host([size='56'][active]:not([appearance='shadow'])) .root::before,\r
:host([size='64'][active]:not([appearance='shadow'])) .root::before {\r
  margin: calc(-2 * var(--strokeWidthThicker));\r
  border-width: var(--strokeWidthThicker);\r
}\r
\r
:host([size='72'][active]:not([appearance='shadow'])) .root::before,\r
:host([size='96'][active]:not([appearance='shadow'])) .root::before,\r
:host([size='120'][active]:not([appearance='shadow'])) .root::before,\r
:host([size='128'][active]:not([appearance='shadow'])) .root::before {\r
  margin: calc(-2 * var(--strokeWidthThickest));\r
  border-width: var(--strokeWidthThickest);\r
}\r
\r
:host([size='20'][active][appearance]) .root::before,\r
:host([size='24'][active][appearance]) .root::before,\r
:host([size='28'][active][appearance]) .root::before {\r
  box-shadow: var(--shadow4);\r
}\r
\r
:host([size='56'][active][appearance]) .root::before,\r
:host([size='64'][active][appearance]) .root::before {\r
  box-shadow: var(--shadow16);\r
}\r
\r
:host([size='72'][active][appearance]) .root::before,\r
:host([size='96'][active][appearance]) .root::before,\r
:host([size='120'][active][appearance]) .root::before,\r
:host([size='128'][active][appearance]) .root::before {\r
  box-shadow: var(--shadow28);\r
}\r
\r
:host([active][appearance='ring']) .root::before {\r
  box-shadow: none;\r
}\r
\r
:host([active='inactive']) .root {\r
  opacity: 0.8;\r
  transform: scale(0.875);\r
  transition-property: transform, opacity;\r
  transition-duration: var(--durationUltraSlow), var(--durationFaster);\r
  transition-delay: var(--curveDecelerateMin), var(--curveLinear);\r
}\r
\r
:host([active='inactive']) .root::before {\r
  margin: 0;\r
  opacity: 0;\r
  transition-property: margin, opacity;\r
  transition-duration: var(--durationUltraSlow), var(--durationSlower);\r
  transition-delay: var(--curveDecelerateMin), var(--curveLinear);\r
}\r
\r
@media screen and (prefers-reduced-motion: reduce) {\r
  :host([active]) .root {\r
    transition-duration: 0.01ms;\r
  }\r
\r
  :host([active]) .root::before {\r
    transition-duration: 0.01ms;\r
    transition-delay: 0.01ms;\r
  }\r
}\r
`,p=class extends e{static styles=f;static template=`
    <div class="root">
      <slot class="default-slot"></slot>
      <span class="monogram" part="monogram"></span>
      <svg width="1em" height="1em" viewBox="0 0 20 20" class="default-icon" fill="currentcolor" aria-hidden="true">
        <path d="M10 2a4 4 0 100 8 4 4 0 000-8zM7 6a3 3 0 116 0 3 3 0 01-6 0zm-2 5a2 2 0 00-2 2c0 1.7.83 2.97 2.13 3.8A9.14 9.14 0 0010 18c1.85 0 3.58-.39 4.87-1.2A4.35 4.35 0 0017 13a2 2 0 00-2-2H5zm-1 2a1 1 0 011-1h10a1 1 0 011 1c0 1.3-.62 2.28-1.67 2.95A8.16 8.16 0 0110 17a8.16 8.16 0 01-4.33-1.05A3.36 3.36 0 014 13z"></path>
      </svg>
      <slot name="badge"></slot>
    </div>
  `;static get observedAttributes(){return[`name`,`initials`,`active`,`shape`,`appearance`,`size`,`color`,`color-id`]}connectedCallback(){super.connectedCallback(),this._updateMonogram(),this._updateAriaLabel()}changed(e,t,n){(e===`initials`||e===`name`)&&(this._updateMonogram(),this._updateAriaLabel()),e===`active`&&this._root.querySelector(`.monogram`)?.classList.toggle(`active`,this.hasAttribute(`active`)),(e===`color`||e===`color-id`)&&this._updateColor()}_updateMonogram(){let e=this._root.querySelector(`.monogram`);if(!e)return;let t=this.getAttribute(`initials`);if(t){e.textContent=t;return}let n=this.getAttribute(`name`);if(n){let t=n.split(/\s+/).filter(Boolean);e.textContent=(t.length===1?t[0].charAt(0):t[0].charAt(0)+t[t.length-1].charAt(0)).toUpperCase()}else e.textContent=``}_updateAriaLabel(){let e=this.getAttribute(`name`);e&&(this.setAttribute(`aria-label`,e),this.setAttribute(`role`,`img`))}_updateColor(){let e=this.getAttribute(`color`),t=this.getAttribute(`color-id`);e===`colorful`&&t?this.setAttribute(`data-color`,t):e&&e!==`colorful`&&this.setAttribute(`data-color`,e)}};customElements.define(`fluent-avatar`,p);var m=`:host { display: inline-flex; }\r
\r
:host([hidden]) .root {\r
  display: none;\r
}\r
\r
.root {\r
  --size: 16px;\r
  background-color: var(--colorNeutralBackground1);\r
  border-radius: var(--borderRadiusSmall);\r
  border: var(--strokeWidthThin) solid var(--colorNeutralStrokeAccessible);\r
  box-sizing: border-box;\r
  cursor: pointer;\r
  position: relative;\r
  width: var(--size);\r
  aspect-ratio: 1;\r
  display: inline-flex;\r
}\r
\r
.root:hover {\r
  border-color: var(--colorNeutralStrokeAccessibleHover);\r
}\r
\r
.root:active {\r
  border-color: var(--colorNeutralStrokeAccessiblePressed);\r
}\r
\r
:host([checked]) .root:hover {\r
  background-color: var(--colorCompoundBrandBackgroundHover);\r
  border-color: var(--colorCompoundBrandStrokeHover);\r
}\r
\r
:host([checked]) .root:active {\r
  background-color: var(--colorCompoundBrandBackgroundPressed);\r
  border-color: var(--colorCompoundBrandStrokePressed);\r
}\r
\r
.root:focus-visible {\r
  outline: none;\r
}\r
\r
:host(:not([slot='input'])) .root::after {\r
  content: '';\r
  position: absolute;\r
  inset: -8px;\r
  box-sizing: border-box;\r
  outline: none;\r
  border: var(--strokeWidthThick) solid var(--colorTransparentStroke);\r
  border-radius: var(--borderRadiusMedium);\r
}\r
\r
:host(:not([slot='input'])) .root:focus-visible::after {\r
  border-color: var(--colorStrokeFocus2);\r
}\r
\r
.indeterminate-indicator,\r
.checked-indicator {\r
  color: var(--colorNeutralForegroundInverted);\r
  inset: 0;\r
  margin: auto;\r
  position: absolute;\r
  aspect-ratio: 1;\r
}\r
\r
::slotted([slot='checked-indicator']),\r
.checked-indicator {\r
  fill: currentColor;\r
  display: inline-flex;\r
  flex: 1 0 auto;\r
  width: 12px;\r
}\r
\r
:host(:not([checked])) .root ::slotted([slot='checked-indicator']),\r
:host(:not([checked])) .root .checked-indicator {\r
  display: none;\r
}\r
\r
:host([checked]) .root,\r
:host([indeterminate]) .root {\r
  border-color: var(--colorCompoundBrandStroke);\r
}\r
\r
:host([checked]) .root,\r
:host([indeterminate]) .root .indeterminate-indicator {\r
  background-color: var(--colorCompoundBrandBackground);\r
}\r
\r
:host([indeterminate]) .root .indeterminate-indicator {\r
  border-radius: var(--borderRadiusSmall);\r
  position: absolute;\r
  width: calc(var(--size) / 2);\r
  inset: 0;\r
}\r
\r
:host([size='large']) .root {\r
  --size: 20px;\r
}\r
\r
:host([size='large']) .root ::slotted([slot='checked-indicator']),\r
:host([size='large']) .root .checked-indicator {\r
  width: 16px;\r
}\r
\r
:host([shape='circular']) .root,\r
:host([shape='circular']) .root .indeterminate-indicator {\r
  border-radius: var(--borderRadiusCircular);\r
}\r
\r
:host([disabled]) .root,\r
:host([disabled][checked]) .root {\r
  background-color: var(--colorNeutralBackgroundDisabled);\r
  border-color: var(--colorNeutralStrokeDisabled);\r
}\r
\r
:host([disabled]) .root {\r
  cursor: unset;\r
}\r
\r
:host([disabled][indeterminate]) .root .indeterminate-indicator {\r
  background-color: var(--colorNeutralStrokeDisabled);\r
}\r
\r
:host([disabled][checked]) .root .checked-indicator {\r
  color: var(--colorNeutralStrokeDisabled);\r
}\r
\r
@media (forced-colors: active) {\r
  .root {\r
    border-color: FieldText;\r
  }\r
\r
  :host(:not([slot='input']:focus-visible)) .root::after {\r
    border-color: Canvas;\r
  }\r
\r
  :host(:not([disabled])) .root:hover,\r
  :host([checked]:not([disabled])) .root:hover,\r
  :host(:not([slot='input'])) .root:focus-visible::after {\r
    border-color: Highlight;\r
  }\r
\r
  .indeterminate-indicator,\r
  .checked-indicator {\r
    color: HighlightText;\r
  }\r
\r
  :host([checked]) .root,\r
  :host([indeterminate]) .root .indeterminate-indicator {\r
    background-color: FieldText;\r
  }\r
\r
  :host([checked]:not([disabled])) .root:hover,\r
  :host([indeterminate]:not([disabled])) .root:hover .indeterminate-indicator {\r
    background-color: Highlight;\r
  }\r
\r
  :host([disabled]) .root {\r
    border-color: GrayText;\r
  }\r
\r
  :host([disabled][indeterminate]) .root .indeterminate-indicator {\r
    background-color: GrayText;\r
  }\r
\r
  :host([disabled]) .root,\r
  :host([disabled][checked]) .root .checked-indicator {\r
    color: GrayText;\r
  }\r
}\r
`,h=class extends e{static styles=m;static formAssociated=!0;static template=`
    <div class="root">
      <slot name="checked-indicator">
        <svg fill="currentColor" aria-hidden="true" class="checked-indicator" width="1em" height="1em" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.76 3.2c.3.29.32.76.04 1.06l-4.25 4.5a.75.75 0 0 1-1.08.02L2.22 6.53a.75.75 0 0 1 1.06-1.06l1.7 1.7L8.7 3.24a.75.75 0 0 1 1.06-.04Z" fill="currentColor"></path>
        </svg>
      </slot>
      <slot name="indeterminate-indicator">
        <span class="indeterminate-indicator"></span>
      </slot>
    </div>
  `;static get observedAttributes(){return[`checked`,`disabled`,`required`,`value`,`name`,`size`,`shape`,`autofocus`,`indeterminate`]}constructor(){super(),this._internals=this.attachInternals(),this._internals.role=`checkbox`,this._checked=!1,this._dirtyChecked=!1,this._keydownPressed=!1,this._indeterminate=!1,this._value=`on`,this._name=``,this._size=`medium`,this._shape=`square`}connectedCallback(){super.connectedCallback(),this._shadowRoot=this._root,this._updateDisabled(),this._setAriaChecked(),this._setValidity(),this.addEventListener(`click`,this._clickHandler.bind(this)),this.addEventListener(`keydown`,this._keydownHandler.bind(this)),this.addEventListener(`keyup`,this._keyupHandler.bind(this))}changed(e,t,n){switch(e){case`checked`:this._dirtyChecked||(this._checked=n!==null,this._setAriaChecked(),this._setValidity());break;case`disabled`:this._updateDisabled();break;case`indeterminate`:this._indeterminate=n!==null,this._setAriaChecked();break;case`required`:this._internals.ariaRequired=this.required?`true`:`false`,this._setValidity();break;case`value`:this._value=n||`on`;break;case`name`:this._name=n||``,this._name?this.setAttribute(`name`,this._name):this.removeAttribute(`name`);break;case`autofocus`:n!==null&&!this.disabled&&this.focus();break;case`size`:this._size=n||`medium`;break;case`shape`:this._shape=n||`square`}}get checked(){return this._checked}set checked(e){this._checked=!!e,this._setFormValue(this._checked?this._value:null),this._setAriaChecked(),this._setValidity(),this._checked?this.setAttribute(`checked`,``):this.removeAttribute(`checked`)}get disabled(){return this.hasAttribute(`disabled`)}set disabled(e){e?this.setAttribute(`disabled`,``):this.removeAttribute(`disabled`)}get required(){return this.hasAttribute(`required`)}get indeterminate(){return this.hasAttribute(`indeterminate`)}set indeterminate(e){e?this.setAttribute(`indeterminate`,``):this.removeAttribute(`indeterminate`),this._setAriaChecked()}get value(){return this._value||`on`}set value(e){this._value=e,this._checked&&this._setFormValue(e)}get name(){return this._name}set name(e){this._name=e,e?this.setAttribute(`name`,e):this.removeAttribute(`name`)}get form(){return this._internals.form}get labels(){return Object.freeze(Array.from(this._internals.labels))}get validity(){return this._internals.validity}get validationMessage(){if(this._internals.validationMessage)return this._internals.validationMessage;if(!this._validationFallbackMessage){let e=document.createElement(`input`);e.type=`checkbox`,e.required=!0,e.checked=!1,this._validationFallbackMessage=e.validationMessage}return this._validationFallbackMessage}get willValidate(){return this._internals.willValidate}toggleChecked(e){this.indeterminate=!1,this._checked=typeof e==`boolean`?e:!this._checked,this._dirtyChecked=!0,this._setAriaChecked(),this._setFormValue(this._checked?this._value:null),this._setValidity(),this._checked?this.setAttribute(`checked`,``):this.removeAttribute(`checked`)}checkValidity(){return this._internals.checkValidity()}reportValidity(){return this._internals.reportValidity()}setCustomValidity(e){this._internals.setValidity({customError:!!e},e),this._setValidity()}_clickHandler(e){if(this.disabled)return;this._dirtyChecked=!0;let t=this._checked;this.toggleChecked(),t!==this._checked&&(this.dispatchEvent(new Event(`change`,{bubbles:!0,composed:!0})),this.dispatchEvent(new Event(`input`,{bubbles:!0,composed:!0})))}_keydownHandler(e){e.key===` `&&(e.preventDefault(),this._keydownPressed=!0)}_keyupHandler(e){this._keydownPressed&&e.key===` `&&(this._keydownPressed=!1,this.click())}_updateDisabled(){let e=this.hasAttribute(`disabled`);if(e)this.removeAttribute(`tabindex`);else{let e=this.getAttribute(`tabindex`);this.tabIndex=Number(e??0)<0?-1:0}this._internals.ariaDisabled=e?`true`:`false`}_setAriaChecked(){this.indeterminate?this._internals.ariaChecked=`mixed`:this._internals.ariaChecked=this._checked?`true`:`false`}_setFormValue(e){this._internals.setFormValue(e,e)}_setValidity(){if(this.disabled||!this.required){this._internals.setValidity({});return}let e=this.validationMessage;this._internals.setValidity({valueMissing:!!this.required&&!this._checked},e||void 0)}formResetCallback(){let e=this._indeterminate;this._checked=this.hasAttribute(`checked`),this._dirtyChecked=!1,e&&(this._indeterminate=!1,this.removeAttribute(`indeterminate`)),this._setAriaChecked(),this._setValidity()}};customElements.define(`fluent-checkbox`,h);var g=`:host { display: inline-flex; }\r
\r
:host([hidden]) .root {\r
  display: none;\r
}\r
\r
.root {\r
  --size: 16px;\r
  aspect-ratio: 1;\r
  background-color: var(--colorNeutralBackground1);\r
  border: var(--strokeWidthThin) solid var(--colorNeutralStrokeAccessible);\r
  border-radius: var(--borderRadiusCircular);\r
  box-sizing: border-box;\r
  position: relative;\r
  width: var(--size);\r
  display: inline-flex;\r
  cursor: pointer;\r
}\r
\r
:host([size='large']) .root {\r
  --size: 20px;\r
}\r
\r
.checked-indicator {\r
  aspect-ratio: 1;\r
  border-radius: var(--borderRadiusCircular);\r
  color: var(--colorNeutralForegroundInverted);\r
  inset: 0;\r
  margin: auto;\r
  position: absolute;\r
  width: calc(var(--size) * 0.625);\r
}\r
\r
:host(:not([slot='input'])) .root::after {\r
  content: '';\r
  position: absolute;\r
  display: block;\r
  inset: -8px;\r
  box-sizing: border-box;\r
  outline: none;\r
  border: var(--strokeWidthThick) solid var(--colorTransparentStroke);\r
  border-radius: var(--borderRadiusMedium);\r
}\r
\r
:host(:not([slot='input'])) .root:focus-visible::after {\r
  border-color: var(--colorStrokeFocus2);\r
}\r
\r
.root:hover {\r
  border-color: var(--colorNeutralStrokeAccessibleHover);\r
}\r
\r
:host([checked]) .root {\r
  border-color: var(--colorCompoundBrandStroke);\r
}\r
\r
:host([checked]) .root .checked-indicator {\r
  background-color: var(--colorCompoundBrandBackground);\r
}\r
\r
:host([checked]) .root:hover .checked-indicator {\r
  background-color: var(--colorCompoundBrandBackgroundHover);\r
}\r
\r
.root:active {\r
  border-color: var(--colorNeutralStrokeAccessiblePressed);\r
}\r
\r
:host([checked]) .root:active .checked-indicator {\r
  background-color: var(--colorCompoundBrandBackgroundPressed);\r
}\r
\r
.root:focus-visible {\r
  outline: none;\r
}\r
\r
:host([disabled]) .root {\r
  background-color: var(--colorNeutralBackgroundDisabled);\r
  border-color: var(--colorNeutralStrokeDisabled);\r
  cursor: unset;\r
}\r
\r
:host([checked][disabled]) .root .checked-indicator {\r
  background-color: var(--colorNeutralStrokeDisabled);\r
}\r
\r
@media (forced-colors: active) {\r
  .root {\r
    border-color: FieldText;\r
  }\r
\r
  :host(:not([slot='input']:focus-visible)) .root::after {\r
    border-color: Canvas;\r
  }\r
\r
  :host(:not([disabled])) .root:hover,\r
  :host(:not([slot='input'])) .root:focus-visible::after {\r
    border-color: Highlight;\r
  }\r
\r
  .checked-indicator {\r
    color: HighlightText;\r
  }\r
\r
  :host([checked]) .root .checked-indicator {\r
    background-color: FieldText;\r
  }\r
\r
  :host([checked]:not([disabled])) .root:hover .checked-indicator {\r
    background-color: Highlight;\r
  }\r
\r
  :host([disabled]) .root {\r
    border-color: GrayText;\r
    color: GrayText;\r
  }\r
\r
  :host([disabled][checked]) .root .checked-indicator {\r
    background-color: GrayText;\r
  }\r
}\r
`,_=class extends e{static styles=g;static formAssociated=!0;static template=`
    <div class="root">
      <slot name="checked-indicator">
        <span part="checked-indicator" class="checked-indicator" role="presentation"></span>
      </slot>
    </div>
  `;static get observedAttributes(){return[`checked`,`disabled`,`required`,`value`,`name`,`size`,`shape`,`autofocus`]}constructor(){super(),this._internals=this.attachInternals(),this._internals.role=`radio`,this._checked=!1,this._dirtyChecked=!1,this._keydownPressed=!1,this._value=`on`,this._name=``,this._size=`medium`,this._shape=`circular`}connectedCallback(){super.connectedCallback(),this._updateDisabled(),this._setAriaChecked(),this.addEventListener(`click`,this._clickHandler.bind(this)),this.addEventListener(`keydown`,this._keydownHandler.bind(this)),this.addEventListener(`keyup`,this._keyupHandler.bind(this))}changed(e,t,n){switch(e){case`checked`:this._dirtyChecked||(this._checked=n!==null,this._setAriaChecked(),this._checked&&this._uncheckSiblings());break;case`disabled`:this._updateDisabled(),this.dispatchEvent(new Event(`disabled`,{bubbles:!0}));break;case`required`:this._internals.ariaRequired=this.required?`true`:`false`,this._setValidity();break;case`value`:this._value=n||`on`;break;case`name`:this._name=n||``,this._name?this.setAttribute(`name`,this._name):this.removeAttribute(`name`);break;case`size`:this._size=n||`medium`;break;case`shape`:this._shape=n||`circular`;break;case`autofocus`:n!==null&&!this.disabled&&this.focus()}}get checked(){return this._checked}set checked(e){this._checked=!!e,this._setAriaChecked(),this._checked?(this.setAttribute(`checked`,``),this._uncheckSiblings()):this.removeAttribute(`checked`)}get disabled(){return this.hasAttribute(`disabled`)}set disabled(e){e?this.setAttribute(`disabled`,``):this.removeAttribute(`disabled`)}get required(){return this.hasAttribute(`required`)}get value(){return this._value||`on`}set value(e){this._value=e}get name(){return this._name}set name(e){this._name=e,e?this.setAttribute(`name`,e):this.removeAttribute(`name`)}get form(){return this._internals.form}get labels(){return Object.freeze(Array.from(this._internals.labels))}get validity(){return this._internals.validity}get validationMessage(){return this._internals.validationMessage}get willValidate(){return this._internals.willValidate}toggleChecked(e){this._checked=typeof e!=`boolean`||e,this._dirtyChecked=!0,this._setAriaChecked(),this._checked?(this.setAttribute(`checked`,``),this._uncheckSiblings()):this.removeAttribute(`checked`)}checkValidity(){return this._internals.checkValidity()}reportValidity(){return this._internals.reportValidity()}setCustomValidity(e){this._internals.setValidity({customError:!!e},e),this._setValidity()}_clickHandler(e){this.disabled||this._checked||(this._dirtyChecked=!0,this.toggleChecked(!0),this.dispatchEvent(new Event(`change`,{bubbles:!0,composed:!0})),this.dispatchEvent(new Event(`input`,{bubbles:!0,composed:!0})))}_keydownHandler(e){e.key===` `&&(e.preventDefault(),this._keydownPressed=!0)}_keyupHandler(e){this._keydownPressed&&e.key===` `&&(this._keydownPressed=!1,this.click())}_updateDisabled(){let e=this.hasAttribute(`disabled`);if(e)this.removeAttribute(`tabindex`);else{let e=this.getAttribute(`tabindex`);this.tabIndex=Number(e??0)<0?-1:0}this._internals.ariaDisabled=e?`true`:`false`}_setAriaChecked(){this._internals.ariaChecked=this._checked?`true`:`false`}_setValidity(){this.disabled||!this.required?this._internals.setValidity({}):this._internals.setValidity({valueMissing:!!this.required&&!this._checked},this.validationMessage||void 0)}_uncheckSiblings(){this.name&&this.getRootNode().querySelectorAll(`fluent-radio[name="${this.name}"]`).forEach(e=>{e!==this&&e._checked&&(e._checked=!1,e._setAriaChecked(),e.removeAttribute(`checked`),e._setFormValue(null))})}_setFormValue(e){this._internals.setFormValue(e,e)}formResetCallback(){this._checked=this.hasAttribute(`checked`),this._dirtyChecked=!1,this._setAriaChecked(),this._setValidity()}};customElements.define(`fluent-radio`,_);var v=`:host { display: inline-flex; }\r
\r
:host([hidden]) .root {\r
  display: none;\r
}\r
\r
.root {\r
  box-sizing: border-box;\r
  align-items: center;\r
  flex-direction: row;\r
  outline: none;\r
  user-select: none;\r
  padding: 0 var(--spacingHorizontalXXS);\r
  width: 40px;\r
  height: 20px;\r
  background-color: var(--colorTransparentBackground);\r
  border: 1px solid var(--colorNeutralStrokeAccessible);\r
  border-radius: var(--borderRadiusCircular);\r
  display: inline-flex;\r
  position: relative;\r
}\r
\r
:host(:enabled) .root {\r
  cursor: pointer;\r
}\r
\r
.root:hover {\r
  background: none;\r
  border-color: var(--colorNeutralStrokeAccessibleHover);\r
}\r
\r
.root:active {\r
  border-color: var(--colorNeutralStrokeAccessiblePressed);\r
}\r
\r
:host([disabled]) .root,\r
:host([readonly]) .root {\r
  border: 1px solid var(--colorNeutralStrokeDisabled);\r
  background-color: transparent;\r
  cursor: default;\r
}\r
\r
:host([checked]) .root {\r
  background: var(--colorCompoundBrandBackground);\r
  border-color: var(--colorCompoundBrandBackground);\r
}\r
\r
:host([checked]) .root:hover {\r
  background: var(--colorCompoundBrandBackgroundHover);\r
  border-color: var(--colorCompoundBrandBackgroundHover);\r
}\r
\r
:host([checked]) .root:active {\r
  background: var(--colorCompoundBrandBackgroundPressed);\r
  border-color: var(--colorCompoundBrandBackgroundPressed);\r
}\r
\r
:host([checked][disabled]) .root {\r
  background: var(--colorNeutralBackgroundDisabled);\r
  border-color: var(--colorNeutralStrokeDisabled);\r
}\r
\r
.checked-indicator {\r
  height: 14px;\r
  width: 14px;\r
  border-radius: 50%;\r
  margin: auto 0 auto 0;\r
  background-color: var(--colorNeutralForeground3);\r
  transition-duration: var(--durationNormal);\r
  transition-timing-function: var(--curveEasyEase);\r
  transition-property: margin-left, margin-right;\r
  display: block;\r
  flex-shrink: 0;\r
}\r
\r
:host([checked]) .root .checked-indicator {\r
  background-color: var(--colorNeutralForegroundInverted);\r
  margin-left: calc(100% - 14px);\r
  margin-right: 0;\r
}\r
\r
:host([checked]) .root:hover .checked-indicator {\r
  background: var(--colorNeutralForegroundInvertedHover);\r
}\r
\r
:host([checked]) .root:active .checked-indicator {\r
  background: var(--colorNeutralForegroundInvertedPressed);\r
}\r
\r
.root:hover .checked-indicator {\r
  background-color: var(--colorNeutralForeground3Hover);\r
}\r
\r
.root:active .checked-indicator {\r
  background-color: var(--colorNeutralForeground3Pressed);\r
}\r
\r
:host([disabled]) .root .checked-indicator,\r
:host([readonly]) .root .checked-indicator {\r
  background: var(--colorNeutralForegroundDisabled);\r
}\r
\r
:host([checked][disabled]) .root .checked-indicator {\r
  background: var(--colorNeutralForegroundDisabled);\r
}\r
\r
.root:focus-visible {\r
  outline: none;\r
}\r
\r
:host(:not([slot='input'])) .root:focus-visible {\r
  border-color: var(--colorTransparentStroke);\r
  outline: var(--strokeWidthThick) solid var(--colorTransparentStroke);\r
  outline-offset: 1px;\r
  box-shadow: var(--shadow4), 0 0 0 2px var(--colorStrokeFocus2);\r
}\r
\r
@media (forced-colors: active) {\r
  .root {\r
    border-color: InactiveBorder;\r
  }\r
\r
  :host([checked]) .root,\r
  :host([checked]) .root:active,\r
  :host([checked]) .root:hover {\r
    background: Highlight;\r
    border-color: Highlight;\r
  }\r
\r
  .checked-indicator,\r
  .root:hover .checked-indicator,\r
  .root:active .checked-indicator {\r
    background-color: ActiveCaption;\r
  }\r
\r
  :host([checked]) .root .checked-indicator,\r
  :host([checked]) .root:hover .checked-indicator,\r
  :host([checked]) .root:active .checked-indicator {\r
    background-color: ButtonFace;\r
  }\r
\r
  :host([disabled]) .root .checked-indicator,\r
  :host([checked][disabled]) .root .checked-indicator {\r
    background-color: GrayText;\r
  }\r
}\r
\r
@media screen and (prefers-reduced-motion: reduce) {\r
  .checked-indicator {\r
    transition-duration: 0.01ms;\r
  }\r
}\r
`,y=class extends e{static styles=v;static formAssociated=!0;static template=`
    <div class="root">
      <slot name="switch">
        <span class="checked-indicator" part="checked-indicator"></span>
      </slot>
    </div>
  `;static get observedAttributes(){return[`checked`,`disabled`,`required`,`value`,`name`,`label-position`,`autofocus`,`size`,`shape`]}constructor(){super(),this._internals=this.attachInternals(),this._internals.role=`switch`,this._checked=!1,this._dirtyChecked=!1,this._keydownPressed=!1,this._value=`on`,this._name=``,this._size=`medium`,this._shape=`circular`}connectedCallback(){super.connectedCallback(),this._updateDisabled(),this._setAriaChecked(),this.addEventListener(`click`,this._clickHandler.bind(this)),this.addEventListener(`keydown`,this._keydownHandler.bind(this)),this.addEventListener(`keyup`,this._keyupHandler.bind(this))}changed(e,t,n){switch(e){case`checked`:this._dirtyChecked||(this._checked=n!==null,this._setAriaChecked());break;case`disabled`:this._updateDisabled();break;case`required`:this._internals.ariaRequired=this.required?`true`:`false`,this._setValidity();break;case`value`:this._value=n||`on`;break;case`name`:this._name=n||``,this._name?this.setAttribute(`name`,this._name):this.removeAttribute(`name`);break;case`label-position`:break;case`autofocus`:n!==null&&!this.disabled&&this.focus();break;case`size`:this._size=n||`medium`;break;case`shape`:this._shape=n||`circular`}}get checked(){return this._checked}set checked(e){this._checked=!!e,this._setAriaChecked(),this._setFormValue(this._checked?this._value:null),this._setValidity(),this._checked?this.setAttribute(`checked`,``):this.removeAttribute(`checked`)}get disabled(){return this.hasAttribute(`disabled`)}set disabled(e){e?this.setAttribute(`disabled`,``):this.removeAttribute(`disabled`)}get required(){return this.hasAttribute(`required`)}get value(){return this._value||`on`}set value(e){this._value=e,this._checked&&this._setFormValue(e)}get name(){return this._name}set name(e){this._name=e,e?this.setAttribute(`name`,e):this.removeAttribute(`name`)}get form(){return this._internals.form}get labels(){return Object.freeze(Array.from(this._internals.labels))}get validity(){return this._internals.validity}get validationMessage(){if(this._internals.validationMessage)return this._internals.validationMessage;if(!this._validationFallbackMessage){let e=document.createElement(`input`);e.type=`checkbox`,e.required=!0,e.checked=!1,this._validationFallbackMessage=e.validationMessage}return this._validationFallbackMessage}get willValidate(){return this._internals.willValidate}toggleChecked(e){this._checked=typeof e==`boolean`?e:!this._checked,this._dirtyChecked=!0,this._setAriaChecked(),this._setFormValue(this._checked?this._value:null),this._setValidity(),this._checked?this.setAttribute(`checked`,``):this.removeAttribute(`checked`)}checkValidity(){return this._internals.checkValidity()}reportValidity(){return this._internals.reportValidity()}setCustomValidity(e){this._internals.setValidity({customError:!!e},e),this._setValidity()}_clickHandler(e){if(this.disabled)return;this._dirtyChecked=!0;let t=this._checked;this.toggleChecked(),t!==this._checked&&(this.dispatchEvent(new Event(`change`,{bubbles:!0,composed:!0})),this.dispatchEvent(new Event(`input`,{bubbles:!0,composed:!0})))}_keydownHandler(e){e.key===` `&&(e.preventDefault(),this._keydownPressed=!0)}_keyupHandler(e){this._keydownPressed&&e.key===` `&&(this._keydownPressed=!1,this.click())}_updateDisabled(){let e=this.hasAttribute(`disabled`);if(e)this.removeAttribute(`tabindex`);else{let e=this.getAttribute(`tabindex`);this.tabIndex=Number(e??0)<0?-1:0}this._internals.ariaDisabled=e?`true`:`false`}_setAriaChecked(){this._internals.ariaChecked=this._checked?`true`:`false`}_setFormValue(e){this._internals.setFormValue(e,e)}_setValidity(){if(this.disabled||!this.required){this._internals.setValidity({});return}let e=this.validationMessage;this._internals.setValidity({valueMissing:!!this.required&&!this._checked},e||void 0)}formResetCallback(){this._checked=this.hasAttribute(`checked`),this._dirtyChecked=!1,this._setAriaChecked(),this._setValidity()}};customElements.define(`fluent-switch`,y);var b=`:host { display: inline-grid; }\r
\r
:host([hidden]) .root {\r
  display: none;\r
}\r
\r
.root {\r
  --thumb-size: 20px;\r
  --track-margin-inline: calc(var(--thumb-size) / 2);\r
  --track-size: 4px;\r
  --track-overhang: calc(var(--track-size) / -2);\r
  --rail-color: var(--colorCompoundBrandBackground);\r
  --track-color: var(--colorNeutralStrokeAccessible);\r
  --slider-direction: 90deg;\r
  --border-radius: var(--borderRadiusMedium);\r
  --step-marker-inset: var(--track-overhang) -1px;\r
  --slider-thumb: 50%;\r
  --slider-progress: 50%;\r
  --step-rate: 0%;\r
\r
  position: relative;\r
  align-items: center;\r
  justify-content: center;\r
  box-sizing: border-box;\r
  outline: none;\r
  user-select: none;\r
  touch-action: none;\r
  min-width: 120px;\r
  min-height: 32px;\r
  display: inline-grid;\r
  grid-template-rows: 1fr var(--thumb-size) 1fr;\r
  grid-template-columns: var(--track-margin-inline) 1fr var(--track-margin-inline);\r
}\r
\r
.root:hover {\r
  --rail-color: var(--colorCompoundBrandBackgroundHover);\r
}\r
\r
.root:active {\r
  --rail-color: var(--colorCompoundBrandBackgroundPressed);\r
}\r
\r
:host([disabled]) .root {\r
  --rail-color: var(--colorNeutralForegroundDisabled);\r
  --track-color: var(--colorNeutralBackgroundDisabled);\r
}\r
\r
:host(:not([disabled])) .root {\r
  cursor: pointer;\r
}\r
\r
:host(:dir(rtl)) .root {\r
  --slider-direction: -90deg;\r
}\r
\r
:host([size='small']) .root {\r
  --thumb-size: 16px;\r
  --track-overhang: -1px;\r
  --track-size: 2px;\r
  --border-radius: var(--borderRadiusSmall);\r
}\r
\r
:host([orientation='vertical']) .root {\r
  --slider-direction: 0deg;\r
  --step-marker-inset: -1px var(--track-overhang);\r
  min-height: 120px;\r
  grid-template-rows: var(--track-margin-inline) 1fr var(--track-margin-inline);\r
  grid-template-columns: 1fr var(--thumb-size) 1fr;\r
  width: unset;\r
  min-width: 32px;\r
  justify-items: center;\r
}\r
\r
:host(:not([slot='input'])) .root:focus-visible {\r
  box-shadow: 0 0 0 2pt var(--colorStrokeFocus2);\r
  outline: 1px solid var(--colorStrokeFocus1);\r
}\r
\r
.root::after,\r
.track {\r
  height: var(--track-size);\r
  width: 100%;\r
}\r
\r
.root::after {\r
  background-image: linear-gradient(\r
    var(--slider-direction),\r
    var(--rail-color) 0%,\r
    var(--rail-color) 50%,\r
    var(--track-color) 50.1%,\r
    var(--track-color) 100%\r
  );\r
  border-radius: var(--border-radius);\r
  content: '';\r
  grid-row: 1 / -1;\r
  grid-column: 1 / -1;\r
}\r
\r
.track {\r
  position: relative;\r
  background-color: var(--track-color);\r
  grid-row: 2 / 2;\r
  grid-column: 2 / 2;\r
  forced-color-adjust: none;\r
  overflow: hidden;\r
}\r
\r
:host([orientation='vertical']) .root::after,\r
:host([orientation='vertical']) .root .track {\r
  height: 100%;\r
  width: var(--track-size);\r
}\r
\r
.track::before {\r
  content: '';\r
  position: absolute;\r
  height: 100%;\r
  border-radius: inherit;\r
  inset-inline-start: 0;\r
  width: var(--slider-progress);\r
}\r
\r
:host(:dir(rtl)) .root .track::before {\r
  width: calc(100% - var(--slider-progress));\r
}\r
\r
:host([orientation='vertical']) .root .track::before {\r
  width: 100%;\r
  bottom: 0;\r
  height: var(--slider-progress);\r
}\r
\r
:host([step]) .root .track::after {\r
  content: '';\r
  position: absolute;\r
  border-radius: inherit;\r
  inset: var(--step-marker-inset);\r
  background-image: repeating-linear-gradient(\r
    var(--slider-direction),\r
    #0000 0%,\r
    #0000 calc(var(--step-rate) - 1px),\r
    var(--colorNeutralBackground1) calc(var(--step-rate) - 1px),\r
    var(--colorNeutralBackground1) var(--step-rate)\r
  );\r
}\r
\r
.thumb-container {\r
  position: absolute;\r
  grid-row: 2 / 2;\r
  grid-column: 2 / 2;\r
  transform: translateX(-50%);\r
  left: var(--slider-thumb);\r
}\r
\r
:host([orientation='vertical']) .root .thumb-container {\r
  transform: translateY(50%);\r
  left: unset;\r
  bottom: var(--slider-thumb);\r
}\r
\r
:host(:not(:active)) .root :is(.thumb-container, .track::before) {\r
  transition: all 0.2s ease;\r
}\r
\r
.thumb {\r
  width: var(--thumb-size);\r
  height: var(--thumb-size);\r
  border-radius: var(--borderRadiusCircular);\r
  box-shadow: 0 0 0 calc(var(--thumb-size) * 0.2) var(--colorNeutralBackground1) inset;\r
  border: calc(var(--thumb-size) * 0.05) solid var(--colorNeutralStroke1);\r
  box-sizing: border-box;\r
}\r
\r
.thumb,\r
.track::before {\r
  background-color: var(--rail-color);\r
}\r
\r
@media (forced-colors: active) {\r
  .track:hover,\r
  .track:active,\r
  .track {\r
    background: WindowText;\r
  }\r
\r
  .thumb:hover,\r
  .thumb:active,\r
  .thumb {\r
    background: ButtonText;\r
  }\r
\r
  .root:hover .track::before,\r
  .root:active .track::before,\r
  .track::before {\r
    background: Highlight;\r
  }\r
}\r
`;function x(e,t,n){return Math.max(e,Math.min(t,n))}function S(e,t,n,r){let i=x(0,1,(e-t)/(n-t));return r===`rtl`&&(i=1-i),i}var C=class extends e{static styles=b;static formAssociated=!0;static template=`
    <div class="root">
      <div part="track-container" class="track" ref="track"></div>
      <div part="thumb-container" class="thumb-container" ref="thumbContainer">
        <slot name="thumb">
          <div class="thumb"></div>
        </slot>
      </div>
    </div>
  `;static get observedAttributes(){return[`min`,`max`,`step`,`value`,`disabled`,`orientation`,`size`,`mode`,`name`,`autofocus`]}constructor(){super(),this._internals=this.attachInternals(),this._internals.role=`slider`,this._internals.ariaOrientation=`horizontal`,this._value=``,this._isDragging=!1,this._stepMultiplier=1,this._direction=`ltr`,this._trackWidth=0,this._trackMinWidth=0,this._trackHeight=0,this._trackMinHeight=0,this._trackLeft=0,this._boundPointerDown=this._handlePointerDown.bind(this),this._boundPointerMove=this._handlePointerMove.bind(this),this._boundPointerUp=this._handleWindowPointerUp.bind(this),this._boundKeydown=this._handleKeydown.bind(this)}connectedCallback(){super.connectedCallback(),this._shadowRoot=this._root,requestAnimationFrame(()=>{this.isConnected&&(this._direction=getComputedStyle(this).direction,this._updateDisabled(),this._updateStepMultiplier(),this._setupTrackConstraints(),this._setupDefaultValue(),this._setSliderPosition(),this._handleStepStyles(),this.addEventListener(`pointerdown`,this._boundPointerDown),this.addEventListener(`keydown`,this._boundKeydown))})}changed(e,t,n){switch(e){case`min`:this._internals.ariaValueMin=this._minAsNumber+``,this.isConnected&&this._minAsNumber>this._valueAsNumber&&(this.value=this.getAttribute(`min`)),this._setSliderPosition();break;case`max`:this._internals.ariaValueMax=this._maxAsNumber+``,this.isConnected&&this._maxAsNumber<this._valueAsNumber&&(this.value=this.getAttribute(`max`)),this._setSliderPosition();break;case`step`:this._updateStepMultiplier(),this.isConnected&&(this.value=this._value),this._handleStepStyles();break;case`value`:this._dirtyValue||(this._value=n||``,this._setupDefaultValue(),this._setSliderPosition());break;case`disabled`:this._updateDisabled();break;case`orientation`:this._internals.ariaOrientation=n||`horizontal`,this.isConnected&&this._setSliderPosition();break;case`size`:case`mode`:break;case`name`:break;case`autofocus`:n!==null&&!this.disabled&&this.focus()}}get value(){return this._value||``}set value(e){if(!this.isConnected){this._value=e;return}let t=parseFloat(e)||0,n=this._convertToConstrainedValue(t),r=x(this._minAsNumber,this._maxAsNumber,n).toString();r!==e&&!isNaN(parseFloat(e))?this.value=r:(this._value=e,this._internals.ariaValueNow=this._value,this._setSliderPosition(),this._setFormValue(this._value),this.dispatchEvent(new Event(`change`,{bubbles:!0,composed:!0})))}get valueAsNumber(){return parseFloat(this.value)||0}set valueAsNumber(e){this.value=e.toString()}get disabled(){return this.hasAttribute(`disabled`)}get form(){return this._internals.form}get labels(){return Object.freeze(Array.from(this._internals.labels))}get validity(){return this._internals.validity}get validationMessage(){return this._internals.validationMessage}get willValidate(){return this._internals.willValidate}get orientation(){return this.getAttribute(`orientation`)||`horizontal`}checkValidity(){return this._internals.checkValidity()}reportValidity(){return this._internals.reportValidity()}setCustomValidity(e){this._setValidity({customError:!!e},e)}increment(){let e=this._direction===`rtl`&&this.orientation!==`vertical`?this.valueAsNumber-this._stepAsNumber:this.valueAsNumber+this._stepAsNumber;this.value=Math.min(this._maxAsNumber,this._convertToConstrainedValue(e)).toString()}decrement(){let e=this._direction===`rtl`&&this.orientation!==`vertical`?this.valueAsNumber+this._stepAsNumber:this.valueAsNumber-this._stepAsNumber;this.value=Math.max(this._minAsNumber,this._convertToConstrainedValue(e)).toString()}_handleKeydown(e){if(!this.disabled)switch(e.key){case`Home`:e.preventDefault(),this.value=this._direction!==`rtl`&&this.orientation!==`vertical`?this._minAsNumber.toString():this._maxAsNumber.toString();break;case`End`:e.preventDefault(),this.value=this._direction!==`rtl`&&this.orientation!==`vertical`?this._maxAsNumber.toString():this._minAsNumber.toString();break;case`ArrowRight`:case`ArrowUp`:e.shiftKey||(e.preventDefault(),this.increment());break;case`ArrowLeft`:case`ArrowDown`:e.shiftKey||(e.preventDefault(),this.decrement())}}_handlePointerDown(e){if(e===null||this.disabled)return;let t=e===null?window.removeEventListener:window.addEventListener;if(t(`pointerup`,this._boundPointerUp),document.addEventListener(`mouseleave`,this._boundPointerUp),t(`pointermove`,this._boundPointerMove),this._setupTrackConstraints(),!this._shadowRoot.querySelector(`.track`))return;let n=this._shadowRoot.querySelector(`.thumb`)||this._shadowRoot.querySelector(`.thumb-container`),r=n?n.getBoundingClientRect().width:0,i=this.orientation===`vertical`?e.pageY-document.documentElement.scrollTop:e.pageX-document.documentElement.scrollLeft-this._trackLeft-r/2;this.value=this._calculateNewValue(i).toString(),this._isDragging=!0}_handlePointerMove(e){if(this.disabled||e.defaultPrevented)return;let t=window.TouchEvent&&e instanceof TouchEvent?e.touches[0]:e,n=this._shadowRoot.querySelector(`.track`),r=this._shadowRoot.querySelector(`.thumb`)||this._shadowRoot.querySelector(`.thumb-container`);if(!n||!r)return;let i=r.getBoundingClientRect().width,a=this.orientation===`vertical`?t.pageY-document.documentElement.scrollTop:t.pageX-document.documentElement.scrollLeft-this._trackLeft-i/2;this.value=this._calculateNewValue(a).toString()}_handleWindowPointerUp(){this._isDragging=!1,window.removeEventListener(`pointerup`,this._boundPointerUp),window.removeEventListener(`pointermove`,this._boundPointerMove),document.removeEventListener(`mouseleave`,this._boundPointerUp)}_calculateNewValue(e){this._setupTrackConstraints();let t=S(e,this.orientation===`vertical`?this._trackMinHeight:this._trackMinWidth,this.orientation===`vertical`?this._trackHeight:this._trackWidth,this.orientation===`vertical`?void 0:this._direction),n=(this._maxAsNumber-this._minAsNumber)*t+this._minAsNumber;return this._convertToConstrainedValue(n)}_convertToConstrainedValue(e){isNaN(e)&&(e=this._minAsNumber);let t=e-this._minAsNumber,n=Math.round(t/this._stepAsNumber),r=t-n*(this._stepMultiplier*this._stepAsNumber)/this._stepMultiplier;return t=r>=this._stepAsNumber/2?t-r+this._stepAsNumber:t-r,t+this._minAsNumber}_setSliderPosition(){let e=S(parseFloat(this._value)||0,this._minAsNumber,this._maxAsNumber,this.orientation===`vertical`?void 0:this._direction)*100,t=this._root.querySelector(`.root`);t&&(t.style.setProperty(`--slider-thumb`,e+`%`),t.style.setProperty(`--slider-progress`,e+`%`)),this.style.setProperty(`--slider-thumb`,e+`%`),this.style.setProperty(`--slider-progress`,e+`%`)}_setupTrackConstraints(){let e=this._shadowRoot.querySelector(`.track`);if(!e)return;let t=e.getBoundingClientRect();this._trackWidth=e.clientWidth||1,this._trackMinWidth=e.clientLeft,this._trackHeight=t.top,this._trackMinHeight=t.bottom;let n=this._root.querySelector(`.root`);this._trackLeft=n?n.getBoundingClientRect().left:t.left}_setupDefaultValue(){if(!this._value){let e=this.getAttribute(`value`);this._value=e||this._midpoint}!isNaN(this._valueAsNumber)&&(this._valueAsNumber<this._minAsNumber||this._valueAsNumber>this._maxAsNumber)&&(this._value=this._midpoint),this._internals.ariaValueNow=this._value}_updateStepMultiplier(){let e=this._stepAsNumber+``,t=this._stepAsNumber%1?e.length-e.indexOf(`.`)-1:0;this._stepMultiplier=10**t}_updateDisabled(){let e=this.disabled;this._internals.ariaDisabled=e.toString(),this.tabIndex=e?-1:0}_handleStepStyles(){let e=this._root.querySelector(`.root`);if(this.hasAttribute(`step`)){let t=100/Math.floor((this._maxAsNumber-this._minAsNumber)/this._stepAsNumber);this.style.setProperty(`--step-rate`,t+`%`),e&&e.style.setProperty(`--step-rate`,t+`%`)}else this.style.removeProperty(`--step-rate`),e&&e.style.removeProperty(`--step-rate`)}_setFormValue(e){this._internals.setFormValue(e,e)}_setValidity(e,t){if(this.isConnected){if(this.disabled){this._internals.setValidity({});return}let n=t||this.validationMessage;this._internals.setValidity({customError:!!n,...e},n||void 0)}}formResetCallback(){this.value=this.getAttribute(`value`)||this._midpoint}formDisabledCallback(e){this._updateDisabled()}get _minAsNumber(){let e=this.getAttribute(`min`);if(e!=null){let t=parseFloat(e);if(!isNaN(t))return t}return 0}get _maxAsNumber(){let e=this.getAttribute(`max`);if(e!=null){let t=parseFloat(e);if(!isNaN(t))return t}return 100}get _stepAsNumber(){let e=this.getAttribute(`step`);if(e!=null){let t=parseFloat(e);if(!isNaN(t)&&t>0)return t}return 1}get _valueAsNumber(){return parseFloat(this._value)}get _midpoint(){return this._convertToConstrainedValue((this._maxAsNumber+this._minAsNumber)/2).toString()}};customElements.define(`fluent-slider`,C);var w=`:host { display: inline-flex; }\r
\r
.label {\r
  display: flex;\r
  color: var(--colorNeutralForeground1);\r
  padding-bottom: var(--spacingVerticalXS);\r
  flex-shrink: 0;\r
  padding-inline-end: var(--spacingHorizontalXS);\r
}\r
\r
.label[hidden],\r
:host(:empty) .label {\r
  display: none;\r
}\r
\r
.root {\r
  align-items: center;\r
  background-color: var(--colorNeutralBackground1);\r
  border: var(--strokeWidthThin) solid var(--colorNeutralStroke1);\r
  border-bottom-color: var(--colorNeutralStrokeAccessible);\r
  border-radius: var(--borderRadiusMedium);\r
  box-sizing: border-box;\r
  height: 32px;\r
  display: inline-flex;\r
  flex-direction: row;\r
  font-family: var(--fontFamilyBase);\r
  font-size: var(--fontSizeBase300);\r
  font-weight: var(--fontWeightRegular);\r
  gap: var(--spacingHorizontalXXS);\r
  line-height: var(--lineHeightBase300);\r
  max-width: 400px;\r
  padding: 0 var(--spacingHorizontalMNudge);\r
  position: relative;\r
  width: 100%;\r
}\r
\r
.root::after {\r
  box-sizing: border-box;\r
  content: '';\r
  position: absolute;\r
  left: -1px;\r
  bottom: 0px;\r
  right: -1px;\r
  height: max(2px, var(--borderRadiusMedium));\r
  border-radius: 0 0 var(--borderRadiusMedium) var(--borderRadiusMedium);\r
  border-bottom: 2px solid var(--colorCompoundBrandStroke);\r
  clip-path: inset(calc(100% - 2px) 1px 0px);\r
  transform: scaleX(0);\r
  transition-property: transform;\r
  transition-duration: var(--durationUltraFast);\r
  transition-delay: var(--curveAccelerateMid);\r
}\r
\r
.control {\r
  width: 100%;\r
  height: 100%;\r
  box-sizing: border-box;\r
  color: var(--colorNeutralForeground1);\r
  border-radius: var(--borderRadiusMedium);\r
  background: var(--colorTransparentBackground);\r
  font-family: var(--fontFamilyBase);\r
  font-weight: var(--fontWeightRegular);\r
  font-size: var(--fontSizeBase300);\r
  border: none;\r
  vertical-align: center;\r
}\r
\r
.control:focus-visible {\r
  outline: 0;\r
  border: 0;\r
}\r
\r
.control::placeholder {\r
  color: var(--colorNeutralForeground4);\r
}\r
\r
:host ::slotted([slot='start']),\r
:host ::slotted([slot='end']) {\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  color: var(--colorNeutralForeground3);\r
  font-size: var(--fontSizeBase500);\r
}\r
\r
:host ::slotted([slot='start']) {\r
  padding-right: var(--spacingHorizontalXXS);\r
}\r
\r
:host ::slotted([slot='end']) {\r
  padding-left: var(--spacingHorizontalXXS);\r
  gap: var(--spacingHorizontalXS);\r
}\r
\r
.root:hover {\r
  border-color: var(--colorNeutralStroke1Hover);\r
  border-bottom-color: var(--colorNeutralStrokeAccessibleHover);\r
}\r
\r
.root:active {\r
  border-color: var(--colorNeutralStroke1Pressed);\r
}\r
\r
.root:focus-within {\r
  outline: transparent solid 2px;\r
  border-bottom: 0;\r
}\r
\r
.root:focus-within::after {\r
  transform: scaleX(1);\r
  transition-property: transform;\r
  transition-duration: var(--durationNormal);\r
  transition-delay: var(--curveDecelerateMid);\r
}\r
\r
.root:focus-within:active::after {\r
  border-bottom-color: var(--colorCompoundBrandStrokePressed);\r
}\r
\r
.root:user-invalid {\r
  border-color: var(--colorPaletteRedBorder2);\r
}\r
\r
.root:focus-within .control {\r
  color: var(--colorNeutralForeground1);\r
}\r
\r
:host([disabled]) .root {\r
  background: var(--colorTransparentBackground);\r
  border: var(--strokeWidthThin) solid var(--colorNeutralStrokeDisabled);\r
}\r
\r
:host([disabled]) .control::placeholder,\r
:host([disabled]) ::slotted([slot='start']),\r
:host([disabled]) ::slotted([slot='end']) {\r
  color: var(--colorNeutralForegroundDisabled);\r
}\r
\r
::selection {\r
  color: var(--colorNeutralForegroundInverted);\r
  background-color: var(--colorNeutralBackgroundInverted);\r
}\r
\r
:host([control-size='small']) .control {\r
  font-size: var(--fontSizeBase200);\r
  font-weight: var(--fontWeightRegular);\r
  line-height: var(--lineHeightBase200);\r
}\r
\r
:host([control-size='small']) .root {\r
  height: 24px;\r
  gap: var(--spacingHorizontalXXS);\r
  padding: 0 var(--spacingHorizontalSNudge);\r
}\r
\r
:host([control-size='small']) ::slotted([slot='start']),\r
:host([control-size='small']) ::slotted([slot='end']) {\r
  font-size: var(--fontSizeBase400);\r
}\r
\r
:host([control-size='large']) .control {\r
  font-size: var(--fontSizeBase400);\r
  font-weight: var(--fontWeightRegular);\r
  line-height: var(--lineHeightBase400);\r
}\r
\r
:host([control-size='large']) .root {\r
  height: 40px;\r
  gap: var(--spacingHorizontalS);\r
  padding: 0 var(--spacingHorizontalM);\r
}\r
\r
:host([control-size='large']) ::slotted([slot='start']),\r
:host([control-size='large']) ::slotted([slot='end']) {\r
  font-size: var(--fontSizeBase600);\r
}\r
\r
:host([appearance='underline']) .root {\r
  background: var(--colorTransparentBackground);\r
  border: 0;\r
  border-radius: 0;\r
  border-bottom: var(--strokeWidthThin) solid var(--colorNeutralStrokeAccessible);\r
}\r
\r
:host([appearance='underline']) .root:hover {\r
  border-bottom-color: var(--colorNeutralStrokeAccessibleHover);\r
}\r
\r
:host([appearance='underline']) .root:active {\r
  border-bottom-color: var(--colorNeutralStrokeAccessiblePressed);\r
}\r
\r
:host([appearance='underline']) .root:focus-within {\r
  border: 0;\r
  border-bottom-color: var(--colorNeutralStrokeAccessiblePressed);\r
}\r
\r
:host([appearance='underline'][disabled]) .root {\r
  border-bottom-color: var(--colorNeutralStrokeDisabled);\r
}\r
\r
:host([appearance='filled-lighter']) .root,\r
:host([appearance='filled-darker']) .root {\r
  border: var(--strokeWidthThin) solid var(--colorTransparentStroke);\r
  box-shadow: var(--shadow2);\r
}\r
\r
:host([appearance='filled-lighter']) .root {\r
  background: var(--colorNeutralBackground1);\r
}\r
\r
:host([appearance='filled-darker']) .root {\r
  background: var(--colorNeutralBackground3);\r
}\r
\r
:host([appearance='filled-lighter']) .root:hover,\r
:host([appearance='filled-darker']) .root:hover {\r
  border-color: var(--colorTransparentStrokeInteractive);\r
}\r
\r
:host([appearance='filled-lighter']) .root:active,\r
:host([appearance='filled-darker']) .root:active {\r
  border-color: var(--colorTransparentStrokeInteractive);\r
  background: var(--colorNeutralBackground3);\r
}\r
`,T=class extends e{static styles=w;static formAssociated=!0;static template=`
    <label part="label" for="control" class="label">
      <slot></slot>
    </label>
    <div class="root" part="root">
      <slot name="start"></slot>
      <input
        class="control"
        part="control"
        id="control"
      />
      <slot name="end"></slot>
    </div>
  `;static get observedAttributes(){return[`disabled`,`readonly`,`placeholder`,`type`,`value`,`appearance`,`control-size`,`autofocus`,`list`,`maxlength`,`name`,`minlength`,`required`,`autocomplete`,`spellcheck`,`pattern`,`multiple`,`size`,`dirname`,`form`]}constructor(){super(),this._internals=this.attachInternals(),this._dirtyValue=!1,this._boundInputHandler=this._inputHandler.bind(this),this._boundChangeHandler=this._changeHandler.bind(this),this._boundFocusinHandler=this._focusinHandler.bind(this),this._boundKeydownHandler=this._keydownHandler.bind(this)}connectedCallback(){super.connectedCallback(),this._shadowRoot=this._root;let e=this.getAttribute(`tabindex`);this.tabIndex=Number(e??0)<0?-1:0;let t=this._shadowRoot.querySelector(`.control`);t&&(this._input=t,this._syncAllAttrs(),this._setFormValue(this.value),this._setValidity(),t.addEventListener(`input`,this._boundInputHandler),t.addEventListener(`change`,this._boundChangeHandler),t.addEventListener(`select`,()=>this.dispatchEvent(new Event(`select`)))),this.addEventListener(`focusin`,this._boundFocusinHandler),this.addEventListener(`keydown`,this._boundKeydownHandler),this._updateLabelVisibility()}changed(e,t,n){let r=this._input;if(r)switch(e){case`value`:this._dirtyValue||(r.value=n||``);break;case`disabled`:r.disabled=n!==null;break;case`readonly`:r.readOnly=n!==null,this._internals.ariaReadOnly=n===null?`false`:`true`;break;case`placeholder`:r.placeholder=n||``;break;case`type`:r.type=n||`text`;break;case`autofocus`:n!==null&&(r.autofocus=!0);break;case`list`:r.setAttribute(`list`,n||``);break;case`maxlength`:r.maxLength=n?parseInt(n):-1;break;case`minlength`:r.minLength=n?parseInt(n):-1;break;case`name`:r.name=n||``;break;case`required`:r.required=n!==null,this._internals.ariaRequired=n===null?`false`:`true`,this._setValidity();break;case`autocomplete`:r.autocomplete=n||``;break;case`spellcheck`:r.spellcheck=n!==null;break;case`pattern`:r.pattern=n||``;break;case`multiple`:r.multiple=n!==null;break;case`size`:r.size=n?parseInt(n):20;break;case`dirname`:r.setAttribute(`dirname`,n||``)}}get value(){return this._input?this._input.value:this.getAttribute(`value`)||``}set value(e){this._input&&(this._input.value=e,this._setFormValue(e),this._setValidity())}get disabled(){return this.hasAttribute(`disabled`)}get form(){return this._internals.form}get validity(){return this._internals.validity}get validationMessage(){return this._internals.validationMessage||(this._input?this._input.validationMessage:``)}get willValidate(){return this._internals.willValidate}get labels(){return Object.freeze(Array.from(this._internals.labels))}get type(){return this._input?this._input.type:this.getAttribute(`type`)||`text`}get textLength(){return this._input?this._input.textLength:0}checkValidity(){return this._internals.checkValidity()}reportValidity(){return this._internals.reportValidity()}setCustomValidity(e){this._internals.setValidity({customError:!!e},e),this.reportValidity()}select(){this._input&&(this._input.select(),this.dispatchEvent(new Event(`select`)))}_syncAllAttrs(){let e=this._input;if(!e)return;e.disabled=this.hasAttribute(`disabled`),e.readOnly=this.hasAttribute(`readonly`),e.placeholder=this.getAttribute(`placeholder`)||``,e.type=this.getAttribute(`type`)||`text`,e.name=this.getAttribute(`name`)||``,e.required=this.hasAttribute(`required`),e.autocomplete=this.getAttribute(`autocomplete`)||``,e.spellcheck=this.hasAttribute(`spellcheck`),e.multiple=this.hasAttribute(`multiple`),e.pattern=this.getAttribute(`pattern`)||``,e.value=this.getAttribute(`value`)||``;let t=this.getAttribute(`maxlength`);t&&(e.maxLength=parseInt(t));let n=this.getAttribute(`minlength`);n&&(e.minLength=parseInt(n));let r=this.getAttribute(`size`);r&&(e.size=parseInt(r));let i=this.getAttribute(`list`);i&&e.setAttribute(`list`,i);let a=this.getAttribute(`dirname`);a&&e.setAttribute(`dirname`,a),this.hasAttribute(`autofocus`)&&(e.autofocus=!0),this._internals.ariaReadOnly=this.hasAttribute(`readonly`)?`true`:`false`,this._internals.ariaRequired=this.hasAttribute(`required`)?`true`:`false`}_inputHandler(){this._dirtyValue=!0,this._setFormValue(this._input.value),this._setValidity()}_changeHandler(e){this._setValidity(),this.dispatchEvent(new Event(`change`,{bubbles:!0,composed:!0}))}_focusinHandler(e){e.target===this&&this._input&&this._input.focus()}_keydownHandler(e){if(e.key===`Enter`&&this._internals.form){let e=this._internals.form;e.elements.length===1&&e.requestSubmit()}}_setFormValue(e){this._internals.setFormValue(e,e)}_setValidity(){if(!this.isConnected||!this._input)return;if(this.disabled){this._internals.setValidity({});return}let{valid:e,valueMissing:t,typeMismatch:n,patternMismatch:r,tooLong:i,tooShort:a,rangeUnderflow:o,rangeOverflow:s,stepMismatch:c,badInput:l}=this._input.validity;if(e){this._internals.setValidity({});return}let u=this._input.validationMessage||`Invalid value`;this._internals.setValidity({valueMissing:t,typeMismatch:n,patternMismatch:r,tooLong:i,tooShort:a,rangeUnderflow:o,rangeOverflow:s,stepMismatch:c,badInput:l},u,this._input)}_updateLabelVisibility(){let e=this._shadowRoot.querySelector(`.label`);if(!e)return;let t=this._root.querySelector(`slot:not([name])`);t&&(e.hidden=!t.assignedNodes().some(e=>e.nodeType===Node.ELEMENT_NODE||e.nodeType===Node.TEXT_NODE&&e.textContent.trim()))}formResetCallback(){this._dirtyValue=!1,this._input&&(this._input.value=this.getAttribute(`value`)||``)}};customElements.define(`fluent-text-input`,T);var E=`:host { display: block; }\r
\r
.root {\r
  --font-size: var(--fontSizeBase300);\r
  --line-height: var(--lineHeightBase300);\r
  --padding-inline: var(--spacingHorizontalMNudge);\r
  --padding-block: var(--spacingVerticalSNudge);\r
  --min-block-size: 52px;\r
  --block-size: var(--min-block-size);\r
  --inline-size: 18rem;\r
  --border-width: var(--strokeWidthThin);\r
  --control-padding-inline: var(--spacingHorizontalXXS);\r
  --color: var(--colorNeutralForeground1);\r
  --background-color: var(--colorNeutralBackground1);\r
  --border-color: var(--colorNeutralStroke1);\r
  --border-block-end-color: var(--colorNeutralStrokeAccessible);\r
  --placeholder-color: var(--colorNeutralForeground4);\r
  --focus-indicator-color: var(--colorCompoundBrandStroke);\r
  --box-shadow: none;\r
  --contain-size: size;\r
  --resize: none;\r
\r
  color: var(--color);\r
  font-family: var(--fontFamilyBase);\r
  font-size: var(--font-size);\r
  font-weight: var(--fontWeightRegular);\r
  line-height: var(--line-height);\r
  background-color: var(--background-color);\r
  border: var(--border-width) solid var(--border-color);\r
  border-block-end-color: var(--border-block-end-color);\r
  border-radius: var(--borderRadiusMedium);\r
  box-sizing: border-box;\r
  box-shadow: var(--box-shadow);\r
  display: grid;\r
  grid-template: 1fr / 1fr;\r
  inline-size: var(--inline-size);\r
  min-block-size: var(--min-block-size);\r
  block-size: var(--block-size);\r
  overflow: hidden;\r
  padding: var(--padding-block) var(--padding-inline);\r
  position: relative;\r
  resize: var(--resize);\r
}\r
\r
.root::after {\r
  border-bottom: 2px solid var(--focus-indicator-color);\r
  border-radius: 0 0 var(--borderRadiusMedium) var(--borderRadiusMedium);\r
  box-sizing: border-box;\r
  clip-path: inset(calc(100% - 2px) 1px 0px);\r
  content: '';\r
  height: max(2px, var(--borderRadiusMedium));\r
  inset: auto -1px 0;\r
  position: absolute;\r
  transform: scaleX(0);\r
  transition-delay: var(--curveAccelerateMid);\r
  transition-duration: var(--durationUltraFast);\r
  transition-property: transform;\r
}\r
\r
.root:hover {\r
  --border-color: var(--colorNeutralStroke1Hover);\r
  --border-block-end-color: var(--colorNeutralStrokeAccessibleHover);\r
}\r
\r
.root:active {\r
  --border-color: var(--colorNeutralStroke1Pressed);\r
  --border-block-end-color: var(--colorNeutralStrokeAccessiblePressed);\r
}\r
\r
.root:focus-within {\r
  outline: none;\r
}\r
\r
:host([block]:not([hidden])) .root {\r
  display: block;\r
}\r
\r
:host([size='small']) .root {\r
  --font-size: var(--fontSizeBase200);\r
  --line-height: var(--lineHeightBase200);\r
  --min-block-size: 40px;\r
  --padding-block: var(--spacingVerticalXS);\r
  --padding-inline: var(--spacingHorizontalSNudge);\r
  --control-padding-inline: var(--spacingHorizontalXXS);\r
}\r
\r
:host([size='large']) .root {\r
  --font-size: var(--fontSizeBase400);\r
  --line-height: var(--lineHeightBase400);\r
  --min-block-size: 64px;\r
  --padding-block: var(--spacingVerticalS);\r
  --padding-inline: var(--spacingHorizontalM);\r
  --control-padding-inline: var(--spacingHorizontalSNudge);\r
}\r
\r
:host([resize='both']:not(:disabled)) .root {\r
  --resize: both;\r
}\r
\r
:host([resize='horizontal']:not(:disabled)) .root {\r
  --resize: horizontal;\r
}\r
\r
:host([resize='vertical']:not(:disabled)) .root {\r
  --resize: vertical;\r
}\r
\r
:host([auto-resize]) .root {\r
  --block-size: auto;\r
  --contain-size: inline-size;\r
}\r
\r
:host([appearance='filled-darker']) .root {\r
  --background-color: var(--colorNeutralBackground3);\r
  --border-color: var(--background-color);\r
  --border-block-end-color: var(--border-color);\r
}\r
\r
:host([appearance='filled-lighter']) .root {\r
  --border-color: var(--background-color);\r
  --border-block-end-color: var(--border-color);\r
}\r
\r
:host([appearance='filled-darker'][display-shadow]) .root,\r
:host([appearance='filled-lighter'][display-shadow]) .root {\r
  --box-shadow: var(--shadow2);\r
}\r
\r
.root.user-invalid {\r
  --border-color: var(--colorPaletteRedBorder2);\r
  --border-block-end-color: var(--colorPaletteRedBorder2);\r
}\r
\r
.root:disabled {\r
  --color: var(--colorNeutralForegroundDisabled);\r
  --background-color: var(--colorTransparentBackground);\r
  --border-color: var(--colorNeutralStrokeDisabled);\r
  --border-block-end-color: var(--border-color);\r
  --box-shadow: none;\r
  --placeholder-color: var(--colorNeutralForegroundDisabled);\r
  cursor: no-drop;\r
  user-select: none;\r
}\r
\r
:host([block]) .root {\r
  inline-size: auto;\r
}\r
\r
.root:focus-within::after {\r
  transform: scaleX(1);\r
  transition-property: transform;\r
  transition-duration: var(--durationNormal);\r
  transition-delay: var(--curveDecelerateMid);\r
}\r
\r
:host([readonly]) .root::after,\r
.root:disabled::after {\r
  content: none;\r
}\r
\r
label {\r
  color: var(--color);\r
  display: flex;\r
  inline-size: fit-content;\r
  padding-block-end: var(--spacingVerticalXS);\r
  padding-inline-end: var(--spacingHorizontalXS);\r
}\r
\r
:host(:empty) label,\r
label[hidden] {\r
  display: none;\r
}\r
\r
.control {\r
  appearance: none;\r
  background-color: transparent;\r
  border: 0;\r
  color: inherit;\r
  field-sizing: content;\r
  max-block-size: 100%;\r
  outline: 0;\r
  resize: none;\r
  text-align: inherit;\r
  box-sizing: border-box;\r
  font: inherit;\r
  grid-column: 1 / -1;\r
  grid-row: 1 / -1;\r
  padding: 0 var(--control-padding-inline);\r
}\r
\r
.control:disabled {\r
  cursor: inherit;\r
}\r
\r
.control::placeholder {\r
  color: var(--placeholder-color);\r
}\r
\r
::selection {\r
  color: var(--colorNeutralForegroundInverted);\r
  background-color: var(--colorNeutralBackgroundInverted);\r
}\r
\r
@media (forced-colors: active) {\r
  .root {\r
    --border-color: FieldText;\r
    --border-block-end-color: FieldText;\r
    --focus-indicator-color: Highlight;\r
    --placeholder-color: FieldText;\r
  }\r
\r
  .root:hover,\r
  .root:active,\r
  .root:focus-within {\r
    --border-color: Highlight;\r
    --border-block-end-color: Highlight;\r
  }\r
\r
  .root:disabled {\r
    --color: GrayText;\r
    --border-color: GrayText;\r
    --border-block-end-color: GrayText;\r
    --placeholder-color: GrayText;\r
  }\r
}\r
`,D=class extends e{static styles=E;static formAssociated=!0;static template=`
    <label for="control" part="label">
      <slot name="label"></slot>
    </label>
    <div class="root" part="root">
      <textarea
        id="control"
        class="control"
        part="control"
      ></textarea>
    </div>
    <div hidden>
      <slot></slot>
    </div>
  `;static get observedAttributes(){return[`disabled`,`readonly`,`placeholder`,`value`,`appearance`,`size`,`resize`,`rows`,`cols`,`maxlength`,`minlength`,`name`,`required`,`autocomplete`,`spellcheck`,`block`,`auto-resize`,`display-shadow`,`form`,`dirname`]}constructor(){super(),this._internals=this.attachInternals(),this._userInteracted=!1,this._preConnectEl=document.createElement(`textarea`),this._autoSizerEl=null,this._autoSizerObserver=null,this._boundHandleInput=this._handleControlInput.bind(this),this._boundHandleChange=this._handleControlChange.bind(this),this._boundHandleSelect=this._handleControlSelect.bind(this)}connectedCallback(){super.connectedCallback(),this._shadowRoot=this._root,requestAnimationFrame(()=>{if(!this.isConnected)return;let e=this._shadowRoot.querySelector(`.control`);if(!e)return;this._textarea=e;let t=this._getContent();this._defaultValue=t||this._preConnectEl.defaultValue||``,this._textarea.defaultValue=this._defaultValue,this._textarea.value=this._preConnectEl.value||this._defaultValue,this._syncAllAttrs(),this._setFormValue(this._textarea.value),this._setValidity(),this._preConnectEl=null,this._textarea.addEventListener(`input`,this._boundHandleInput),this._textarea.addEventListener(`change`,this._boundHandleChange),this._textarea.addEventListener(`select`,this._boundHandleSelect),new MutationObserver(()=>this._setValidity()).observe(this._textarea,{attributes:!0,attributeFilter:[`disabled`,`required`,`readonly`,`maxlength`,`minlength`]}),this._updateLabelVisibility(),this._updateResize(),this._maybeCreateAutoSizer()})}disconnectedCallback(){super.disconnectedCallback(),this._autoSizerObserver?.disconnect(),this._autoSizerObserver=null}changed(e,t,n){if(this._textarea)switch(e){case`disabled`:this._textarea.disabled=n!==null,this._internals.ariaDisabled=n===null?`false`:`true`,this._labelSlottedNodes&&this._labelSlottedNodes.forEach(e=>e.disabled=n!==null);break;case`readonly`:this._textarea.readOnly=n!==null,this._internals.ariaReadOnly=n===null?`false`:`true`,this._setValidity();break;case`placeholder`:this._textarea.placeholder=n||``;break;case`value`:this._userInteracted||(this._textarea.value=n||``);break;case`resize`:this._updateResize();break;case`required`:this._textarea.required=n!==null,this._internals.ariaRequired=n===null?`false`:`true`,this._filteredLabelSlottedNodes&&this._filteredLabelSlottedNodes.forEach(e=>e.required=n!==null);break;case`maxlength`:this._textarea.maxLength=n?parseInt(n):-1;break;case`minlength`:this._textarea.minLength=n?parseInt(n):-1;break;case`name`:this._textarea.name=n||``;break;case`autocomplete`:this._textarea.autocomplete=n||``;break;case`spellcheck`:this._textarea.spellcheck=n!==null;break;case`rows`:this._textarea.rows=n?parseInt(n):2;break;case`cols`:this._textarea.cols=n?parseInt(n):20;break;case`appearance`:case`size`:case`block`:break;case`auto-resize`:this._maybeCreateAutoSizer()}}get value(){return this._textarea?this._textarea.value:this._preConnectEl?this._preConnectEl.value:``}set value(e){this._textarea?(this._textarea.value=e,this._setFormValue(e),this._setValidity()):this._preConnectEl&&(this._preConnectEl.value=e)}get defaultValue(){return this._textarea?this._textarea.defaultValue:this._preConnectEl?this._preConnectEl.defaultValue:``}set defaultValue(e){this._textarea?(this._textarea.defaultValue=e,this._userInteracted||(this._textarea.value=e)):this._preConnectEl&&(this._preConnectEl.defaultValue=e)}get disabled(){return this.hasAttribute(`disabled`)}get form(){return this._internals.form}get labels(){return this._internals.labels}get validity(){return this._internals.validity}get validationMessage(){return this._internals.validationMessage||(this._textarea?this._textarea.validationMessage:``)}get willValidate(){return this._internals.willValidate}get textLength(){return this._textarea?this._textarea.textLength:0}get type(){return`textarea`}checkValidity(){return this._internals.checkValidity()}reportValidity(){return this._internals.reportValidity()}setCustomValidity(e){this._internals.setValidity({customError:!!e},e||void 0),this.reportValidity()}select(){this._textarea&&this._textarea.select()}_syncAllAttrs(){let e=this._textarea;if(!e)return;e.disabled=this.hasAttribute(`disabled`),e.readOnly=this.hasAttribute(`readonly`),e.placeholder=this.getAttribute(`placeholder`)||``,e.required=this.hasAttribute(`required`),e.autocomplete=this.getAttribute(`autocomplete`)||``,e.spellcheck=this.hasAttribute(`spellcheck`),e.name=this.getAttribute(`name`)||``;let t=this.getAttribute(`maxlength`);t&&(e.maxLength=parseInt(t));let n=this.getAttribute(`minlength`);n&&(e.minLength=parseInt(n));let r=this.getAttribute(`rows`);r&&(e.rows=parseInt(r));let i=this.getAttribute(`cols`);i&&(e.cols=parseInt(i)),this._internals.ariaDisabled=this.hasAttribute(`disabled`)?`true`:`false`,this._internals.ariaReadOnly=this.hasAttribute(`readonly`)?`true`:`false`,this._internals.ariaRequired=this.hasAttribute(`required`)?`true`:`false`}_handleControlInput(){this._userInteracted=!0,this._autoSizerEl&&this._textarea&&(this._autoSizerEl.textContent=this._textarea.value+` `),this._setFormValue(this._textarea.value),this._setValidity()}_handleControlChange(){this._toggleUserValidityState(),this.dispatchEvent(new Event(`change`,{bubbles:!0,composed:!0}))}_handleControlSelect(){this.dispatchEvent(new Event(`select`,{bubbles:!0,composed:!0}))}_getContent(){let e=this._root.querySelector(`slot:not([name])`);return e?e.assignedNodes().map(e=>e.nodeType===Node.ELEMENT_NODE?e.outerHTML:e.nodeType===Node.TEXT_NODE?e.textContent.trim():``).join(``):``}_setFormValue(e){this._internals.setFormValue(e,e)}_setValidity(){if(this.isConnected){if(this.disabled||this.hasAttribute(`readonly`))this._internals.setValidity({});else if(this._textarea){let{valid:e,valueMissing:t,typeMismatch:n,patternMismatch:r,tooLong:i,tooShort:a}=this._textarea.validity;if(e)this._internals.setValidity({});else{let e=this._textarea.validationMessage||`Invalid value`;this._internals.setValidity({valueMissing:t,typeMismatch:n,patternMismatch:r,tooLong:i,tooShort:a},e,this._textarea)}}this._userInteracted&&this._toggleUserValidityState()}}_toggleUserValidityState(){this._internals.validity.valid?(this.classList.add(`user-valid`),this.classList.remove(`user-invalid`)):(this.classList.add(`user-invalid`),this.classList.remove(`user-valid`))}_updateLabelVisibility(){let e=this._shadowRoot.querySelector(`label`);if(!e)return;let t=this._root.querySelector(`slot[name="label"]`);t&&(e.hidden=!t.assignedNodes().some(e=>e.nodeType===Node.ELEMENT_NODE||e.nodeType===Node.TEXT_NODE&&e.textContent.trim()))}_updateResize(){let e=this._textarea;if(!e)return;let t=this.getAttribute(`resize`);e.style.resize=t||`none`}_maybeCreateAutoSizer(){if(CSS.supports(`field-sizing: content`)){this._autoSizerEl&&=(this._autoSizerEl.remove(),null);return}if(!this.hasAttribute(`auto-resize`)){this._autoSizerEl&&=(this._autoSizerEl.remove(),null),this._autoSizerObserver?.disconnect();return}this._autoSizerEl||(this._autoSizerEl=document.createElement(`div`),this._autoSizerEl.classList.add(`auto-sizer`),this._autoSizerEl.setAttribute(`aria-hidden`,`true`));let e=this._shadowRoot?.querySelector(`.root`);e&&e.insertBefore(this._autoSizerEl,e.firstChild),this._textarea&&(this._autoSizerEl.textContent=this._textarea.value+` `),this._autoSizerObserver||=new ResizeObserver(()=>{this._autoSizerEl&&this._textarea&&(this._autoSizerEl.textContent=this._textarea.value+` `)}),this._autoSizerObserver.observe(this._textarea)}formResetCallback(){this._textarea&&(this._textarea.value=this.defaultValue,this._userInteracted=!1)}formDisabledCallback(e){this._textarea&&(this._textarea.disabled=e),this._internals.ariaDisabled=e?`true`:`false`,this._setValidity()}};customElements.define(`fluent-textarea`,D);var O=`:host { display: inline-flex; }\r
\r
label {\r
  display: flex;\r
  color: var(--colorNeutralForeground1);\r
  padding-bottom: var(--spacingVerticalXS);\r
  flex-shrink: 0;\r
  padding-inline-end: var(--spacingHorizontalXS);\r
}\r
\r
label[hidden],\r
:host(:empty) label {\r
  display: none;\r
}\r
\r
.root {\r
  align-items: center;\r
  background-color: var(--colorNeutralBackground1);\r
  border: var(--strokeWidthThin) solid var(--colorNeutralStroke1);\r
  border-bottom-color: var(--colorNeutralStrokeAccessible);\r
  border-radius: var(--borderRadiusMedium);\r
  box-sizing: border-box;\r
  height: 32px;\r
  display: inline-flex;\r
  flex-direction: row;\r
  font-family: var(--fontFamilyBase);\r
  font-size: var(--fontSizeBase300);\r
  font-weight: var(--fontWeightRegular);\r
  gap: var(--spacingHorizontalXXS);\r
  line-height: var(--lineHeightBase300);\r
  max-width: 400px;\r
  padding: 0 var(--spacingHorizontalMNudge);\r
  position: relative;\r
  width: 100%;\r
}\r
\r
.root::after {\r
  box-sizing: border-box;\r
  content: '';\r
  position: absolute;\r
  left: -1px;\r
  bottom: 0px;\r
  right: -1px;\r
  height: max(2px, var(--borderRadiusMedium));\r
  border-radius: 0 0 var(--borderRadiusMedium) var(--borderRadiusMedium);\r
  border-bottom: 2px solid var(--colorCompoundBrandStroke);\r
  clip-path: inset(calc(100% - 2px) 1px 0px);\r
  transform: scaleX(0);\r
  transition-property: transform;\r
  transition-duration: var(--durationUltraFast);\r
  transition-delay: var(--curveAccelerateMid);\r
}\r
\r
.root:focus-within::after {\r
  transform: scaleX(1);\r
  transition-property: transform;\r
  transition-duration: var(--durationNormal);\r
  transition-delay: var(--curveDecelerateMid);\r
}\r
\r
.control {\r
  appearance: none;\r
  width: 100%;\r
  height: 100%;\r
  box-sizing: border-box;\r
  color: var(--colorNeutralForeground1);\r
  border-radius: var(--borderRadiusMedium);\r
  background: var(--colorTransparentBackground);\r
  font-family: var(--fontFamilyBase);\r
  font-weight: var(--fontWeightRegular);\r
  font-size: var(--fontSizeBase300);\r
  border: none;\r
  outline: none;\r
  cursor: pointer;\r
  padding-right: 24px;\r
}\r
\r
.control:focus-visible {\r
  outline: 0;\r
}\r
\r
.icon {\r
  position: absolute;\r
  right: var(--spacingHorizontalMNudge);\r
  top: 50%;\r
  transform: translateY(-50%);\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  color: var(--colorNeutralForeground3);\r
  pointer-events: none;\r
  font-size: var(--fontSizeBase500);\r
}\r
\r
.root:hover {\r
  border-color: var(--colorNeutralStroke1Hover);\r
  border-bottom-color: var(--colorNeutralStrokeAccessibleHover);\r
}\r
\r
.root:active {\r
  border-color: var(--colorNeutralStroke1Pressed);\r
}\r
\r
.root:focus-within {\r
  outline: transparent solid 2px;\r
  border-bottom: 0;\r
}\r
\r
:host([disabled]) .root {\r
  background: var(--colorTransparentBackground);\r
  border: var(--strokeWidthThin) solid var(--colorNeutralStrokeDisabled);\r
}\r
\r
:host([disabled]) .control {\r
  color: var(--colorNeutralForegroundDisabled);\r
  cursor: not-allowed;\r
}\r
\r
:host([disabled]) .icon {\r
  color: var(--colorNeutralForegroundDisabled);\r
}\r
\r
:host([control-size='small']) .control {\r
  font-size: var(--fontSizeBase200);\r
  font-weight: var(--fontWeightRegular);\r
  line-height: var(--lineHeightBase200);\r
}\r
\r
:host([control-size='small']) .root {\r
  height: 24px;\r
  gap: var(--spacingHorizontalXXS);\r
  padding: 0 var(--spacingHorizontalSNudge);\r
}\r
\r
:host([control-size='large']) .control {\r
  font-size: var(--fontSizeBase400);\r
  font-weight: var(--fontWeightRegular);\r
  line-height: var(--lineHeightBase400);\r
}\r
\r
:host([control-size='large']) .root {\r
  height: 40px;\r
  gap: var(--spacingHorizontalS);\r
  padding: 0 var(--spacingHorizontalM);\r
}\r
\r
:host([appearance='underline']) .root {\r
  background: var(--colorTransparentBackground);\r
  border: 0;\r
  border-radius: 0;\r
  border-bottom: var(--strokeWidthThin) solid var(--colorNeutralStrokeAccessible);\r
}\r
\r
:host([appearance='underline']) .root:hover {\r
  border-bottom-color: var(--colorNeutralStrokeAccessibleHover);\r
}\r
\r
:host([appearance='underline']) .root:active {\r
  border-bottom-color: var(--colorNeutralStrokeAccessiblePressed);\r
}\r
\r
:host([appearance='underline']) .root:focus-within {\r
  border: 0;\r
  border-bottom-color: var(--colorNeutralStrokeAccessiblePressed);\r
}\r
\r
:host([appearance='underline'][disabled]) .root {\r
  border-bottom-color: var(--colorNeutralStrokeDisabled);\r
}\r
\r
:host([appearance='filled-lighter']) .root {\r
  background: var(--colorNeutralBackground1);\r
  border: var(--strokeWidthThin) solid var(--colorTransparentStroke);\r
  box-shadow: var(--shadow2);\r
}\r
\r
:host([appearance='filled-darker']) .root {\r
  background: var(--colorNeutralBackground3);\r
  border: var(--strokeWidthThin) solid var(--colorTransparentStroke);\r
  box-shadow: var(--shadow2);\r
}\r
\r
:host([appearance='filled-lighter']) .root:hover,\r
:host([appearance='filled-darker']) .root:hover {\r
  border-color: var(--colorTransparentStrokeInteractive);\r
}\r
\r
:host([appearance='filled-lighter']) .root:active,\r
:host([appearance='filled-darker']) .root:active {\r
  border-color: var(--colorTransparentStrokeInteractive);\r
  background: var(--colorNeutralBackground3);\r
}\r
`,k=class extends e{static styles=O;static formAssociated=!0;static template=`
    <label for="control" part="label">
      <slot name="label"></slot>
    </label>
    <div class="root" part="root">
      <select id="control" class="control" part="control"></select>
      <span class="icon" part="icon">
        <slot name="icon">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
            <path d="M2.15 4.65a.5.5 0 0 1 .7-.7L6 7.09l3.15-3.14a.5.5 0 1 1 .7.7l-3.5 3.5a.5.5 0 0 1-.7 0l-3.5-3.5Z"></path>
          </svg>
        </slot>
      </span>
    </div>
    <div hidden>
      <slot></slot>
    </div>
  `;static get observedAttributes(){return[`disabled`,`required`,`name`,`value`,`appearance`,`control-size`,`autofocus`,`autocomplete`,`aria-label`,`aria-labelledby`,`aria-describedby`]}constructor(){super(),this._internals=this.attachInternals(),this._userInteracted=!1,this._boundHandleInput=this._handleInput.bind(this),this._boundHandleChange=this._handleChange.bind(this)}connectedCallback(){super.connectedCallback(),this._shadowRoot=this._root,requestAnimationFrame(()=>{if(!this.isConnected)return;let e=this._shadowRoot.querySelector(`.control`);if(!e)return;this._selectEl=e,this._moveOptionsToNativeSelect(),this._syncAllAttrs();let t=this.getAttribute(`value`)||``;t&&(this._selectEl.value=t),this._setFormValue(this._selectEl.value),this._setValidity(),this._selectEl.addEventListener(`input`,this._boundHandleInput),this._selectEl.addEventListener(`change`,this._boundHandleChange),this._updateLabelVisibility()})}changed(e,t,n){if(this._selectEl)switch(e){case`disabled`:this._selectEl.disabled=n!==null,this._internals.ariaDisabled=n===null?`false`:`true`;break;case`required`:this._selectEl.required=n!==null,this._internals.ariaRequired=n===null?`false`:`true`,this._setValidity();break;case`name`:this._selectEl.name=n||``;break;case`value`:!this._userInteracted&&n!==null&&(this._selectEl.value=n);break;case`autocomplete`:this._selectEl.autocomplete=n||`off`;break;case`autofocus`:n!==null&&this._selectEl.focus()}}get value(){return this._selectEl?this._selectEl.value:this.getAttribute(`value`)||``}set value(e){this._selectEl&&(this._selectEl.value=e,this._setFormValue(e))}get disabled(){return this.hasAttribute(`disabled`)}get form(){return this._internals.form}get labels(){return this._internals.labels}get validity(){return this._internals.validity}get validationMessage(){return this._internals.validationMessage||(this._selectEl?this._selectEl.validationMessage:``)}get willValidate(){return this._internals.willValidate}checkValidity(){return this._internals.checkValidity()}reportValidity(){return this._internals.reportValidity()}setCustomValidity(e){this._internals.setValidity({customError:!!e},e||void 0),this.reportValidity()}_moveOptionsToNativeSelect(){let e=this._root.querySelector(`slot:not([name])`);e&&e.assignedNodes().forEach(e=>{(e.tagName===`OPTION`||e.tagName===`OPTGROUP`)&&this._selectEl.appendChild(e.cloneNode(!0))})}_syncAllAttrs(){let e=this._selectEl;e&&(e.disabled=this.hasAttribute(`disabled`),e.required=this.hasAttribute(`required`),e.name=this.getAttribute(`name`)||``,e.autocomplete=this.getAttribute(`autocomplete`)||`off`,this.hasAttribute(`autofocus`)&&(e.autofocus=!0),this._internals.ariaDisabled=this.hasAttribute(`disabled`)?`true`:`false`,this._internals.ariaRequired=this.hasAttribute(`required`)?`true`:`false`)}_handleInput(e){this._userInteracted=!0,this._setFormValue(this._selectEl.value),this._setValidity(),this.dispatchEvent(new Event(`input`,{bubbles:!0,composed:!0}))}_handleChange(e){this._setValidity(),this.dispatchEvent(new Event(`change`,{bubbles:!0,composed:!0}))}_setFormValue(e){this._internals.setFormValue(e,e)}_setValidity(){if(this.isConnected){if(this.disabled)this._internals.setValidity({});else if(this._selectEl){let{valid:e,valueMissing:t}=this._selectEl.validity;if(e)this._internals.setValidity({});else{let e=this._selectEl.validationMessage||`Invalid value`;this._internals.setValidity({valueMissing:t},e,this._selectEl)}}}}_updateLabelVisibility(){let e=this._shadowRoot.querySelector(`label`);if(!e)return;let t=this._root.querySelector(`slot[name="label"]`);t&&(e.hidden=!t.assignedNodes().some(e=>e.nodeType===Node.ELEMENT_NODE||e.nodeType===Node.TEXT_NODE&&e.textContent.trim()))}formResetCallback(){this._selectEl&&(this._selectEl.value=this.getAttribute(`value`)||``,this._userInteracted=!1,this._setValidity())}formDisabledCallback(e){this._selectEl&&(this._selectEl.disabled=e),this._internals.ariaDisabled=e?`true`:`false`,this._setValidity()}};customElements.define(`fluent-select`,k);var A=`:host { display: block; }\r
\r
.root {\r
  display: block;\r
  box-sizing: border-box;\r
  background-color: var(--colorNeutralBackground1);\r
  border: var(--strokeWidthThin) solid var(--colorNeutralStroke2);\r
  border-radius: var(--borderRadiusXLarge);\r
  color: var(--colorNeutralForeground1);\r
  font-family: var(--fontFamilyBase);\r
  font-size: var(--fontSizeBase300);\r
  line-height: var(--lineHeightBase300);\r
  padding: var(--spacingVerticalL) var(--spacingHorizontalL);\r
  overflow: hidden;\r
  position: relative;\r
}\r
\r
:host([appearance='filled-alternative']) .root {\r
  background-color: var(--colorNeutralBackground2);\r
  border-color: transparent;\r
}\r
\r
:host([appearance='filled-alternative']) .root:hover {\r
  background-color: var(--colorNeutralBackground2Hover);\r
}\r
\r
:host([appearance='outline']) .root {\r
  background-color: var(--colorTransparentBackground);\r
}\r
\r
:host([appearance='outline']) .root:hover {\r
  background-color: var(--colorTransparentBackgroundHover);\r
}\r
\r
:host([appearance='subtle']) .root {\r
  background-color: var(--colorSubtleBackground);\r
  border-color: transparent;\r
}\r
\r
:host([appearance='subtle']) .root:hover {\r
  background-color: var(--colorSubtleBackgroundHover);\r
}\r
\r
:host([size='small']) .root {\r
  padding: var(--spacingVerticalM) var(--spacingHorizontalM);\r
  border-radius: var(--borderRadiusLarge);\r
  font-size: var(--fontSizeBase200);\r
  line-height: var(--lineHeightBase200);\r
}\r
\r
:host([size='large']) .root {\r
  padding: var(--spacingVerticalXL) var(--spacingHorizontalXL);\r
  font-size: var(--fontSizeBase400);\r
  line-height: var(--lineHeightBase400);\r
}\r
\r
::slotted([slot='preview']) {\r
  margin: calc(-1 * var(--spacingVerticalL)) calc(-1 * var(--spacingHorizontalL)) var(--spacingVerticalL);\r
  width: calc(100% + 2 * var(--spacingHorizontalL));\r
  display: block;\r
}\r
\r
::slotted([slot='header']) {\r
  margin-bottom: var(--spacingVerticalM);\r
}\r
\r
::slotted([slot='footer']) {\r
  margin-top: var(--spacingVerticalM);\r
  padding-top: var(--spacingVerticalM);\r
  border-top: var(--strokeWidthThin) solid var(--colorNeutralStroke2);\r
}\r
\r
@media (forced-colors: active) {\r
  .root {\r
    border-color: ButtonText;\r
  }\r
}\r
\r
@media screen and (prefers-reduced-motion: reduce) {\r
  .root {\r
    transition-duration: 0.01ms;\r
  }\r
}\r
`,j=class extends e{static styles=A;static template=`
    <div class="root">
      <slot name="preview"></slot>
      <slot name="header"></slot>
      <slot></slot>
      <slot name="footer"></slot>
    </div>
  `;static get observedAttributes(){return[`appearance`,`size`]}};customElements.define(`fluent-card`,j);var M=`:host { display: inline-flex; }\r
\r
.root {\r
  display: inline-flex;\r
  color: var(--colorNeutralForeground1);\r
  cursor: pointer;\r
  font-family: var(--fontFamilyBase);\r
  font-size: var(--fontSizeBase300);\r
  font-weight: var(--fontWeightRegular);\r
  line-height: var(--lineHeightBase300);\r
  user-select: none;\r
}\r
\r
.asterisk {\r
  color: var(--colorPaletteRedForeground1);\r
  margin-inline-start: var(--spacingHorizontalXS);\r
}\r
\r
:host(:not([required])) .root .asterisk {\r
  display: none;\r
}\r
\r
:host([size='small']) .root {\r
  font-size: var(--fontSizeBase200);\r
  line-height: var(--lineHeightBase200);\r
}\r
\r
:host([size='large']) .root {\r
  font-size: var(--fontSizeBase400);\r
  line-height: var(--lineHeightBase400);\r
}\r
\r
:host(:is([size='large'], [weight='semibold'])) .root {\r
  font-weight: var(--fontWeightSemibold);\r
}\r
\r
:host([disabled]) .root,\r
:host([disabled]) .root .asterisk {\r
  color: var(--colorNeutralForegroundDisabled);\r
}\r
\r
@media (forced-colors: active) {\r
  :host([disabled]) .root,\r
  :host([disabled]) .root .asterisk {\r
    color: GrayText;\r
  }\r
}\r
`,N=class extends e{static styles=M;static template=`
    <label class="root">
      <slot></slot>
      <span class="asterisk" part="asterisk" aria-hidden="true">*</span>
    </label>
  `;static get observedAttributes(){return[`disabled`,`required`,`size`,`weight`,`for`]}connectedCallback(){super.connectedCallback(),requestAnimationFrame(()=>{this._updateFor(),this._updateRequired()})}changed(e,t,n){switch(e){case`for`:this._updateFor();break;case`required`:this._updateRequired()}}_updateFor(){let e=this._root?.querySelector(`.root`);if(!e)return;let t=this.getAttribute(`for`);t?e.setAttribute(`for`,t):e.removeAttribute(`for`)}_updateRequired(){let e=this._root?.querySelector(`.root`);if(!e)return;let t=e.querySelector(`.asterisk`);t&&(t.style.display=this.hasAttribute(`required`)?`inline`:`none`)}};customElements.define(`fluent-label`,N);var ee=`:host { display: inline; }\r
\r
.root {\r
  display: inline;\r
  font-family: var(--fontFamilyBase);\r
  font-size: var(--fontSizeBase300);\r
  line-height: var(--lineHeightBase300);\r
  font-weight: var(--fontWeightRegular);\r
  text-align: start;\r
}\r
\r
:host([nowrap]) .root,\r
:host([nowrap]) .root ::slotted(*) {\r
  white-space: nowrap;\r
  overflow: hidden;\r
}\r
\r
:host([truncate]) .root,\r
:host([truncate]) .root ::slotted(*) {\r
  text-overflow: ellipsis;\r
}\r
\r
:host([block]) .root {\r
  display: block;\r
}\r
\r
:host([italic]) .root {\r
  font-style: italic;\r
}\r
\r
:host([underline]) .root {\r
  text-decoration-line: underline;\r
}\r
\r
:host([strikethrough]) .root {\r
  text-decoration-line: line-through;\r
}\r
\r
:host([underline][strikethrough]) .root {\r
  text-decoration-line: line-through underline;\r
}\r
\r
:host([size='100']) .root {\r
  font-size: var(--fontSizeBase100);\r
  line-height: var(--lineHeightBase100);\r
}\r
\r
:host([size='200']) .root {\r
  font-size: var(--fontSizeBase200);\r
  line-height: var(--lineHeightBase200);\r
}\r
\r
:host([size='400']) .root {\r
  font-size: var(--fontSizeBase400);\r
  line-height: var(--lineHeightBase400);\r
}\r
\r
:host([size='500']) .root {\r
  font-size: var(--fontSizeBase500);\r
  line-height: var(--lineHeightBase500);\r
}\r
\r
:host([size='600']) .root {\r
  font-size: var(--fontSizeBase600);\r
  line-height: var(--lineHeightBase600);\r
}\r
\r
:host([size='700']) .root {\r
  font-size: var(--fontSizeBase700);\r
  line-height: var(--lineHeightBase700);\r
}\r
\r
:host([size='800']) .root {\r
  font-size: var(--fontSizeBase800);\r
  line-height: var(--lineHeightBase800);\r
}\r
\r
:host([size='900']) .root {\r
  font-size: var(--fontSizeBase900);\r
  line-height: var(--lineHeightBase900);\r
}\r
\r
:host([size='1000']) .root {\r
  font-size: var(--fontSizeBase1000);\r
  line-height: var(--lineHeightBase1000);\r
}\r
\r
:host([font='monospace']) .root {\r
  font-family: var(--fontFamilyMonospace);\r
}\r
\r
:host([font='numeric']) .root {\r
  font-family: var(--fontFamilyNumeric);\r
}\r
\r
:host([weight='medium']) .root {\r
  font-weight: var(--fontWeightMedium);\r
}\r
\r
:host([weight='semibold']) .root {\r
  font-weight: var(--fontWeightSemibold);\r
}\r
\r
:host([weight='bold']) .root {\r
  font-weight: var(--fontWeightBold);\r
}\r
\r
:host([align='center']) .root {\r
  text-align: center;\r
}\r
\r
:host([align='end']) .root {\r
  text-align: end;\r
}\r
\r
:host([align='justify']) .root {\r
  text-align: justify;\r
}\r
\r
::slotted(*) {\r
  font: inherit;\r
  line-height: inherit;\r
  text-decoration-line: inherit;\r
  text-align: inherit;\r
  margin: 0;\r
}\r
`,P=class extends e{static styles=ee;static template=`<div class="root"><slot></slot></div>`;static formAssociated=!0;constructor(){super(),this._internals=this.attachInternals()}static get observedAttributes(){return[`size`,`weight`,`font`,`align`,`nowrap`,`truncate`,`italic`,`underline`,`strikethrough`,`block`]}};customElements.define(`fluent-text`,P);var F=`:host { display: inline-block; }\r
\r
.root {\r
  display: inline-block;\r
}\r
\r
:host([block]) .root {\r
  display: block;\r
}\r
\r
:host ::slotted(img) {\r
  box-sizing: border-box;\r
  min-height: 8px;\r
  min-width: 8px;\r
  display: inline-block;\r
}\r
\r
:host([block]) ::slotted(img) {\r
  width: 100%;\r
  height: auto;\r
}\r
\r
:host([bordered]) ::slotted(img) {\r
  border: var(--strokeWidthThin) solid var(--colorNeutralStroke2);\r
}\r
\r
:host([fit='none']) ::slotted(img) {\r
  object-fit: none;\r
  object-position: top left;\r
  height: 100%;\r
  width: 100%;\r
}\r
\r
:host([fit='center']) ::slotted(img) {\r
  object-fit: none;\r
  object-position: center;\r
  height: 100%;\r
  width: 100%;\r
}\r
\r
:host([fit='contain']) ::slotted(img) {\r
  object-fit: contain;\r
  object-position: center;\r
  height: 100%;\r
  width: 100%;\r
}\r
\r
:host([fit='cover']) ::slotted(img) {\r
  object-fit: cover;\r
  object-position: center;\r
  height: 100%;\r
  width: 100%;\r
}\r
\r
:host([shadow]) ::slotted(img) {\r
  box-shadow: var(--shadow4);\r
}\r
\r
:host([shape='circular']) ::slotted(img) {\r
  border-radius: var(--borderRadiusCircular);\r
}\r
\r
:host([shape='rounded']) ::slotted(img) {\r
  border-radius: var(--borderRadiusMedium);\r
}\r
\r
@media (forced-colors: active) {\r
  :host([bordered]) ::slotted(img) {\r
    border-color: ButtonText;\r
  }\r
}\r
`,I=class extends e{static styles=F;static template=`<div class="root"><slot></slot></div>`;static formAssociated=!0;constructor(){super(),this._internals=this.attachInternals()}static get observedAttributes(){return[`src`,`alt`,`fit`,`shape`,`block`,`bordered`,`shadow`]}connectedCallback(){if(super.connectedCallback(),!this.querySelector(`img`)){let e=this.getAttribute(`src`),t=this.getAttribute(`alt`)||``;if(e){let n=document.createElement(`img`);n.src=e,n.alt=t,this.appendChild(n)}}}};customElements.define(`fluent-image`,I);var L=`:host {\r
  --dialog-backdrop: rgba(0, 0, 0, 0.4);\r
  --dialog-starting-scale: 0.85;\r
  display: none;\r
}\r
\r
:host([open]) {\r
  display: block;\r
}\r
\r
::backdrop {\r
  background: var(--dialog-backdrop);\r
}\r
\r
dialog {\r
  background: var(--colorNeutralBackground1);\r
  border-radius: var(--borderRadiusXLarge);\r
  border: none;\r
  box-shadow: var(--shadow64);\r
  color: var(--colorNeutralForeground1);\r
  max-height: 100vh;\r
  padding: 0;\r
  width: 100%;\r
  max-width: 600px;\r
}\r
\r
:host([type='non-modal']) .root dialog {\r
  inset: 0;\r
  position: fixed;\r
  z-index: 2;\r
  overflow: auto;\r
}\r
\r
@supports (max-height: 1dvh) {\r
  dialog {\r
    max-height: 100dvh;\r
  }\r
}\r
\r
@media (prefers-reduced-motion: no-preference) {\r
  dialog,\r
  ::backdrop {\r
    transition-behavior: allow-discrete;\r
    transition-property: display, opacity, overlay, scale;\r
    transition-duration: var(--durationGentle);\r
    transition-timing-function: var(--curveDecelerateMid);\r
    opacity: 0;\r
  }\r
\r
  ::backdrop {\r
    transition-timing-function: var(--curveLinear);\r
  }\r
\r
  dialog[open],\r
  dialog[open]::backdrop {\r
    opacity: 1;\r
  }\r
\r
  dialog:not([open]) {\r
    scale: var(--dialog-starting-scale);\r
    transition-timing-function: var(--curveAccelerateMid);\r
  }\r
}\r
\r
@starting-style {\r
  dialog[open],\r
  dialog[open]::backdrop {\r
    opacity: 0;\r
  }\r
\r
  dialog {\r
    scale: var(--dialog-starting-scale);\r
  }\r
}\r
\r
@media (forced-colors: active) {\r
  dialog {\r
    border: var(--strokeWidthThin) solid var(--colorTransparentStroke);\r
  }\r
}\r
`,R=class extends e{static styles=L;static template=`
    <div class="root">
      <dialog class="dialog" part="dialog">
        <slot></slot>
      </dialog>
    </div>
  `;static get observedAttributes(){return[`type`,`trigger`,`close-on`,`aria-label`,`aria-labelledby`,`aria-describedby`]}connectedCallback(){super.connectedCallback(),this._dialog=this._root.querySelector(`dialog`),this._dialog&&(this._dialog.addEventListener(`click`,e=>this._clickHandler(e)),this._dialog.addEventListener(`cancel`,()=>this.hide()),this._updateDialogAttributes()),requestAnimationFrame(()=>this._wireTrigger()),requestAnimationFrame(()=>this._wireCloseOn())}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e===`type`&&this._updateDialogAttributes(),e===`trigger`&&t!==n&&this._wireTrigger(),e===`close-on`&&t!==n&&this._wireCloseOn(),this._dialog&&(e===`aria-label`||e===`aria-labelledby`||e===`aria-describedby`)&&(n===null?this._dialog.removeAttribute(e):this._dialog.setAttribute(e,n))}show(){if(!this._dialog)return;this.setAttribute(`open`,``),this.dispatchEvent(new CustomEvent(`beforetoggle`,{detail:{oldState:this._dialog.open?`open`:`closed`,newState:this._dialog.open?`closed`:`open`}}));let e=this.getAttribute(`type`)||`modal`;e===`alert`||e===`modal`?this._dialog.showModal():this._dialog.show(),this.dispatchEvent(new CustomEvent(`toggle`,{detail:{oldState:`closed`,newState:`open`}}))}hide(){this._dialog&&(this.removeAttribute(`open`),this.dispatchEvent(new CustomEvent(`beforetoggle`,{detail:{oldState:`open`,newState:`closed`}})),this._dialog.close(),this.dispatchEvent(new CustomEvent(`toggle`,{detail:{oldState:`open`,newState:`closed`}})))}_wireTrigger(){let e=this.getAttribute(`trigger`);if(!e)return;this._triggerEl&&this._triggerEl.removeEventListener(`click`,this._onTriggerClick);let t=this._root.host?.ownerDocument?.querySelector(e)??document.querySelector(e);t&&(this._triggerEl=t,this._onTriggerClick=()=>this.show(),t.addEventListener(`click`,this._onTriggerClick))}_wireCloseOn(){let e=this.getAttribute(`close-on`);e&&(this._closeOnCleanups&&this._closeOnCleanups.forEach(e=>e()),this._closeOnCleanups=[],e.split(`,`).forEach(e=>{let t=e.trim();t&&(this._root.host?.ownerDocument??document).querySelectorAll(t).forEach(e=>{let t=()=>this.hide();e.addEventListener(`click`,t),this._closeOnCleanups.push(()=>e.removeEventListener(`click`,t))})}))}_clickHandler(e){let t=this.getAttribute(`type`)||`modal`;this._dialog.open&&t!==`alert`&&e.target===this._dialog&&this.hide()}_updateDialogAttributes(){if(!this._dialog)return;let e=this.getAttribute(`type`)||`modal`;e===`alert`?this._dialog.setAttribute(`role`,`alertdialog`):this._dialog.removeAttribute(`role`),e===`non-modal`?this._dialog.removeAttribute(`aria-modal`):this._dialog.setAttribute(`aria-modal`,`true`)}};customElements.define(`fluent-dialog`,R);var z=`:host(:not(:popover-open)) {\r
  display: none;\r
}\r
\r
:host {\r
  inset-area: block-start;\r
  position-try-options: flip-block;\r
  inset: unset;\r
  margin: 0;\r
  width: max-content;\r
}\r
\r
.root {\r
  background: var(--colorNeutralBackground1);\r
  border-radius: var(--borderRadiusMedium);\r
  border: var(--strokeWidthThin) solid var(--colorTransparentStroke);\r
  box-sizing: border-box;\r
  color: var(--colorNeutralForeground1);\r
  font-family: var(--fontFamilyBase);\r
  font-size: var(--fontSizeBase200);\r
  line-height: var(--lineHeightBase200);\r
  max-width: 240px;\r
  padding: 4px var(--spacingHorizontalMNudge) 6px;\r
  box-shadow: var(--shadow4);\r
}\r
\r
:host([positioning='above-start'])   { inset-area: block-start span-inline-end; }\r
:host([positioning='above'])         { inset-area: block-start; }\r
:host([positioning='above-end'])     { inset-area: block-start span-inline-start; }\r
:host([positioning='below-start'])   { inset-area: block-end span-inline-end; }\r
:host([positioning='below'])         { inset-area: block-end; }\r
:host([positioning='below-end'])     { inset-area: block-end span-inline-start; }\r
:host([positioning='before-top'])    { inset-area: inline-start span-block-end; }\r
:host([positioning='before'])        { inset-area: inline-start; }\r
:host([positioning='before-bottom']) { inset-area: inline-start span-block-start; }\r
:host([positioning='after-top'])     { inset-area: inline-end span-block-end; }\r
:host([positioning='after'])         { inset-area: inline-end; }\r
:host([positioning='after-bottom'])  { inset-area: inline-end span-block-start; }\r
\r
@supports not (inset-area: block-start) {\r
  :host {\r
    position-area: block-start;\r
    position-try-options: flip-block;\r
  }\r
  :host([positioning='above-start'])   { position-area: block-start span-inline-end; }\r
  :host([positioning='above'])         { position-area: block-start; }\r
  :host([positioning='above-end'])     { position-area: block-start span-inline-start; }\r
  :host([positioning='below-start'])   { position-area: block-end span-inline-end; }\r
  :host([positioning='below'])         { position-area: block-end; }\r
  :host([positioning='below-end'])     { position-area: block-end span-inline-start; }\r
  :host([positioning='before-top'])    { position-area: inline-start span-block-end; }\r
  :host([positioning='before'])        { position-area: inline-start; }\r
  :host([positioning='before-bottom']) { position-area: inline-start span-block-start; }\r
  :host([positioning='after-top'])     { position-area: inline-end span-block-end; }\r
  :host([positioning='after'])         { position-area: inline-end; }\r
  :host([positioning='after-bottom'])  { position-area: inline-end span-block-start; }\r
}\r
\r
@media (forced-colors: active) {\r
  .root {\r
    border-color: ButtonText;\r
  }\r
}\r
`;let B=0;var V=class extends e{static styles=z;static template=`<div class="root"><slot></slot></div>`;static formAssociated=!0;static get observedAttributes(){return[`visible`,`anchor`,`positioning`,`delay`]}constructor(){super(),this._internals=this.attachInternals(),this._internals.role=`tooltip`,this._id=`fluent-tooltip-${++B}`,this._defaultDelay=250,this._anchorElement=null,this._timer=null}connectedCallback(){super.connectedCallback(),this.setAttribute(`id`,this._id),this.setAttribute(`aria-hidden`,`true`),this.setAttribute(`popover`,`manual`),this._resolveAnchor(),this._addAnchorListeners()}disconnectedCallback(){super.disconnectedCallback(),this._removeAnchorListeners(),this._anchorElement&&this._anchorElement.style.removeProperty(`anchor-name`)}_resolveAnchor(){let e=this.getAttribute(`anchor`);if(!e)return;let t=this.getRootNode();if(this._anchorElement=(t instanceof ShadowRoot?t:document).getElementById(e),this._anchorElement){this._anchorElement.style.setProperty(`anchor-name`,`--${this._id}`),this.style.setProperty(`position-anchor`,`--${this._id}`);let e=this._anchorElement.getAttribute(`aria-describedby`);this._anchorElement.setAttribute(`aria-describedby`,e?`${e} ${this._id}`:this._id)}}_addAnchorListeners(){this._anchorElement&&(this._anchorElement.addEventListener(`focus`,this._focusHandler),this._anchorElement.addEventListener(`blur`,this._blurHandler),this._anchorElement.addEventListener(`mouseenter`,this._mouseenterHandler),this._anchorElement.addEventListener(`mouseleave`,this._mouseleaveHandler))}_removeAnchorListeners(){this._anchorElement&&(this._anchorElement.removeEventListener(`focus`,this._focusHandler),this._anchorElement.removeEventListener(`blur`,this._blurHandler),this._anchorElement.removeEventListener(`mouseenter`,this._mouseenterHandler),this._anchorElement.removeEventListener(`mouseleave`,this._mouseleaveHandler))}show(e){clearTimeout(this._timer);let t=e==null?this._defaultDelay:Number(e);this._timer=setTimeout(()=>{this.setAttribute(`aria-hidden`,`false`),this.showPopover()},t)}hide(e){clearTimeout(this._timer);let t=e==null?this._defaultDelay:Number(e);this._timer=setTimeout(()=>{this.matches(`:hover`)||this._anchorElement&&this._anchorElement.matches(`:hover`)?this.hide(t):(this.setAttribute(`aria-hidden`,`true`),this.hidePopover())},t)}_focusHandler=()=>this.show(0);_blurHandler=()=>this.hide(0);_mouseenterHandler=()=>this.show(this.getAttribute(`delay`));_mouseleaveHandler=()=>this.hide(this.getAttribute(`delay`))};customElements.define(`fluent-tooltip`,V);var H=`:host { display: block; }\r
\r
.root {\r
  display: inline-block;\r
  position: relative;\r
}\r
\r
::slotted([slot='trigger']) {\r
  cursor: pointer;\r
}\r
\r
.popover {\r
  display: none;\r
  position: absolute;\r
  inset: unset;\r
  top: calc(100% + var(--spacingVerticalS));\r
  left: 50%;\r
  translate: -50% 0;\r
  background: var(--colorNeutralBackground1);\r
  border: var(--strokeWidthThin) solid var(--colorNeutralStroke1);\r
  border-radius: var(--borderRadiusMedium);\r
  box-shadow: var(--shadow16);\r
  color: var(--colorNeutralForeground1);\r
  font-family: var(--fontFamilyBase);\r
  font-size: var(--fontSizeBase300);\r
  line-height: var(--lineHeightBase300);\r
  min-width: 120px;\r
  padding: var(--spacingVerticalXS) 0;\r
  z-index: 1000;\r
  white-space: nowrap;\r
}\r
\r
.arrow {\r
  display: none;\r
  position: absolute;\r
  top: calc(-1 * var(--strokeWidthThick));\r
  left: 50%;\r
  translate: -50% 0;\r
  width: 0;\r
  height: 0;\r
  border-left: 8px solid transparent;\r
  border-right: 8px solid transparent;\r
  border-bottom: 8px solid var(--colorNeutralStroke1);\r
}\r
\r
.arrow::after {\r
  content: '';\r
  position: absolute;\r
  top: var(--strokeWidthThin);\r
  left: -8px;\r
  width: 0;\r
  height: 0;\r
  border-left: 8px solid transparent;\r
  border-right: 8px solid transparent;\r
  border-bottom: 8px solid var(--colorNeutralBackground1);\r
}\r
\r
:host([positioning='above']) .popover {\r
  top: unset;\r
  bottom: calc(100% + var(--spacingVerticalS));\r
}\r
\r
:host([positioning='above']) .arrow {\r
  top: unset;\r
  bottom: calc(-1 * var(--strokeWidthThick));\r
  border-bottom: none;\r
  border-top: 8px solid var(--colorNeutralStroke1);\r
}\r
\r
:host([positioning='above']) .arrow::after {\r
  top: calc(-1 * (var(--strokeWidthThick) + var(--strokeWidthThin)));\r
  border-bottom: none;\r
  border-top: 8px solid var(--colorNeutralBackground1);\r
}\r
\r
:host([positioning='before']) .popover {\r
  left: unset;\r
  top: 50%;\r
  right: calc(100% + var(--spacingHorizontalS));\r
  translate: 0 -50%;\r
}\r
\r
:host([positioning='after']) .popover {\r
  left: calc(100% + var(--spacingHorizontalS));\r
  top: 50%;\r
  translate: 0 -50%;\r
}\r
\r
@media (forced-colors: active) {\r
  .popover {\r
    border-color: ButtonText;\r
  }\r
}\r
`,U=class extends e{static styles=H;static template=`
    <div class="root">
      <slot name="trigger"></slot>
      <div class="popover" part="popover">
        <div class="arrow"></div>
        <slot></slot>
      </div>
    </div>
  `;static get observedAttributes(){return[`open`,`anchor`,`positioning`]}connectedCallback(){super.connectedCallback(),this._popover=this._root.querySelector(`.popover`),this._arrow=this._root.querySelector(`.arrow`),this._triggerSlot=this._root.querySelector(`slot[name="trigger"]`),this._triggerSlot.addEventListener(`slotchange`,()=>{this._setupTrigger()}),this._setupTrigger(),this._popover.addEventListener(`click`,e=>e.stopPropagation()),document.addEventListener(`click`,this._documentClickHandler)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener(`click`,this._documentClickHandler)}_setupTrigger(){let e=this._triggerSlot.assignedElements();if(e.length>0){let t=e[0];t.setAttribute(`aria-haspopup`,`true`),t.addEventListener(`click`,e=>{e.stopPropagation(),this.toggle()}),t.addEventListener(`keydown`,e=>{e.key===`Escape`&&(this.close(),t.focus())})}}toggle(){this.hasAttribute(`open`)?this.close():this.open()}open(){this.setAttribute(`open`,``),this._popover.style.display=`block`,this._triggerSlot.assignedElements().forEach(e=>{e.setAttribute(`aria-expanded`,`true`)})}close(){this.removeAttribute(`open`),this._popover.style.display=`none`,this._triggerSlot.assignedElements().forEach(e=>{e.setAttribute(`aria-expanded`,`false`)})}_documentClickHandler=e=>{this.hasAttribute(`open`)&&(e.composedPath().includes(this)||this.close())}};customElements.define(`fluent-popover`,U);var W=`:host { display: inline-flex; }\r
\r
.root {\r
  display: inline-block;\r
}\r
\r
::slotted([slot='trigger']) {\r
  anchor-name: --menu-trigger;\r
}\r
\r
::slotted([popover]) {\r
  margin: 0;\r
  max-height: var(--menu-max-height, auto);\r
  position-anchor: --menu-trigger;\r
  position-area: block-end span-inline-end;\r
  position-try-fallbacks: flip-block;\r
  position: absolute;\r
  z-index: 1;\r
}\r
\r
:host([split]) ::slotted([popover]) {\r
  position-area: block-end span-inline-start;\r
}\r
\r
::slotted([popover]:popover-open) {\r
  inset: unset;\r
}\r
\r
::slotted([popover]:not(:popover-open)) {\r
  display: none;\r
}\r
\r
:host([split]) .root {\r
  display: inline-flex;\r
}\r
\r
:host([split]) ::slotted([slot='primary-action']) {\r
  border-inline-end: var(--strokeWidthThin) solid var(--colorNeutralStroke1);\r
  border-start-end-radius: 0;\r
  border-end-end-radius: 0;\r
}\r
\r
:host([split]) ::slotted([slot='primary-action']:focus-visible) {\r
  z-index: 1;\r
}\r
\r
:host([split]) ::slotted([slot='primary-action'][appearance='primary']) {\r
  border-inline-end: var(--strokeWidthThin) solid white;\r
}\r
\r
:host([split]) ::slotted([slot='trigger']) {\r
  border-inline-start: 0;\r
  border-start-start-radius: 0;\r
  border-end-start-radius: 0;\r
}\r
`,G=class extends e{static styles=W;static template=`
    <div class="root">
      <slot name="primary-action"></slot>
      <slot name="trigger"></slot>
      <slot></slot>
    </div>
  `;static get observedAttributes(){return[`open-on-hover`,`open-on-context`,`close-on-scroll`,`persist-on-item-click`,`split`]}constructor(){super(),this._open=!1,this._trigger=null,this._menuList=null,this._triggerAbortController=null,this._menuListAbortController=null}connectedCallback(){super.connectedCallback(),this._setupSlots(),this.setComponent()}disconnectedCallback(){super.disconnectedCallback(),this._triggerAbortController&&=(this._triggerAbortController.abort(),null),this._menuListAbortController&&=(this._menuListAbortController.abort(),null)}setComponent(){this._setupTriggerSlot(),this._setupMenuListSlot()}_setupSlots(){let e=this._root.querySelector(`slot[name="trigger"]`),t=this._root.querySelector(`slot:not([name])`);e&&e.addEventListener(`slotchange`,()=>this._setupTriggerSlot()),t&&t.addEventListener(`slotchange`,()=>this._setupMenuListSlot()),this._setupTriggerSlot(),this._setupMenuListSlot()}_setupTriggerSlot(){this._triggerAbortController&&=(this._triggerAbortController.abort(),null);let e=this._root.querySelector(`slot[name="trigger"]`);if(!e)return;let t=e.assignedElements();if(t.length===0)return;this._trigger=t[0],this._trigger.setAttribute(`aria-haspopup`,`true`),this._trigger.setAttribute(`aria-expanded`,String(this._open)),this._triggerAbortController=new AbortController;let{signal:n}=this._triggerAbortController;this._trigger.addEventListener(`keydown`,this._triggerKeydownHandler,{signal:n}),this.hasAttribute(`open-on-hover`)?this._trigger.addEventListener(`mouseover`,this.openMenu,{signal:n}):this.hasAttribute(`open-on-context`)?(this._trigger.addEventListener(`contextmenu`,this.openMenu,{signal:n}),document.addEventListener(`click`,this._documentClickHandler,{signal:n})):this._trigger.addEventListener(`click`,this.toggleMenu,{signal:n})}_setupMenuListSlot(){this._menuListAbortController&&=(this._menuListAbortController.abort(),null);let e=this._root.querySelector(`slot:not([name])`);if(!e)return;let t=e.assignedElements();if(t.length!==0&&(this._menuList=t[0].tagName.toLowerCase()===`fluent-menu-item`?this:t[0],this._menuList&&this._menuList!==this)){this._menuList.setAttribute(`popover`,this.hasAttribute(`open-on-context`)?`manual`:``),this._menuListAbortController=new AbortController;let{signal:e}=this._menuListAbortController;this._menuList.addEventListener(`toggle`,this._toggleHandler,{signal:e}),this.hasAttribute(`persist-on-item-click`)||this._menuList.addEventListener(`change`,this.closeMenu,{signal:e})}}toggleMenu=()=>{this._menuList&&this._menuList!==this&&this._menuList.togglePopover(!this._open)};closeMenu=e=>{this._menuList&&this._menuList!==this&&this._menuList.togglePopover(!1),this.hasAttribute(`close-on-scroll`)&&document.removeEventListener(`scroll`,this.closeMenu)};openMenu=e=>{this._menuList&&this._menuList!==this&&this._menuList.togglePopover(!0),e&&this.hasAttribute(`open-on-context`)&&e.preventDefault(),this.hasAttribute(`close-on-scroll`)&&document.addEventListener(`scroll`,this.closeMenu)};focusMenuList(){this._menuList&&this._menuList.focus()}focusTrigger(){this._trigger&&this._trigger.focus()}_toggleHandler=e=>{if(e.type===`toggle`&&e.newState){let t=e.newState===`open`;this._trigger&&this._trigger.setAttribute(`aria-expanded`,String(t)),this._menuList&&this._menuList.setAttribute(`focusgroup`,t?`menu`:`none`),this._open=t,this._open&&this.focusMenuList()}};_triggerKeydownHandler=e=>{if(!e.defaultPrevented)switch(e.key){case` `:case`Enter`:e.preventDefault(),this.toggleMenu();break;default:return!0}};_documentClickHandler=e=>{e.composedPath().some(e=>e===this._trigger||e===this._menuList)||this.closeMenu()}};customElements.define(`fluent-menu`,G);var K=`:host { display: block; }\r
\r
.root {\r
  --indent: 0;\r
  display: grid;\r
  align-items: center;\r
  background: var(--colorNeutralBackground1);\r
  border-radius: var(--borderRadiusMedium);\r
  color: var(--colorNeutralForeground2);\r
  cursor: pointer;\r
  flex-shrink: 0;\r
  font: var(--fontWeightRegular) var(--fontSizeBase300) / var(--lineHeightBase300) var(--fontFamilyBase);\r
  grid-gap: 4px;\r
  grid-template-columns: 20px 20px auto 20px;\r
  height: 32px;\r
  overflow: visible;\r
  padding: 0 10px;\r
}\r
\r
.root:hover {\r
  background: var(--colorNeutralBackground1Hover);\r
  color: var(--colorNeutralForeground2Hover);\r
}\r
\r
.root:active {\r
  background-color: var(--colorNeutralBackground1Selected);\r
  color: var(--colorNeutralForeground2Pressed);\r
}\r
\r
:host(:active) ::slotted([slot='start']) {\r
  color: var(--colorCompoundBrandForeground1Pressed);\r
}\r
\r
:host(:state(disabled)) .root {\r
  background-color: var(--colorNeutralBackgroundDisabled);\r
  color: var(--colorNeutralForegroundDisabled);\r
}\r
\r
:host(:state(disabled)) ::slotted([slot='start']),\r
:host(:state(disabled)) ::slotted([slot='end']) {\r
  color: var(--colorNeutralForegroundDisabled);\r
}\r
\r
.root:focus-visible {\r
  border-radius: var(--borderRadiusMedium);\r
  outline: var(--strokeWidthThick) solid var(--colorStrokeFocus2);\r
}\r
\r
.content {\r
  white-space: nowrap;\r
  flex-grow: 1;\r
  grid-column: auto / span 2;\r
  padding: 0 2px;\r
}\r
\r
:host(:not(:state(checked))) .indicator,\r
:host(:not(:state(checked))) ::slotted([slot='indicator']),\r
:host(:not(:state(submenu))) .submenu-glyph,\r
:host(:not(:state(submenu))) ::slotted([slot='submenu-glyph']) {\r
  display: none;\r
}\r
\r
::slotted([slot='end']) {\r
  color: var(--colorNeutralForeground3);\r
  font: var(--fontWeightRegular) var(--fontSizeBase200) / var(--lineHeightBase200) var(--fontFamilyBase);\r
  white-space: nowrap;\r
}\r
\r
:host([data-indent='1']) {\r
  --indent: 1;\r
}\r
\r
:host([data-indent='2']) .root {\r
  --indent: 2;\r
  grid-template-columns: 20px 20px auto auto;\r
}\r
\r
:host(:state(submenu)) .root {\r
  grid-template-columns: 20px auto auto 20px;\r
}\r
\r
:host([data-indent='2']:state(submenu)) .root {\r
  grid-template-columns: 20px 20px auto auto 20px;\r
}\r
\r
.indicator,\r
::slotted([slot='indicator']) {\r
  grid-column: 1 / span 1;\r
  width: 20px;\r
}\r
\r
::slotted([slot='start']) {\r
  display: inline-flex;\r
  grid-column: calc(var(--indent)) / span 1;\r
}\r
\r
.content {\r
  grid-column: calc(var(--indent) + 1) / span 1;\r
}\r
\r
::slotted([slot='end']) {\r
  grid-column: calc(var(--indent) + 2) / span 1;\r
  justify-self: end;\r
}\r
\r
.submenu-glyph,\r
::slotted([slot='submenu-glyph']) {\r
  grid-column: -2 / span 1;\r
  justify-self: end;\r
}\r
\r
/* Submenu popover positioning */\r
@layer popover {\r
  :host {\r
    anchor-name: --menu-trigger;\r
    position: relative;\r
  }\r
\r
  ::slotted([popover]) {\r
    margin: 0;\r
    max-height: var(--menu-max-height, auto);\r
    position: absolute;\r
    position-anchor: --menu-trigger;\r
    position-area: inline-end span-block-end;\r
    position-try-fallbacks: flip-inline, block-start, block-end;\r
    z-index: 1;\r
  }\r
\r
  ::slotted([popover]:not(:popover-open)) {\r
    display: none;\r
  }\r
\r
  ::slotted([popover]:popover-open) {\r
    inset: unset;\r
  }\r
\r
  @supports not (anchor-name: --menu-trigger) {\r
    ::slotted([popover]) {\r
      align-self: start;\r
    }\r
  }\r
}\r
\r
@media (forced-colors: active) {\r
  :host(:state(disabled)),\r
  :host(:state(disabled)) ::slotted([slot='start']),\r
  :host(:state(disabled)) ::slotted([slot='end']) {\r
    color: GrayText;\r
  }\r
}\r
`,q=class extends e{static styles=K;static template=`
    <div class="root">
      <slot name="indicator">
        <svg class="indicator" fill="currentColor" aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.05 3.49c.28.3.27.77-.04 1.06l-7.93 7.47A.85.85 0 014.9 12L2.22 9.28a.75.75 0 111.06-1.06l2.24 2.27 7.47-7.04a.75.75 0 011.06.04z" fill="currentColor"/>
        </svg>
      </slot>
      <slot name="start"></slot>
      <div class="content" part="content">
        <slot></slot>
      </div>
      <slot name="end"></slot>
      <slot name="submenu-glyph">
        <svg class="submenu-glyph" fill="currentColor" aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.74 3.2a.75.75 0 00-.04 1.06L9.23 8 5.7 11.74a.75.75 0 101.1 1.02l4-4.25a.75.75 0 000-1.02l-4-4.25a.75.75 0 00-1.06-.04z" fill="currentColor"/>
        </svg>
      </slot>
      <slot name="submenu"></slot>
    </div>
  `;static formAssociated=!0;static get observedAttributes(){return[`checked`,`disabled`,`role`]}constructor(){super(),this._internals=this.attachInternals(),this._internals.role=`menuitem`}connectedCallback(){super.connectedCallback(),this.setAttribute(`tabindex`,`0`),this.addEventListener(`keydown`,this._handleKeyDown),this.addEventListener(`click`,this._handleClick),this.addEventListener(`mouseover`,this._handleMouseOver),this.addEventListener(`mouseout`,this._handleMouseOut),this.addEventListener(`toggle`,this._handleToggle),this._internals.role=this.getAttribute(`role`)||`menuitem`;let e=this._internals.role;(e===`menuitemcheckbox`||e===`menuitemradio`)&&(this._internals.ariaChecked=String(!!this.hasAttribute(`checked`)))}attributeChangedCallback(e,t,n){if(super.attributeChangedCallback(e,t,n),e===`disabled`){let e=n!==null;this._internals.ariaDisabled=e?`true`:null,this._toggleState(`disabled`,e)}if(e===`checked`){let e=n!==null,t=this._internals.role===`menuitemcheckbox`||this._internals.role===`menuitemradio`;this._internals.ariaChecked=t?String(e):null,this._toggleState(`checked`,t?e:!1)}e===`role`&&n&&(this._internals.role=n)}_toggleState(e,t){try{t?this._internals.states.add(e):this._internals.states.delete(e)}catch{}}_handleKeyDown=e=>{if(!e.defaultPrevented){switch(e.key){case`Enter`:case` `:this._invoke();break;case`ArrowRight`:if(!this.hasAttribute(`disabled`)){let e=this.querySelector(`[slot="submenu"]`);if(e){try{e.togglePopover(!0)}catch{}e.focus()}}break;case`ArrowLeft`:if(this.parentElement&&this.parentElement.hasAttribute(`popover`)){try{this.parentElement.togglePopover(!1)}catch{}this.parentElement.parentElement&&this.parentElement.parentElement.focus()}break;default:return}e.preventDefault()}};_handleClick=e=>{e.defaultPrevented||this.hasAttribute(`disabled`)||this._invoke()};_handleMouseOver=e=>{if(this.hasAttribute(`disabled`))return;let t=this.querySelector(`[slot="submenu"]`);if(t)try{t.togglePopover(!0)}catch{}};_handleMouseOut=e=>{let t=this.querySelector(`[slot="submenu"]`);if(t&&!this.contains(document.activeElement))try{t.togglePopover(!1)}catch{}};_handleToggle=e=>{if(!(e instanceof ToggleEvent))return;let t=this.querySelector(`[slot="submenu"]`);t&&(e.newState===`open`?this._internals.ariaExpanded=`true`:e.newState===`closed`&&(this._internals.ariaExpanded=`false`),t.setAttribute(`focusgroup`,e.newState===`open`?`menu`:`none`))};_invoke(){if(this.hasAttribute(`disabled`))return;let e=this._internals.role;if(e===`menuitemcheckbox`){let e=this.hasAttribute(`checked`);e?this.removeAttribute(`checked`):this.setAttribute(`checked`,``),this.dispatchEvent(new CustomEvent(`change`,{bubbles:!0,detail:!e}))}else if(e===`menuitemradio`)this.hasAttribute(`checked`)||(this.setAttribute(`checked`,``),this.dispatchEvent(new CustomEvent(`change`,{bubbles:!0,detail:!0})));else if(e===`menuitem`){let e=this.querySelector(`[slot="submenu"]`);if(e){try{e.togglePopover(!0)}catch{}e.focus()}else this.dispatchEvent(new CustomEvent(`change`,{bubbles:!0}))}}};customElements.define(`fluent-menu-item`,q);var J=`:host { display: flex; }\r
\r
.root {\r
  display: block;\r
  outline: none;\r
  font-size: var(--fontSizeBase300);\r
  line-height: var(--lineHeightBase300);\r
}\r
\r
.root:focus-visible {\r
  outline: var(--strokeWidthThick) solid var(--colorStrokeFocus2);\r
  outline-offset: 2px;\r
  border-radius: var(--borderRadiusMedium);\r
}\r
`,Y=class extends e{static styles=J;static template=`<div class="root"><slot></slot></div>`;static get observedAttributes(){return[`appearance`,`size`]}constructor(){super(),this._currentSelected=null}connectedCallback(){super.connectedCallback(),this.setAttribute(`role`,`tree`),this.setAttribute(`tabindex`,`0`),this.addEventListener(`click`,this._clickHandler),this.addEventListener(`keydown`,this._keydownHandler),this.addEventListener(`change`,this._changeHandler),this._propagateAppearanceAndSize()}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`click`,this._clickHandler),this.removeEventListener(`keydown`,this._keydownHandler),this.removeEventListener(`change`,this._changeHandler)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),(e===`appearance`||e===`size`)&&this._propagateAppearanceAndSize()}_propagateAppearanceAndSize(){let e=this.getAttribute(`appearance`),t=this.getAttribute(`size`);this.querySelectorAll(`fluent-tree-item`).forEach(n=>{e&&!n.hasAttribute(`appearance`)&&n.setAttribute(`appearance`,e),t&&!n.hasAttribute(`size`)&&n.setAttribute(`size`,t)})}_getVisibleItems(){let e=[],t=n=>{for(let r of n.children)r.tagName.toLowerCase()===`fluent-tree-item`&&(r.isHidden||(e.push(r),r.hasAttribute(`expanded`)&&t(r)))};return t(this),e}_clickHandler=e=>{let t=e.target.closest(`fluent-tree-item`);t&&!t.disabled&&(t.toggleExpansion(),this._selectItem(t))};_changeHandler=e=>{let t=e.target;t&&t.tagName.toLowerCase()===`fluent-tree-item`&&(t.selected?(this._currentSelected&&this._currentSelected!==t&&(this._currentSelected.selected=!1),this._currentSelected=t):!t.selected&&this._currentSelected===t&&(this._currentSelected=null))};_selectItem(e){e.disabled||(this._currentSelected&&this._currentSelected!==e&&(this._currentSelected.selected=!1),e.selected=!0,this._currentSelected=e)}_keydownHandler=e=>{if(e.defaultPrevented)return;let t=this._getVisibleItems(),n=this._root.activeElement||document.activeElement,r=t.indexOf(n);switch(r===-1&&(r=t.indexOf(this._currentSelected)),e.key){case`ArrowUp`:e.preventDefault(),r>0&&t[r-1].focus();break;case`ArrowDown`:e.preventDefault(),r>=0&&r<t.length-1&&t[r+1].focus();break;case`ArrowLeft`:{e.preventDefault();let n=t[r]||this._currentSelected;if(n){if(n.childTreeItems&&n.childTreeItems.length&&n.hasAttribute(`expanded`))n.expanded=!1;else{let e=n.parentElement&&n.parentElement.closest(`fluent-tree-item`);e&&e.focus()}}break}case`ArrowRight`:{e.preventDefault();let n=t[r]||this._currentSelected;n&&n.childTreeItems&&n.childTreeItems.length&&(n.hasAttribute(`expanded`)?n.childTreeItems.length>0&&n.childTreeItems[0].focus():n.expanded=!0);break}case`Enter`:case` `:e.preventDefault(),r>=0&&r<t.length&&(t[r].toggleExpansion(),this._selectItem(t[r]));break;case`Home`:e.preventDefault(),t.length>0&&t[0].focus();break;case`End`:e.preventDefault(),t.length>0&&t[t.length-1].focus()}}};customElements.define(`fluent-tree`,Y);var X=`:host { display: block; }\r
\r
.root {\r
  outline: none;\r
  font-size: var(--fontSizeBase300);\r
  line-height: var(--lineHeightBase300);\r
  display: block;\r
}\r
\r
.root:focus-visible .positioning-region {\r
  box-shadow: inset 0 0 0 var(--spacingVerticalXXS) var(--colorStrokeFocus2);\r
}\r
\r
.positioning-region {\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  cursor: pointer;\r
  height: var(--spacingVerticalXXXL);\r
  padding-inline-start: calc(var(--indent, 0) * var(--spacingHorizontalXXL));\r
  padding-inline-end: var(--spacingVerticalS);\r
  border-radius: var(--borderRadiusMedium);\r
  background-color: var(--colorSubtleBackground);\r
  color: var(--colorNeutralForeground2);\r
  gap: var(--spacingHorizontalXS);\r
  transition: background var(--durationFaster) var(--curveEasyEaseMax),\r
              color var(--durationFaster) var(--curveEasyEaseMax);\r
}\r
\r
.positioning-region:hover {\r
  background-color: var(--colorSubtleBackgroundHover);\r
  color: var(--colorNeutralForeground2Hover);\r
}\r
\r
.positioning-region:active {\r
  background-color: var(--colorSubtleBackgroundPressed);\r
  color: var(--colorNeutralForeground2Pressed);\r
}\r
\r
.content {\r
  display: flex;\r
  align-items: center;\r
  gap: var(--spacingHorizontalXS);\r
  min-width: 0;\r
}\r
\r
.chevron {\r
  display: flex;\r
  align-items: center;\r
  flex-shrink: 0;\r
  justify-content: center;\r
  width: var(--spacingHorizontalXXL);\r
  height: var(--spacingVerticalXXL);\r
  transition: transform var(--durationFaster) var(--curveEasyEaseMax);\r
  transform: rotate(0deg);\r
}\r
\r
.chevron svg {\r
  inline-size: 12px;\r
  block-size: 12px;\r
}\r
\r
.aside {\r
  display: flex;\r
  align-items: center;\r
}\r
\r
.items {\r
  display: none;\r
}\r
\r
:host([expanded]) .chevron {\r
  transform: rotate(90deg);\r
}\r
\r
:host([expanded]) .items {\r
  display: block;\r
}\r
\r
:host([empty]) .chevron,\r
:host([empty]) .items {\r
  visibility: hidden;\r
}\r
\r
:host([selected]) .positioning-region {\r
  background-color: var(--colorSubtleBackgroundSelected);\r
  color: var(--colorNeutralForeground2Selected);\r
}\r
\r
:host([disabled]) .root {\r
  pointer-events: none;\r
  opacity: 0.5;\r
}\r
\r
:host([size='small']) .positioning-region {\r
  height: var(--spacingVerticalXXL);\r
  padding-inline-start: calc(var(--indent, 0) * var(--spacingHorizontalM));\r
}\r
\r
:host([appearance='transparent']) .positioning-region {\r
  background-color: var(--colorTransparentBackground);\r
}\r
\r
:host([appearance='transparent']) .positioning-region:hover {\r
  background-color: var(--colorTransparentBackgroundHover);\r
}\r
\r
:host([appearance='transparent']) .positioning-region:active {\r
  background-color: var(--colorTransparentBackgroundPressed);\r
}\r
\r
:host([appearance='transparent'][selected]) .positioning-region {\r
  background-color: var(--colorTransparentBackgroundSelected);\r
  color: var(--colorNeutralForeground2Selected);\r
}\r
\r
:host([appearance='subtle-alpha']) .positioning-region {\r
  background-color: var(--colorSubtleBackground);\r
}\r
\r
:host([appearance='subtle-alpha']) .positioning-region:hover {\r
  background-color: var(--colorSubtleBackgroundHover);\r
}\r
\r
:host([appearance='subtle-alpha']) .positioning-region:active {\r
  background-color: var(--colorSubtleBackgroundPressed);\r
}\r
\r
:host([appearance='subtle-alpha'][selected]) .positioning-region {\r
  background-color: var(--colorSubtleBackgroundSelected);\r
  color: var(--colorNeutralForeground2Selected);\r
}\r
\r
@media (prefers-contrast: more) {\r
  .root:focus-visible .positioning-region {\r
    outline: 1px solid var(--colorStrokeFocus2);\r
  }\r
}\r
\r
@media (forced-colors: active) {\r
  :host([disabled]) .root {\r
    color: GrayText;\r
    opacity: 1;\r
  }\r
}\r
`,Z=class extends e{static styles=X;static template=`
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
  `;static get observedAttributes(){return[`expanded`,`selected`,`disabled`,`data-indent`,`appearance`,`size`,`empty`]}constructor(){super(),this._internals=this.attachInternals(),this._internals.role=`treeitem`,this.childTreeItems=[]}connectedCallback(){super.connectedCallback(),this.parentElement&&this.parentElement.tagName.toLowerCase()===`fluent-tree-item`&&this.setAttribute(`slot`,`item`),this.setAttribute(`tabindex`,`-1`);let e=this._root.querySelector(`slot[name="item"]`);e&&e.addEventListener(`slotchange`,()=>this._handleItemSlotChange()),this._handleItemSlotChange(),this._updateEmpty()}attributeChangedCallback(e,t,n){switch(super.attributeChangedCallback(e,t,n),e){case`expanded`:this._internals.ariaExpanded=this.childTreeItems.length>0?String(n!==null):null,this._toggleState(`expanded`,n!==null);break;case`selected`:this._internals.ariaSelected=String(n!==null),this._toggleState(`selected`,n!==null),t!==n&&this.dispatchEvent(new CustomEvent(`change`,{bubbles:!0}));break;case`disabled`:this._internals.ariaDisabled=n===null?null:`true`,this._toggleState(`disabled`,n!==null);break;case`data-indent`:this.style.setProperty(`--indent`,n||`0`);break;case`empty`:this._toggleState(`empty`,n!==null)}}_toggleState(e,t){try{t?this._internals.states.add(e):this._internals.states.delete(e)}catch{}}get selected(){return this.hasAttribute(`selected`)}set selected(e){e?this.setAttribute(`selected`,``):this.removeAttribute(`selected`)}get expanded(){return this.hasAttribute(`expanded`)}set expanded(e){e?this.setAttribute(`expanded`,``):this.removeAttribute(`expanded`)}get disabled(){return this.hasAttribute(`disabled`)}toggleExpansion(){this.childTreeItems.length>0&&(this.expanded=!this.expanded)}get isHidden(){let e=this.parentElement;for(;e&&e.tagName.toLowerCase()===`fluent-tree-item`;){if(!e.hasAttribute(`expanded`))return!0;e=e.parentElement&&e.parentElement.closest?e.parentElement.closest(`fluent-tree-item`):null}return!1}get isNestedItem(){let e=this.parentElement;return e&&e.tagName.toLowerCase()===`fluent-tree-item`}_handleItemSlotChange(){let e=this._root.querySelector(`slot[name="item"]`);e&&(this.childTreeItems=e.assignedElements().filter(e=>e.tagName.toLowerCase()===`fluent-tree-item`),this._updateEmpty(),this._updateChildIndent())}_updateEmpty(){this.childTreeItems.length===0?this.setAttribute(`empty`,``):this.removeAttribute(`empty`)}_updateChildIndent(){let e=parseInt(this.getAttribute(`data-indent`)||`0`,10);this.childTreeItems.forEach(t=>{t.setAttribute(`data-indent`,String(e+1))})}};customElements.define(`fluent-tree-item`,Z);var Q=`:host { display: flex; }\r
\r
.root {\r
  display: block;\r
}\r
\r
.breadcrumb {\r
  display: flex;\r
  flex-wrap: wrap;\r
  align-items: center;\r
  list-style: none;\r
  margin: 0;\r
  padding: 0;\r
  gap: var(--spacingHorizontalXS);\r
  font-size: var(--fontSizeBase300);\r
  line-height: var(--lineHeightBase300);\r
}\r
\r
:host([size='large']) .breadcrumb {\r
  font-size: var(--fontSizeBase400);\r
  line-height: var(--lineHeightBase400);\r
}\r
\r
:host([size='small']) .breadcrumb {\r
  font-size: var(--fontSizeBase200);\r
  line-height: var(--lineHeightBase200);\r
}\r
`,$=class extends e{static styles=Q;static template=`
    <div class="root">
      <ol class="breadcrumb" part="breadcrumb">
        <slot></slot>
      </ol>
    </div>
  `;static get observedAttributes(){return[`size`,`appearance`]}constructor(){super(),this._internals=this.attachInternals()}connectedCallback(){super.connectedCallback(),this._internals.role=`navigation`,this.hasAttribute(`aria-label`)||(this._internals.ariaLabel=`Breadcrumb`)}};customElements.define(`fluent-breadcrumb`,$);var te=`:host { display: flex; }\r
\r
.root {\r
    display: flex;\r
    align-items: center;\r
    gap: var(--spacingHorizontalXS);\r
}\r
\r
.item {\r
    display: flex;\r
    align-items: center;\r
    gap: var(--spacingHorizontalXS);\r
    list-style: none;\r
}\r
\r
.link {\r
    color: var(--colorNeutralForeground2);\r
    text-decoration: none;\r
    border-radius: var(--borderRadiusMedium);\r
    padding: var(--spacingVerticalXXS) var(--spacingHorizontalXS);\r
    transition:\r
        color var(--durationFaster) var(--curveEasyEaseMax),\r
        background var(--durationFaster) var(--curveEasyEaseMax);\r
}\r
\r
.link:hover {\r
    color: var(--colorNeutralForeground2Hover);\r
    background: var(--colorSubtleBackgroundHover);\r
}\r
\r
.link:active {\r
    color: var(--colorNeutralForeground2Pressed);\r
    background: var(--colorSubtleBackgroundPressed);\r
}\r
\r
:host([current]) .link {\r
    color: var(--colorNeutralForeground1);\r
    font-weight: var(--fontWeightSemibold);\r
    pointer-events: none;\r
}\r
\r
:host([appearance="subtle"]) .link:hover {\r
    background: var(--colorSubtleBackgroundHover);\r
}\r
\r
.separator {\r
    display: flex;\r
    align-items: center;\r
    color: var(--colorNeutralForeground3);\r
    flex-shrink: 0;\r
}\r
\r
.separator-icon {\r
    inline-size: 12px;\r
    block-size: 12px;\r
}\r
\r
:host(:first-child) .separator,\r
:host([data-position="first"]) .separator {\r
    display: none;\r
}\r
\r
@media (forced-colors: active) {\r
    .link:hover {\r
        background: Highlight;\r
        color: HighlightText;\r
    }\r
}\r
`,ne=class extends e{static styles=te;static template=`
    <div class="root">
      <li class="item" part="item">
        <slot name="separator">
          <span class="separator" part="separator" aria-hidden="true">
            <svg class="separator-icon" fill="currentColor" viewBox="0 0 12 12">
              <path d="M4.65 2.15a.5.5 0 000 .7L7.79 6 4.65 9.15a.5.5 0 10.7.7l3.5-3.5a.5.5 0 000-.7l-3.5-3.5a.5.5 0 00-.7 0z"/>
            </svg>
          </span>
        </slot>
        <a class="link" part="link">
          <slot></slot>
        </a>
      </li>
    </div>
  `;static get observedAttributes(){return[`href`,`current`]}connectedCallback(){super.connectedCallback(),this._linkEl=this._root.querySelector(`.link`),this._syncLink(),this._updatePosition()}disconnectedCallback(){super.disconnectedCallback(),this.removeAttribute(`data-position`)}_updatePosition(){let e=this.parentElement;if(!e)return;let t=Array.from(e.children).filter(e=>e.tagName===this.tagName),n=t.indexOf(this);n===0?this.setAttribute(`data-position`,`first`):n===t.length-1?this.setAttribute(`data-position`,`last`):this.setAttribute(`data-position`,`middle`)}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),(e===`href`||e===`current`)&&this._syncLink()}_syncLink(){if(!this._linkEl)return;let e=this.getAttribute(`href`),t=this.hasAttribute(`current`);e&&!t?(this._linkEl.href=e,this._linkEl.removeAttribute(`aria-current`),this._linkEl.removeAttribute(`role`)):(this._linkEl.removeAttribute(`href`),t?this._linkEl.setAttribute(`aria-current`,`page`):this._linkEl.removeAttribute(`aria-current`))}};customElements.define(`fluent-breadcrumb-item`,ne);var re=class extends HTMLElement{connectedCallback(){this.innerHTML=`
      <style>
        :host { display: flex; gap: 12px; align-items: center; font-family: var(--fontFamilyBase, sans-serif); font-size: 13px; padding: 8px 0; }
        label { display: flex; align-items: center; gap: 6px; }
        input[type="color"] { width: 32px; height: 32px; border: 1px solid var(--colorNeutralStroke1, #ccc); border-radius: var(--borderRadiusMedium, 4px); cursor: pointer; padding: 2px; }
        select { padding: 4px 8px; border: 1px solid var(--colorNeutralStroke1, #ccc); border-radius: var(--borderRadiusMedium, 4px); font-size: 13px; background: var(--colorNeutralBackground1, #fff); color: var(--colorNeutralForeground1, #000); }
      </style>
      <label>
        <input type="color" value="#0f6cbd" id="accent-picker" title="Accent color">
        Accent
      </label>
      <label>
        <select id="theme-select" title="Theme">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system" selected>System</option>
        </select>
        Theme
      </label>
    `,this.querySelector(`#accent-picker`).addEventListener(`input`,e=>{document.documentElement.style.setProperty(`--accent-base-override`,e.target.value)});let e=this.querySelector(`#theme-select`),t=e=>{let t=document.documentElement;e===`system`?t.style.colorScheme=`light dark`:t.style.colorScheme=e};e.addEventListener(`change`,e=>{t(e.target.value)}),window.matchMedia&&window.matchMedia(`(prefers-color-scheme: dark)`).addEventListener(`change`,()=>{e.value===`system`&&t(`system`)}),t(e.value)}};customElements.define(`fluent-theme-picker`,re);