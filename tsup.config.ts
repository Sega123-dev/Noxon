// tsup.config.ts
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/**/*.{ts,js}"], // ⬅️ Compile all .ts files
  outDir: "dist",
  format: ["esm"], // or ['esm', 'cjs'] if you want both
  dts: true, // Generate .d.ts files
  clean: true, // Clear dist/ before build
  splitting: false, // No code splitting
  bundle: false, // ⬅️ Very important: don't bundle into one
});
