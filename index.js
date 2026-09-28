// Scaling by a power of ten adds floating point noise, so the scaled value is rounded to a
// few significant digits past the last one that matters. Fifteen is the floor, because a
// value with a small whole part needs that many to absorb the noise.
function removeScalingNoise(value) {
	const order = Math.log10(Math.abs(value));
	const significantDigits = Math.max(15, Math.ceil(order) + 3);
	// `toPrecision()` always returns a complete number, so `Number()` and `parseFloat()` agree.
	return Number(value.toPrecision(significantDigits));
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
				const sign = scaledPrecise < 0 ? -1 : 1;
				return sign * Math.round(Math.abs(scaledPrecise)) / power;
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

	// A non-finite value, or a precision of `Infinity`, means there is nothing to round.
	// Neither condition has a side effect, so the order does not matter.
	if (precision === Infinity || !Number.isFinite(number)) {
		return number;
	}

	// A precision larger than `Number.MAX_SAFE_INTEGER` cannot produce a usable power of ten,
	// so it is rejected instead of silently returning `NaN`.
	if (!Number.isSafeInteger(precision)) {
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
