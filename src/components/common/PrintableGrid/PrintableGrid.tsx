import { faPrint } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, message } from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import { usePrintOptimization } from 'utils/usePrintOptimization';

interface PrintableGridProps {
  children: React.ReactNode;
  maxItemsPerPage?: number;
  onAfterPrint?: () => void;
  onBeforePrint?: () => void;
  showPrintButton?: boolean;
  title?: string;
}

const useStyles = createUseStyles({
  gridContainer: {
    '@media print': {
      '& .ant-col': {
        breakInside: 'avoid',
        pageBreakInside: 'avoid',
      },
    },
  },
  pageBreak: {
    '@media print': {
      breakAfter: 'page',
      pageBreakAfter: 'always',
    },
  },
  printButton: {
    '@media print': {
      display: 'none',
    },
    marginBottom: '16px',
  },
  printHeader: {
    '@media print': {
      '& .printDate': {
        color: '#666',
        fontSize: '10pt',
        marginTop: '5px',
      },
      '& h1': {
        fontSize: '24pt',
        margin: 0,
      },
      borderBottom: '2px solid #000',
      display: 'block',
      marginBottom: '20px',
      paddingBottom: '10px',
    },
    display: 'none',
  },
});

const PrintableGrid: React.FC<PrintableGridProps> = ({
  children,
  onAfterPrint,
  onBeforePrint,
  showPrintButton = false,
  title,
}) => {
  const classes = useStyles();
  const intl = useIntl();
  const [isPreparing, setIsPreparing] = useState(false);

  const { isPrinting, triggerPrint } = usePrintOptimization({
    onAfterPrint,
    onBeforePrint: () => {
      setIsPreparing(true);
      // Give time for all images to load
      setTimeout(() => {
        setIsPreparing(false);
        onBeforePrint?.();
      }, 1000);
    },
  });

  const handlePrint = () => {
    try {
      void message.info('Preparing document for print...');

      // Scroll to top to ensure proper rendering
      window.scrollTo(0, 0);

      // Trigger print after a delay
      setTimeout(() => {
        triggerPrint();
      }, 500);
    } catch (error) {
      void message.error('Failed to prepare print view');
      console.error('Print error:', error);
    }
  };

  // Add page break markers for large grids
  const addPageBreaks = (content: React.ReactNode) => {
    if (!isPrinting || !React.isValidElement(content)) {
      return content;
    }

    // This would need to be implemented based on your specific grid structure
    // For now, returning content as-is
    return content;
  };

  return (
    <>
      {/* Print header - only visible during print */}
      <div className={classes.printHeader}>
        <h1>
          {title ||
            intl.formatMessage({ defaultMessage: 'Investigation Report' })}
        </h1>
        <div className="printDate">
          {intl.formatMessage(
            { defaultMessage: 'Generated on: {date} at {time}' },
            {
              date: new Date().toLocaleDateString(),
              time: new Date().toLocaleTimeString(),
            }
          )}
        </div>
      </div>

      {/* Print button - hidden during print */}
      {showPrintButton && (
        <div className={classes.printButton}>
          <Button
            icon={<FontAwesomeIcon icon={faPrint} />}
            loading={isPreparing}
            onClick={handlePrint}
          >
            {intl.formatMessage({ defaultMessage: 'Print View' })}
          </Button>
        </div>
      )}

      {/* Main content */}
      <div className={classes.gridContainer}>{addPageBreaks(children)}</div>
    </>
  );
};

export default PrintableGrid;
