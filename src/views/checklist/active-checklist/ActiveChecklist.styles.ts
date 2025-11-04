import type { Theme } from 'configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  // Additional fields
  additionalInfoSection: {
    borderTop: `1px solid ${theme.borderColor}`,
    marginTop: 16,
    paddingTop: 16,
  },

  // Answer controls - Enhanced
  answerGroup: {
    '& .ant-radio-button-wrapper': {
      '&:hover': {
        transform: 'translateY(-2px)',
      },
      fontSize: 16,
      fontWeight: 500,
      height: 48,
      lineHeight: '46px',
      minWidth: 120,
      textAlign: 'center',
      transition: 'all 0.3s ease',
    },
    '& .ant-radio-button-wrapper-checked': {
      boxShadow:
        theme.colorScheme === 'dark'
          ? '0 2px 8px rgba(24, 144, 255, 0.3)'
          : '0 2px 8px rgba(24, 144, 255, 0.2)',
      fontWeight: 600,
    },
    marginBottom: 24,
  },
  // Section Collapse Panel
  collapsePanel: {
    '& .ant-collapse-content': {
      backgroundColor: theme.componentBackground,
    },
    '& .ant-collapse-content-box': {
      padding: '24px',
    },
    '& .ant-collapse-header': {
      alignItems: 'center',
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.itemHoverBackground : '#e6f7ff',
      color: theme.headerColor,
      display: 'flex',
      fontSize: 18,
      fontWeight: 600,
      padding: '16px 24px !important',
    },
    '& .ant-collapse-item': {
      backgroundColor: theme.componentBackground,
      border: `1px solid ${theme.borderColor}`,
      borderRadius: 8,
      marginBottom: 16,
      overflow: 'hidden',
      transition: 'all 0.3s ease',
    },
    marginBottom: 24,
  },
  fieldLabel: {
    color: theme.secondaryText,
    fontSize: 14,
    fontWeight: 500,
    marginBottom: 8,
  },

  // Main form container
  form: {
    '& .ant-form-item-control-input': {
      minHeight: 0,
    },
    '& .ant-upload.ant-upload-select-picture-card': {
      height: '125px',
      width: '125px',
    },
  },
  // Image upload
  imageUpload: {
    '& .ant-upload.ant-upload-select-picture-card': {
      '& .anticon': {
        color: theme.secondaryText,
        fontSize: 24,
      },
      '& > div': {
        color: theme.secondaryText,
        fontSize: 14,
        textAlign: 'center',
      },
      '&:hover': {
        borderColor: '#1890ff',
      },
      alignItems: 'center',
      backgroundColor: theme.componentBackground,
      border: `1px dashed ${theme.borderColor}`,
      borderRadius: 6,
      display: 'flex',
      height: 104,
      justifyContent: 'center',
      margin: 0,
      transition: 'border-color 0.3s ease',
      width: 104,
    },
    '& .ant-upload-list': {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8,
    },
    '& .ant-upload-list-picture-card-container': {
      height: 104,
      margin: 0,
      width: 104,
    },
  },
  optionalCollapse: {
    '& .ant-collapse-content': {
      backgroundColor: 'transparent',
      border: 'none',
    },
    '& .ant-collapse-content-box': {
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 12,
    },
    '& .ant-collapse-header': {
      '&:hover': {
        color: '#1890ff',
      },
      backgroundColor: 'transparent',
      color: theme.secondaryText,
      fontSize: 14,
      fontWeight: 500,
      padding: '8px 0 !important',
      transition: 'all 0.2s ease',
    },
    '& .ant-collapse-item': {
      border: 'none',
      borderRadius: 4,
    },
    backgroundColor: 'transparent',
  },
  optionalHeader: {
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    gap: 8,
  },

  // Optional sections (collapsible)
  optionalSection: {
    marginTop: 16,
  },

  progressBar: {
    marginBottom: 8,
  },
  // Progress Bar
  progressContainer: {
    backgroundColor: theme.componentBackground,
    borderBottom: `1px solid ${theme.borderColor}`,
    boxShadow:
      theme.colorScheme === 'dark'
        ? '0 2px 8px rgba(0,0,0,0.3)'
        : '0 2px 8px rgba(0,0,0,0.06)',
    marginBottom: 24,
    padding: '16px 24px',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  progressText: {
    color: theme.headerColor,
    fontSize: 14,
    fontWeight: 500,
  },

  // Question Card
  questionCard: {
    '&:hover': {
      borderColor: '#40a9ff',
      boxShadow:
        theme.colorScheme === 'dark'
          ? '0 2px 8px rgba(0,0,0,0.5)'
          : '0 2px 8px rgba(0,0,0,0.08)',
    },
    backgroundColor: theme.componentBackground,
    border: `1px solid ${theme.borderColor}`,
    borderRadius: 6,
    marginBottom: 16,
    padding: 20,
    transition: 'all 0.3s ease',
  },

  questionCardAnswered: {
    backgroundColor: 'transparent',
    borderLeft: '4px solid #52c41a',
    boxShadow: '0 0 0 1px rgba(82, 196, 26, 0.2)',
  },
  questionHeader: {
    alignItems: 'flex-start',
    color: theme.headerColor,
    display: 'flex',
    fontSize: 16,
    fontWeight: 500,
    gap: 8,
    marginBottom: 16,
  },

  questionNumber: {
    color: '#1890ff',
    fontWeight: 600,
    minWidth: 24,
  },
  // Save Status Indicator
  saveIndicator: {
    alignItems: 'center',
    borderRadius: 4,
    boxShadow:
      theme.colorScheme === 'dark'
        ? '0 2px 8px rgba(0,0,0,0.5)'
        : '0 2px 8px rgba(0,0,0,0.15)',
    display: 'flex',
    fontSize: 14,
    fontWeight: 500,
    gap: 8,
    padding: '8px 16px',
    position: 'fixed',
    right: 24,
    top: 80,
    transition: 'all 0.3s ease',
    zIndex: 1000,
  },
  saveIndicatorError: {
    backgroundColor:
      theme.colorScheme === 'dark' ? 'rgba(255, 77, 79, 0.1)' : '#fff2f0',
    border:
      theme.colorScheme === 'dark' ? '1px solid #ff4d4f' : '1px solid #ffccc7',
    color: '#ff4d4f',
  },
  saveIndicatorSaved: {
    backgroundColor:
      theme.colorScheme === 'dark' ? 'rgba(82, 196, 26, 0.1)' : '#f6ffed',
    border:
      theme.colorScheme === 'dark' ? '1px solid #52c41a' : '1px solid #b7eb8f',
    color: '#52c41a',
  },

  saveIndicatorSaving: {
    backgroundColor:
      theme.colorScheme === 'dark' ? 'rgba(24, 144, 255, 0.1)' : '#e6f7ff',
    border:
      theme.colorScheme === 'dark' ? '1px solid #1890ff' : '1px solid #91d5ff',
    color: '#1890ff',
  },

  // Section completion badge
  sectionBadge: {
    fontSize: 12,
    fontWeight: 500,
    marginLeft: 16,
  },
  sectionBadgeComplete: {
    color: '#52c41a',
  },
  sectionBadgeIncomplete: {
    color: '#faad14',
  },

  // Section Header
  sectionHeader: {
    borderBottom: `2px solid ${theme.borderColor}`,
    color: theme.headerColor,
    fontSize: 24,
    fontWeight: 600,
    marginBottom: 24,
    paddingBottom: 12,
  },

  // Spacing utilities
  sideMargin: {
    marginLeft: 10,
  },
  signatureHeader: {
    color: theme.headerColor,
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 16,
  },

  // Signature Section
  signatureSection: {
    backgroundColor: theme.componentBackground,
    border: `1px solid ${theme.borderColor}`,
    borderRadius: 8,
    marginTop: 32,
    padding: 24,
  },
  spacing: {
    lg: 32,
    md: 24,
    sm: 16,
    xl: 48,
    xs: 8,
  },

  // Subsection Container
  subsectionContainer: {
    backgroundColor: theme.cardSubsectionBackground,
    border: `1px solid ${theme.borderColor}`,
    borderRadius: 8,
    marginBottom: 24,
    padding: 20,
  },
  subsectionHeader: {
    alignItems: 'center',
    color: theme.headerColor,
    display: 'flex',
    fontSize: 18,
    fontWeight: 500,
    marginBottom: 16,
  },
}));

export default useStyles;
