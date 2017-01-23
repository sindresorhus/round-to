'use strict';

function round(fn, val, precision) {
	if (typeof val !== 'number') {
		throw new TypeError('Expected value to be a number');
	}

	if (!Number.isInteger(precision)) {
		throw new TypeError('Expected precision to be an integer');
	}

	const exponent = precision > 0 ? 'e' : 'e-';
	const exponentNeg = precision > 0 ? 'e-' : 'e';
	precision = Math.abs(precision);

	if (fn === 'round') {
		return Number(Math.sign(val) * (Math.round(Math.abs(val) + exponent + precision) + exponentNeg + precision));
	}

	return Number(Math[fn](val + exponent + precision) + exponentNeg + precision);
}

module.exports = round.bind(null, 'round');
module.exports.up = round.bind(null, 'ceil');
module.exports.down = round.bind(null, 'floor');
