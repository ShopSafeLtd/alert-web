import type { Theme } from 'configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  actions: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    marginTop: 16,
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
      minHeight: '500px',
    },
  },
  playerContainer: {
    alignItems: 'center',
    backgroundColor: theme.colorScheme === 'dark' ? '#000' : '#f0f0f0',
    display: 'flex',
    justifyContent: 'center',
    minHeight: '500px',
    padding: 16,
  },
}));

export default useStyles;
