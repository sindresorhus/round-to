# round-to

> Round a number to a specific number of decimal places: `1.234` → `1.2`

> [!TIP]
> If you only need a string, use `number.toFixed(precision)`.

## Install

```sh
npm install round-to
```

## Usage

```js
import {roundTo, roundToUp, roundToDown} from 'round-to';

roundTo(1.234, 2);
//=> 1.23

roundToUp(1.234, 2);
//=> 1.24

roundToDown(1.234, 2);
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

### roundTo(number, precision, options?)

Round the decimals with [`Math.round`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round) by default.

You can specify different rounding rules using the `roundingRule` option. The default behavior rounds away from zero for 0.5 cases (traditional rounding), but you can use banker's rounding, always round up/down, or other rules.

```js
// Default behavior (away from zero)
roundTo(5.5, 0);
//=> 6
roundTo(-5.5, 0);
//=> -6

// Banker's rounding (to nearest even)
roundTo(5.5, 0, {roundingRule: 'toNearestOrEven'});
//=> 6
roundTo(4.5, 0, {roundingRule: 'toNearestOrEven'});
//=> 4

// Always round up (toward +∞)
roundTo(5.2, 0, {roundingRule: 'up'});
//=> 6
roundTo(-5.2, 0, {roundingRule: 'up'});
//=> -5
```

### roundToUp(number, precision)

Round up the decimals with [`Math.ceil`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil).

### roundToDown(number, precision)

Round down the decimals with [`Math.floor`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor).

#### number

Type: `number`

The number to adjust.

#### precision

Type: `number` *(Integer or Infinity)*

The number of decimal places.

#### options

Type: `object`

##### roundingRule

Type: `'toNearestOrAwayFromZero' | 'toNearestOrEven' | 'up' | 'down' | 'towardZero' | 'awayFromZero'`\
Default: `'toNearestOrAwayFromZero'`

The rounding rule to use:

- `'toNearestOrAwayFromZero'` - Round to the closest value; if two values are equally close, the one with greater magnitude is chosen (traditional rounding).
- `'toNearestOrEven'` - Round to the closest value; if two values are equally close, the even one is chosen (banker's rounding).
- `'up'` - Round toward +∞ (always round up).
- `'down'` - Round toward -∞ (always round down).
- `'towardZero'` - Round toward zero (truncate).
- `'awayFromZero'` - Round away from zero.

Examples:

```js
roundTo(5.5, 0, {roundingRule: 'toNearestOrEven'});
//=> 6
roundTo(4.5, 0, {roundingRule: 'toNearestOrEven'});
//=> 4

roundTo(-5.2, 0, {roundingRule: 'towardZero'});
//=> -5
roundTo(-5.8, 0, {roundingRule: 'towardZero'});
//=> -5
```
