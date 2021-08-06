import React, { PureComponent } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 200px;
  width: 200px;
  position: relative;
  margin: 20px;
  border: 1px solid #eeeeee;
  cursor: pointer;
`;

const Image = styled.div`
  height: 100%;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  ${({ url }) => `background-image: url(${url});`};
`;

const Overlay = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ExpandIcon = styled.svg`
  height: 30px;
  width: 30px;
`;

class OffenderImage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
  }

  render() {
    const { hover } = this.state;
    const { url, onClick } = this.props;
    return (
      <Container
        onClick={onClick}
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
      >
        <Image url={url} />
        {hover && (
          <Overlay>
            <ExpandIcon viewBox="0 0 24 24">
              <path
                fill="#fff"
                d="M9.5,13.09L10.91,14.5L6.41,19H10V21H3V14H5V17.59L9.5,13.09M10.91,9.5L9.5,10.91L5,6.41V10H3V3H10V5H6.41L10.91,9.5M14.5,13.09L19,17.59V14H21V21H14V19H17.59L13.09,14.5L14.5,13.09M13.09,9.5L17.59,5H14V3H21V10H19V6.41L14.5,10.91L13.09,9.5Z"
              />
            </ExpandIcon>
          </Overlay>
        )}
      </Container>
    );
  }
}

export default OffenderImage;
