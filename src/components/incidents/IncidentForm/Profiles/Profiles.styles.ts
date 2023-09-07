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
  buttonLeft: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  buttonRight: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderLeft: 'none',
  },
  modalImage: {
    width: 580,
    height: 500,
  },
  faceRow: {
    borderRadius: 10,
    border: `1px solid ${theme.borderColor}`,
    width: '100%',
    height: 100,
    marginBottom: 10,
  },
  selectedFaceRow: {
    borderRadius: 10,
    border: `1px solid ${theme.primary}`,
    width: '100%',
    height: 100,
    overflow: 'hidden',
    marginBottom: 10,
  },
  faceActions: {
    padding: '10px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 100,
  },
  faceColumn: {
    display: 'flex',
    flexDirection: 'column',
    // height: 'calc(100vh - 55px)',
    overFlowX: 'hidden',
  },
  faceImageColumn: {
    minHeight: '100%',
    backgroundColor: theme.imageBackgroundColor,
    display: 'flex',
    alignItems: 'center',
  },
  modalRow: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
  },
  facesContainer: {
    padding: '0px 20px',
  },
  facesHeaderContainer: {
    padding: '20px 20px 20px 20px',
  },
  facesHeader: {
    fontSize: 15,
    marginBottom: '0px !important',
  },
  buttonRow: {
    padding: '40px 20px 0px',
  },
  faces: {
    padding: '0px 20px',
    paddingTop: 20,
  },
  faceCard: {
    borderRadius: 10,
    border: `1px solid ${theme.borderColor}`,
    overflow: 'hidden',
    height: 150,
    cursor: 'pointer',
    position: 'relative',
    '&:hover': {
      '& $selectIcon': {
        color: '#ff6b72',
      },
    },
  },
  selectedFaceCard: {
    borderRadius: 10,
    border: `1px solid ${theme.borderColor}`,
    overflow: 'hidden',
    height: 150,
    position: 'relative',
  },
  clearIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    height: 24,
    width: 24,
    borderRadius: 100,
    backgroundColor: theme.borderColor,
    opacity: 0.7,
    zIndex: 2,
    cursor: 'pointer',
    '&:hover': {
      color: '#ff6b72',
      backgroundColor: '#FFF',
    },
  },
  selectIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    height: 24,
    width: 24,
    borderRadius: 100,
    backgroundColor: '#FFF',
    color: 'rgba(0,0,0,0.1)',
    opacity: 0.7,
    zIndex: 2,
  },
  selectedIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    height: 24,
    width: 24,
    borderRadius: 100,
    backgroundColor: '#FFF',
    color: theme.primary,
    zIndex: 2,
  },
  selectedFace: {
    padding: '20px 20px',
    borderRight: `1px solid ${theme.borderColor}`,
  },
  selectedFaceTitle: {
    marginBottom: '4px !important',
    fontWeight: 700,
  },
  facesRow: {
    borderTop: `1px solid ${theme.borderColor}`,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: '75%',
    bottom: '75%',
    borderBottomLeftRadius: '50%',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
}));

export default useStyles;
