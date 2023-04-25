import { createUseStyles } from 'react-jss';

const styles = createUseStyles({
  offenderRow: {
    overflow: 'auto',
    flexWrap: 'nowrap',
    height: 155,
    overflowY: 'hidden',
    marginLeft: -10,
  },
  offenderParagraph: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    background: 'rgba(0,0,0,.5)',
    color: '#FFF',
    position: 'absolute',
    left: 0,
    right: 0,
    margin: 0,
    padding: '3px 10px 3px',
  },
});

export default styles;
