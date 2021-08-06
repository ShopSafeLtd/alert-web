import React from 'react';
import styled from 'styled-components';

import { ListBody } from '../';

const Item = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
`;
const Disabled = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: uppercase;
`;

class ListItem extends React.Component {
  render() {
    const { action, to, disabled, primaryText } = this.props;

    let disabledStyle, text;
    if (disabled) {
      disabledStyle = {
        backgroundColor: '#F5F5F5'
      };
      text = (
        <span>
          {primaryText} <Disabled>(Disabled)</Disabled>
        </span>
      );
    } else {
      text = primaryText;
    }

    return (
      <Item style={disabledStyle}>
        <div>{action}</div>
        <ListBody primaryText={text} to={to} />
      </Item>
    );
  }
}

export default ListItem;
