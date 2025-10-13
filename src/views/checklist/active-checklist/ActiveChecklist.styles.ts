import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(() => ({
  form: {
    '& .ant-form-item-control-input': {
      minHeight: 0,
    },
    '& .ant-upload.ant-upload-select-picture-card': {
      height: '125px',
      width: '125px',
    },
  },
  sideMargin: {
    marginLeft: 10,
  },
}));

export default useStyles;
