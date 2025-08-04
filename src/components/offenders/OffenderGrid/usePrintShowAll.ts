import { useEffect } from 'react';

/**
 * Hook to force showing all items when printing
 * @param setShowAll - Function to set the showAll state
 */
export const usePrintShowAll = (setShowAll: (value: boolean) => void) => {
  useEffect(() => {
    const handleBeforePrint = () => {
      console.log('[usePrintShowAll] beforeprint event triggered');
      setShowAll(true);
    };

    const handleAfterPrint = () => {
      setShowAll(false);
    };

    // Handle Cmd/Ctrl + P
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'p') {
        console.log('[usePrintShowAll] Cmd/Ctrl+P detected');
        setShowAll(true);
        // Set timeout to reset after print dialog
        setTimeout(() => {
          if (!window.matchMedia('print').matches) {
            setShowAll(false);
          }
        }, 1000);
      }
    };

    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);
    window.addEventListener('keydown', handleKeyDown);

    // Check if we're already in print mode (e.g., print preview)
    const mediaQueryList = window.matchMedia('print');
    if (mediaQueryList.matches) {
      setShowAll(true);
    }

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setShowAll(e.matches);
    };

    // Modern browsers
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', handleMediaChange);
    } else {
      // Legacy browsers
      mediaQueryList.addListener(handleMediaChange);
    }

    // Also check for print mode class on body
    const checkPrintMode = () => {
      if (document.body.classList.contains('print-mode')) {
        console.log('[usePrintShowAll] print-mode class detected on body');
        setShowAll(true);
      }
    };

    // Use MutationObserver to watch for print-mode class
    const observer = new MutationObserver(checkPrintMode);
    observer.observe(document.body, {
      attributeFilter: ['class'],
      attributes: true,
    });

    // Initial check
    checkPrintMode();

    // Also immediately check print media query
    if (window.matchMedia && window.matchMedia('print').matches) {
      console.log('[usePrintShowAll] Initial print media query matched');
      setShowAll(true);
    }

    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
      window.removeEventListener('keydown', handleKeyDown);
      observer.disconnect();

      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener('change', handleMediaChange);
      } else {
        mediaQueryList.removeListener(handleMediaChange);
      }
    };
  }, [setShowAll]);
};
