import test from 'ava';
import roundTo from '.';

test('roundTo()', t => {
	t.is(roundTo(0.129, 3), 0.129);
	t.is(roundTo(0.129, 2), 0.13);
	t.is(roundTo(0.129, 1), 0.1);
	t.is(roundTo(1.005, 2), 1.01);
	t.is(roundTo(1.005, 0), 1);
	t.is(roundTo(111.1, -2), 100);
	t.is(roundTo(-0.375, 2), -0.38);
	t.false(Number.isNaN(roundTo(10000000000000, 8)));
	t.is(roundTo(0.37542323423423432432432432432, 8), 0.37542323); // eslint-disable-line no-loss-of-precision
	t.is(roundTo(0.1231782638, Infinity), 0.1231782638);
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

test('roundTo.up()', t => {
	t.is(roundTo.up(0.111, 3), 0.111);
	t.is(roundTo.up(0.111, 2), 0.12);
	t.is(roundTo.up(0.111, 1), 0.2);
	t.is(roundTo.up(1.004, 2), 1.01);
	t.is(roundTo.up(1.111, 0), 2);
	t.is(roundTo.up(111.1, -2), 200);
	t.is(roundTo.up(-0.375, 2), -0.37);
	t.is(roundTo.up(1e-8, 2), 0.01);
	t.is(roundTo.up(5.12, 1), 5.2);
	t.is(roundTo.up(-5.12, 1), -5.1);
	t.is(roundTo.up(9.130, 2), 9.13);
	t.is(roundTo.up(65.180, 2), 65.18);
	t.is(roundTo.up(-2.260, 2), -2.26);
	t.is(roundTo.up(-18.150, 2), -18.15);
	t.is(roundTo.up((0.1 + 0.2) * 10, 0), 3);
});

test('roundTo.down()', t => {
	t.is(roundTo.down(0.666, 3), 0.666);
	t.is(roundTo.down(0.666, 2), 0.66);
	t.is(roundTo.down(0.666, 1), 0.6);
	t.is(roundTo.down(1.006, 2), 1);
	t.is(roundTo.down(1.006, 0), 1);
	t.is(roundTo.down(111.6, -2), 100);
	t.is(roundTo.down(-0.375, 2), -0.38);
	t.is(roundTo.down(1e-8, 2), 0);
	t.is(roundTo.down(5.12, 1), 5.1);
	t.is(roundTo.down(-5.12, 1), -5.2);
	t.is(roundTo.down(-9.130, 2), -9.13);
	t.is(roundTo.down(-65.180, 2), -65.18);
	t.is(roundTo.down(2.260, 2), 2.26);
	t.is(roundTo.down(18.150, 2), 18.15);
	t.is(roundTo.down((0.1 + 0.7) * 10, 0), 8);
});
