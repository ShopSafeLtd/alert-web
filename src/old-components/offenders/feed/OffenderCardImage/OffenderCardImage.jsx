import React from 'react';
import styled from 'styled-components';
import { useStoreActions } from '../../../../state';

import { CardNoImage } from '../../../global/cards';
import ImageCarousel from '../../../global/ImageCarousel/ImageCarousel';

const MultiImagesContainer = styled.div`
  position: relative;
  height: 265px;
  width: 100%;
`;
const SingleImageContainer = styled.div`
  height: 265px;
  width: 100%;
`;
const Image = styled.div`
  height: 100%;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const OffenderCardImage = ({ images }) => {
  const toggleLightbox = useStoreActions(
    actions => actions.theme.toggleLightBox
  );

  return images.length > 0 ? (
    <div>
      {images.length > 1 ? (
        <MultiImagesContainer>
          <ImageCarousel
            images={images}
            height="265px"
            toggleLightBox={index =>
              toggleLightbox({
                images: images.map(
                  ({ url, optimised }) => (!!optimised ? optimised : url)
                ),
                index
              })
            }
          />
        </MultiImagesContainer>
      ) : (
        <SingleImageContainer>
          {images.map(image => (
            <div key={image.id} style={{ height: '100%', width: '100%' }}>
              <Image
                alt="Offender Image"
                style={{
                  backgroundImage: `url(${
                    !!image.optimised ? image.optimised : image.url
                  })`
                }}
                onClick={() =>
                  toggleLightbox({
                    images: images.map(
                      ({ url, optimised }) => (!!optimised ? optimised : url)
                    ),
                    index: 0
                  })
                }
              />
            </div>
          ))}
        </SingleImageContainer>
      )}
    </div>
  ) : (
    <div>
      <CardNoImage height="265px" />
    </div>
  );
};

export default OffenderCardImage;
