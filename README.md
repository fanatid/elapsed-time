# elapsed-time

[![build status](https://img.shields.io/travis/fanatid/elapsed-time.svg?branch=master&style=flat-square)](http://travis-ci.org/fanatid/elapsed-time)
[![Coverage Status](https://img.shields.io/coveralls/fanatid/elapsed-time.svg?style=flat-square)](https://coveralls.io/r/fanatid/elapsed-time)
[![Dependency status](https://img.shields.io/david/fanatid/elapsed-time.svg?style=flat-square)](https://david-dm.org/fanatid/elapsed-time#info=dependencies)

[![NPM](https://nodei.co/npm/elapsed-time.png)](https://www.npmjs.com/package/elapsed-time)
[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## Installation

```bash
npm install elapsed-time
```

## Examples

```js
var ElapsedTime = require('elapsed-time')
var et = ElapsedTime.new().start()
setTimeout(function () {
  console.log(et.getValue()) // should print ~ 10ms
}, 10)
```

## API

  * static
    * [new](#new)
    * [setDefaultFormatter](#setdefaultformatter)
  * methods
    * [constructor](#constructor)
    * [start](#start)
    * [pause](#pause)
    * [resume](#resume)
    * [sleep](#sleep)
    * [reset](#reset)
    * [getRawValue](#getrawvalue)
    * [getValue](#getvalue)

### new

you can use static *new* instead **new** keyword

**return**: `ElapsedTime`

### setDefaultFormatter

  * `function` formatter

### constructor

  * `Object` [opts]
    * `function` [opts.formatter]

### start

**return**: `ElapsedTime`

### pause

**return**: `ElapsedTime`

### sleep

  * `number` timeout

**return**: `ElapsedTime`

### reset

**return**: `ElapsedTime`

### getRawValue

**return**: `number`

### getValue

  * `Object` [opts]
    * `function` [opts.formatter]

**return**: `number`

## License

Code released under [the MIT license](LICENSE).
