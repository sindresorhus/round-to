import {test} from 'node:test';
import assert from 'node:assert/strict';
import {roundTo, roundToUp, roundToDown} from './index.js';

test('roundTo()', () => {
	assert.equal(roundTo(0.129, 3), 0.129);
	assert.equal(roundTo(0.129, 2), 0.13);
	assert.equal(roundTo(0.129, 1), 0.1);
	assert.equal(roundTo(1.005, 2), 1.01);
	assert.equal(roundTo(1.005, 0), 1);
	assert.equal(roundTo(111.1, -2), 100);
	assert.equal(roundTo(-0.375, 2), -0.38);
	assert.ok(!Number.isNaN(roundTo(10_000_000_000_000, 8)));
	assert.equal(roundTo(0.37542323423423432432432432432, 8), 0.37542323); // eslint-disable-line no-loss-of-precision
	assert.equal(roundTo(0.1231782638, Infinity), 0.1231782638);
	assert.equal(roundTo(0.5, 0), 1);
	assert.equal(roundTo(-0.5, 0), -1);
	assert.equal(roundTo(5.12, 1), 5.1);
	assert.equal(roundTo(-5.12, 1), -5.1);
	assert.equal(roundTo(-1.005, 2), -1.01);
	assert.equal(roundTo(39.425, 2), 39.43);
	assert.equal(roundTo(-39.425, 2), -39.43);
	assert.equal(roundTo(1262.48, -1), 1260);
	assert.equal(roundTo(1262.48, -2), 1300);
	assert.equal(roundTo(0.597 / 6, 3), 0.1);
	assert.equal(roundTo(6.578040334659363e-10, 6), 0);
	assert.equal(roundTo(-6.578040334659363e-10, 6), 0);
	assert.equal(roundTo(0, 1), 0);
	assert.equal(roundTo(-0, 1), -0);
});

test('roundToUp()', () => {
	assert.equal(roundToUp(0.111, 3), 0.111);
	assert.equal(roundToUp(0.111, 2), 0.12);
	assert.equal(roundToUp(0.111, 1), 0.2);
	assert.equal(roundToUp(1.004, 2), 1.01);
	assert.equal(roundToUp(1.111, 0), 2);
	assert.equal(roundToUp(111.1, -2), 200);
	assert.equal(roundToUp(-0.375, 2), -0.37);
	assert.equal(roundToUp(1e-8, 2), 0.01);
	assert.equal(roundToUp(5.12, 1), 5.2);
	assert.equal(roundToUp(-5.12, 1), -5.1);
	assert.equal(roundToUp(9.13, 2), 9.13);
	assert.equal(roundToUp(65.18, 2), 65.18);
	assert.equal(roundToUp(-2.26, 2), -2.26);
	assert.equal(roundToUp(-18.15, 2), -18.15);
	assert.equal(roundToUp((0.1 + 0.2) * 10, 0), 3);
	assert.equal(roundToUp(6.578040334659363e-10, 6), 0.000001);
	assert.equal(roundToUp(-6.578040334659363e-10, 6), 0);
	assert.equal(roundToUp(0, 1), 0);
	assert.equal(roundToUp(-0, 1), -0);
});

test('roundToDown()', () => {
	assert.equal(roundToDown(0.666, 3), 0.666);
	assert.equal(roundToDown(0.666, 2), 0.66);
	assert.equal(roundToDown(0.666, 1), 0.6);
	assert.equal(roundToDown(1.006, 2), 1);
	assert.equal(roundToDown(1.006, 0), 1);
	assert.equal(roundToDown(111.6, -2), 100);
	assert.equal(roundToDown(-0.375, 2), -0.38);
	assert.equal(roundToDown(1e-8, 2), 0);
	assert.equal(roundToDown(5.12, 1), 5.1);
	assert.equal(roundToDown(-5.12, 1), -5.2);
	assert.equal(roundToDown(-9.13, 2), -9.13);
	assert.equal(roundToDown(-65.18, 2), -65.18);
	assert.equal(roundToDown(2.26, 2), 2.26);
	assert.equal(roundToDown(18.15, 2), 18.15);
	assert.equal(roundToDown((0.1 + 0.7) * 10, 0), 8);
	assert.equal(roundToDown(6.578040334659363e-10, 6), 0);
	assert.equal(roundToDown(-6.578040334659363e-10, 6), -0.000001);
	assert.equal(roundToDown(0, 1), 0);
	assert.equal(roundToDown(-0, 1), -0);
});

test('error cases', () => {
	assert.throws(() => roundTo('123', 2), {name: 'TypeError', message: 'Expected value to be a number'});
	assert.throws(() => roundTo(123, 2.5), {name: 'TypeError', message: 'Expected precision to be an integer'});
	assert.throws(() => roundToUp(null, 2), {name: 'TypeError', message: 'Expected value to be a number'});
	assert.throws(() => roundToDown(123, NaN), {name: 'TypeError', message: 'Expected precision to be an integer'});
	assert.throws(() => roundTo(123, 1e21), {name: 'TypeError', message: 'Expected precision to be an integer'});
});

test('special numeric values', () => {
	assert.ok(Number.isNaN(roundTo(NaN, 2)));
	assert.equal(roundTo(Infinity, 2), Infinity);
	assert.equal(roundTo(-Infinity, 2), -Infinity);
	assert.ok(Number.isNaN(roundToUp(NaN, 2)));
	assert.equal(roundToUp(Infinity, 2), Infinity);
	assert.equal(roundToDown(-Infinity, 2), -Infinity);
});

