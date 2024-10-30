import type { CreateBlurFacesMutation } from '#/components/ViewPage/ImagesList/graphql/__generated__/create_blur_faces.generated';
import type { MutationUpdaterFn } from '@apollo/client';
import type { WatermarkSlideType } from 'components/images/WatermartkSlide.view';
import type { Theme } from 'configs/ThemeConfig';
import type { EditFeedImage, ImageFaceType } from 'types/DataType';

import { useCreateBlurFacesMutation } from '#/components/ViewPage/ImagesList/graphql/__generated__/create_blur_faces.generated';
import MultiFacesSelect from '#/components/form-components/FacesSelect/MultiFacesSelect.view';
import errorNotification from '#/types/mutation_notifications/error_notification';
import getFacesFromUrl from '#/utils/get-faces-from-url';
import {
  faEdit,
  faFolderArrowDown,
  faTrash,
  faUserPen,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Col,
  Popconfirm,
  Popover,
  Row,
  Skeleton,
  notification,
} from 'antd';
import FeedImageEditor from 'components/form-components/ImageEditor/FeedImageEditor.view';
import WatermarkImage from 'components/images/WatermarkImage.view';
import WatermarkSlide from 'components/images/WatermartkSlide.view';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import downloadImage from 'utils/images/download-image';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

const useStyles = createUseStyles((theme: Theme) => ({
  icon: { marginRight: 5 },
  image: {
    '@media only screen and (min-height: 800px)': {
      height: 230,
      width: 170,
    },
    backgroundColor: theme.imageBackgroundColor,
    border: `2px solid ${theme.borderColor}`,
    borderRadius: 10,
    cursor: 'pointer',
    height: 160,
    overflow: 'hidden',
    transition: 'all 0.3s ease-in-out',
    width: 150,
  },
  images: {
    margin: '10px 0 15px',
    overflowX: 'auto',
    overflowY: 'hidden',
    padding: '0px 10px',
    transition: 'all 0.3s ease-in-out',
    width: '100%',
  },
}));

interface Props {
  editImageData: EditFeedImage | null;
  editRights: boolean;
  hasImages: boolean;
  imagesData: EditFeedImage[] | undefined;
  lightBoxOpen?: {
    index: number;
    open: boolean;
  };
  lightboxElements?: {
    src: string;
  }[];
  loading: boolean;
  onDeleteImage: (id: string) => void;
  onEditImage: (id: EditFeedImage) => void;
  openLightbox: (index: number) => void;
  saving: boolean;
  setEditImageData: (value: EditFeedImage | null) => void;
  updateImagesList?: MutationUpdaterFn<CreateBlurFacesMutation>;
}

