module.exports = {
  plugins: [require("prettier-plugin-md-nocjsp")],
  overrides: [
    {
      files: ["*.md", "README"],
      options: {
        parser: "markdown-nocjsp",
      },
    },
  ],
};
