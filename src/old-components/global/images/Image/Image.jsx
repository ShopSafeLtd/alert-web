import React from 'react';
import styled from 'styled-components';
import { useStoreActions } from '../../../../state';

import ImageMenuItem from '../../ImageMenuItem/ImageMenuItem';

const ImageMenu = styled.div`
  display: flex;
  background: rgba(0, 0, 0, 0.6);
  width: 100%;
  padding: 5px 10px;
  position: absolute;
  left: 0;
  bottom: 0;
`;

const Image = ({ id, url, actions }) => {
  const toggleLightbox = useStoreActions(
    actions => actions.theme.toggleLightbox
  );

  const ImageContainer = styled.div`
    height: 100%;
    width: 100%;
  `;

  const StyledImage = styled.div`
    height: 100%;
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    ${({ url }) => `background-image: url(${url});`} position: relative;
  `;

  return (
    <ImageContainer>
      <StyledImage onClick={() => toggleLightbox([url])} url={url} />
      <ImageMenu>
        {actions.map(({ onClick, tooltipLabel, icon }) => (
          <ImageMenuItem
            onClick={() => onClick(id)}
            tooltipLabel={tooltipLabel}
            tooltipPosition="bottom"
          >
            {icon}
          </ImageMenuItem>
        ))}
      </ImageMenu>
    </ImageContainer>
  );
};

export default Image;
