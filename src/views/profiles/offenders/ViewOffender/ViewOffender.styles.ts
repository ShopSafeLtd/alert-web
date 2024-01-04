import type { Theme } from 'configs/ThemeConfig';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  viewOffender: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  detailsContainer: {
    height: '100%',
  },
  headerBar: {
    width: '100%',
    padding: '7px 0px 3px',
    display: 'flex',
    alignItems: 'center',
  },
  centerCell: {
    display: 'flex',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    height: '100vh',
  },
  details: {
    padding: '0px 15px 70px 8px',
    position: 'relative',
  },
  detailsHeader: {
    paddingRight: 20,
  },
  updatesContainer: {
    position: 'relative',
    height: '100%',
  },
  detailsContent: {
    background: theme.bodyBackground,
    height: '100vh',
    overflow: 'auto',
    borderRight: `1px solid ${theme.borderColor}`,
  },
  // details: {
  //   padding: '15px 20px',
  // },
  images: {
    width: '100%',
    padding: '0px 10px',
    margin: '10px 0 20px',
    transition: 'all 0.3s ease-in-out',
    overflowY: 'hidden',
    overflowX: 'auto',
  },
  image: {
    height: 160,
    width: 150,
    backgroundColor: theme.imageBackgroundColor,
    cursor: 'pointer',
    borderRadius: 10,
    border: `2px solid ${theme.borderColor}`,
    overflow: 'hidden',
    transition: 'all 0.3s ease-in-out',
    '@media only screen and (min-height: 800px)': {
      height: 230,
      width: 170,
    },
  },
  descIcon: {
    marginRight: 10,
  },
  desc: {
    marginBottom: 30,
  },
  exclusions: {
    marginBottom: 30,
  },
  offenderRow: {
    overflowX: 'auto',
  },
  tagLabel: { marginTop: 2 },
  descItem: { paddingBottom: '10px !important', overflow: 'auto' },
  tag: {
    marginBottom: 3,
  },

  offenderParagraph: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    background: 'rgba(0,0,0,.5)',
    color: '#FFF',
    position: 'absolute',
    padding: '3px 10px 3px',
    left: 0,
    right: 0,
    margin: 0,
  },
  offenderBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    zIndex: 2,
  },
  approveBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.bodyBackground,
    borderTop: `1px solid ${theme.borderColor}`,
    width: 'calc(100% - 1px)',
    padding: '10px 15px 10px',
    zIndex: 10,
  },

  icon: { marginRight: 8 },
  selectCard: {
    position: 'relative',
  },
  checkBox: {
    position: 'absolute',
    top: 3,
    right: 8,
    zIndex: 100,
    color: theme.borderColor,
  },
}));

export default useStyles;
