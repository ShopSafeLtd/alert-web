import { createUseStyles } from 'react-jss';
import type { Theme } from 'configs/ThemeConfig';

const useStyles = createUseStyles((theme: Theme) => ({
  toolbar: {
    backgroundColor: theme.bodyBackground,
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
    backgroundColor: theme.componentBackground,
    overflow: 'hidden',
    border: `1px solid ${theme.borderColor}`,
    borderRadius: 10,
  },
  cardImage: {
    width: '100%',
    height: 200,
  },
  cardBody: {
    backgroundColor: theme.componentBackground,
    padding: '15px 10px',
  },
  select: {
    width: 150,
  },
}));

export default useStyles;
