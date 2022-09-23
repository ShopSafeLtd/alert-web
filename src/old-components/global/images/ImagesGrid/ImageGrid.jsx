import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { Image, UploadingImage } from '..';

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
  overflow: auto;
  align-content: flex-start;
  margin-bottom: 60px;
`;
const GridItem = styled.div`
  border: 1px solid #eeeeee;
  position: relative;
  transition: all 0.2s ease;
  height: 220px;
  width: 100%;
  margin: 10px 10px;
  @media (min-width: 1024px) {
    height: 220px;
    width: calc(25% - 20px);
  }
`;

class ImageGrid extends PureComponent {
  render() {
    const { images, actions } = this.props;
    return (
      <Grid>
        {images.map(({ id, url }) => {
          return id === 'UPLOADING' ? (
            <UploadingImage />
          ) : (
            <GridItem key={id}>
              <Image id={id} url={url} actions={actions} />
            </GridItem>
          );
        })}
      </Grid>
    );
  }
}

export default ImageGrid;
