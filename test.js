'use strict';
var test = require('ava');
var fn = require('./');

test('roundTo()', function (t) {
	t.assert(fn(0.129, 3) === 0.129);
	t.assert(fn(0.129, 2) === 0.13);
	t.assert(fn(0.129, 1) === 0.1);
	t.assert(fn(1.005, 2) === 1.01);
	t.assert(fn(1.005, 0) === 1);
	t.assert(fn(111.1, -2) === 100);
	t.end();
});

test('roundTo.up()', function (t) {
	t.assert(fn.up(0.111, 3) === 0.111);
	t.assert(fn.up(0.111, 2) === 0.12);
	t.assert(fn.up(0.111, 1) === 0.2);
	t.assert(fn.up(1.004, 2) === 1.01);
	t.assert(fn.up(1.111, 0) === 2);
	t.assert(fn.up(111.1, -2) === 200);
	t.end();
});

test('roundTo.down()', function (t) {
	t.assert(fn.down(0.666, 3) === 0.666);
	t.assert(fn.down(0.666, 2) === 0.66);
	t.assert(fn.down(0.666, 1) === 0.6);
	t.assert(fn.down(1.006, 2) === 1.00);
	t.assert(fn.down(1.006, 0) === 1);
	t.assert(fn.down(111.6, -2) === 100);
	t.end();
});
