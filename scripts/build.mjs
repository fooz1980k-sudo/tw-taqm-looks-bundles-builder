// Build every component into its own self-contained dist/<name>.js (lit stays external, provided by Salla).
import { readdirSync, rmSync } from 'node:fs';
import { execSync } from 'node:child_process';
rmSync('dist', { recursive: true, force: true });
for (const c of readdirSync('src/components')) execSync('npx vite build --logLevel warn', { stdio: 'inherit', env: { ...process.env, ONE: c } });
console.log('built', readdirSync('dist'));
