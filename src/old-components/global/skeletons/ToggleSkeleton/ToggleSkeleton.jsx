import React, { PureComponent } from 'react';
import styled from 'styled-components';

const ListItem = styled.div`
  display: flex;
  align-items: center;
  margin: 3px 0;
  cursor: pointer;
  border-bottom: 1px solid #eeeeee;
  height: 50px;
  padding: 0 10px;
`;
const Svg = styled.svg`
  height: 30px;
  width: 30px;
`;
const ItemText = styled.div`
  margin: 0;
  height: 14px;
  width: 60%;
  background-color: #bdbdbd
  padding-left: 30px;
  display: flex;
  align-items: center;
  border-radius: 2px;
`;

class ToggleSkeleton extends PureComponent {
  render() {
    return (
      <ListItem>
        <Svg viewBox="0 0 24 24">
          <path
            fill="#E0E0E0"
            d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"
          />
        </Svg>
        <ItemText />
      </ListItem>
    );
  }
}

export default ToggleSkeleton;
