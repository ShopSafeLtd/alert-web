import React, { useCallback, useEffect, useState } from 'react';

interface PrintOptions {
  onAfterPrint?: () => void;
  onBeforePrint?: () => void;
  showAllItems?: boolean;
}

export const usePrintOptimization = (options: PrintOptions = {}) => {
  const [isPrinting, setIsPrinting] = useState(false);
  const [showAllForPrint, setShowAllForPrint] = useState(false);

  useEffect(() => {
    const handleBeforePrint = () => {
      setIsPrinting(true);
      if (options.showAllItems) {
        setShowAllForPrint(true);
      }
      options.onBeforePrint?.();
    };

    const handleAfterPrint = () => {
      setIsPrinting(false);
      setShowAllForPrint(false);
      options.onAfterPrint?.();
    };

    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);

    // Also handle print via Ctrl+P / Cmd+P
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        handleBeforePrint();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [options]);

  const triggerPrint = useCallback(() => {
    // Prepare for print
    setIsPrinting(true);
    if (options.showAllItems) {
      setShowAllForPrint(true);
    }
    options.onBeforePrint?.();

    // Small delay to ensure DOM updates
    setTimeout(() => {
      window.print();
    }, 100);
  }, [options]);

  return {
    isPrinting,
    showAllForPrint,
    triggerPrint,
  };
};

// Helper function to generate print-friendly classes
export const getPrintClasses = (baseClass: string, isPrinting: boolean) =>
  isPrinting ? `${baseClass} ${baseClass}-print` : baseClass;

// Helper component to hide elements during print
export const HideOnPrint: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <div className="hide-on-print">{children}</div>;

// Helper component to show elements only during print
export const ShowOnPrint: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <div className="show-on-print">{children}</div>;
