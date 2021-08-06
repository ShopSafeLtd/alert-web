import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import ImageGallery from '../../../../../images/ImageGallery';
import {
  Image,
  AddImage,
  AddImagesFab,
  ImageSkeleton
} from '../../../../global/images';
import { Header, HeaderText, HeaderSubText } from '../../../../global/forms';
import { EmptyText } from '../../../../global/typography';
import ConfirmDialog from '../../../../global/ConfirmDialog/ConfirmDialog';

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

class ImagesList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      remove: ''
    };
    this.addImageButton = React.createRef();
  }

  componentDidMount() {
    this.props.setBackLinkTo(this.props.basePath);
  }

  removeImage = ({ full }) =>
    full
      ? this.props.updateIncident({
          variables: {
            id: this.props.incidentId,
            images: {
              delete: [{ id: this.state.remove }]
            }
          }
        })
      : this.props.updateIncident({
          variables: {
            id: this.props.incidentId,
            images: {
              disconnect: [{ id: this.state.remove }]
            }
          }
        });

  render() {
    const {
      offenders,
      history,
      basePath,
      loading,
      images,
      uploadingImage,
      uploadImage,
      uploadMobileImage
    } = this.props;
    const { remove } = this.state;

    return (
      <Page>
        <Header>
          <HeaderText>Images</HeaderText>
          <HeaderSubText>
            Add any relevant images to the incident and assign them to offenders
            shown in them.
          </HeaderSubText>
        </Header>
        {loading ? (
          <ImageGrid>
            <ImageSkeleton />
            <ImageSkeleton />
            <ImageSkeleton />
            <ImageSkeleton />
          </ImageGrid>
        ) : images.length ? (
          <ImageGrid>
            {images.map(({ id, url, offenders: imageOffenders }) => {
              const actions = [];
              offenders.length > 0 &&
                actions.push({
                  onClick: () => {
                    history.push(`${basePath}/images/${id}/assign-offenders`);
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
                onClick: () => this.setState({ remove: id }),
                tooltipLabel: 'Remove Image',
                icon: (
                  <path
                    fill="#FFF"
                    d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
                  />
                )
              });

              return (
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
                upload={e => uploadImage(e, 'mobile')}
                mobileUpload={e => uploadMobileImage(e, 'mobile')}
                disabled={uploadingImage}
              />
            </EmptyActions>
          </Empty>
        )}
        {images.length > 0 && (
          <AddImagesFab
            upload={e => uploadImage(e, 'mobile')}
            mobileUpload={e => uploadMobileImage(e, 'mobile')}
            disabled={uploadingImage}
            bottom
          />
        )}
        <ConfirmDialog
          actionsColumn
          open={remove}
          handleClose={() => this.setState({ remove: '' })}
          title="Remove image from offenders as well?"
          description="Do you also wish to remove the image from the offenders that it is assigned to or just from the incident? Once the image is removed it is gone forever"
          actions={[
            <Button onClick={() => this.setState({ remove: '' })}>
              Cancel
            </Button>,
            <Button
              onClick={() => {
                this.setState({ remove: '' });
                this.removeImage({ full: true });
              }}
            >
              Remove From Everything
            </Button>,
            <Button
              color="primary"
              onClick={() => {
                this.setState({ remove: '' });
                this.removeImage({ full: false });
              }}
            >
              Just this incident
            </Button>
          ]}
        />
      </Page>
    );
  }

  componentWillUnmount() {
    this.props.setBackLinkTo('');
  }
}

export default ImagesList;
