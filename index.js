function applyRoundingRule(method, number, power, roundingRule) {
	// Handle different rounding rules for the 'round' method
	if (method === 'round' && roundingRule) {
		const scaledNumber = number * power;
		const scaledPrecise = Number.parseFloat(scaledNumber.toPrecision(15));

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
				const fractionalPart = Math.abs(scaledPrecise - Math.trunc(scaledPrecise));
				const epsilon = Number.EPSILON * Math.abs(scaledPrecise) * 8; // Scale epsilon with magnitude
				const isHalfway = Math.abs(fractionalPart - 0.5) <= Math.max(epsilon, 1e-10);

				if (isHalfway) {
					// Round to nearest even integer
					const floor = Math.floor(scaledPrecise);
					const ceil = Math.ceil(scaledPrecise);
					return (floor % 2 === 0 ? floor : ceil) / power;
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
	const scaledPrecise = Number.parseFloat((number * power).toPrecision(15));
	return Math[method](scaledPrecise) / power;
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
