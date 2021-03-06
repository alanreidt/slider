import isDivisible from '../isDivisible/isDivisible';

/**
 * If this can be done, returns the closest factor (natural number (positive integer))
 * of division (the bigger one, if controversial).
 * Otherwise, returns NaN.
 *
 * @param {number} dividend A number, that to be divided.
 * @param {number} divisor A number, that divides the dividend.
 *
 * @returns {number} The closest factor of the division.
 */
const findNextFactor = function findNextFactorFromUtilities(dividend, divisor) {
  const areArgumentsCorrect =
    Number.isFinite(dividend) && Number.isFinite(divisor) && dividend > 0;

  if (!areArgumentsCorrect) {
    return NaN;
  }

  if (divisor <= 0) {
    return 1;
  }

  // condition works as insurance
  for (let nextDivisor = divisor; nextDivisor !== dividend; nextDivisor += 1) {
    if (isDivisible(dividend, nextDivisor)) {
      return nextDivisor;
    }
  }

  return dividend;
};

export default findNextFactor;
