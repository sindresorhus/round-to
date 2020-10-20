# round-to [![Build Status](https://travis-ci.com/sindresorhus/round-to.svg?branch=master)](https://travis-ci.com/github/sindresorhus/round-to)

> Round a number to a specific number of decimal places: `1.234` → `1.2`

## Install

```
$ npm install round-to
```

## Usage

```js
const roundTo = require('round-to');

roundTo(1.234, 2);
//=> 1.23

roundTo.up(1.234, 2);
//=> 1.24

roundTo.down(1.234, 2);
//=> 1.23
```

Numbers are rounded to a specific number of fractional digits. Specifying a negative `precision` will round to any number of places to the left of the decimal.

```js
roundTo(1234.56, -2);
//=> 1200
```

Specifying an infinite `precision` will assume infinite decimal places.

```js
roundTo(0.1231782638, Infinity);
//=> 0.1231782638
```

## API

### roundTo(number, precision)

Round the decimals with [`Math.round`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round).

### roundTo.up(number, precision)

Round up the decimals with [`Math.ceil`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil).

### roundTo.down(number, precision)

Round down the decimals with [`Math.floor`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor).

#### number

Type: `number`

Number to adjust.

#### precision

Type: `number` *(Integer or infinity)*

Number of decimal places.
