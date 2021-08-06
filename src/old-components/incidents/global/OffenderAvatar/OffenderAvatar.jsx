import React, { PureComponent } from 'react';
import styled from 'styled-components';

const BlankAvatar = styled.div`
  height: 200px;
  width: 200px;
  border: 1px solid #eeeeee;
  background: #f5f5f5;
  margin: 20px 20px 0;
  position: relative;
  overflow: hidden;
`;

const UserIcon = styled.svg`
  height: 238px;
  width: 245px;
  position: absolute;
  left: -25px;
`;

class OffenderAvatar extends PureComponent {
  render() {
    return (
      <BlankAvatar>
        <UserIcon viewBox="0 0 24 24">
          <path
            fill="#E0E0E0"
            d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
          />
        </UserIcon>
      </BlankAvatar>
    );
  }
}

export default OffenderAvatar;
