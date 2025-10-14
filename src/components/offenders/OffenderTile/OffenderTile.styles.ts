import { createUseStyles } from 'react-jss';

const styles = createUseStyles({
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
    flexWrap: 'nowrap',
    height: 155,
    marginLeft: -10,
    overflow: 'auto',
    overflowY: 'hidden',
  },
});

export default styles;
