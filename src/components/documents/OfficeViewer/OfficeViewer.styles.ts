import type { Theme } from 'configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((_theme: Theme) => ({
  actions: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    marginTop: 16,
  },
  iframe: {
    border: 'none',
    height: '100%',
    width: '100%',
  },
  loadingContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  metadata: {
    '@media only screen and (max-width: 992px)': {
      marginBottom: 16,
    },
    padding: 16,
  },
  modal: {
    '& .ant-modal-body': {
      padding: 0,
    },
    '& .ant-modal-content': {
      height: '85vh',
    },
  },
  viewerContainer: {
    height: '85vh',
    position: 'relative',
    width: '100%',
  },
}));

export default useStyles;
