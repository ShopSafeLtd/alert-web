import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';
import { IoImagesOutline } from 'react-icons/io5';

import ImageCarousel from '../../../global/ImageCarousel/ImageCarousel';
import { useStoreActions } from '../../../../state';

const Image = styled.div`
  width: 100%;
  height: 220px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;
const MultiImagesContainer = styled.div`
  position: relative;
`;

const AlertCardImages = ({ images }) => {
  const toggleLightbox = useStoreActions(
    (actions) => actions.theme.toggleLightBox
  );

  return (
    <div>
      {images.length > 0 ? (
        images.length > 1 ? (
          <MultiImagesContainer>
            <ImageCarousel
              images={images}
              height="220px"
              toggleLightBox={(index) => {
                toggleLightbox({
                  images: images.map(({ url, optimised }) =>
                    !!optimised ? optimised : url
                  ),
                  index,
                });
              }}
            />
          </MultiImagesContainer>
        ) : (
          images.map((image) => (
            <div key={image.id}>
              <Image
                alt=""
                style={{
                  backgroundImage: `url(${
                    !!image.optimised ? image.optimised : image.url
                  })`,
                }}
                onClick={() =>
                  toggleLightbox({
                    images: images.map(({ url, optimised }) =>
                      !!optimised ? optimised : url
                    ),
                    index: 0,
                  })
                }
              />
            </div>
          ))
        )
      ) : (
        <div className="no-image incident-card">
          <IoImagesOutline color="#959595" size="36px" />
          <Typography.Text>No Images</Typography.Text>
        </div>
      )}
    </div>
  );
};

export default AlertCardImages;
