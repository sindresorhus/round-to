'use strict';

function round(method, number, precision) {
	if (typeof number !== 'number') {
		throw new TypeError('Expected value to be a number');
	}

	if (precision === Infinity) {
		return number;
	}

	if (!Number.isInteger(precision)) {
		throw new TypeError('Expected precision to be an integer');
	}

	const isRoundingAndNegative = method === 'round' && number < 0;
	if (isRoundingAndNegative) {
		number = Math.abs(number);
	}

	const power = 10 ** precision;

	let result = Math[method](Number((number * power).toPrecision(15))) / power;

	if (isRoundingAndNegative) {
		result = -result;
	}

	return result;
}

module.exports = round.bind(undefined, 'round');
module.exports.up = round.bind(undefined, 'ceil');
module.exports.down = round.bind(undefined, 'floor');
