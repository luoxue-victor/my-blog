## .eslintrc.js

```js
module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  globals: {
    "window": true,
    "document": true
  },
  env: {
    "browser": true,
    "node": true
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    "arrow-parens": 0,
    "indent": [
      "error",
      2,
      {
        "SwitchCase": 1
      }
    ],
    "global-require": 0,
    "max-len": 0,
    "comma-dangle": 0,
    "class-methods-use-this": 0,
    "import/prefer-default-export": 0,
    "no-global-assign": 0,
    "no-unsafe-negation": 0,
    "no-console": 0,
    "eol-last": 0,
    "no-unused-vars": 0,
    "spaced-comment": 0,
    "no-param-reassign": 0,
    "no-lonely-if": 0,
    "func-names": 0,
    "new-cap": 0,
    "semi": 0,
    "import/no-unresolved": 0,
    "import/extensions": 0,
    "import/no-extraneous-dependencies": 0,
    "jsx-a11y/no-static-element-interactions": "off",
    "linebreak-style": [
      "off",
      "windows"
    ],
    "space-before-function-paren": 0,
    "no-tabs": 0,
    "eslint-disable-next-line": 0
  }
}
```