import React, { useEffect, useState, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import type { Theme } from 'configs/ThemeConfig';
import { Button, Carousel, Col, Drawer, Row } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleLeft,
  faAngleRight,
  faClose,
} from '@fortawesome/pro-light-svg-icons';
import type { CarouselRef } from 'antd/lib/carousel';
import AddExistingOffender from 'components/form-components/offender/offender/AddExistingOffender';
import AddNewOffender from 'components/form-components/offender/offender/AddNewOffender';
import OffenderMatches from 'components/rekognition/OffenderMatches/OffenderMatches.container';
import LightBoxFace from './LightBoxFace.view';
import Slide from './LightBoxSlide.view';
import type { Image } from './LightBox.types';

const useStyles = createUseStyles((theme: Theme) => ({
  page: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    background: theme.bodyBackground,
    zIndex: 1000,
  },
  leftButton: {
    zIndex: 1001,
    position: 'absolute',
    left: 10,
    top: '50%',
  },
  rightButton: {
    zIndex: 1001,
    position: 'absolute',
    right: 10,
    top: '50%',
  },
  imageContainer: {
    height: '100vh',
    backgroundColor: theme.imageBackgroundColor,
    position: 'relative',
    transition: 'all 0.2s ease-in-out',
  },
  offenders: {
    padding: 20,
    transition: 'all 0.2s ease-in-out',
  },
  close: {
    position: 'fixed',
    top: 20,
    right: 20,
  },
}));

interface Props {
  images?: Image[];
  open: boolean;
  close: () => void;
  index: number;
  onReIndex: (imageId?: string) => void;
  reIndexing: boolean;
  isAdmin: boolean;
  toggleBoxes: () => void;
  showBoxes: boolean;
  linkOffender: string | null;
  toggleLinkOffender: (faceId: string | null) => void;
  toggleLinkNewOffender: () => void;
  linkNewOffender: boolean;
  viewMatches: string | null;
  toggleViewMatches: (offenderId: string | null) => void;
}

const LightBox = ({
  images = [],
  close,
  index,
  open,
  isAdmin,
  onReIndex,
  reIndexing,
  showBoxes,
  toggleBoxes,
  linkOffender,
  toggleLinkOffender,
  linkNewOffender,
  toggleLinkNewOffender,
  toggleViewMatches,
  viewMatches,
}: Props) => {
  const carouselRef = useRef<CarouselRef | null>(null);
  const classes = useStyles();

  const [slide, setSlide] = useState(0);
  const [currentImage, setCurrentImage] = useState<Image | null>(null);

  const handleKeyPress = (event: { key: string }) => {
    if (event.key === 'ArrowLeft') {
      carouselRef.current?.prev();
    }
    if (event.key === 'ArrowRight') {
      carouselRef.current?.next();
    }
    if (event.key === 'Escape') {
      close();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    setCurrentImage(images[slide] || null);
  }, [slide, images, open]);

  useEffect(() => {
    carouselRef.current?.goTo(index);
  }, [index]);

  return open ? (
    <div className={classes.page}>
      <Row>
        <Col
          span={currentImage?.faces && currentImage.faces.length > 0 ? 18 : 24}
          className={classes.imageContainer}
        >
          <Carousel afterChange={setSlide} ref={carouselRef}>
            {images.map((image) => (
              // <div className={classes.imageContainer}>
              //   <WatermarkImage key={image.id} url={image.optimised} />
              // </div>
              <Slide key={image.id} image={image} showBoxes={showBoxes} />
            ))}
          </Carousel>
          {images.length > 1 && (
            <>
              <div className={classes.leftButton}>
                <Button
                  size="small"
                  onClick={() => carouselRef.current?.prev()}
                >
                  <FontAwesomeIcon icon={faAngleLeft} size="lg" />
                </Button>
              </div>
              <div className={classes.rightButton}>
                <Button
                  size="small"
                  onClick={() => carouselRef.current?.next()}
                >
                  <FontAwesomeIcon icon={faAngleRight} size="lg" />
                </Button>
              </div>
            </>
          )}
        </Col>
        <Col
          span={currentImage?.faces && currentImage.faces.length > 0 ? 6 : 0}
          className={classes.offenders}
        >
          <Row gutter={8} justify="end" style={{ marginBottom: 20 }}>
            <Col>
              <Button onClick={toggleBoxes}>
                {showBoxes ? 'Hide' : 'Show'} Boxes
              </Button>
            </Col>
            {isAdmin && (
              <Col>
                <Button
                  loading={reIndexing}
                  disabled={reIndexing}
                  onClick={() => onReIndex(currentImage?.id)}
                >
                  Search Image
                </Button>
              </Col>
            )}
            <Col>
              <Button onClick={close}>
                <FontAwesomeIcon size="lg" icon={faClose} />
              </Button>
            </Col>
          </Row>
          {currentImage?.faces.map((face, faceIndex) => (
            <LightBoxFace
              key={face.id}
              face={face}
              faceIndex={faceIndex}
              imageUrl={currentImage.optimised}
              toggleLinkOffender={toggleLinkOffender}
              toggleViewMatches={toggleViewMatches}
            />
          ))}
        </Col>
      </Row>

      {currentImage?.faces && currentImage.faces.length === 0 && (
        <Button className={classes.close} onClick={close}>
          <FontAwesomeIcon size="lg" icon={faClose} />
        </Button>
      )}

      <Drawer
        width={linkNewOffender ? 600 : 800}
        title="Link an offender to face"
        open={linkOffender !== null}
        onClose={() => toggleLinkOffender(null)}
        extra={
          <Button onClick={toggleLinkNewOffender}>
            {linkNewOffender
              ? 'Search Existing Offenders'
              : 'Add A New Offender'}
          </Button>
        }
      >
        {!linkNewOffender && linkOffender && (
          <AddExistingOffender
            offenderIds={[]}
            onClose={() => toggleLinkOffender(null)}
            update={() => {}}
            addOverride="Link"
          />
        )}
        {linkNewOffender && linkOffender && (
          <AddNewOffender
            onClose={() => toggleLinkOffender(null)}
            update={() => {}}
            addOverride="Link"
          />
        )}
      </Drawer>

      <Drawer
        open={viewMatches !== null}
        onClose={() => toggleViewMatches(null)}
        title="View Face AI matches"
        width={800}
      >
        {viewMatches && <OffenderMatches offenderId={viewMatches} />}
      </Drawer>
    </div>
  ) : null;
};

export default LightBox;
