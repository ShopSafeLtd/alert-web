import type { Theme } from 'configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  approveBar: {
    backgroundColor: theme.bodyBackground,
    borderTop: `1px solid ${theme.borderColor}`,
    bottom: 0,
    left: 0,
    padding: '10px 15px 10px',
    position: 'absolute',
    right: 0,
    width: 'calc(100% - 1px)',
    zIndex: 10,
  },
  centerCell: {
    alignItems: 'center',
    display: 'flex',
  },
  checkBox: {
    color: theme.borderColor,
    position: 'absolute',
    right: 8,
    top: 3,
    zIndex: 100,
  },
  content: {
    height: '100vh',
    width: '100%',
  },
  desc: {
    marginBottom: 30,
  },
  descIcon: {
    marginRight: 10,
  },
  descItem: { overflow: 'auto', paddingBottom: '10px !important' },
  details: {
    padding: '0px 15px 70px 8px',
    position: 'relative',
  },
  detailsContainer: {
    height: '100%',
  },
  // details: {
  //   padding: '15px 20px',
  detailsContent: {
    background: theme.bodyBackground,
    borderRight: `1px solid ${theme.borderColor}`,
    height: '100vh',
    overflow: 'auto',
  },
  detailsHeader: {
    paddingRight: 20,
  },
  exclusions: {
    marginBottom: 30,
  },
  headerBar: {
    alignItems: 'center',
    display: 'flex',
    padding: '7px 0px 3px',
    width: '100%',
  },
  icon: { marginRight: 8 },
  image: {
    '@media only screen and (min-height: 800px)': {
      height: 230,
      width: 170,
    },
    backgroundColor: theme.imageBackgroundColor,
    border: `2px solid ${theme.borderColor}`,
    borderRadius: 10,
    cursor: 'pointer',
    height: 160,
    overflow: 'hidden',
    transition: 'all 0.3s ease-in-out',
    width: 150,
  },
  // },
  images: {
    margin: '10px 0 20px',
    overflowX: 'auto',
    overflowY: 'hidden',
    padding: '0px 10px',
    transition: 'all 0.3s ease-in-out',
    width: '100%',
  },
  offenderBadge: {
    position: 'absolute',
    right: 4,
    top: 4,
    zIndex: 2,
  },
  offenderParagraph: {
    background: 'rgba(0,0,0,.5)',
    color: '#FFF',
    left: 0,
    margin: 0,
    overflow: 'hidden',
    padding: '3px 10px 3px',
    position: 'absolute',
    right: 0,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  offenderRow: {
    overflowX: 'auto',
  },
  rightSidebar: {
    flex: '0 0 auto',
    height: '100vh',
    position: 'sticky',
    top: 0,
  },
  selectCard: {
    position: 'relative',
  },

  statsCard: {
    '& .ant-card-body': {
      padding: '16px 20px',
    },
  },
  tag: {
    marginBottom: 3,
  },
  tagLabel: { marginTop: 2 },
  updatesContainer: {
    height: '100%',
    position: 'relative',
  },
  viewOffender: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100%',
  },
}));

export default useStyles;
