import { createUseStyles } from 'react-jss';
import type { Theme } from 'configs/ThemeConfig';

const useStyles = createUseStyles((theme: Theme) => ({
  toolbar: {
    backgroundColor: '#FFF',
    padding: 10,
  },
  cardPreviewSection: {
    backgroundColor: theme.bodyBackground,
    width: '100%',
    display: 'flex',
    padding: 30,
    justifyContent: 'center',
  },
  mockupCard: {
    height: 400,
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    border: `1px solid ${theme.borderColor}`,
  },
  cardImage: {
    width: '100%',
    height: 200,
  },
  cardBody: {
    padding: '15px 10px',
  },
  select: {
    width: 200,
  },
}));

export default useStyles;
