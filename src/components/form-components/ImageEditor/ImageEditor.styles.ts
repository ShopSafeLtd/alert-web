import type { Theme } from 'configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  cardBody: {
    backgroundColor: theme.componentBackground,
    padding: '15px 10px',
  },
  cardImage: {
    height: 300,
    width: '100%',
  },
  cardPreviewSection: {
    alignItems: 'center',
    backgroundColor: theme.bodyBackground,
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    padding: 30,
    width: '100%',
  },
  instructionText: {
    color: theme.secondaryText,
    fontSize: '12px',
    lineHeight: '16px',
    marginBottom: 8,
  },
  mockupCard: {
    backgroundColor: theme.componentBackground,
    border: `1px solid ${theme.borderColor}`,
    borderRadius: 10,
    height: 300,
    overflow: 'hidden',
    width: 385,
  },
  resetButton: {
    marginTop: 8,
  },
  rotationControls: {
    marginTop: 8,
  },
  sectionHeader: {
    color: theme.headerColor,
    fontSize: '13px',
    fontWeight: 600,
    marginBottom: 12,
  },
  select: {
    width: 150,
  },
  toolbar: {
    backgroundColor: theme.bodyBackground,
    padding: 10,
  },
  valueDisplay: {
    backgroundColor: theme.itemHoverBackground,
    borderRadius: 4,
    color: theme.headerColor,
    fontSize: '12px',
    fontWeight: 500,
    marginBottom: 4,
    padding: '6px 8px',
  },
}));

export default useStyles;
