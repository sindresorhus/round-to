import test from 'ava';
import {roundTo, roundToUp, roundToDown} from './index.js';

test('roundTo()', t => {
	t.is(roundTo(0.129, 3), 0.129);
	t.is(roundTo(0.129, 2), 0.13);
	t.is(roundTo(0.129, 1), 0.1);
	t.is(roundTo(1.005, 2), 1.01);
	t.is(roundTo(1.005, 0), 1);
	t.is(roundTo(111.1, -2), 100);
	t.is(roundTo(-0.375, 2), -0.38);
	t.false(Number.isNaN(roundTo(10_000_000_000_000, 8)));
	t.is(roundTo(0.375_423_234_234_234_324_324_324_324_32, 8), 0.375_423_23); // eslint-disable-line no-loss-of-precision
	t.is(roundTo(0.123_178_263_8, Number.POSITIVE_INFINITY), 0.123_178_263_8);
	t.is(roundTo(0.5, 0), 1);
	t.is(roundTo(-0.5, 0), -1);
	t.is(roundTo(5.12, 1), 5.1);
	t.is(roundTo(-5.12, 1), -5.1);
	t.is(roundTo(1.005, 2), 1.01);
	t.is(roundTo(-1.005, 2), -1.01);
	t.is(roundTo(39.425, 2), 39.43);
	t.is(roundTo(-39.425, 2), -39.43);
	t.is(roundTo(1262.48, -1), 1260);
	t.is(roundTo(1262.48, -2), 1300);
	t.is(roundTo(0.597 / 6, 3), 0.1);
});

test('roundToUp()', t => {
	t.is(roundToUp(0.111, 3), 0.111);
	t.is(roundToUp(0.111, 2), 0.12);
	t.is(roundToUp(0.111, 1), 0.2);
	t.is(roundToUp(1.004, 2), 1.01);
	t.is(roundToUp(1.111, 0), 2);
	t.is(roundToUp(111.1, -2), 200);
	t.is(roundToUp(-0.375, 2), -0.37);
	t.is(roundToUp(1e-8, 2), 0.01);
	t.is(roundToUp(5.12, 1), 5.2);
	t.is(roundToUp(-5.12, 1), -5.1);
	t.is(roundToUp(9.13, 2), 9.13);
	t.is(roundToUp(65.18, 2), 65.18);
	t.is(roundToUp(-2.26, 2), -2.26);
	t.is(roundToUp(-18.15, 2), -18.15);
	t.is(roundToUp((0.1 + 0.2) * 10, 0), 3);
});

test('roundToDown()', t => {
	t.is(roundToDown(0.666, 3), 0.666);
	t.is(roundToDown(0.666, 2), 0.66);
	t.is(roundToDown(0.666, 1), 0.6);
	t.is(roundToDown(1.006, 2), 1);
	t.is(roundToDown(1.006, 0), 1);
	t.is(roundToDown(111.6, -2), 100);
	t.is(roundToDown(-0.375, 2), -0.38);
	t.is(roundToDown(1e-8, 2), 0);
	t.is(roundToDown(5.12, 1), 5.1);
	t.is(roundToDown(-5.12, 1), -5.2);
	t.is(roundToDown(-9.13, 2), -9.13);
	t.is(roundToDown(-65.18, 2), -65.18);
	t.is(roundToDown(2.26, 2), 2.26);
	t.is(roundToDown(18.15, 2), 18.15);
	t.is(roundToDown((0.1 + 0.7) * 10, 0), 8);
});
