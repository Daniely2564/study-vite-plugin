import { Connect, Plugin } from "vite";
import Browser from "../tools/brower";

export const withBrowserPlugin = (): Plugin => {
  return {
    name: "with-browser-plugin",
    apply: "serve",
    async buildStart() {
      console.log(`Started browser...`);
      await Browser._init();
    },
    configureServer(server) {
      server.middlewares.use(
        async (
          req: Connect.IncomingMessage & { url: string; body: string },
          res,
          next
        ) => {
          if (req.url.startsWith("/visual-regression")) {
            const params = new URLSearchParams(
              req.url.substring(req.url.indexOf("?"))
            );
            const [id, viewMode] = [params.get("id"), params.get("viewMode")];
            console.log(`Visual regression for ${id} in ${viewMode} mode`);
            await Browser.navigateTo(
              `http://localhost:6006/iframe.html?id=${id}&viewMode=${viewMode}&fromServer=true`,
              id!
            );
          }
          next();
        }
      );
    },
  };
};
