import { placeNumberBetween } from "../utilities";

/**
 * Wrapper on placeNumberBetween utility function.
 */
export function placeBetween(start, end) {
  return (number) => placeNumberBetween(number, start, end);
}
