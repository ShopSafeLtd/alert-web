import React from "react";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import RightIcon from "@material-ui/icons/ArrowForwardIos";
import LeftIcon from "@material-ui/icons/ArrowBackIos";
// import PinchToZoom from "react-pinch-and-zoom";
import { useStoreActions, useStoreState } from "../../../state";

const Container = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1400;
  padding: 10px;
`;
const Background = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1401;
  background-color: rgba(0, 0, 0, 0.8);
  cursor: pointer;
`;
const Actions = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1403;
  display: flex;
  justify-content: flex-end;
`;
const CloseButton = styled(CloseIcon)`
  color: #fff;
`;
const ImageWrapper = styled.div`
  max-width: 90%;
  max-height: 90vh;
  flex: 1;
  text-align: center;
`;
const Image = styled.img`
  width: 100%;
  @media (min-width: 1024px) {
    max-width: 55%;
  }
`;
const ImageContainer = styled.div`
  z-index: 1402;
  display: flex;
  justify-content: center;
`;
const RightContainer = styled.div`
  position: fixed;
  right: 10px;
  top: 46%;
  z-index: 1404;
`;
const RightButton = styled(RightIcon)`
  color: #fff;
`;
const LeftContainer = styled.div`
  position: fixed;
  left: 10px;
  top: 46%;
  z-index: 1404;
`;
const LeftButton = styled(LeftIcon)`
  color: #fff;
`;
// const Zoom = styled(PinchToZoom)`
//   flex: 1;
//   z-index: 1402;
// `;

const Zoom = styled.div`
  flex: 1;
  z-index: 1402;
`;

const LightBox = () => {
  const open = useStoreState((state) => state.theme.lightbox);
  const images = useStoreState((state) => state.theme.lightboxImages);
  const index = useStoreState((state) => state.theme.lightboxIndex);
  const close = useStoreActions((actions) => actions.theme.toggleLightBox);
  const setLightboxIndex = useStoreActions(
    (actions) => actions.theme.setLightboxIndex
  );

  return open ? (
    <Container>
      <Background
        onClick={() => close({ images: undefined, index: undefined })}
      />
      <Actions>
        <IconButton>
          <CloseButton
            onClick={() => close({ images: undefined, index: undefined })}
          />
        </IconButton>
      </Actions>
      <Zoom>
        <ImageContainer>
          <ImageWrapper>
            <Image src={images[index]} />
          </ImageWrapper>
        </ImageContainer>
      </Zoom>
      {images?.length > 0 && index !== images?.length - 1 && (
        <RightContainer>
          <IconButton onClick={() => setLightboxIndex(index + 1)}>
            <RightButton />
          </IconButton>
        </RightContainer>
      )}
      {images.length > 0 && index !== 0 && (
        <LeftContainer>
          <IconButton onClick={() => setLightboxIndex(index - 1)}>
            <LeftButton />
          </IconButton>
        </LeftContainer>
      )}
    </Container>
  ) : null;
};

export default LightBox;
