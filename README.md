A javascript task runner for compiling CSS Pre-Processor (SASS/SCSS, LESS or STYLUS) files to minified/unminified CSS.

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.svg)](http://gruntjs.com/)

## Getting started

This package requires grunt-cli. Install grunt-cli globally with

```bash
$ npm install -g grunt-cli
```

### Installation

```bash
$ npm install project-task-runner
```

**Install dependencies:**

Navigate to the root node_modules/project-task-runner/ directory, then run 

```bash
$ npm install
```

npm will look at the package.json file and automatically install the necessary local dependencies listed there.


### Tasks command

**Watch task for SASS/SCSS**

```bash
$ grunt watch-scss
```

**Watch task for LESS**

```bash
$ grunt watch-less
```

**Watch task for STYLUS**

```bash
$ grunt watch-stylus
```

**Compile task for SASS/SCSS**

```bash
$ grunt dist-scss
```

**Compile task for LESS**

```bash
$ grunt dist-less
```

**Compile task for STYLUS**

```bash
$ grunt dist-stylus
```

**Full distribution task for SASS/SCSS**

```bash
$ grunt dist-scss
```

**Full distribution task for LESS**

```bash
$ grunt dist-less
```

**Full distribution task for STYLUS**

```bash
$ grunt dist-stylus
```

### License

[MIT](LICENSE)