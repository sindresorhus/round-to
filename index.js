'use strict';

function round(method, number, precision) {
	if (typeof number !== 'number') {
		throw new TypeError('Expected value to be a number');
	}

	if (!Number.isInteger(precision)) {
		throw new TypeError('Expected precision to be an integer');
	}

	const isRoundingAndNegative = method === 'round' && number < 0;
	if (isRoundingAndNegative) {
		number = Math.abs(number);
	}

	let exponent;
	[number, exponent] = `${number}e`.split('e');
	let result = Math[method](`${number}e${Number(exponent) + precision}`);

	[number, exponent] = `${result}e`.split('e');
	result = Number(`${number}e${Number(exponent) - precision}`);

	if (isRoundingAndNegative) {
		result = -result;
	}

	return result;
}

module.exports = round.bind(null, 'round');
module.exports.up = round.bind(null, 'ceil');
module.exports.down = round.bind(null, 'floor');
