module.exports = {
  root: true,
  env: { browser: true, node: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "@rocketseat/eslint-config/node",
    "plugin:vitest-globals/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "@typescript-eslint/no-explicit-any": "off",
    "react-hooks/rules-of-hooks": "off",
    "react-hooks/exhaustive-deps": "warn",
  },
};
