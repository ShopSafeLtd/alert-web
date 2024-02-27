export const margin: [number, number] = [10, 10];
export const rowHeight = 38;

export const tableLengthToHeight = (length: number) =>
  length > 10 ? 12 * (length / 10) : 14;
