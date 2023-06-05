import { ColorConf } from "../types";

// ********************************************************
// * Common
// ********************************************************
export const convertElVars = (
  colors: ColorConf,
  varNameFunc: (variant: string, modifier: string) => string,
  variants: string[],
  modifiers: string[]
) => {
  const elVars: Record<string, string> = {};
  for (const variant of variants) {
    if (!colors[variant]) continue;

    for (const modifier of modifiers) {
      const varName = varNameFunc(variant, modifier);

      const colorVal = colors[variant][modifier];

      // has color value
      if (!colorVal) continue;

      elVars[varName] = `${colorVal} !important`;
    }
  }
  return elVars;
};
