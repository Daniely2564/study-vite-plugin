import { Plugin } from "vite";

export const outputGenerationHook = (): Plugin => {
  return {
    name: "output-generation-hook",

    renderDynamicImport(options) {
      console.log("** Render Dynamic Import **");
      console.log({ options });
    },
    renderChunk(code, chunk, options) {
      console.log("** Render Chunk **");
      console.log({ code, chunk, options });
      return null;
    },
    banner(chunk) {
      console.log("** Banner **");
      console.log({ chunk });
      return "/* This is a banner */";
    },
    footer(chunk) {
      console.log("** Footer **");
      console.log({ chunk });
      return "/* This is a footer */";
    },
    intro(chunk) {
      console.log("** Intro **");
      console.log({ chunk });
      return "/* This is an intro */";
    },
    outro(chunk) {
      console.log("** Outro **");
      console.log({ chunk });
      return "/* This is an outro */";
    },

    // Invoked after the build phase but before files are written to disk.
    // Use this to modify chunk metadata, optimize assets, or emit additional files.
    // prev: [buildEnd]
    // next: [writeBundle]
    generateBundle(outputOptions, bundle, isWrite) {
      console.log("** Generate Bundle **");
      console.log({ outputOptions, bundle, isWrite });

      // Example: Modify bundle file names
      for (const fileName in bundle) {
        const chunk = bundle[fileName];
        if (chunk.type === "chunk") {
          console.log(`Modifying chunk: ${chunk.fileName}`);
          chunk.fileName = `modified-${chunk.fileName}`;
        }
      }
    },

    // Called when writing files to disk, right after `generateBundle`.
    // Can be used for post-processing, logging, or additional asset handling.
    // prev: [generateBundle]
    writeBundle(outputOptions, bundle) {
      console.log("** Write Bundle **");
      console.log({ outputOptions, bundle });

      // Example: Log written files
      for (const fileName in bundle) {
        console.log(`Written: ${fileName}`);
      }
    },

    // Executes after `writeBundle`, but specifically in the "watch mode".
    // Can be used for cleanup, post-processing, or server notifications.
    // prev: [writeBundle]
    renderStart(outputOptions, inputOptions) {
      console.log("** Render Start **");
      console.log({ outputOptions, inputOptions });
    },

    // Executed when writing is complete, typically used for reporting or cleanup.
    // prev: [writeBundle]
    closeBundle() {
      console.log("** Close Bundle **");
      console.log("Build output generation complete!");
    },
  };
};
