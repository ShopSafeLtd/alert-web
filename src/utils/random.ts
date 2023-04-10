// Similar to lodash/sample but with a string seed
function random<T>(array: T[], seed: string): T {
  // Sum the ASCII codes of each letter
  const number = [...seed].reduce(
    (n, letter) => n + (letter.codePointAt(0) || 0),
    0
  );
  // Get "random" index using modulus
  return array[number % array.length];
}

export default random;
