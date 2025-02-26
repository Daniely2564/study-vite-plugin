import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import { buildHookPlugin } from "./plugins/buildHookPlugin";
// import { outputGenerationHook } from "./plugins/outputGenerationPlugin";

// type LoadResult = string | null | SourceDescription;

// interface SourceDescription {
//   code: string;
//   map?: string | SourceMap;
//   ast?: ESTree.Program;
//   attributes?: { [key: string]: string } | null;
//   meta?: { [plugin: string]: any } | null;
//   moduleSideEffects?: boolean | "no-treeshake" | null;
//   syntheticNamedExports?: boolean | string | null;
// }

// https://vite.dev/config/
export default defineConfig({
  // plugins: [buildHookPlugin(), outputGenerationHook(), react()],
  plugins: [react()],
});
