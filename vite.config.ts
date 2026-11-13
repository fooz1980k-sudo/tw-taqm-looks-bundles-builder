//@ts-nocheck
import { defineConfig } from 'vite';
import { resolve } from 'path';
import { sallaBuildPlugin, sallaDemoPlugin, sallaTransformPlugin } from '@salla.sa/twilight-bundles/vite-plugins';

// ONE=<component> builds that component as a single self-contained file (no shared chunk), so each
// dist/<component>.js works on its own when Salla serves components individually. See scripts/build.mjs.
const one = process.env.ONE;
export default defineConfig(one ? {
  plugins: [sallaTransformPlugin()],
  build: { emptyOutDir: false, lib: { entry: { [one]: resolve(__dirname, `src/components/${one}/index.ts`) }, formats: ['es'], fileName: (_f, n) => `${n}.js` },
    rollupOptions: { external: [/^lit/] } },
} : { plugins: [sallaTransformPlugin(), sallaBuildPlugin(), sallaDemoPlugin()] });
