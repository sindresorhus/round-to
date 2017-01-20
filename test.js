import test from 'ava';
import fn from './';

test('roundTo()', t => {
	t.is(fn(0.129, 3), 0.129);
	t.is(fn(0.129, 2), 0.13);
	t.is(fn(0.129, 1), 0.1);
	t.is(fn(1.005, 2), 1.01);
	t.is(fn(1.005, 0), 1);
	t.is(fn(111.1, -2), 100);
	t.is(fn(-0.375, 2), -0.38);
});

test('roundTo.up()', t => {
	t.is(fn.up(0.111, 3), 0.111);
	t.is(fn.up(0.111, 2), 0.12);
	t.is(fn.up(0.111, 1), 0.2);
	t.is(fn.up(1.004, 2), 1.01);
	t.is(fn.up(1.111, 0), 2);
	t.is(fn.up(111.1, -2), 200);
	t.is(fn.up(-0.375, 2), -0.37);
});

test('roundTo.down()', t => {
	t.is(fn.down(0.666, 3), 0.666);
	t.is(fn.down(0.666, 2), 0.66);
	t.is(fn.down(0.666, 1), 0.6);
	t.is(fn.down(1.006, 2), 1.00);
	t.is(fn.down(1.006, 0), 1);
	t.is(fn.down(111.6, -2), 100);
	t.is(fn.down(-0.375, 2), -0.38);
});
