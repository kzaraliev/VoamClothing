// Exchange rate: €1 EUR = 1.956 BGN
const BGN_TO_EUR_RATE = 1.956;

/**
 * Converts Bulgarian Leva (BGN) to Euros (EUR)
 * @param {number} bgnAmount - Amount in Bulgarian Leva
 * @returns {number} Amount in Euros rounded to 2 decimal places
 */
export function bgnToEur(bgnAmount) {
  return (bgnAmount / BGN_TO_EUR_RATE);
}

/**
 * Formats a price to show both BGN and EUR currencies
 * @param {number} bgnAmount - Amount in Bulgarian Leva
 * @returns {string} Formatted price string with both currencies
 */
export function formatPrice(bgnAmount) {
  const eurAmount = bgnToEur(bgnAmount);
  return `${bgnAmount} lv. (€${eurAmount.toFixed(2)})`;
}

/**
 * Formats a price with custom precision for EUR
 * @param {number} bgnAmount - Amount in Bulgarian Leva
 * @param {number} eurPrecision - Number of decimal places for EUR (default: 2)
 * @returns {string} Formatted price string with both currencies
 */
export function formatPriceWithPrecision(bgnAmount, eurPrecision = 2) {
  const eurAmount = bgnToEur(bgnAmount);
  return `${bgnAmount} lv. (€${eurAmount.toFixed(eurPrecision)})`;
}
