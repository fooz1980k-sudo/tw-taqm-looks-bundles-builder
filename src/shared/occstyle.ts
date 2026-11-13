import { css } from 'lit';
export const occCss = css`
  .deco { position: absolute; inset: 0 0 auto 0; width: 100%; height: auto; max-height: 100%; pointer-events: none; z-index: 0; color: var(--o1); }
  .sw { animation: sw 4s ease-in-out infinite alternate; transform-box: fill-box; transform-origin: top center; } @keyframes sw { from { transform: rotate(-4deg); } to { transform: rotate(4deg); } }
  .tw { animation: tw 2.4s ease-in-out infinite alternate; transform-box: fill-box; transform-origin: center; } @keyframes tw { to { opacity: .25; } }
  .fall { animation: fl 6s linear infinite; } @keyframes fl { from { transform: translateY(-30px); opacity: 0; } 15% { opacity: 1; } to { transform: translateY(220px); opacity: 0; } }
`;
