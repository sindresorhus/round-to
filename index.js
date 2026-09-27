// Scaling by a power of ten adds floating point noise, so the scaled value is rounded to a
// few significant digits past the last one that matters. Fifteen is the floor, because a
// value with a small whole part needs that many to absorb the noise.
function removeScalingNoise(value) {
	const significantDigits = Math.max(15, Math.ceil(Math.log10(Math.abs(value))) + 3);
	return Number.parseFloat(value.toPrecision(significantDigits));
}

function applyRoundingRule(method, number, power, roundingRule) {
	// Handle different rounding rules for the 'round' method
	if (method === 'round' && roundingRule) {
		const scaledPrecise = removeScalingNoise(number * power);

		switch (roundingRule) {
			case 'up': {
				return Math.ceil(scaledPrecise) / power;
			}

			case 'down': {
				return Math.floor(scaledPrecise) / power;
			}

			case 'towardZero': {
				return Math.trunc(scaledPrecise) / power;
			}

			case 'awayFromZero': {
				return (scaledPrecise >= 0 ? Math.ceil(scaledPrecise) : Math.floor(scaledPrecise)) / power;
			}

			case 'toNearestOrEven': {
				// Banker's rounding - check if we're at a tie (halfway between integers)
				// The noise is already gone, so the fraction has to be exactly one half.
				if (Math.abs(scaledPrecise - Math.trunc(scaledPrecise)) === 0.5) {
					// Round to nearest even integer
					const floor = Math.floor(scaledPrecise);
					return (floor % 2 === 0 ? floor : floor + 1) / power;
				}

				// Not a tie, use normal rounding
				return Math.round(scaledPrecise) / power;
			}

			default: {
				// Traditional rounding - away from zero for 0.5
				return scaledPrecise < 0
					? -Math.round(Math.abs(scaledPrecise)) / power
					: Math.round(scaledPrecise) / power;
			}
		}
	}

	// For ceil/floor methods, use consistent scaling approach
	return Math[method](removeScalingNoise(number * power)) / power;
}

function round(method, number, precision, {roundingRule = 'toNearestOrAwayFromZero'} = {}) {
	if (typeof number !== 'number') {
		throw new TypeError('Expected value to be a number');
	}

	// Handle non-finite values explicitly
	if (!Number.isFinite(number)) {
		return number; // NaN, Infinity, -Infinity pass through unchanged
	}

	if (precision === Number.POSITIVE_INFINITY) {
		return number;
	}

	if (!Number.isInteger(precision)) {
		throw new TypeError('Expected precision to be an integer');
	}

	// If the input is already -0, preserve it
	if (Object.is(number, -0)) {
		return number;
	}

	const power = 10 ** precision;

	let result = applyRoundingRule(method, number, power, roundingRule);

	// Ensure rounding operations never return -0, always return 0
	if (Object.is(result, -0)) {
		result = 0;
	}

	return result;
}

export function roundTo(number, precision, options) {
	return round('round', number, precision, options);
}

export function roundToUp(number, precision) {
	return round('ceil', number, precision);
}

export function roundToDown(number, precision) {
	return round('floor', number, precision);
}
