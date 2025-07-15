import type { Theme } from 'configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  activeCollapsedItem: {
    backgroundColor: theme.itemSelectedBackground,
    borderColor: theme.borderColor,
    borderWidth: 2,
    fontWeight: 700,
  },

  activeItemCard: {
    backgroundColor: theme.itemSelectedBackground,
    borderLeft: `2px solid ${theme.borderColor}`,
  },

  collapseButton: {
    color: theme.secondaryText,
  },

  collapseButtonContainer: {
    position: 'absolute',
    right: 8,
    top: 12,
    zIndex: 10,
  },

  collapsed: {
    '& $listContainer': {
      overflow: 'visible',
      overflowY: 'visible',
      padding: '48px 4px 8px 4px',
    },

    '& $searchContainer': {
      display: 'none',
    },

    width: '60px !important',
  },

  collapsedContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    overflow: 'visible',
    width: '100%',
  },

  collapsedItem: {
    '&:hover': {
      backgroundColor: theme.itemHoverBackground,
      borderColor: theme.borderColor,
    },
    alignItems: 'center',
    backgroundColor: 'transparent',
    border: `1px solid ${theme.borderColor}`,
    borderRadius: 6,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 6,
    marginLeft: 8,
    marginRight: 8,
    padding: '8px 4px',

    transition: 'all 0.2s ease',
  },

  collapsedReference: {
    color: theme.secondaryText,
    fontSize: 12,
    fontWeight: 600,
    textAlign: 'center',
    transition: 'color 0.2s ease',
  },

  container: {
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

  createButton: {
    marginTop: 16,
  },

  emptyIcon: {
    color: theme.secondaryText,
    fontSize: 48,
    marginBottom: 16,
  },

  emptyState: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    padding: 40,
    textAlign: 'center',
  },

  emptySubtext: {
    color: theme.secondaryText,
    fontSize: 13,
    opacity: 0.8,
  },

  emptyText: {
    color: theme.secondaryText,
    fontSize: 14,
    marginBottom: 8,
  },

  groupTag: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? 'rgba(140, 140, 140, 0.15)'
        : 'rgba(140, 140, 140, 0.08)',
    border: `1px solid ${
      theme.colorScheme === 'dark'
        ? 'rgba(140, 140, 140, 0.3)'
        : 'rgba(140, 140, 140, 0.2)'
    }`,
    borderRadius: 4,
    color: theme.secondaryText,
    fontSize: 10,
    fontWeight: 500,
    padding: '2px 6px',
    whiteSpace: 'nowrap',
  },

  icon: {
    color: theme.secondaryText,
    fontSize: 16,
    marginTop: 2,
  },

  itemCard: {
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
    padding: '12px 16px',

    transition: 'all 0.3s ease',
  },

  itemContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    overflow: 'hidden',
    width: '100%',
  },

  itemDescription: {
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    color: theme.secondaryText,
    display: '-webkit-box',
    fontSize: 13,
    lineHeight: '18px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  itemDivider: {
    backgroundColor: theme.borderColor,
    height: 1,
    margin: '4px 0',
  },
  itemGroups: {
    alignItems: 'center',
    display: 'flex',
    gap: 4,
    marginTop: 4,
  },
  itemHeader: {
    alignItems: 'flex-start',
    display: 'flex',
    gap: 8,
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  itemHeaderText: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    gap: 2,
    minWidth: 0,
    overflow: 'hidden',
  },

  itemName: {
    color: theme.headerColor,
    display: 'block',
    fontSize: 16,
    fontWeight: 600,
    lineHeight: '22px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
  },

  itemReference: {
    color: theme.secondaryText,
    display: 'block',
    fontSize: 13,
    lineHeight: '18px',
  },

  itemStat: {
    alignItems: 'flex-start',
    display: 'flex',
    gap: 8,
    padding: '4px 0',
  },

  itemStats: {
    display: 'grid',
    gap: '8px 16px',
    gridTemplateColumns: '1fr 1fr',
  },

  listContainer: {
    '& > div': {
      gap: 0,
    },
    flex: 1,
    overflowY: 'auto',
    padding: '0 8px 16px 8px',
    paddingTop: '8px',
  },

  moreGroups: {
    color: theme.secondaryText,
    fontSize: 10,
    fontWeight: 500,
  },

  searchContainer: {
    padding: '48px 8px 12px 8px',
    position: 'relative',
  },

  statContent: {
    color: theme.headerColor,
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    gap: 0,
    minWidth: 0,
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
}));

export default useStyles;
