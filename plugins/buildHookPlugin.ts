import { Plugin } from "vite";

export const buildHookPlugin = (): Plugin => {
  return {
    name: "custom-plugin",
    // ???????????????????????
    // Replaces or manipulates the options object passed to rollup.rollup.
    // Returning null does not replace anything. If you just need to read the options,
    // it is recommended to use the buildStart hook as that hook has access to the options after the transformations from all options hooks have been taken into account.
    //
    //  The only supported properties are this.meta as well as this.error, this.warn, this.info and this.debug for logging and errors.
    // type: [async, parallel]
    // first hook of the build phase
    options(options) {
      // options = object passed to rollup.rollup
      console.log("** Options **");
      console.log({ options });
      options.onwarn = (warning, warn) => {
        // throw new Error(warning);
        console.log({ warning, warn });
      };
      this.warn("Warning Options!!");
    },
    writeBundle(outputOptions, bundle) {
      console.log("** Write Bundle **");
      console.log({ outputOptions, bundle });
    },
    // cannot be used with output plugin
    // type: [async, parallel]
    // {
    //   id: 'C:/Users/danie/OneDrive/Desktop/project/vite-study/vite.config.ts',
    //   change: { event: 'update' }
    // }
    watchChange(id, change) {
      console.log("** Watch Changed **");
      console.log({ id, change });
    },
    // Notifies a plugin when the watcher process will close so that all 'open resources(?) What?' can be closed too
    // type: [async, parallel]
    // when: [build, output]
    closeWatcher() {
      console.log("** Close Watcher **");
    },
    // useful when accessing options passed to rollup.rollup();
    // as it takes the transformations by all options hooks into account and also contains the right default values for unset options.
    // next: resolveId
    buildStart(options) {
      console.log("** Build Start **");
      console.log({ options });
    },
    // prev: [buildStart, moduleParsed]
    // kind: [async, first]
    // when: [build - emitFile]
    // next: [load]
    resolveId(source) {
      console.log("** Resolve Id **");
      console.log({ source });
      if (source === "virtual-module") {
        // this signals that Rollup should not ask other plugins or check
        // the file system to find this id
        return source;
      }
      return null; // other ids should be handled as usually
    },
    // https://rollupjs.org/plugin-development/#load
    // Defines a custom loader. Returning null defers to other load functions (and eventually the default behavior of loading from the file system).
    // prev: [resolveId, resolveDynamicImport]
    // kind: [async, first]
    // next: [transform]
    load(id) {
      console.log("** Load **");
      console.log({ id });
      if (id === "virtual-module") {
        // the source code for "virtual-module"
        return 'export default "This is virtual!"';
      }
      return null; // other ids should be handled as usually
    },
    // kind: [async, first]
    // when:
    // [transform] is skipped if cached code is the identical to loaded code.
    // To prevent this, discard the cached copy and instead transform a module, plugins can implement this hook and return true.
    // This hook can also be used to find out which modules were cached and access their cached meta information.
    shouldTransformCachedModule(options) {
      console.log("** Should Transform Cached Module **");
      console.log({ options });
    },
    // prev: [load (currently handled file is loaded)] -  If caching is used and there was a cached copy of that module, shouldTransformCachedModule
    // (continued.) if a plugin returned true for that hook
    // next: [moduleParsed] - once the file has been processed and parsed
    // (code: string, id: string) => TransformResult
    // type TransformResult = string | null | Partial<SourceDescription>;

    // interface SourceDescription {
    //   code: string;
    //   map?: string | SourceMap;
    //   ast?: ESTree.Program;
    //   attributes?: { [key: string]: string } | null;
    //   meta?: { [plugin: string]: any } | null;
    //   moduleSideEffects?: boolean | 'no-treeshake' | null;
    //   syntheticNamedExports?: boolean | string | null;
    // }
    // Can be used to transform individual modules.
    transform(code, id) {
      console.log("** Transform **");
      console.log({ code: code.length, id });
    },
    // This hook is called each time a module has been fully parsed by Rollup. See this.getModuleInfo for what information is passed to this hook.
    // kind: [async, parallel]
    // prev: [transform]
    // next: [resolveId, resolveDynamicImport]
    moduleParsed(moduleInfo) {
      console.log("** Module Parsed **");
      console.log({ moduleInfo });
    },
    // Custom resolver for dynamic imports
    // return `false` signals that import should be kept as is and not be passed into other resolvers, making it external
    // options - { attributes: Record<string, string> }
    // attributes tells you which import attributes were present in the import.
    // I.e. `import("foo", {assert: {type: "json"}})` will pass along `attributes: {type: "json"}`.
    // kind: [async, first]
    // prev: [moduleParsed]
    // next: [buildEnd]
    resolveDynamicImport(specifier, importer, options) {
      console.log("** Resolve Dynamic Import **");
      console.log({ specifier, importer, options });
      return false;
    },
    // Called when Rollup has finished bundling but before `generate` and `write`
    // Even if build fails, this hook is called.
    buildEnd(err) {
      console.log("** Build End **");
      console.log({ err });
    },
  };
};
