import { createUseStyles } from 'react-jss';
import type { Theme } from 'configs/ThemeConfig';

const useStyles = createUseStyles((theme: Theme) => ({
  profileCard: {
    border: `2px solid ${theme.borderColor}`,
    borderRadius: 10,
    display: 'flex',
    overflow: 'hidden',
    maxWidth: 560,
    minHeight: 210,
    position: 'relative',
  },
  profileCardInvalid: {
    border: `2px solid ${theme.primary}`,
    borderRadius: 10,
    display: 'flex',
    overflow: 'hidden',
    maxWidth: 560,
    position: 'relative',
  },
  profileContent: {
    padding: '10px 20px',
    display: 'flex',
    flexDirection: 'column',
  },
  profileDetails: {
    maxWidth: 300,
  },
  profileImage: {
    minWidth: 200,
    height: 210,
    width: 210,
    backgroundColor: theme.imageBackgroundColor,
  },
  profileText: {
    marginBottom: 8,
  },
  involvedContainer: {
    padding: '10px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  involvedQuestion: {
    width: 200,
    fontSize: 15,
    fontWeight: 500,
    marginBottom: '10px !important',
  },
  grow: {
    flex: 1,
  },
  countCard: {
    border: `1px solid ${theme.borderColor}`,
    borderRadius: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '6px 12px',
    cursor: 'pointer',
    userSelect: 'none',
    '&:hover': {
      backgroundColor: theme.hoverBackground,
    },
  },
  countCardSelected: {
    border: `1px solid ${theme.primary}`,
    borderRadius: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '6px 12px',
    cursor: 'pointer',
    userSelect: 'none',
    color: theme.primary,
    '&:hover': {
      backgroundColor: theme.hoverBackground,
    },
  },
  countCardContainer: {
    border: `1px solid ${theme.borderColor}`,
    borderRadius: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  countCardContent: {
    cursor: 'pointer',
    padding: '0px 5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      backgroundColor: theme.hoverBackground,
    },
  },
  countCardButtonRight: {
    padding: '6px 8px 6px 8px',
    '&:hover': {
      backgroundColor: theme.hoverBackground,
    },
    userSelect: 'none',
    cursor: 'pointer',
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
  },
  countCardButtonLeft: {
    padding: '6px 8px 6px 8px',
    userSelect: 'none',
    '&:hover': {
      backgroundColor: theme.hoverBackground,
    },
    cursor: 'pointer',
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
  },
  subHeader: {
    fontSize: 14,
    fontWeight: 500,
    marginBottom: 20,
    marginTop: 20,
    color: '#FFF',
  },
  subHeaderRequired: {
    display: 'inline-block',
    marginRight: 4,
    color: '#ff6b72',
    fontSize: 14,
    fontFamily: 'SimSun, sans-serif',
    lineHeight: 1,
    content: '*',
  },
  countText: {},
  countTextSelected: {
    color: theme.primary,
  },
  redButton: {
    color: theme.primaryLight,
  },
  dividerText: {
    fontSize: 12,
  },
  mergeCheck: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  mergeButton: {
    marginBottom: 10,
  },
}));

export default useStyles;