test('roundingRule option', () => {
	// Default behavior (away from zero)
	assert.equal(roundTo(-0.5, 0), -1);
	assert.equal(roundTo(-1.5, 0), -2);
	assert.equal(roundTo(-1.005, 2), -1.01);

	// ToNearestOrAwayFromZero (explicit default)
	assert.equal(roundTo(5.5, 0, {roundingRule: 'toNearestOrAwayFromZero'}), 6);
	assert.equal(roundTo(-5.5, 0, {roundingRule: 'toNearestOrAwayFromZero'}), -6);
	assert.equal(roundTo(5.2, 0, {roundingRule: 'toNearestOrAwayFromZero'}), 5);
	assert.equal(roundTo(-5.2, 0, {roundingRule: 'toNearestOrAwayFromZero'}), -5);

	// ToNearestOrEven (banker's rounding)
	assert.equal(roundTo(5.5, 0, {roundingRule: 'toNearestOrEven'}), 6);
	assert.equal(roundTo(4.5, 0, {roundingRule: 'toNearestOrEven'}), 4);
	assert.equal(roundTo(-5.5, 0, {roundingRule: 'toNearestOrEven'}), -6);
	assert.equal(roundTo(-4.5, 0, {roundingRule: 'toNearestOrEven'}), -4);

	// Up (toward +∞)
	assert.equal(roundTo(5.2, 0, {roundingRule: 'up'}), 6);
	assert.equal(roundTo(5.5, 0, {roundingRule: 'up'}), 6);
	assert.equal(roundTo(-5.2, 0, {roundingRule: 'up'}), -5);
	assert.equal(roundTo(-5.5, 0, {roundingRule: 'up'}), -5);

	// Down (toward -∞)
	assert.equal(roundTo(5.2, 0, {roundingRule: 'down'}), 5);
	assert.equal(roundTo(5.5, 0, {roundingRule: 'down'}), 5);
	assert.equal(roundTo(-5.2, 0, {roundingRule: 'down'}), -6);
	assert.equal(roundTo(-5.5, 0, {roundingRule: 'down'}), -6);

	// TowardZero (truncate)
	assert.equal(roundTo(5.2, 0, {roundingRule: 'towardZero'}), 5);
	assert.equal(roundTo(5.5, 0, {roundingRule: 'towardZero'}), 5);
	assert.equal(roundTo(-5.2, 0, {roundingRule: 'towardZero'}), -5);
	assert.equal(roundTo(-5.5, 0, {roundingRule: 'towardZero'}), -5);

	// AwayFromZero
	assert.equal(roundTo(5.2, 0, {roundingRule: 'awayFromZero'}), 6);
	assert.equal(roundTo(5.5, 0, {roundingRule: 'awayFromZero'}), 6);
	assert.equal(roundTo(-5.2, 0, {roundingRule: 'awayFromZero'}), -6);
	assert.equal(roundTo(-5.5, 0, {roundingRule: 'awayFromZero'}), -6);

	// Precision tests
	assert.equal(roundTo(-1.005, 2, {roundingRule: 'up'}), -1);
	assert.equal(roundTo(1.005, 2, {roundingRule: 'toNearestOrAwayFromZero'}), 1.01);

	// Preserve -0 input
	assert.equal(roundTo(-0, 1, {roundingRule: 'up'}), -0);

	// Options handling
	assert.equal(roundTo(-0.5, 0, {}), -1);
});

test('a large number is not rounded up by a whole unit by the noise removal', () => {
	// These values have more than fifteen significant digits, so rounding them to fifteen
	// threw the fraction away and the rounding ran on the wrong number. `100000000000001.5`
	// became `100000000000002`, so flooring it stayed a whole unit too high.
	for (const [value, whole] of [[100_000_000_000_001.5, 100_000_000_000_001], [100_000_000_000_001.75, 100_000_000_000_001], [400_000_000_000_001.5, 400_000_000_000_001]]) {
		assert.equal(roundToDown(value, 0), whole, `roundToDown(${value}, 0)`);
		assert.equal(roundToUp(value, 0), whole + 1, `roundToUp(${value}, 0)`);
	}
});

test('toNearestOrEven only treats a real tie as a tie', () => {
	// The tie tolerance scaled with the magnitude of the number, so at this size a
	// fraction of `0.515625` counted as exactly halfway and was forced onto the even side.
	assert.equal(roundTo(10_000_000_000_000.515625, 0, {roundingRule: 'toNearestOrEven'}), 10_000_000_000_001);
	assert.equal(roundTo(10_000_000_000_001.484375, 0, {roundingRule: 'toNearestOrEven'}), 10_000_000_000_001);

	// A genuine tie at the same size still goes to the even side.
	assert.equal(roundTo(10_000_000_000_000.5, 0, {roundingRule: 'toNearestOrEven'}), 10_000_000_000_000);
	assert.equal(roundTo(10_000_000_000_001.5, 0, {roundingRule: 'toNearestOrEven'}), 10_000_000_000_002);
});

test('a large integer is not changed by rounding to no decimal places', () => {
	// `toPrecision(15)` cannot hold more than fifteen significant digits, so the integer
	// digits of anything from about 1e15 up were truncated before the rounding ran.
	for (const value of [2 ** 31, 2 ** 32, 2 ** 40, 2 ** 50, 1e21, 1.2345678901234568e22, Number.MAX_SAFE_INTEGER]) {
		assert.equal(roundTo(value, 0), value, `roundTo(${value}, 0)`);
		assert.equal(roundToUp(value, 0), value, `roundToUp(${value}, 0)`);
		assert.equal(roundToDown(value, 0), value, `roundToDown(${value}, 0)`);
	}
});

test('roundTo() preserves a large decimal fraction', () => {
	assert.equal(roundTo(12_345_678.123456789, 8), 12_345_678.12345679);
});

test('roundTo() preserves a large integer with negative precision', () => {
	assert.equal(roundTo(123_456_789_012_345_680, -1), 123_456_789_012_345_680);
});
