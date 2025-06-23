import type { Theme } from 'configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  container: {
    background:
      theme.colorScheme === 'dark' ? theme.cardSubsectionBackground : '#fafafa',
    border: `1px solid ${theme.borderColor || '#f0f0f0'}`,
    borderRadius: 12,
    height: 'fit-content',
    padding: 24,
  },
  content: {
    width: '100%',
  },
  divider: {
    margin: 0,
  },
  header: {
    marginBottom: 12,
  },
  headerIcon: {
    color: theme.primary || '#1890ff',
    fontSize: 18,
  },
  listItem: {
    fontSize: 14,
    lineHeight: '1.5',
  },
  proTip: {
    background:
      theme.colorScheme === 'dark' ? 'rgba(24, 144, 255, 0.1)' : '#e6f7ff',
    border: `1px solid ${theme.colorScheme === 'dark' ? 'rgba(24, 144, 255, 0.3)' : '#91d5ff'}`,
    borderRadius: 8,
    padding: 16,
  },
  proTipText: {
    fontSize: 13,
  },
  proTipTitle: {
    color: theme.primary || '#1890ff',
  },
  sectionTitle: {
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
  },
  title: {
    margin: 0,
    marginBottom: '0px !important',
  },
}));

export default useStyles;
