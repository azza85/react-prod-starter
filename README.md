### About
React starter repo with webpack,babel,tests setup.
Config and Setup based off tylermcginnis reccomendations

### IDE Setup
https://gist.github.com/tylermcginnis/0089ee0942d44e615098f83b01e1ce4a

### Todo
https://github.com/istanbuljs/nyc
https://github.com/avajs/ava/blob/master/docs/recipes/code-coverage.md

for `package.json`

    "testnyc": "nyc ava --verbose -w",
    "build": "BABEL_ENV=production babel --out-dir=dist index.js",
    "report": "nyc report",
    "coverage": "nyc check-coverage --lines 95 --functions 95 --branches 95"