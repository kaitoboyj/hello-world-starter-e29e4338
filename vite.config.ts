// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, componentTagger (dev-only),
//     VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { fileURLToPath } from "node:url";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  // Pin the deploy target to Netlify (overrides the default cloudflare-module preset).
  // Ignored inside a Lovable build, where LOVABLE_NITRO_PRESET wins.
  nitro: {
    preset: "netlify",
  },
  vite: {
    resolve: {
      alias: {
        // rpc-websockets only exports "browser"/"node" conditions; the hosting runtime
        // matches neither, so point it at the browser build (uses native WebSocket).
        "rpc-websockets": fileURLToPath(
          new URL("./node_modules/rpc-websockets/dist/index.browser.mjs", import.meta.url),
        ),
      },
    },
  },
});