const ImagesList = ({
  editImageData,
  editRights,
  hasImages,
  imagesData,
  lightBoxOpen,
  lightboxElements,
  loading,
  onDeleteImage,
  onEditImage,
  openLightbox,
  saving,
  setEditImageData,
  updateImagesList,
}: Props) => {
  const classes = useStyles();
  const intl = useIntl();
  const [uploadFaces, setUploadFaces] = useState<ImageFaceType[]>([]);
  const [uploadImage, setUploadImage] = useState<EditFeedImage | null>(null);

  const imageRedaction = (image: EditFeedImage) => {
    void getFacesFromUrl(image.url || '').then((res) => {
      setUploadFaces(res);
      setUploadImage(image);
    });
  };

  const [createBlurFaces] = useCreateBlurFacesMutation({
    onCompleted: () => {
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The image has been updated.',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Updated!',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      errorNotification();
    },
    update: updateImagesList,
  });
  const onSelectFaces = (faces: ImageFaceType[]) => {
    const facesUrl = new Set(faces.map((face) => face.imageURL));
    const blurFaces = uploadFaces.filter((el) => !facesUrl.has(el.imageURL));
    if (blurFaces && uploadImage) {
      void createBlurFaces({
        variables: {
          faces: blurFaces.map((el) => ({
            blur: true,
            height: Number(el.BoundingBox.Height),
            left: Number(el.BoundingBox.Left),
            top: Number(el.BoundingBox.Top),
            width: Number(el.BoundingBox.Width),
          })),
          image: { id: uploadImage?.id || '', url: uploadImage?.url || '' },
        },
      }).finally(() => {
        setUploadFaces([]);
        setUploadImage(null);
      });
    }
  };

  return loading ? (
    <Skeleton />
  ) : (
    <div>
      <Row
        align="middle"
        className={classes.images}
        gutter={8}
        justify="start"
        style={{
          height: hasImages ? undefined : 0,
        }}
        wrap={false}
      >
        {imagesData?.map((image, i) => (
          <Col key={image.id}>
            {editRights ? (
              <Popover
                // trigger="hover"
                content={
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Button
                      disabled={saving}
                      icon={
                        <FontAwesomeIcon
                          className={classes.icon}
                          icon={faEdit}
                          size="lg"
                        />
                      }
                      onClick={() => setEditImageData(image)}
                      size="small"
                      type="text"
                    >
                      {intl.formatMessage({
                        defaultMessage: 'Edit Image',
                      })}
                    </Button>
                    {updateImagesList && (
                      <Button
                        disabled={saving}
                        icon={
                          <FontAwesomeIcon
                            className={classes.icon}
                            icon={faUserPen}
                            size="lg"
                          />
                        }
                        onClick={() => imageRedaction(image)}
                        size="small"
                        type="text"
                      >
                        {intl.formatMessage({
                          defaultMessage: 'Redact Image',
                        })}
                      </Button>
                    )}

                    <Popconfirm
                      cancelText={intl.formatMessage({
                        defaultMessage: 'No',
                      })}
                      okText={intl.formatMessage({
                        defaultMessage: 'Yes',
                      })}
                      onConfirm={() => onDeleteImage(image.id)}
                      overlayInnerStyle={{ padding: 10 }}
                      placement="topLeft"
                      title={intl.formatMessage({
                        defaultMessage: 'Remove the image?',
                      })}
                    >
                      <Button
                        disabled={saving}
                        icon={
                          <FontAwesomeIcon
                            className={classes.icon}
                            icon={faTrash}
                            size="lg"
                          />
                        }
                        size="small"
                        type="text"
                      >
                        {intl.formatMessage({
                          defaultMessage: 'Delete Image',
                        })}
                      </Button>
                    </Popconfirm>
                    <Button
                      disabled={saving}
                      icon={
                        <FontAwesomeIcon
                          className={classes.icon}
                          icon={faFolderArrowDown}
                          size="lg"
                        />
                      }
                      onClick={() =>
                        // eslint-disable-next-line no-void
                        void downloadImage(
                          image.optimised || image.url || '',
                          `${image.id}`
                        )
                      }
                      size="small"
                      type="text"
                    >
                      {intl.formatMessage({
                        defaultMessage: 'Download Image',
                      })}
                    </Button>
                  </div>
                }
                placement="right"
                // placement="left"
                trigger={['contextMenu']}
              >
                <Button
                  className={classes.image}
                  onClick={() => openLightbox(i)}
                  style={{ padding: 0 }}
                >
                  <WatermarkImage
                    position={image.position}
                    rotation={image.rotation}
                    url={image.optimised}
                  />
                </Button>
              </Popover>
            ) : (
              <Button
                className={classes.image}
                onClick={() => openLightbox(i)}
                style={{ padding: 0 }}
              >
                <WatermarkImage
                  position={image.position}
                  rotation={image.rotation}
                  url={image.optimised}
                />
              </Button>
            )}
          </Col>
        ))}
      </Row>
      <FeedImageEditor
        image={editImageData}
        onClose={() => setEditImageData(null)}
        open={!!editImageData}
        submitImage={onEditImage}
      />

      {lightboxElements && lightBoxOpen && (
        <Lightbox
          close={() => openLightbox(0)}
          controller={{
            closeOnBackdropClick: true,
          }}
          index={lightBoxOpen.index}
          open={lightBoxOpen.open}
          plugins={[Zoom]}
          render={{
            slide: (slide: WatermarkSlideType) => (
              <WatermarkSlide slide={slide} />
            ),
          }}
          slides={lightboxElements}
        />
      )}
      <MultiFacesSelect
        faces={uploadFaces}
        onClose={() => setUploadFaces([])}
        open={!!(uploadFaces && uploadFaces.length > 0)}
        submitFace={onSelectFaces}
      />
    </div>
  );
};

export default ImagesList;
