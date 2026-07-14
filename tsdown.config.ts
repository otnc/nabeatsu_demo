import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/nabeatsu.ts"],
  format: ["esm", "cjs"],
  platform: "node",
  dts: true,
  sourcemap: true,
  clean: true,
  publint: true,
});
