import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";
// import { buildHookPlugin } from "../plugins/buildHookPlugin";
// import { outputGenerationHook } from "../plugins/outputGenerationPlugin";
import { withBrowserPlugin } from "../plugins/withBrowserPlugin";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    {
      name: "@storybook/addon-essentials",
      options: {
        docs: false,
      },
    },
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal(config) {
    return mergeConfig(config, {
      // plugins: [buildHookPlugin(), outputGenerationHook(), withBrowserPlugin()],
      plugins: [withBrowserPlugin()],
    });
  },
};
export default config;
