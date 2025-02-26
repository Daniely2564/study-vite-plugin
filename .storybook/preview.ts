import type { Preview } from "@storybook/react";
import { useEffect } from "@storybook/preview-api";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story, ctx) => {
      useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");
        const viewMode = params.get("viewMode");
        const fromServer = params.get("fromServer");
        const pathname = window.location.pathname;

        console.log({
          id,
          viewMode,
          fromServer,
          pathname,
          search: window.location.search,
        });

        if (id && viewMode && !fromServer) {
          fetch(
            `${window.location.origin}/visual-regression?id=${id}&viewMode=${viewMode}`
          );
        }
      }, [ctx.id]);
      return Story();
    },
  ],
};

export default preview;
