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

	let [number, exponent] = `${input}e`.split('e');
	let ret = Math[method](`${number}e${Number(exponent) + precision}`);

	[number, exponent] = `${ret}e`.split('e');
	ret = Number(`${number}e${Number(exponent) - precision}`);

	if (isRoundingAndNegative) {
		ret = -ret;
	}

	return ret;
}

module.exports = round.bind(null, 'round');
module.exports.up = round.bind(null, 'ceil');
module.exports.down = round.bind(null, 'floor');
