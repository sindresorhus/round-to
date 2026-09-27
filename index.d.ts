export type RoundingRule =
	| 'toNearestOrAwayFromZero'
	| 'toNearestOrEven'
	| 'up'
	| 'down'
	| 'towardZero'
	| 'awayFromZero';

export type Options = {
	/**
	The rounding rule to use after floating-point noise normalization.

	@default 'toNearestOrAwayFromZero'

	- `toNearestOrAwayFromZero` - Round to the closest value; if two values are equally close, the one with greater magnitude is chosen (traditional rounding).
	- `toNearestOrEven` - Round to the closest value; if two values are equally close, the even one is chosen (banker's rounding).
	- `up` - Round toward +∞.
	- `down` - Round toward -∞.
	- `towardZero` - Round toward zero (truncate).
	- `awayFromZero` - Round away from zero.

	@example
	```
	import {roundTo} from 'round-to';

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

	// Round up (toward +∞)
	roundTo(5.2, 0, {roundingRule: 'up'});
	//=> 6
	roundTo(-5.2, 0, {roundingRule: 'up'});
	//=> -5

	// Round toward zero (truncate)
	roundTo(-5.2, 0, {roundingRule: 'towardZero'});
	//=> -5
	roundTo(-5.8, 0, {roundingRule: 'towardZero'});
	//=> -5
	```
	*/
	readonly roundingRule?: RoundingRule;
};

/**
Round the decimals with [`Math.round`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round) by default, after floating-point noise normalization.

Numbers are rounded to a specific number of fractional digits. Specifying a negative `precision` will round to any number of places to the left of the decimal. Specifying an infinite `precision` will assume infinite decimal places.

To suppress floating-point roundoff errors, the scaled value is normalized before rounding. Values extremely close to an integer or halfway boundary may be treated as lying exactly on that boundary. Consequently, rounding up or down does not guarantee an inequality relative to the original input.

You can specify different rounding rules using the `roundingRule` option. The default behavior rounds away from zero for 0.5 cases (traditional rounding), but you can use banker's rounding, round up/down, or other rules.

@param number - The number to adjust.
@param precision - The number of decimal places. (Integer or Infinity)
@param options - Rounding options.

@example
```
import {roundTo} from 'round-to';

roundTo(1.234, 2);
//=> 1.23

roundTo(1234.56, -2);
//=> 1200

roundTo(0.1231782638, Infinity);
//=> 0.1231782638
```
*/
export function roundTo(number: number, precision: number, options?: Options): number;

/**
Round up the decimals with [`Math.ceil`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil), after floating-point noise normalization.

To suppress floating-point roundoff errors, the scaled value is normalized before rounding. Values extremely close to an integer or halfway boundary may be treated as lying exactly on that boundary. Consequently, rounding up or down does not guarantee an inequality relative to the original input.

@param number - The number to adjust.
@param precision - The number of decimal places. (Integer or Infinity)

@example
```
import {roundToUp} from 'round-to';

roundToUp(1.234, 2);
//=> 1.24
```
*/
export function roundToUp(number: number, precision: number): number;

/**
Round down the decimals with [`Math.floor`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor), after floating-point noise normalization.

To suppress floating-point roundoff errors, the scaled value is normalized before rounding. Values extremely close to an integer or halfway boundary may be treated as lying exactly on that boundary. Consequently, rounding up or down does not guarantee an inequality relative to the original input.

@param number - The number to adjust.
@param precision - The number of decimal places. (Integer or Infinity)

@example
```
import {roundToDown} from 'round-to';

roundToDown(1.234, 2);
//=> 1.23
```
*/
export function roundToDown(number: number, precision: number): number;
