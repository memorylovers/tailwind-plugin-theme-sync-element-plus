export type ElColorMap = {
  DEFAULT: string;
  "light-3": string;
  "light-5": string;
  "light-7": string;
  "light-9": string;
  "dark-2": string;
};
export type ElColorMapKey = keyof ElColorMap;

export type TwColorMap = {
  "50": string;
  "100": string;
  "200": string;
  "300": string;
  "400": string;
  "500": string;
  "600": string;
  "700": string;
  "800": string;
  "900": string;
  "950": string;
};
export type TwColorMapKey = keyof TwColorMap;

export type ColorMapConf = {
  [key in ElColorMapKey]: TwColorMapKey;
};

export const DEFAULT_COLOR_MAP_CONF: ColorMapConf = {
  DEFAULT: "500",
  "light-3": "400",
  "light-5": "300",
  "light-7": "200",
  "light-9": "100",
  "dark-2": "600",
};

export function expandColors(color: TwColorMap, conf: Partial<ColorMapConf> = {}): ElColorMap {
  const mapConf = Object.assign({}, DEFAULT_COLOR_MAP_CONF, conf);
  return Object.entries(mapConf).reduce((acc, [key, val]) => {
    if (color[val]) acc[key as ElColorMapKey] = color[val];
    return acc;
  }, {} as ElColorMap);
}
