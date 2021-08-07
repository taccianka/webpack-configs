module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    "airbnb-typescript/base",
    'plugin:@typescript-eslint/recommended',
    'prettier',
    "plugin:prettier/recommended"
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    files: "['*.ts', '*.tsx']",
    project: "./tsconfig.json"
  },
  plugins : ["react", "react-hooks", "jsx-a11y", "import", "@typescript-eslint", "prettier"],
  settings: {
    "import/resolver": {
      "typescript": {}
    },
    "react": {
      "version": "detect"
    },
  },
  rules: {
    "prettier/prettier": "error",
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    "react/jsx-filename-extension": [ "warn", {"extensions": ['.jsx', ".tsx"]} ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "ts": "never",
        "tsx": "never"
      }
    ],
    "@typescript-eslint/explicit-function-return-type": [ "error",
      {
        "allowExpressions": true
      }
    ],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  },
  "overrides": [
    {
      "files": ["*.jsx", "*.tsx"],
      "rules": {
        "@typescript-eslint/no-use-before-define": "off"
      }
    }
  ]
};
