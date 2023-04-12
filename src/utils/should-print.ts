// eslint-disable-next-line @typescript-eslint/no-explicit-any
const shouldPrint = (...args: any[]) => {
  if (args.every((arg) => !arg)) {
    return 'no-print';
  }
  return '';
};

export default shouldPrint;
