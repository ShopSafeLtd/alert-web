import type { Theme } from 'configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  '@media print': {
    sideListContainer: 'display: none !important;',
  },
  alias: {
    color: theme.secondaryText,
    display: 'block',
    fontSize: 13,
    lineHeight: '18px',
    maxWidth: '200px',
  },
  cardDivider: {
    backgroundColor: theme.borderColor,
    margin: '8px 0',
  },
  cardFooter: {},
  collapseButton: {
    '&:hover': {
      color: theme.primary,
    },
    color: theme.secondaryText,
  },
  collapseButtonContainer: {
    position: 'absolute',
    right: 8,
    top: 12,
    zIndex: 10,
  },
  collapsed: {
    '& $scrollContainer': {
      overflow: 'visible',
      overflowY: 'visible',
      padding: '48px 4px 12px 4px',
    },
  },
  collapsedCard: {
    display: 'none',
  },
  // Collapsed view styles
  collapsedContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    overflow: 'visible',
    width: '100%',
  },
  collapsedItem: {
    '&:hover': {
      '& $collapsedRef': {
        color: theme.primary,
      },
      backgroundColor: theme.itemHoverBackground,
      borderColor: theme.primary,
    },
    alignItems: 'center',
    border: `1px solid ${theme.borderColor}`,
    borderRadius: 6,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 6,
    padding: '8px 4px',
    transition: 'all 0.2s ease',
  },
  collapsedItemWrapper: {
    '&:hover $hoverCard': {
      opacity: 1,
      visibility: 'visible',
    },
    position: 'relative',
  },
  collapsedRef: {
    color: theme.secondaryText,
    fontSize: 12,
    fontWeight: 600,
    textAlign: 'center',
    transition: 'color 0.2s ease',
  },
  content: {},
  crimeGroupCard: {
    '& .ant-card-body': {
      padding: '12px 16px',
    },
    '&$currentCard': {
      backgroundColor: theme.itemSelectedBackground,
      borderLeft: `2px solid ${theme.primary}`,
    },
    '&:hover': {
      backgroundColor: theme.itemHoverBackground,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    },
    backgroundColor: theme.componentBackground,
    border: `1px solid ${theme.borderColor}`,
    borderRadius: 8,
    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.04)',
    cursor: 'pointer',
    marginBottom: 16,
    overflow: 'hidden',
    transition: 'all 0.3s ease',
  },
  crimeGroupItem: {},
  currentCard: {},
  currentCollapsedItem: {
    '& $collapsedRef': {
      color: theme.primary,
      fontWeight: 700,
    },
    backgroundColor: theme.itemSelectedBackground,
    borderColor: theme.primary,
    borderWidth: 2,
  },
  detailLabel: {},
  detailValue: {},
  detailsContainer: {},
  divider: {},
  emptyIcon: {
    color: theme.secondaryText,
    fontSize: 48,
  },
  emptyState: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    padding: '48px 24px',
    textAlign: 'center',
  },
  emptySubtext: {
    color: theme.secondaryText,
    fontSize: 14,
  },
  emptyText: {
    color: theme.headerColor,
    fontSize: 16,
    fontWeight: 500,
  },
  expandButton: {},
  expandedContent: {},
  header: {},
  headerTitle: {},
  hoverCard: {
    backgroundColor: theme.componentBackground,
    borderRadius: 12,
    boxShadow:
      theme.colorScheme === 'dark'
        ? '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)'
        : '0 8px 32px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)',
    left: 60,
    marginLeft: 8,
    opacity: 0,
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    transition: 'opacity 0.3s ease, visibility 0.3s ease',
    visibility: 'hidden',
    width: 280,
    zIndex: 1100,
  },
  icon: {
    color: theme.secondaryText,
    fontSize: 16,
    marginTop: 2,
  },
  image: {},
  imageSkeleton: {},
  incidentTag: {
    fontSize: 12,
    fontWeight: 600,
    minWidth: 32,
    textAlign: 'center',
  },
  itemContainer: {},
  lastOffence: {},
  name: {},
  offenderItem: {},
  // Legacy styles kept for backward compatibility
  offenderSideList: {},
  reference: {
    fontSize: 16,
    fontWeight: 600,
    lineHeight: '22px',
  },
  scrollContainer: {
    '& > div': {
      gap: 0,
    },
    flex: 1,
    overflowY: 'auto',
    padding: '0 16px 16px 16px',
  },
  searchContainer: {
    padding: '48px 16px 16px 16px',
  },

  sideListContainer: {
    '&$collapsed': {
      overflow: 'visible',
      width: 60,
    },
    backgroundColor: theme.bodyBackground,
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    maxHeight: '100vh',
    overflow: 'hidden',
    position: 'sticky',
    top: 0,
    transition: 'width 0.3s ease',
    width: 260,
  },

  sideListHeader: {},

  statContent: {
    flex: 1,
    minWidth: 0,
  },

  statItem: {
    alignItems: 'flex-start',
    display: 'flex',
    gap: 8,
    padding: '4px 0',
  },

  statLabel: {
    color: theme.secondaryText,
    fontSize: 11,
    lineHeight: '16px',
  },

  statValue: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '20px',
  },

  timeIcon: {},
  titleContent: {},
  titleRow: {},
  updatedRow: {},
  updatedText: {},
}));

export default useStyles;
