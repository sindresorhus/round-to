/**
Round the decimals with [`Math.round`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round).

Numbers are rounded to a specific number of fractional digits. Specifying a negative `precision` will round to any number of places to the left of the decimal.

@param number - The number to adjust.
@param precision - The number of decimal places. (Integer or Infinity)

@example
```
import {roundTo} from 'round-to';

roundTo(1.234, 2);
//=> 1.23

roundTo(1234.56, -2);
//=> 1200
```
*/
export function roundTo(number: number, precision: number): number;

/**
Round up the decimals with [`Math.ceil`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil).

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
Round down the decimals with [`Math.floor`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor).

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
