import { LitElement } from 'lit';
LitElement.registerSallaComponent = function (n) { if (!customElements.get(n)) customElements.define(n, this); };
await import('../dist/taqm-builder.js');
await import('../dist/taqm-outfit.js');
await import('../dist/taqm-pick.js');
await import('../dist/taqm-tiers.js');
await import('../dist/taqm-together.js');
window.__ready = true;
