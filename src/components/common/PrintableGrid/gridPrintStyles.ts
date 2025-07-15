import type { Theme } from 'configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

export const usePrintableOffenderGridStyles = createUseStyles(
  (_theme: Theme) => ({
    '@global': {
      '@media print': {
        // Offender Grid specific optimizations
        '.offenderCard': {
          '& .actionButtons': {
            display: 'none !important',
          },
          '& .ant-tag': {
            backgroundColor: '#f0f0f0 !important',
            border: '1px solid #d9d9d9 !important',
            color: '#000 !important',
            fontSize: '8pt !important',
            lineHeight: '1 !important',
            padding: '1px 4px !important',
          },
          '& .cardContent': {
            height: 'auto !important',
            padding: '10px !important',
          },
          '& .image': {
            WebkitPrintColorAdjust: 'exact',
            backgroundColor: '#f0f0f0 !important',
            backgroundPosition: 'center !important',
            backgroundSize: 'cover !important',
            float: 'left',
            height: '100px !important',
            marginRight: '10px !important',
            printColorAdjust: 'exact',
            width: '80px !important',
          },
          '& .imageSkeleton': {
            display: 'none !important',
          },
          '& .statsRow': {
            '& .label': {
              fontWeight: 'bold !important',
            },
            color: '#000 !important',
            fontSize: '9pt !important',
            lineHeight: '1.2 !important',

            marginBottom: '3px !important',
          },
          '& .watermark': {
            display: 'none !important', // Hide watermarks in print
          },
          backgroundColor: '#fff !important',
          border: '1px solid #d9d9d9 !important',
          boxShadow: 'none !important',

          breakInside: 'avoid',

          height: 'auto !important',

          marginBottom: '15px !important',

          maxHeight: 'none',

          minHeight: '250px',

          pageBreakInside: 'avoid',

          width: '100%',
        },

        '.offenderGrid .ant-col': {
          flex: '0 0 33.333% !important',
          maxWidth: '33.333% !important',
          padding: '0 8px !important',
        },

        // Ensure 3 columns layout for A4
        '.offenderGrid .ant-row': {
          display: 'flex !important',
          flexWrap: 'wrap !important',
          margin: '0 -8px !important',
        },
      },
    },
  })
);

export const usePrintableVehicleGridStyles = createUseStyles(
  (_theme: Theme) => ({
    '@global': {
      '@media print': {
        // Vehicle Grid specific optimizations
        '.vehicleCard': {
          '& .actionButtons': {
            display: 'none !important',
          },
          '& .cardContent': {
            height: 'auto !important',
            padding: '8px !important',
          },
          '& .registration': {
            fontSize: '11pt !important',
            fontWeight: 'bold !important',
            marginBottom: '5px !important',
          },
          '& .vehicleDetails': {
            color: '#000 !important',
            fontSize: '9pt !important',
            lineHeight: '1.3 !important',
          },
          '& .vehicleImage': {
            WebkitPrintColorAdjust: 'exact',
            backgroundColor: '#f0f0f0 !important',
            backgroundPosition: 'center !important',
            backgroundRepeat: 'no-repeat !important',
            backgroundSize: 'contain !important',
            height: '75px !important',
            marginBottom: '8px !important',
            printColorAdjust: 'exact',
            width: '100px !important',
          },
          backgroundColor: '#fff !important',
          border: '1px solid #d9d9d9 !important',
          boxShadow: 'none !important',
          breakInside: 'avoid',
          height: 'auto !important',

          marginBottom: '15px !important',

          maxHeight: 'none',

          minHeight: '200px',

          pageBreakInside: 'avoid',

          width: '100%',
        },

        '.vehicleGrid .ant-col': {
          flex: '0 0 33.333% !important',
          maxWidth: '33.333% !important',
          padding: '0 8px !important',
        },

        // Vehicle grid layout
        '.vehicleGrid .ant-row': {
          display: 'flex !important',
          flexWrap: 'wrap !important',
          margin: '0 -8px !important',
        },
      },
    },
  })
);

export const usePrintableCrimeGroupGridStyles = createUseStyles(
  (_theme: Theme) => ({
    '@global': {
      '@media print': {
        // Crime Group Table optimizations
        '.crimeGroupTable': {
          '& .actionColumn': {
            display: 'none !important',
          },

          '& .ant-table': {
            pageBreakInside: 'avoid',
          },

          // Show all rows (remove pagination)
          '& .ant-table-pagination': {
            display: 'none !important',
          },

          '& .ant-table-row': {
            pageBreakInside: 'avoid',
          },

          '& .ant-table-tbody > tr > td': {
            borderBottom: '1px solid #d9d9d9 !important',
            padding: '6px !important',
          },

          '& .ant-table-thead > tr > th': {
            backgroundColor: '#f0f0f0 !important',
            borderBottom: '2px solid #000 !important',
            color: '#000 !important',
            fontWeight: 'bold !important',
            padding: '8px !important',
          },

          fontSize: '9pt !important',
        },
      },
    },
  })
);

// Combined print optimization hook
export const useGridPrintOptimization = () => {
  const offenderStyles = usePrintableOffenderGridStyles();
  const vehicleStyles = usePrintableVehicleGridStyles();
  const crimeGroupStyles = usePrintableCrimeGroupGridStyles();

  return {
    crimeGroupStyles,
    offenderStyles,
    vehicleStyles,
  };
};
