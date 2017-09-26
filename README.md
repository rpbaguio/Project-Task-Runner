# Project Task Runner

A simplified Javascript Task Runner for compiling SASS/SCSS, LESS, or STYLUS file to minified / unminified CSS.

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.svg)](http://gruntjs.com/) [![Build Status](https://travis-ci.org/rpbaguio/project-task-runner.svg?branch=master)](https://travis-ci.org/rpbaguio/project-task-runner)

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

**Compile task for SASS/SCSS**

```bash
$ grunt dist-scss
```

**Full distribution task for SASS/SCSS**

```bash
$ grunt dist-scss
```

**Watch task for LESS**

```bash
$ grunt watch-less
```

**Compile task for LESS**

```bash
$ grunt dist-less
```

**Full distribution task for LESS**

```bash
$ grunt dist-less
```

**Watch task for STYLUS**

```bash
$ grunt watch-stylus
```

**Compile task for STYLUS**

```bash
$ grunt dist-stylus
```

**Full distribution task for STYLUS**

```bash
$ grunt dist-stylus
```

### License

[MIT](LICENSE)
