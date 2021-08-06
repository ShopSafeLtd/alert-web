import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import ImageGallery from '../../../../../images/ImageGallery';
import AddOutline from '../../../../../images/AddOutline';
import { FileButton } from '../../../../global/actions';
import { Grow } from '../../../../global/layout';
import ImageMenuItem from '../ImageMenuItem/ImageMenuItem';
import AssignOffenderPopover from '../AssignOffenderPopover/AssignOffenderPopover';
import { Header, HeaderSubText } from '../../../../global/forms';
import { EmptyText } from '../../../../global/typography';
import { useStoreActions } from '../../../../../state';

const PageContainer = styled.div`
  height: 100%;
  width: 100%;
`;
const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;
const Empty = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const EmptyActions = styled.div`
  display: flex;
  justify-content: center;
`;
const ImageGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
  overflow: auto;
  align-content: flex-start;
`;
const GridItem = styled.div`
  border: 1px solid #eeeeee;
  position: relative;
  transition: all 0.2s ease;
  ${({ selected }) =>
    selected
      ? `
    height: 215px;
    width: 98%;
    margin: 12.5px 12.5px;
    @media (min-width: 1024px) {
      width: calc(25% - 25px);
      height: 215px;
    }
  `
      : `
    height: 220px;
    width: 100%;
    margin: 10px 10px;
    @media (min-width: 1024px) {
      height: 220px;
      width: calc(25% - 20px);
    }
  `};
`;
const LoadingItem = styled.div`
  border: 1px solid #eeeeee;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
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
const AddItem = styled.div`
  width: 100%;
  height: 100%;
`;
const AddItemButton = styled.label`
  background: #fff;
  border: none;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
`;
const Image = styled.div`
  height: 100%;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  ${({ url }) => `background-image: url(${url});`} position: relative;
`;
const AddItemText = styled.p`
  margin: 10px 0 0;
  font-size: 16px;
  color: ${({ disabled }) => (disabled ? '#BDBDBD' : '#EF5350')};
`;
const ImageMenu = styled.div`
  display: flex;
  background: rgba(0, 0, 0, 0.6);
  width: 100%;
  padding: 5px 10px;
  position: absolute;
  left: 0;
  bottom: 0;
  justify-content: flex-end;
`;

const AddImages = ({
  images,
  offenders,
  removeImage,
  uploading,
  assignImageToOffenders,
  uploadImage
}) => {
  // refs
  let addImage = React.createRef();

  const toggleLightbox = useStoreActions(
    actions => actions.theme.toggleLightbox
  );

  // state
  const [assign, setAssign] = useState('');

  // effects
  useEffect(
    () => {
      if (addImage.value !== undefined) addImage.current.value = '';
    },
    // eslint-disable-next-line
    [images]
  );

  return (
    <PageContainer>
      <Page>
        <Header>
          <HeaderSubText>
            Add any relevant images to the incident and assign them to any
            offenders shown in them.
          </HeaderSubText>
        </Header>
        {images.length > 0 ? (
          <ImageGrid>
            {images.map(({ id, url, offendersIds }) => {
              return id === 'UPLOADING' ? (
                <LoadingItem>
                  <CircularProgress />
                  <Typography>Uploading Image</Typography>
                </LoadingItem>
              ) : (
                <GridItem key={id}>
                  <Image url={url}>
                    <ImageMenu>
                      {offenders.length > 0 && (
                        <ImageMenuItem
                          onClick={() => setAssign(id)}
                          tooltip="Assign Offenders"
                        >
                          <path
                            fill="#FFF"
                            d="M16,13C15.71,13 15.38,13 15.03,13.05C16.19,13.89 17,15 17,16.5V19H23V16.5C23,14.17 18.33,13 16,13M8,13C5.67,13 1,14.17 1,16.5V19H15V16.5C15,14.17 10.33,13 8,13M8,11A3,3 0 0,0 11,8A3,3 0 0,0 8,5A3,3 0 0,0 5,8A3,3 0 0,0 8,11M16,11A3,3 0 0,0 19,8A3,3 0 0,0 16,5A3,3 0 0,0 13,8A3,3 0 0,0 16,11Z"
                          />
                        </ImageMenuItem>
                      )}
                      <Grow />
                      <ImageMenuItem
                        onClick={() => {
                          toggleLightbox([url]);
                        }}
                        tooltip="Full Size"
                      >
                        <path
                          fill="#FFF"
                          d="M9.5,13.09L10.91,14.5L6.41,19H10V21H3V14H5V17.59L9.5,13.09M10.91,9.5L9.5,10.91L5,6.41V10H3V3H10V5H6.41L10.91,9.5M14.5,13.09L19,17.59V14H21V21H14V19H17.59L13.09,14.5L14.5,13.09M13.09,9.5L17.59,5H14V3H21V10H19V6.41L14.5,10.91L13.09,9.5Z"
                        />
                      </ImageMenuItem>
                      <ImageMenuItem
                        onClick={() => removeImage(id, offendersIds)}
                        tooltip="Remove Image"
                      >
                        <path
                          fill="#FFF"
                          d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
                        />
                      </ImageMenuItem>
                    </ImageMenu>
                  </Image>
                </GridItem>
              );
            })}
            <GridItem>
              <AddItem onChange={value => uploadImage(value)}>
                <FileButton
                  id="file-2"
                  type="file"
                  accept="image/*"
                  multiple
                  disabled={uploading}
                  ref={addImage}
                />
                <AddItemButton
                  component="label"
                  variant="contained"
                  color="primary"
                  disabled={uploading}
                  htmlFor="file-2"
                >
                  <AddOutline disabled={uploading} width="55px" height="55px" />
                  <AddItemText disabled={uploading}>Add Image</AddItemText>
                </AddItemButton>
              </AddItem>
            </GridItem>
          </ImageGrid>
        ) : (
          <Empty>
            <ImageGallery width="100px" height="100px" />
            <EmptyText>You have not added any offenders yet</EmptyText>
            <EmptyActions>
              <div onChange={value => uploadImage(value)}>
                <FileButton
                  id="file-2"
                  type="file"
                  accept="image/*"
                  multiple
                  disabled={uploading}
                  ref={addImage}
                />
                <Button
                  component="label"
                  variant="contained"
                  color="primary"
                  disabled={uploading}
                  htmlFor="file-2"
                >
                  Add Image
                </Button>
              </div>
            </EmptyActions>
          </Empty>
        )}
      </Page>
      <AssignOffenderPopover
        open={assign !== ''}
        close={() => setAssign('')}
        image={images.find(({ id }) => id === assign)}
        offenders={offenders}
        assignImageToOffenders={assignImageToOffenders}
      />
    </PageContainer>
  );
};

export default AddImages;
