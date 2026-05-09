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
          <option value="system">System</option>
        </select>
        Theme
      </label>
    `;
    this.querySelector('#accent-picker').addEventListener('input', e => {
      document.documentElement.style.setProperty('--accent-base', e.target.value);
    });
    this.querySelector('#theme-select').addEventListener('change', e => {
      document.body.classList.remove('light', 'dark');
      if (e.target.value !== 'system') {
        document.body.classList.add(e.target.value);
      }
    });
  }
}

customElements.define('fluent-theme-picker', FluentThemePicker);
