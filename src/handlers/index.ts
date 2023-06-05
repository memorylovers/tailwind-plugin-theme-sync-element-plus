import { ColorConf, SimpleConf } from "../types";
import { convertElVars } from "./common";

// ********************************************************
// * Colors
// ********************************************************
// for --el-color-primary etc
export function getVariantColors(colors: ColorConf) {
  const variants = ["primary", "success", "warning", "danger", "info"];
  const modifiers = Object.keys({
    DEFAULT: "500",
    "light-3": "400",
    "light-5": "300",
    "light-7": "200",
    "light-9": "100",
    "dark-2": "600",
  });

  const varNameFunc = (v: string, m: string) => (m == "DEFAULT" ? `--el-color-${v}` : `--el-color-${v}-${m}`);
  return convertElVars(colors, varNameFunc, variants, modifiers);
}

// for --el-text-color
export function getTextColors(colors: ColorConf) {
  const variants = ["text"];
  const modifiers = Object.keys({
    DEFAULT: "600",
    primary: "700",
    regular: "600",
    secondary: "500",
    placeholder: "400",
    disabled: "300",
  });
  const varNameFunc = (v: string, m: string) => (m == "DEFAULT" ? `--el-${v}-color` : `--el-${v}-color-${m}`);
  return convertElVars(colors, varNameFunc, variants, modifiers);
}

// for --el-bg-color
export function getBgColors(colors: ColorConf) {
  const variants = ["bg"];
  const modifiers = Object.keys({
    DEFAULT: "600",
  });
  const varNameFunc = (v: string, m: string) => (m == "DEFAULT" ? `--el-${v}-color` : `--el-${v}-color-${m}`);
  return convertElVars(colors, varNameFunc, variants, modifiers);
}

// for --el-overlay-color
export function getOverlayColors(colors: ColorConf) {
  const variants = ["overlay"];
  const modifiers = Object.keys({
    DEFAULT: "",
    light: "",
    lighter: "",
  });
  const varNameFunc = (v: string, m: string) => (m == "DEFAULT" ? `--el-${v}-color` : `--el-${v}-color-${m}`);
  return convertElVars(colors, varNameFunc, variants, modifiers);
}

// for --el-mask-color
export function getMaskColors(colors: ColorConf) {
  const variants = ["mask"];
  const modifiers = Object.keys({
    DEFAULT: "",
    "extra-light": "",
  });
  const varNameFunc = (v: string, m: string) => (m == "DEFAULT" ? `--el-${v}-color` : `--el-${v}-color-${m}`);
  return convertElVars(colors, varNameFunc, variants, modifiers);
}

// ********************************************************
// * FontSize
// ********************************************************
// for --el-font-size
export function getFontSizes(conf: SimpleConf) {
  const modifiers = Object.keys({
    "extra-large": "2xl",
    large: "xl",
    medium: "lg",
    base: "base",
    small: "sm",
    "extra-small": "xs",
  });
  const elVars: Record<string, string> = {};

  for (const modifier of modifiers) {
    const varName = `--el-font-size-${modifier}`;
    const confVal = conf[modifier];

    if (!confVal) continue; // no value
    elVars[varName] = `${confVal[0]} !important`;
  }
  return elVars;
}

// ********************************************************
// * Z-index
// ********************************************************
// for --el-index
export function getZIndexes(conf: SimpleConf) {
  const modifiers = Object.keys({
    DEFAULT: 1,
    top: 1000,
    popper: 2000,
  });
  const elVars: Record<string, string> = {};

  for (const modifier of modifiers) {
    const varName = modifier == "DEFAULT" ? `--el-index` : `--el-index-${modifier}`;
    const confVal = conf[modifier];

    if (!confVal) continue; // no value
    if (confVal === `var(${varName})`) continue; // same val
    elVars[varName] = `${confVal} !important`;
  }
  return elVars;
}

// ********************************************************
// * Border Color
// ********************************************************
// for --el-border-color
export function getBorderColors(conf: SimpleConf) {
  const modifiers = Object.keys({
    DEFAULT: "#dcdfe6",
    light: "#e4e7ed",
    lighter: "#ebeef5",
    "extra-light": "#f2f6fc",
    dark: "#d4d7de",
    darker: "#cdd0d6",
  });
  const elVars: Record<string, string> = {};

  for (const modifier of modifiers) {
    const varName = modifier == "DEFAULT" ? `--el-border-color` : `--el-border-color-${modifier}`;
    const confVal = conf[modifier];

    if (!confVal) continue; // no value
    if (confVal === `var(${varName})`) continue; // same val
    elVars[varName] = `${confVal} !important`;
  }
  return elVars;
}

// ********************************************************
// * Box Shadow
// ********************************************************
// for --el-box-shadow
export function getBoxShadows(conf: SimpleConf) {
  const modifiers = Object.keys({
    DEFAULT: "var(--el-box-shadow)",
    light: "var(--el-box-shadow-light)",
    lighter: "var(--el-box-shadow-lighter)",
    dark: "var(--el-box-shadow-dark)",
  });
  const elVars: Record<string, string> = {};

  for (const modifier of modifiers) {
    const varName = modifier == "DEFAULT" ? `--el-box-shadow` : `--el-box-shadow-${modifier}`;
    const confVal = conf[modifier];

    if (!confVal) continue; // no value
    if (confVal == `var(${varName})`) continue; // same val
    elVars[varName] = `${confVal} !important`;
  }
  return elVars;
}
