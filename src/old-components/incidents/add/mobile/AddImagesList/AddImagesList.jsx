import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import ImageGallery from '../../../../../images/ImageGallery';
import { FullWidthButton } from '../../../../global/actions';
import {
  Image,
  AddImage,
  AddImagesFab,
  UploadingImage
} from '../../../../global/images';
import { Header, HeaderText, HeaderSubText } from '../../../../global/forms';
import { EmptyText } from '../../../../global/typography';
import ConfirmDialog from '../../../../global/ConfirmDialog/ConfirmDialog';
import { useStoreActions } from '../../../../../state';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  margin-bottom: 60px;
`;
const Empty = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 60px;
`;
const EmptyActions = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 10px 11%;
`;
const ImageGrid = styled.div`
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

const AddImagesList = ({
  validateImages,
  groups,
  history,
  submit,
  setAssign,
  uploading,
  addImage,
  offenders,
  removeImages,
  setCurrentImage,
  uploadMobileImage,
  images
}) => {
  const setBackLinkTo = useStoreActions(state => state.theme.setBackLinkTo);
  const setNavbarAction = useStoreActions(state => state.theme.setNavbarAction);

  const [confirmRemove, setConfirmRemove] = useState(false);
  const [removeId, setRemoveId] = useState('');

  useEffect(() => {
    setBackLinkTo('/incidents/add/offenders');
    setNavbarAction('backLink');
    return () => {
      setNavbarAction('default');
      setBackLinkTo('');
    };
    // eslint-disable-next-line
  }, []);

  const handelNext = () => {
    validateImages()
      .then(() => {
        groups ? history.push('/incidents/add/groups') : submit();
      })
      .catch(() => setAssign(true));
  };

  return (
    <Page>
      <Header>
        <HeaderText>Images</HeaderText>
        <HeaderSubText>
          Add any relevant images to the incident and assign them to any
          offenders shown in them.
        </HeaderSubText>
      </Header>
      {images.length ? (
        <ImageGrid>
          {images.map(({ id, url, offendersIds }) => {
            const actions = [];
            offenders.length > 0 &&
              actions.push({
                key: 0,
                onClick: () => {
                  setCurrentImage({
                    id,
                    url,
                    offendersIds
                  });
                  history.push('/incidents/add/images/assign-offenders');
                },
                tooltipLabel: 'Assign Offenders',
                icon: (
                  <path
                    fill="#FFF"
                    d="M16,13C15.71,13 15.38,13 15.03,13.05C16.19,13.89 17,15 17,16.5V19H23V16.5C23,14.17 18.33,13 16,13M8,13C5.67,13 1,14.17 1,16.5V19H15V16.5C15,14.17 10.33,13 8,13M8,11A3,3 0 0,0 11,8A3,3 0 0,0 8,5A3,3 0 0,0 5,8A3,3 0 0,0 8,11M16,11A3,3 0 0,0 19,8A3,3 0 0,0 16,5A3,3 0 0,0 13,8A3,3 0 0,0 16,11Z"
                  />
                )
              });
            actions.push({
              key: 1,
              onClick: () => {
                setConfirmRemove(true);
                setRemoveId(id);
              },
              tooltipLabel: 'Remove Image',
              icon: (
                <path
                  fill="#FFF"
                  d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
                />
              )
            });

            return id === 'UPLOADING' ? (
              <UploadingImage />
            ) : (
              <GridItem key={id}>
                <Image id={id} url={url} actions={actions} />
              </GridItem>
            );
          })}
        </ImageGrid>
      ) : (
        <Empty>
          <ImageGallery width="100px" height="100px" />
          <EmptyText>You have not added any images yet</EmptyText>
          <EmptyActions>
            <AddImage
              upload={addImage}
              mobileUpload={uploadMobileImage}
              disabled={uploading}
            />
          </EmptyActions>
        </Empty>
      )}
      {images.length > 0 && (
        <AddImagesFab
          upload={addImage}
          mobileUpload={uploadMobileImage}
          disabled={uploading}
        />
      )}
      <FullWidthButton
        disabled={uploading}
        text={groups ? 'Next' : 'Submit Incident'}
        onClick={handelNext}
      />
      <ConfirmDialog
        open={confirmRemove}
        handleClose={() => setConfirmRemove(false)}
        title="Are you sure?"
        description="Are you sure you want to remove this image?"
        actions={[
          <Button onClick={() => setConfirmRemove(false)}>Cancel</Button>,
          <Button
            color="primary"
            onClick={() => {
              setConfirmRemove(false);
              removeImages(
                removeId,
                images.find(({ id }) => id === removeId).offendersIds
              );
            }}
          >
            Remove Image
          </Button>
        ]}
      />
    </Page>
  );
};

export default AddImagesList;
