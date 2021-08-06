import React from 'react';
import styled from 'styled-components';
import ReactSwipe from 'react-swipe';

const Carousel = styled.div`
  width: 100%;
  position: relative;
`;
const LeftControl = styled.div`
  position: absolute;
  left: 5px;
  top: 40%;
  z-index: 3;
`;
const RightControl = styled.div`
  position: absolute;
  right: 5px;
  top: 40%;
  z-index: 3;
`;
const Control = styled.svg`
  color: #fff;
  height: 36px;
  width: 36px;
  cursor: pointer;
`;
const Image = styled.div`
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

class ImageCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rightControl: false,
      leftControl: false,
      imageIndex: 0
    };
    this.reactSwipe = React.createRef();
  }

  componentDidMount() {
    this.reactSwipe.getPos() > 0 && this.setState({ leftControl: true });
    this.reactSwipe.getPos() < this.reactSwipe.getNumSlides() &&
      this.setState({ rightControl: true });
  }

  render() {
    const { images, height, toggleLightBox } = this.props;
    const { rightControl, leftControl, imageIndex } = this.state;
    return (
      <Carousel>
        {leftControl && (
          <LeftControl onClick={() => this.reactSwipe.prev()}>
            <Control viewBox="0 0 24 24">
              <path
                fill="#FFFFFF"
                d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"
              />
            </Control>
          </LeftControl>
        )}
        <ReactSwipe
          ref={el => (this.reactSwipe = el)}
          swipeOptions={{
            continuous: false,
            callback: index => {
              index > 0
                ? this.setState({ leftControl: true, imageIndex: index })
                : this.setState({ leftControl: false, imageIndex: index });
              index < this.reactSwipe.getNumSlides() - 1
                ? this.setState({ rightControl: true, imageIndex: index })
                : this.setState({ rightControl: false, imageIndex: index });
            }
          }}
        >
          {images.map(image => (
            <div key={image.id}>
              <Image
                alt=""
                onClick={() =>
                  toggleLightBox !== undefined && toggleLightBox(imageIndex)
                }
                style={{ backgroundImage: `url(${image.url})`, height: height }}
              />
            </div>
          ))}
        </ReactSwipe>
        {rightControl && (
          <RightControl onClick={() => this.reactSwipe.next()}>
            <Control viewBox="0 0 24 24">
              <path
                fill="#FFFFFF"
                d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"
              />
            </Control>
          </RightControl>
        )}
      </Carousel>
    );
  }
}

export default ImageCarousel;
