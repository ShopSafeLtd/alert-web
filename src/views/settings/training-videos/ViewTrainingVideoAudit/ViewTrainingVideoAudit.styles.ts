import type { Theme } from '#/configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  backButton: {
    marginBottom: '24px',
  },
  completedBadge: {
    backgroundColor: '#52c41a',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '12px',
    fontWeight: 600,
    padding: '4px 12px',
  },
  container: {
    padding: '24px',
  },
  controls: {
    display: 'flex',
    gap: '12px',
    marginBottom: '24px',
  },
  header: {
    marginBottom: '24px',
  },
  notCompletedBadge: {
    backgroundColor: theme.secondaryText,
    borderRadius: '12px',
    color: '#fff',
    fontSize: '12px',
    fontWeight: 600,
    padding: '4px 12px',
  },
  searchInput: {
    flex: 1,
  },
  statCard: {
    borderRadius: '12px',
    textAlign: 'center',
  },
  statLabel: {
    color: theme.secondaryText,
    fontSize: '14px',
    marginBottom: '8px',
  },
  statValue: {
    fontSize: '32px',
    fontWeight: 700,
  },
  statsGrid: {
    marginBottom: '32px',
  },
  subtitle: {
    color: theme.secondaryText,
    fontSize: '14px',
    margin: '4px 0 0 0',
  },
  table: {
    // Custom table styles if needed
  },
  title: {
    fontSize: '24px',
    fontWeight: 600,
    margin: 0,
  },
}));

export default useStyles;
