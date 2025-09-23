import type { Theme } from '#/configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  circleSymbol: {
    border: '2px solid #ffffff',
    borderRadius: '50%',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
    height: '14px',
    width: '14px',
  },
  clusterSymbol: {
    alignItems: 'center',
    border: '2px solid #ffffff',
    borderRadius: '50%',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    height: '20px',
    justifyContent: 'center',
    width: '20px',
  },
  clusterText: {
    color: '#ffffff',
    fontSize: '9px',
    fontWeight: 'bold',
  },
  heatmapSymbol: {
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '3px',
    height: '14px',
    width: '40px',
  },
  legendContainer: {
    '&:hover': {
      boxShadow:
        theme.colorScheme === 'dark'
          ? '0 4px 16px rgba(0, 0, 0, 0.5)'
          : '0 4px 16px rgba(0, 0, 0, 0.2)',
    },
    backdropFilter: 'blur(10px)',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? 'rgba(31, 31, 31, 0.95)'
        : 'rgba(255, 255, 255, 0.95)',
    borderRadius: '8px',
    bottom: '20px',
    boxShadow:
      theme.colorScheme === 'dark'
        ? '0 2px 8px rgba(0, 0, 0, 0.4)'
        : '0 2px 8px rgba(0, 0, 0, 0.15)',
    maxHeight: '60vh',
    maxWidth: '220px',
    overflowY: 'auto',
    padding: '12px 16px',
    position: 'absolute',
    right: '20px',
    transition: 'all 0.3s ease',
    zIndex: 10,
  },
  legendItem: {
    alignItems: 'center',
    display: 'flex',
    gap: '10px',
  },
  legendItems: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  legendLabel: {
    color: theme.colorScheme === 'dark' ? '#cbd5e1' : '#475569',
    fontSize: '12px',
    lineHeight: '1.3',
  },
  legendSymbol: {
    flexShrink: 0,
  },
  legendTitle: {
    borderBottom:
      theme.colorScheme === 'dark'
        ? '1px solid rgba(255, 255, 255, 0.1)'
        : '1px solid rgba(0, 0, 0, 0.1)',
    color: theme.colorScheme === 'dark' ? '#f1f5f9' : '#1e293b',
    fontSize: '14px',
    fontWeight: 600,
    marginBottom: '10px',
    paddingBottom: '8px',
  },
  subLabel: {
    color: theme.colorScheme === 'dark' ? '#64748b' : '#94a3b8',
    fontSize: '10px',
    fontStyle: 'italic',
    marginTop: '2px',
  },
}));

export default useStyles;
