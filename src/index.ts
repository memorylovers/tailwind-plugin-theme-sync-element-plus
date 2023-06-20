import defaultColors from "tailwindcss/colors";
import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";
import { PluginCreator, Config as TwConfig } from "tailwindcss/types/config";
import {
  getBgColors,
  getBorderColors,
  getBoxShadows,
  getFontSizes,
  getMaskColors,
  getOverlayColors,
  getTextColors,
  getVariantColors,
  getZIndexes,
} from "./handlers";
import { ColorConf, PluginOption, SimpleConf } from "./types";

const DEFAULT_PLUGIN_OPTION: PluginOption = {
  important: false,
  debug: false,
};

type PluginCreatorWithOptions = (options: PluginOption) => PluginCreator;
type PluginConfigWithOptions = (options: PluginOption) => Partial<TwConfig>;

// ********************************************************
// * Plugin Creator
// ********************************************************

const pluginCreator: PluginCreatorWithOptions =
  (options = DEFAULT_PLUGIN_OPTION) =>
  ({ addBase, theme }) => {
    const colors = theme<ColorConf>("colors", {});
    const fontSizes = theme<SimpleConf>("fontSize", {});
    const zIndexes = theme<SimpleConf>("zIndex", {});
    const borderColors = theme<SimpleConf>("borderColor", {});
    const boxShadows = theme<SimpleConf>("boxShadow", {});

    const vars = {
      ...getVariantColors(colors, options),
      ...getTextColors(colors, options),
      ...getBgColors(colors, options),
      ...getOverlayColors(colors, options),
      ...getMaskColors(colors, options),
      ...getFontSizes(fontSizes, options),
      ...getZIndexes(zIndexes, options),
      ...getBorderColors(borderColors, options),
      ...getBoxShadows(boxShadows, options),
    };

    if (options.debug) console.log(`** vars: ${JSON.stringify(vars, null, 2)}`);
    addBase({
      ":root": vars,
      html: {
        color: "var(--el-text-color)",
        background: "var(--el-bg-color)",
        "font-size": "var(--el-font-size-base)",
      },
    });
  };

// ********************************************************
// * Plugin Config
// ********************************************************
const pluginConfig: PluginConfigWithOptions = () => {
  return {
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: defaultColors.pink["500"],
            "light-3": defaultColors.pink["400"],
            "light-5": defaultColors.pink["300"],
            "light-7": defaultColors.pink["200"],
            "light-9": defaultColors.pink["100"],
            "dark-2": defaultColors.pink["600"],
          },
          text: {
            DEFAULT: defaultColors.neutral["700"],
            primary: defaultColors.neutral["700"],
            regular: defaultColors.neutral["600"],
            secondary: defaultColors.neutral["500"],
            placeholder: defaultColors.neutral["400"],
            disabled: defaultColors.neutral["300"],
          },
          bg: {
            DEFAULT: defaultColors.white,
          },
          overlay: {
            DEFAULT: "rgba(0, 0, 0, 0.8)", // --el-overlay-color
            light: "rgba(0, 0, 0, 0.7)", // --el-overlay-color-light
            lighter: "rgba(0, 0, 0, 0.5)", // --el-overlay-color-lighter
          },
          mask: {
            DEFAULT: "rgba(0, 0, 0, 0.8)", // --el-mask-color
            "extra-light": "rgba(255, 255, 255, 0.3)", // --el-mask-color-extra-light
          },
        },
        fontSize: {
          "extra-large": defaultTheme.fontSize["2xl"], // --el-font-size-extra-large
          large: defaultTheme.fontSize.xl, // --el-font-size-large
          medium: defaultTheme.fontSize.lg, // --el-font-size-medium
          base: defaultTheme.fontSize.base, // --el-font-size-base
          small: defaultTheme.fontSize.sm, // --el-font-size-small
          "extra-small": defaultTheme.fontSize.xs, // --el-font-size-extra-small
        },
        zIndex: {
          DEFAULT: "1",
          top: "1000",
          popper: "2000",
        },
        borderColor: {
          DEFAULT: "#dcdfe6",
          light: "#e4e7ed",
          lighter: "#ebeef5",
          "extra-light": "#f2f6fc",
          dark: "#d4d7de",
          darker: "#cdd0d6",
        },
        boxShadow: {
          DEFAULT: "var(--el-box-shadow)",
          light: "var(--el-box-shadow-light)",
          lighter: "var(--el-box-shadow-lighter)",
          dark: "var(--el-box-shadow-dark)",
        },
      },
    },
  };
};
// ********************************************************
// * MAIN
// ********************************************************
const myPlugin = plugin.withOptions<PluginOption>(pluginCreator, pluginConfig);

export default myPlugin;
export * from "./utils";
