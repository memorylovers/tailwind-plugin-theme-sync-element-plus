export type SimpleConf = Record<string, string>;
export type ColorConf = Record<string, Record<string, string>>;

export type PluginOption = {
  important: boolean;
  debug: boolean;
};
