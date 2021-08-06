import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

import { Check } from '../../../../global/actions';

const Item = styled.div`
  border-bottom: 1px solid #eeeeee;
  display: flex;
  align-items: center;
  min-height: 75px;
  padding-right: 20px;
  cursor: pointer;
  ${({ current }) => current && 'background: rgba(0,0,0,0.05);'} &:hover {
    background: rgba(0, 0, 0, 0.01);
  }
`;

const Text = styled(Typography)`
  width: 60%;
  margin-left: 20px;
  height: 16px;
  background-color: #bdbdbd;
`;

const Avatar = styled.div`
  height: 75px;
  width: 75px;
  background: #f5f5f5;
  @media (min-width: 1024px) {
    height: 60px;
    width: 60px;
  }
`;

const UserIcon = styled.svg`
  width: 100%;
  height: 100%;
`;

const Svg = styled.svg`
  width: 24px;
  min-width: 24px;
  height: 24px;
  min-height: 24px;
`;

const Remove = styled.div`
  display: flex;
  align-items: c enter;
`;
const Grow = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
`;

class OffenderItem extends PureComponent {
  render() {
    const { check } = this.props;
    return (
      <Item>
        <Grow>
          <Avatar>
            <UserIcon viewBox="0 0 24 24">
              <path
                fill="#E0E0E0"
                d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
              />
            </UserIcon>
          </Avatar>
          <Text />
        </Grow>
        {check ? (
          <Check />
        ) : (
          <Remove>
            <Svg viewBox="0 0 24 24">
              <path
                fill="#BDBDBD"
                d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
              />
            </Svg>
          </Remove>
        )}
      </Item>
    );
  }
}

export default OffenderItem;
