import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { HelpButton } from '../../actions';

const List = styled.div`
  flex: 1;
`;
const ListItem = styled.div`
  display: flex;
  align-items: center;
  margin: 3px 0;
  cursor: pointer;
  border-bottom: 1px solid #eeeeee;
  height: 50px;
  padding: 0 20px;
`;

const ItemText = styled(Typography)`
  margin: 0;
  flex: 1;
  padding-left: 15px;
  height: 50px;
  display: flex;
  align-items: center;
`;

const Svg = styled.svg`
  height: 30px;
  width: 30px;
`;

class CheckList extends PureComponent {
  render() {
    const {
      menuItems,
      onClick,
      selected,
      onAdd,
      addText,
      disabled
    } = this.props;
    return (
      <List>
        {menuItems.map(({ value, helpText, label, uploading }) => (
          <ListItem key={value}>
            {!!uploading && uploading ? (
              <CircularProgress size={25} />
            ) : (
              <Svg
                onClick={() => !uploading && !disabled && onClick(value)}
                viewBox="0 0 24 24"
              >
                <path
                  fill={selected.includes(value) ? '#1E88E5' : '#E0E0E0'}
                  d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"
                />
              </Svg>
            )}
            <ItemText onClick={() => !uploading && !disabled && onClick(value)}>
              {label}
            </ItemText>
            {!!helpText && <HelpButton helpText={helpText} />}
          </ListItem>
        ))}
        {!!onAdd && (
          <ListItem onClick={() => onAdd()}>
            <Svg viewBox="0 0 24 24">
              <path
                fill="#EF5350"
                d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z"
              />
            </Svg>
            <ItemText>{!!addText ? addText : 'Add New'}</ItemText>
          </ListItem>
        )}
      </List>
    );
  }
}

export default CheckList;
