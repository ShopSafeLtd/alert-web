import type { Theme } from 'configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  buttonLeft: {
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  buttonRight: {
    borderBottomLeftRadius: 0,
    borderLeft: 'none',
    borderTopLeftRadius: 0,
  },
  buttonRow: {
    padding: '40px 20px 0px',
  },
  clearIcon: {
    '&:hover': {
      backgroundColor: '#FFF',
      color: '#ff6b72',
    },
    backgroundColor: theme.borderColor,
    borderRadius: 100,
    cursor: 'pointer',
    height: 24,
    opacity: 0.7,
    position: 'absolute',
    right: 5,
    top: 5,
    width: 24,
    zIndex: 2,
  },
  countCard: {
    '&:hover': {
      backgroundColor: theme.hoverBackground,
    },
    alignItems: 'center',
    border: `1px solid ${theme.borderColor}`,
    borderRadius: 100,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    padding: '6px 12px',
    userSelect: 'none',
  },
  countCardButtonLeft: {
    '&:hover': {
      backgroundColor: theme.hoverBackground,
    },
    borderBottomLeftRadius: 100,
    borderTopLeftRadius: 100,
    cursor: 'pointer',
    padding: '6px 8px 6px 8px',
    userSelect: 'none',
  },
  countCardButtonRight: {
    '&:hover': {
      backgroundColor: theme.hoverBackground,
    },
    borderBottomRightRadius: 100,
    borderTopRightRadius: 100,
    cursor: 'pointer',
    padding: '6px 8px 6px 8px',
    userSelect: 'none',
  },
  countCardContainer: {
    alignItems: 'center',
    border: `1px solid ${theme.borderColor}`,
    borderRadius: 100,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
  },
  countCardContent: {
    '&:hover': {
      backgroundColor: theme.hoverBackground,
    },
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    padding: '0px 5px',
  },
  countCardSelected: {
    '&:hover': {
      backgroundColor: theme.hoverBackground,
    },
    alignItems: 'center',
    border: `1px solid ${theme.primary}`,
    borderRadius: 100,
    color: theme.primary,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    padding: '6px 12px',
    userSelect: 'none',
  },
  countText: {},
  countTextSelected: {
    color: theme.primary,
  },
  dividerText: {
    fontSize: 12,
  },
  faceActions: {
    alignItems: 'center',
    display: 'flex',
    height: 100,
    justifyContent: 'flex-end',
    padding: '10px 20px',
  },
  faceCard: {
    '&:hover': {
      '& $selectIcon': {
        color: '#ff6b72',
      },
    },
    border: `1px solid ${theme.borderColor}`,
    borderRadius: 10,
    cursor: 'pointer',
    height: 150,
    overflow: 'hidden',
    position: 'relative',
  },
  faceColumn: {
    display: 'flex',
    flexDirection: 'column',
    // height: 'calc(100vh - 55px)',
    overFlowX: 'hidden',
  },
  faceImageColumn: {
    alignItems: 'center',
    backgroundColor: theme.imageBackgroundColor,
    display: 'flex',
    minHeight: '100%',
  },
  faceRow: {
    border: `1px solid ${theme.borderColor}`,
    borderRadius: 10,
    height: 100,
    marginBottom: 10,
    width: '100%',
  },
  faces: {
    padding: '0px 20px',
    paddingTop: 20,
  },
  facesContainer: {
    padding: '0px 20px',
  },
  facesHeader: {
    fontSize: 15,
    marginBottom: '0px !important',
  },
  facesHeaderContainer: {
    padding: '20px 20px 20px 20px',
  },
  facesRow: {
    borderTop: `1px solid ${theme.borderColor}`,
  },
  grow: {
    flex: 1,
  },
  involvedContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '10px 20px',
    width: 230,
  },
  involvedQuestion: {
    fontSize: 15,
    fontWeight: 500,
    marginBottom: '10px !important',
    width: 200,
  },
  mergeButton: {
    marginBottom: 10,
  },
  mergeCheck: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  modalImage: {
    height: 500,
    width: 580,
  },
  modalRow: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderBottomLeftRadius: '50%',
    bottom: '75%',
    left: '75%',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  profileCard: {
    border: `2px solid ${theme.borderColor}`,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    maxWidth: 560,
    minHeight: 210,
    overflow: 'hidden',
    position: 'relative',
  },
  profileCardInvalid: {
    border: `2px solid ${theme.primary}`,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    maxWidth: 560,
    overflow: 'hidden',
    position: 'relative',
  },
  profileContent: {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px 20px',
  },
  profileDetails: {
    maxWidth: 300,
  },
  profileImage: {
    backgroundColor: theme.imageBackgroundColor,
    height: 210,
    minWidth: 200,
    width: 210,
  },
  profileText: {
    marginBottom: 8,
  },
  redButton: {
    color: theme.primaryLight,
  },
  selectIcon: {
    backgroundColor: '#FFF',
    borderRadius: 100,
    color: 'rgba(0,0,0,0.1)',
    height: 24,
    opacity: 0.7,
    position: 'absolute',
    right: 5,
    top: 5,
    width: 24,
    zIndex: 2,
  },
  selectedFace: {
    borderRight: `1px solid ${theme.borderColor}`,
    padding: '20px 20px',
  },
  selectedFaceCard: {
    border: `1px solid ${theme.borderColor}`,
    borderRadius: 10,
    height: 150,
    overflow: 'hidden',
    position: 'relative',
  },
  selectedFaceRow: {
    border: `1px solid ${theme.primary}`,
    borderRadius: 10,
    height: 100,
    marginBottom: 10,
    overflow: 'hidden',
    width: '100%',
  },
  selectedFaceTitle: {
    fontWeight: 700,
    marginBottom: '4px !important',
  },
  selectedIcon: {
    backgroundColor: '#FFF',
    borderRadius: 100,
    color: theme.primary,
    height: 24,
    position: 'absolute',
    right: 5,
    top: 5,
    width: 24,
    zIndex: 2,
  },
  subHeader: {
    fontSize: 14,
    fontWeight: 500,
    marginBottom: 20,
    marginTop: 20,
  },
  subHeaderRequired: {
    color: '#ff6b72',
    content: '*',
    display: 'inline-block',
    fontFamily: 'SimSun, sans-serif',
    fontSize: 14,
    lineHeight: 1,
    marginRight: 4,
  },
}));

export default useStyles;
