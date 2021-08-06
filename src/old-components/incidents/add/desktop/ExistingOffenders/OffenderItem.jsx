import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

const Offender = styled.div`
  border-bottom: 1px solid #eeeeee;
  display: flex;
  align-items: center;
  min-height: 55px;
  cursor: pointer;
  ${({ current }) => current && 'background: rgba(0,0,0,0.05);'} &:hover {
    background: rgba(0, 0, 0, 0.01);
  }
  margin-right: 15px;
`;
const ItemImage = styled.div`
  height: 55px;
  width: 55px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${({ url }) => url});
`;
const ItemAvatar = styled.div`
  height: 55px;
  width: 55px;
  background: #f5f5f5;
`;
const ItemText = styled(Typography)`
  margin: 0;
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-left: 15px;
  flex: 1;
`;
const UserIcon = styled.svg`
  width: 100%;
  height: 100%;
`;
const Svg = styled.svg`
  height: 30px;
  width: 30px;
`;

class OffenderItem extends PureComponent {
  render() {
    const { images, name, toggle, selected, setCurrent } = this.props;
    return (
      <Offender
        onClick={() => {
          toggle();
          setCurrent();
        }}
      >
        {images.length > 0 ? (
          <ItemImage url={images[0].url} />
        ) : (
          <ItemAvatar>
            <UserIcon viewBox="0 0 24 24">
              <path
                fill="#E0E0E0"
                d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
              />
            </UserIcon>
          </ItemAvatar>
        )}
        <ItemText>{name}</ItemText>
        <Svg viewBox="0 0 24 24">
          <path
            fill={selected ? '#1E88E5' : '#E0E0E0'}
            d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"
          />
        </Svg>
      </Offender>
    );
  }
}

export default OffenderItem;
