import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { isEqual } from 'lodash-es';

import ImageGallery from '../../../../../images/ImageGallery';
import {
  Image,
  AddImage,
  AddImagesFab,
  ImageSkeleton,
  UploadingImage
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

class EditImages extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      remove: false,
      removeId: '',
      uploadingImage: false,
      images: [],
      imagesSet: false
    };
    this.addImageButton = React.createRef();
  }

  componentDidMount() {
    this.props.setBackLinkTo(this.props.basePath);
    if (this.props.images !== undefined) {
      if (this.props.images.length > 0) {
        this.setState({
          images: this.props.images,
          imagesSet: true
        });
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.images.length > prevProps.images.length) {
      if (this.addImageButton.value !== undefined) {
        this.addImageButton.value = '';
      }
    }
    if (this.props.images !== undefined) {
      if (this.props.images.length > 0 && !this.state.imagesSet) {
        this.setState({
          images: this.props.images,
          imagesSet: true
        });
      } else if (!isEqual(this.props.images, prevProps.images)) {
        this.setState({
          images: this.props.images
        });
      }
    }
  }

  uploadImage = async ({ target: { files } }) => {
    this.setState({
      uploadingImage: true,
      images: [
        ...this.state.images,
        {
          id: 'UPLOADING'
        }
      ]
    });
    this.props.setNavbarActionDisabled(true);
    // create request for every files
    [...files].forEach(async file => {
      await this.props.createImage({
        variables: {
          file,
          scheme: localStorage.getItem('currentScheme'),
          offenders: [{ id: this.props.offenderId }]
        }
      });
      this.setState({
        images: [...this.state.images.filter(({ id }) => id !== 'UPLOADING')],
        uploadingImage: false
      });
      this.props.setNavbarActionDisabled(false);
    });
  };

  uploadMobileImage = async data => {
    this.setState({
      uploadingImage: true,
      images: [
        ...this.state.images,
        {
          id: 'UPLOADING'
        }
      ]
    });
    this.props.setNavbarActionDisabled(true);
    window.resolveLocalFileSystemURL(data, fileEntry => {
      const upload = async file => {
        await this.props.createImage({
          variables: {
            file,
            scheme: localStorage.getItem('currentScheme'),
            offenders: [{ id: this.props.offenderId }]
          }
        });
        this.setState({
          images: [...this.state.images.filter(({ id }) => id !== 'UPLOADING')],
          disabled: false
        });
        this.props.setNavbarActionDisabled(false);
      };
      fileEntry.file(function(file) {
        const reader = new FileReader();
        reader.onloadend = async function(e) {
          upload(new Blob([this.result], { type: 'image/jpeg' }));
        };
        reader.readAsArrayBuffer(file);
      });
    });
  };

  removeImage = () => {
    this.props.editOffender({
      variables: {
        id: this.props.offenderId,
        removeImages: [{ id: this.state.removeId }]
      }
    });
  };

  render() {
    const { loading } = this.props;
    const { remove, uploadingImage, images } = this.state;

    return (
      <Page>
        <Header>
          <HeaderText>Images</HeaderText>
          <HeaderSubText>Add or removes images on this offender.</HeaderSubText>
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
            {images.map(({ id, url }) => {
              const actions = [
                {
                  onClick: () => this.setState({ remove: true, removeId: id }),
                  tooltipLabel: 'Remove Image',
                  icon: (
                    <path
                      fill="#FFF"
                      d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
                    />
                  )
                }
              ];

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
                upload={this.uploadImage}
                mobileUpload={this.uploadMobileImage}
                disabled={uploadingImage}
              />
            </EmptyActions>
          </Empty>
        )}
        {images.length > 0 && (
          <AddImagesFab
            upload={this.uploadImage}
            mobileUpload={this.uploadMobileImage}
            disabled={uploadingImage}
            bottom
          />
        )}
        <ConfirmDialog
          open={remove}
          handleClose={() => this.setState({ remove: false })}
          title="Are you sure?"
          description="Are you sure you want to remove this image, one it has been removed you cannot undo it."
          actions={[
            <Button onClick={() => this.setState({ remove: false })}>
              Cancel
            </Button>,
            <Button
              color="primary"
              onClick={() => {
                this.setState({ remove: false });
                this.removeImage();
              }}
            >
              Remove Image
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

export default EditImages;
