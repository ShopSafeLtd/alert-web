import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

const Offender = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eeeeee;
  &:first-child {
    border-top: 1px solid #eeeeee;
  }
  ${({ hover }) => hover && 'background: rgba(0,0,0,0.01)'};
`;

const OffenderName = styled(Typography)`
  font-size: 16px;
  margin: 0 0 0 20px;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const OffenderImage = styled.div`
  height: 80px;
  min-width: 80px;
  width: 80px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  ${({ url }) => `background-image: url(${url});`};
`;

const BlankAvatar = styled.div`
  background: #f5f5f5;
  position: relative;
  height: 80px;
  width: 80px;
  min-width: 80px;
  overflow: hidden;
`;

const UserIcon = styled.svg`
  height: 100px;
  width: 100px;
  position: absolute;
  left: -10px;
`;

const Selected = styled.div`
  border-radius: 100%;
  height: 30px;
  width: 30px;
  margin: 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ selected }) =>
    selected
      ? `
    background: #448AFF;
    border: 1px solid #1976D2;    
    `
      : `
    background: #FAFAFA;
    border: 1px solid #F5F5F5;
  `};
`;

const Check = styled.svg`
  width: 20px;
  height: 20px;
`;

class OffenderStacked extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
  }

  render() {
    const { id, images, name, selected, toggleSelected } = this.props;
    const { hover } = this.state;

    return (
      <Offender
        onMouseEnter={() =>
          this.setState({
            hover: true
          })
        }
        onMouseLeave={() =>
          this.setState({
            hover: false
          })
        }
        onClick={() => toggleSelected(id)}
        hover={hover}
      >
        {images.length > 0 ? (
          <OffenderImage url={images[0].url} />
        ) : (
          <BlankAvatar>
            <UserIcon viewBox="0 0 24 24">
              <path
                fill="#E0E0E0"
                d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
              />
            </UserIcon>
          </BlankAvatar>
        )}
        <OffenderName>{name}</OffenderName>
        <Selected selected={selected}>
          <Check viewBox="0 0 24 24">
            <path
              fill={selected ? '#FFF' : '#E0E0E0'}
              d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"
            />
          </Check>
        </Selected>
      </Offender>
    );
  }
}

export default OffenderStacked;
