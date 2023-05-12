import type { Theme } from 'configs/ThemeConfig';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  viewOffender: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
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
    padding: '0px 10px',
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
  details: {
    padding: '15px 20px',
  },
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
  tag: {
    marginTop: -3,
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
}));

export default useStyles;
