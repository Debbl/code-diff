import { config } from "@debbl/eslint-config";
import pluginNext from "@next/eslint-plugin-next";

export default config({
  react: true,
  typescript: true,

  customConfig: [
    {
      plugins: {
        "@next/next": pluginNext,
      },
      rules: {
        ...pluginNext.configs.recommended.rules,
        ...pluginNext.configs["core-web-vitals"].rules,
      },
    },
  ],
});
