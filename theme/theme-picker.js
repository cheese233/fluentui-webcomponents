// theme/theme-picker.js — standalone vanilla custom element
// No dependencies, no FluentElement base class needed

class FluentThemePicker extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
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
    `;
    this.querySelector('#accent-picker').addEventListener('input', e => {
      document.documentElement.style.setProperty('--accent-base', e.target.value);
    });
    const themeSelect = this.querySelector('#theme-select');
    
    const applyTheme = (theme) => {
      document.body.classList.remove('light', 'dark');
      if (theme === 'system') {
        const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.body.classList.add(isDark ? 'dark' : 'light');
      } else {
        document.body.classList.add(theme);
      }
    };

    themeSelect.addEventListener('change', e => {
      applyTheme(e.target.value);
    });

    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (themeSelect.value === 'system') {
          applyTheme('system');
        }
      });
    }

    // Initialize with the current selection if it's 'system'
    if (themeSelect.value === 'system') {
      applyTheme('system');
    }
  }
}

customElements.define('fluent-theme-picker', FluentThemePicker);
