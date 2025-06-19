module.exports = [
  {
    ignores: ["node_modules/**", "html/**"],
    languageOptions: {
      ecmaVersion: 6,
      sourceType: "module"
    },
    rules: {
      semi: ["error", "always"],
      quotes: [2, "double"],
      "comma-style": ["error", "last"]
    }
  }
];
