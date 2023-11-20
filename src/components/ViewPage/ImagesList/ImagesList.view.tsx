import React from 'react';
import { Button, Col, Popconfirm, Popover, Row, Skeleton } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faFolderArrowDown,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';

import type { WatermarkSlideType } from 'components/images/WatermartkSlide.view';
import WatermarkSlide from 'components/images/WatermartkSlide.view';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import WatermarkImage from 'components/images/WatermarkImage.view';

import type { EditFeedImage } from 'types/DataType';
import { useIntl } from 'react-intl';

import FeedImageEditor from 'components/form-components/ImageEditor/FeedImageEditor.view';
import Lightbox from 'yet-another-react-lightbox';
import { createUseStyles } from 'react-jss';
import type { Theme } from 'configs/ThemeConfig';
import downloadImage from 'utils/images/download-image';

const useStyles = createUseStyles((theme: Theme) => ({
  images: {
    width: '100%',
    padding: '0px 10px',
    margin: '10px 0 15px',
    transition: 'all 0.3s ease-in-out',
    overflowY: 'hidden',
    overflowX: 'auto',
  },
  image: {
    height: 160,
    width: 150,
    backgroundColor: theme.imageBackgroundColor,
    cursor: 'pointer',
    borderRadius: 10,
    border: `2px solid ${theme.borderColor}`,
    overflow: 'hidden',
    transition: 'all 0.3s ease-in-out',
    '@media only screen and (min-height: 800px)': {
      height: 230,
      width: 170,
    },
  },
  icon: { marginRight: 5 },
}));

interface Props {
  imagesData: EditFeedImage[] | undefined;
  loading: boolean;
  lightboxElements?: {
    src: string;
  }[];
  openLightbox: (index: number) => void;
  lightBoxOpen?: {
    open: boolean;
    index: number;
  };
  editRights: boolean;
  saving: boolean;
  editImageData: EditFeedImage | null;
  setEditImageData: (value: EditFeedImage | null) => void;
  onDeleteImage: (id: string) => void;
  onEditImage: (id: EditFeedImage) => void;
  hasImages: boolean;
}

const ImagesList = ({
  imagesData,
  loading,
  saving,
  editRights,
  openLightbox,
  lightBoxOpen,
  lightboxElements,
  editImageData,
  setEditImageData,
  onDeleteImage,
  onEditImage,
  hasImages,
}: Props) => {
  const classes = useStyles();
  const intl = useIntl();

  return loading ? (
    <Skeleton />
  ) : (
    <div>
      <Row
        gutter={8}
        justify="start"
        align="middle"
        wrap={false}
        className={classes.images}
        style={{
          height: hasImages ? undefined : 0,
        }}
      >
        {imagesData?.map((image, i) => (
          <Col key={image.id}>
            {editRights ? (
              <Popover
                // trigger="hover"
                // placement="left"
                trigger={['contextMenu']}
                placement="right"
                content={
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Button
                      type="text"
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
                    >
                      {intl.formatMessage({
                        defaultMessage: 'Edit Image',
                        id: '9UlLIw',
                      })}
                    </Button>

                    <Popconfirm
                      placement="topLeft"
                      title={intl.formatMessage({
                        defaultMessage: 'Remove the image?',
                        id: 'bRha+v',
                      })}
                      onConfirm={() => onDeleteImage(image.id)}
                      okText={intl.formatMessage({
                        defaultMessage: 'Yes',
                        id: 'a5msuh',
                      })}
                      cancelText={intl.formatMessage({
                        defaultMessage: 'No',
                        id: 'oUWADl',
                      })}
                      overlayInnerStyle={{ padding: 10 }}
                    >
                      <Button
                        type="text"
                        disabled={saving}
                        icon={
                          <FontAwesomeIcon
                            className={classes.icon}
                            icon={faTrash}
                            size="lg"
                          />
                        }
                        size="small"
                      >
                        {intl.formatMessage({
                          defaultMessage: 'Delete Image',
                          id: 'u5uVrC',
                        })}
                      </Button>
                    </Popconfirm>
                    <Button
                      type="text"
                      disabled={saving}
                      icon={
                        <FontAwesomeIcon
                          className={classes.icon}
                          icon={faFolderArrowDown}
                          size="lg"
                        />
                      }
                      // eslint-disable-next-line @typescript-eslint/no-misused-promises
                      onClick={() =>
                        downloadImage(
                          image.optimised || image.url || '',
                          `${image.id}`
                        )
                      }
                      size="small"
                    >
                      {intl.formatMessage({
                        defaultMessage: 'DownLoad Image',
                        id: 'F3WRRU',
                      })}
                    </Button>
                  </div>
                }
              >
                <Button
                  onClick={() => openLightbox(i)}
                  className={classes.image}
                  style={{ padding: 0 }}
                >
                  <WatermarkImage
                    url={image.optimised}
                    rotation={image.rotation}
                    position={image.position}
                  />
                </Button>
              </Popover>
            ) : (
              <Button
                onClick={() => openLightbox(i)}
                className={classes.image}
                style={{ padding: 0 }}
              >
                <WatermarkImage
                  url={image.optimised}
                  rotation={image.rotation}
                  position={image.position}
                />
              </Button>
            )}
          </Col>
        ))}
      </Row>
      <FeedImageEditor
        submitImage={onEditImage}
        onClose={() => setEditImageData(null)}
        open={!!editImageData}
        image={editImageData}
      />

      {lightboxElements && lightBoxOpen && (
        <Lightbox
          open={lightBoxOpen.open}
          close={() => openLightbox(0)}
          plugins={[Zoom]}
          index={lightBoxOpen.index}
          slides={lightboxElements}
          controller={{
            closeOnBackdropClick: true,
          }}
          render={{
            slide: (slide: WatermarkSlideType) => (
              <WatermarkSlide slide={slide} />
            ),
          }}
        />
      )}
    </div>
  );
};

export default ImagesList;
