'use strict';

function round(method, input, precision) {
	if (typeof input !== 'number') {
		throw new TypeError('Expected value to be a number');
	}

	if (!Number.isInteger(precision)) {
		throw new TypeError('Expected precision to be an integer');
	}

	const isRoundingAndNegative = method === 'round' && input < 0;
	if (isRoundingAndNegative) {
		input = Math.abs(input);
	}

	let pair = `${input}e`.split('e');
	let value = Math[method](`${pair[0]}e${Number(pair[1]) + precision}`);

	pair = `${value}e`.split('e');
	value = Number(`${pair[0]}e${Number(pair[1]) - precision}`);

	if (isRoundingAndNegative) {
		value = -value;
	}

	return value;
}

module.exports = round.bind(null, 'round');
module.exports.up = round.bind(null, 'ceil');
module.exports.down = round.bind(null, 'floor');
