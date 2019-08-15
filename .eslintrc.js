module.exports = {
  "parser": "@typescript-eslint/parser",
  "extends": ["eslint-config-cws", "plugin:import/typescript"],
  "env": {
    "browser": true
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "useJSXTextNode": true,
    "project": "./tsconfig.json",
    "tsconfigRootDir": __dirname,
    "extraFileExtensions": [
      ".tsx"
    ]
  },
  "settings": {
    "import/extensions": [
      ".js",
      ".jsx",
      ".mjs",
      ".ts",
      ".tsx"
    ]
  },
  "plugins": [
    "@typescript-eslint",
    "jsx"
  ],
  "rules": {
    "jsx/mark-used-vars": 1,
    "no-unused-vars": [
      "error",
      {
        "varsIgnorePattern": "^h$"
      }
    ],
    "import/prefer-default-export": 0
  }
}
