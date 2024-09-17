import type { RefObject } from 'react';

import { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

interface Return {
  componentRef: RefObject<HTMLDivElement>;
  handlePrint: () => void;
  isPrinting: boolean;
}

const useReportPrint = (): Return => {
  const [isPrinting, setIsPrinting] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

  const promiseResolveRef = useRef<(() => void) | null>(null);
  useEffect(() => {
    if (isPrinting && promiseResolveRef.current) {
      // Resolves the Promise, letting `react-to-print` know that the DOM updates are completed. Workaround for printing issues
      setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        promiseResolveRef.current();
      }, 2000);
    }
  }, [isPrinting]);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => {
      // Reset the Promise resolve so we can print again

      setIsPrinting(false);
      promiseResolveRef.current = null;
    },
    onBeforeGetContent: () =>
      new Promise((resolve) => {
        setIsPrinting(true);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        promiseResolveRef.current = resolve;
      }),
    pageStyle:
      '@page { size: A4; margin: 10mm } @media print { body { -webkit-print-color-adjust: exact; page-break-inside: avoid;} }',
  });
  return { componentRef, handlePrint, isPrinting };
};

export default useReportPrint;
