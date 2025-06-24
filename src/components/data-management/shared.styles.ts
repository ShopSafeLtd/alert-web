import type { Theme } from 'configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const useSharedStyles = createUseStyles((theme: Theme) => ({
  mainRow: {},
  page: {
    padding: '32px 24px',
  },
  permissionCard: {
    borderRadius: 12,
    padding: '40px 24px',
    textAlign: 'center',
  },
  permissionIcon: {
    color: theme.colorScheme === 'dark' ? '#666' : '#d9d9d9',
    fontSize: 48,
  },
  permissionText: {
    color: theme.colorScheme === 'dark' ? theme.secondaryText : undefined,
  },
  permissionTitle: {
    color: theme.colorScheme === 'dark' ? theme.secondaryText : undefined,
  },
  toolsGrid: {
    gap: [24, 24],
  },
  toolsSection: {
    marginBottom: 24,
  },
  toolsSectionSubtitle: {
    fontSize: 16,
  },
  toolsSectionTitle: {
    marginBottom: 8,
  },
}));

export default useSharedStyles;
