import { createUseStyles } from 'react-jss';

import type { Theme } from '../../../../../configs/ThemeConfig';

const useStyles = createUseStyles((theme: Theme) => ({
  // Activities styles
  activitiesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  activityAssignees: {
    alignItems: 'center',
    display: 'flex',
    gap: 12,
    marginTop: 8,
  },
  activityAvatar: {
    '&:hover': {
      backgroundColor: (theme.primaryHover || theme.primary) as string,
    },
    backgroundColor: theme.primary,
    color: '#fff',
    cursor: 'pointer',
    fontSize: 11,
    fontWeight: 600,
  },
  activityCard: {
    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.04)' : '#f5f5f5',
      borderColor: theme.primary,
      boxShadow:
        theme.colorScheme === 'dark'
          ? '0 4px 12px rgba(0, 0, 0, 0.3)'
          : '0 4px 12px rgba(0, 0, 0, 0.08)',
      transform: 'translateY(-1px)',
    },
    backgroundColor:
      theme.colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.02)' : '#fafafa',
    border: `1px solid ${theme.borderColor}`,
    borderRadius: 8,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  activityDescription: {
    color: theme.text as string,
    fontSize: 13,
    lineHeight: 1.5,
    marginBottom: '0 !important',
    marginTop: 4,
  },
  activityDetailAvatar: {
    backgroundColor: theme.primary,
    color: '#fff',
    fontSize: 10,
    fontWeight: 600,
    marginTop: 2,
  },
  activityDetailIcon: {
    color: theme.secondaryText,
    fontSize: 14,
    marginTop: 4,
  },
  activityDetailItem: {
    alignItems: 'flex-start',
    display: 'flex',
    gap: 8,
  },
  activityDetailLabel: {
    color: theme.secondaryText,
    display: 'block',
    fontSize: 11,
    marginBottom: 2,
  },
  activityDetailValue: {
    color: theme.headerColor,
    display: 'block',
    fontSize: 13,
    fontWeight: 500,
  },
  activityDetails: {
    backgroundColor:
      theme.colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.02)' : '#f8f9fa',
    borderRadius: 6,
    marginTop: 8,
    padding: 12,
  },
  activityLabel: {
    color: theme.secondaryText,
    fontSize: 12,
    fontWeight: 500,
  },
  activityName: {
    color: theme.headerColor,
    display: 'block',
    fontSize: 14,
    fontWeight: 600,
  },
  activityReference: {
    color: theme.secondaryText,
    fontSize: 12,
    marginLeft: 8,
  },
  activityStatus: {
    fontSize: 11,
    fontWeight: 600,
    textTransform: 'uppercase',
  },
  centerCell: {
    alignItems: 'center',
    display: 'flex',
  },
  content: {
    height: '100%',
    overflow: 'visible',
    width: '100%',
  },
  desc: {
    marginBottom: 30,
    width: '100%',
  },
  descIcon: {
    marginRight: 10,
  },
  detail: {
    overflow: 'auto',
    paddingBottom: '8px !important',
  },
  details: {
    padding: '15px 20px',
  },

  detailsContainer: {
    height: '100%',
    overflow: 'auto',
    padding: 15,
    paddingBottom: 0,
    position: 'relative',
  },

  detailsContent: {
    background: theme.bodyBackground,
    borderRight: `1px solid ${theme.borderColor}`,
    height: '100%',
    overflow: 'auto',
  },

  detailsHeader: {
    paddingRight: 20,
  },

  headerBar: {
    alignItems: 'center',
    borderBottom: `1px solid ${theme.borderColor}`,
    display: 'flex',
    height: 60,
    padding: '7px 20px',
    width: '100%',
  },

  headerCard: {
    '& .ant-card-body': {
      padding: '24px 32px',
    },
    borderRadius: 12,
    boxShadow:
      theme.colorScheme === 'dark'
        ? '0 2px 8px rgba(0, 0, 0, 0.3)'
        : '0 2px 8px rgba(0, 0, 0, 0.08)',
    marginBottom: 20,
  },

  headerTitle: {
    marginBottom: '0px !important',
  },

  image: {
    '&:hover': {
      '@media only screen and (min-height: 800px)': {
        height: 240,
        width: 240,
      },
      height: 170,
      width: 170,
    },
    '@media only screen and (min-height: 800px)': {
      height: 230,
      width: 230,
    },
    backgroundColor: theme.imageBackgroundColor,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    borderRadius: 5,
    cursor: 'pointer',
    height: 160,
    transition: 'all 0.3s ease-in-out',
    width: 160,
  },

  images: {
    '@media only screen and (min-height: 800px)': {
      height: 250,
    },
    height: 180,
    overflowX: 'auto',
    overflowY: 'hidden',
    padding: '0px 10px',
    transition: 'all 0.3s ease-in-out',
    width: '100%',
  },

  investigationDescription: {
    color: theme.secondaryText,
    fontSize: 15,
    lineHeight: 1.6,
    margin: 0,
  },

  investigationTitle: {
    color: theme.headerColor,
    marginBottom: '8px !important',
  },

  page: {
    padding: 20,
  },

  // Sidebar Styles
  rightSidebar: {
    flex: '0 0 auto',
    height: '100vh',
    position: 'sticky',
    top: 0,
  },

  sidebar: {
    backgroundColor: theme.componentBackground,
    borderLeft: `1px solid ${theme.borderColor}`,
    boxShadow:
      theme.colorScheme === 'dark'
        ? '-4px 0 12px rgba(0, 0, 0, 0.3)'
        : '-4px 0 12px rgba(0, 0, 0, 0.08)',
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    position: 'relative',
    transition: 'width 0.3s ease',
  },

  sidebarBody: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden',
  },

  sidebarContent: {
    backgroundColor: theme.componentBackground,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden',
    padding: 0,
    width: 420,
  },

  sidebarFooter: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.bodyBackground : '#fafafa',
    borderTop: `1px solid ${theme.borderColor}`,
    padding: 16,
  },

  sidebarHeader: {
    alignItems: 'center',
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.bodyBackground : '#fafafa',
    borderBottom: `1px solid ${theme.borderColor}`,
    display: 'flex',
    justifyContent: 'space-between',
    padding: '16px 20px',
  },

  sidebarMenu: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.bodyBackground : '#f5f5f5',
    borderRight: `1px solid ${theme.borderColor}`,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    height: '100%',
    overflowY: 'auto',
    padding: '20px 12px',
    width: 60,
  },

  sidebarMenuBadge: {
    backgroundColor: theme.primary,
    borderRadius: 10,
    color: '#fff',
    fontSize: 10,
    fontWeight: 600,
    minWidth: 18,
    padding: '1px 4px',
    position: 'absolute',
    right: 2,
    textAlign: 'center',
    top: 2,
  },

  sidebarMenuDivider: {
    backgroundColor: theme.borderColor,
    height: 1,
    margin: '16px 0',
    width: '100%',
  },

  sidebarMenuIcon: {
    fontSize: 20,
  },

  sidebarMenuItem: {
    '&:hover': {
      '& svg': {
        color: theme.primary,
      },
      backgroundColor:
        theme.colorScheme === 'dark'
          ? 'rgba(255, 255, 255, 0.08)'
          : 'rgba(0, 0, 0, 0.04)',
    },
    alignItems: 'center',
    borderRadius: 8,
    color: theme.secondaryText,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    padding: '10px 8px',
    position: 'relative',
    transition: 'all 0.2s ease',
  },

  sidebarMenuItemActive: {
    '& svg': {
      color: theme.primary,
    },
    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? 'rgba(24, 144, 255, 0.25)'
          : 'rgba(24, 144, 255, 0.12)',
    },
    backgroundColor:
      theme.colorScheme === 'dark'
        ? 'rgba(24, 144, 255, 0.15)'
        : 'rgba(24, 144, 255, 0.08)',
    color: theme.primary,
  },

  sidebarMenuLabel: {
    fontSize: 10,
    fontWeight: 500,
    textAlign: 'center',
  },

  sidebarSuggestions: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },

  sidebarToggle: {
    '& svg': {
      color: theme.secondaryText,
      fontSize: 16,
      transition: 'color 0.2s ease',
    },
    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? 'rgba(255, 255, 255, 0.08)'
          : 'rgba(0, 0, 0, 0.04)',
      borderColor: theme.primary,
    },
    '&:hover svg': {
      color: theme.primary,
    },
    alignItems: 'center',
    backgroundColor: theme.componentBackground,
    border: `1px solid ${theme.borderColor}`,
    borderRadius: '8px 0 0 8px',
    boxShadow:
      theme.colorScheme === 'dark'
        ? '-2px 0 8px rgba(0, 0, 0, 0.3)'
        : '-2px 0 8px rgba(0, 0, 0, 0.08)',
    cursor: 'pointer',
    display: 'flex',
    height: 32,
    justifyContent: 'center',
    left: -32,
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    transition: 'all 0.2s ease',
    width: 32,
  },

  statsCard: {
    '& .ant-card-body': {
      padding: '20px 16px',
    },
    '& .ant-statistic': {
      textAlign: 'center',
    },
    '& .ant-statistic-content': {
      color: theme.textColor as string,
      fontSize: 28,
      fontWeight: 600,
      lineHeight: 1.2,
    },
    '& .ant-statistic-title': {
      color: theme.secondaryText,
      fontSize: 13,
      fontWeight: 500,
      letterSpacing: '0.5px',
      marginBottom: 8,
      textTransform: 'uppercase',
    },
    '&:hover': {
      boxShadow:
        theme.colorScheme === 'dark'
          ? '0 4px 16px rgba(0, 0, 0, 0.4)'
          : '0 4px 16px rgba(0, 0, 0, 0.12)',
      transform: 'translateY(-2px)',
    },
    borderRadius: 12,
    boxShadow:
      theme.colorScheme === 'dark'
        ? '0 2px 8px rgba(0, 0, 0, 0.3)'
        : '0 2px 8px rgba(0, 0, 0, 0.08)',
    height: '100%',
    transition: 'all 0.3s ease',
  },

  statsContainer: {
    marginTop: 24,
  },

  suggestionActions: {
    borderTop: `1px solid ${theme.borderColor}`,
    marginTop: 12,
    paddingTop: 12,
  },

  suggestionCard: {
    '&:hover': {
      borderColor: theme.primary,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      cursor: 'pointer',
    },
    border: `1px solid ${theme.borderColor}`,
    marginBottom: 0,
    transition: 'all 0.2s ease',
  },

  suggestionImage: {
    '& img': {
      borderRadius: 8,
      height: 60,
      objectFit: 'cover',
      width: 60,
    },
    height: 60,
    overflow: 'hidden',
    width: 60,
  },

  suggestionImagePlaceholder: {
    alignItems: 'center',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? 'rgba(255, 255, 255, 0.08)'
        : 'rgba(0, 0, 0, 0.04)',
    borderRadius: 8,
    color: theme.secondaryText,
    display: 'flex',
    fontSize: 24,
    height: 60,
    justifyContent: 'center',
    width: 60,
  },

  suggestionIncidentDetail: {
    alignItems: 'center',
    display: 'flex',
    gap: 8,
    marginTop: 4,
  },

  suggestionIncidentType: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? 'rgba(24, 144, 255, 0.15)'
        : 'rgba(24, 144, 255, 0.08)',
    borderRadius: 4,
    color: theme.primary,
    fontSize: 10,
    fontWeight: 600,
    padding: '2px 6px',
    textTransform: 'uppercase',
  },

  suggestionIncidentValue: {
    color: theme.headerColor,
    fontSize: 12,
    fontWeight: 600,
  },

  suggestionIncidents: {
    '& span': {
      color: theme.secondaryText,
      fontSize: 11,
      fontWeight: 500,
    },
    '& svg': {
      color: theme.secondaryText,
      fontSize: 12,
      marginRight: 4,
    },
    alignItems: 'center',
    display: 'flex',
    marginTop: 6,
  },

  suggestionInfo: {
    '& span': {
      '&:not(:last-child):after': {
        content: '"•"',
        marginLeft: 8,
      },
      color: theme.secondaryText,
      fontSize: 11,
      marginRight: 8,
    },
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: 2,
  },

  suggestionName: {
    display: 'block',
    fontSize: 14,
    lineHeight: 1.4,
    marginBottom: 2,
  },

  suggestionRef: {
    color: theme.secondaryText,
    display: 'block',
    fontSize: 12,
    marginBottom: 4,
  },

  suggestionsDescription: {
    color: theme.secondaryText,
    display: 'block',
    fontSize: 13,
    lineHeight: 1.5,
  },

  suggestionsHeader: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? 'rgba(255, 255, 255, 0.02)'
        : 'rgba(0, 0, 0, 0.02)',
    borderRadius: 8,
    marginBottom: 8,
    padding: 12,
  },

  suggestionsTitle: {
    color: theme.headerColor,
    display: 'block',
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 4,
  },

  table: {
    marginTop: 10,
  },

  updatesContainer: {
    borderLeft: `1px solid ${theme.borderColor}`,
    height: '100%',
    position: 'relative',
  },
}));

export default useStyles;
