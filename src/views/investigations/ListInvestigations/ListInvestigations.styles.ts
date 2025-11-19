import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  descriptionCell: {
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 4,
    display: '-webkit-box',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    wordBreak: 'break-word',
  },
  headerRow: {
    marginBottom: 10,
  },
  page: {
    padding: 20,
  },
  searchInput: {
    width: 400,
  },
});

export default useStyles;
