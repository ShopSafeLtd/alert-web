import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Body = styled(Link)`
  flex: 1;
  display: flex;
  align-items: center;
  text-decoration: none;
  position: relative;
  padding-right: 24px;
  height: 100%;
`;
const Text = styled.span`
  font-size: 16px;
  color: rgba(0, 0, 0, 1);
  padding-left: 24px;
  flex: 1;
  display: flex;
  align-items: center;
`;

class ListBody extends React.Component {
  render() {
    const { primaryText, to } = this.props;

    return (
      <Body to={to}>
        <Text>{primaryText}</Text>
      </Body>
    );
  }
}

export default ListBody;
