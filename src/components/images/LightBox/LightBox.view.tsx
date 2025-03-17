import type { CarouselRef } from 'antd/lib/carousel';
import type { Theme } from 'configs/ThemeConfig';

import {
  faAngleLeft,
  faAngleRight,
  faClose,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Carousel, Col, Drawer, Row } from 'antd';
import AddExistingOffender from 'components/form-components/offender/AddExistingOffender';
// import AddNewOffender from '#/components/form-components/offender/offender/AddNewOffender';
import AddNewOffenderSimple from 'components/form-components/offender/AddNewOffenderSimple';
// import AddNewOffender from 'components/form-components/offender/offender/AddNewOffender';
import OffenderMatches from 'components/rekognition/OffenderMatches/OffenderMatches.container';
import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';

import type { Image } from './LightBox.types';

import LightBoxFace from './LightBoxFace.view';
import Slide from './LightBoxSlide.view';

const useStyles = createUseStyles((theme: Theme) => ({
  close: {
    position: 'fixed',
    right: 20,
    top: 20,
  },
  imageContainer: {
    backgroundColor: theme.imageBackgroundColor,
    height: '100vh',
    position: 'relative',
    transition: 'all 0.2s ease-in-out',
  },
  leftButton: {
    left: 10,
    position: 'absolute',
    top: '50%',
    zIndex: 1001,
  },
  offenders: {
    padding: 20,
    transition: 'all 0.2s ease-in-out',
  },
  page: {
    background: theme.bodyBackground,
    bottom: 0,
    left: 0,
    position: 'fixed',
    right: 0,
    top: 0,
    zIndex: 1000,
  },
  rightButton: {
    position: 'absolute',
    right: 10,
    top: '50%',
    zIndex: 1001,
  },
}));

interface Props {
  close: () => void;
  images?: Image[];
  index: number;
  linkNewOffender: boolean;
  linkOffender: null | string;
  open: boolean;
  showBoxes: boolean;
  toggleBoxes: () => void;
  toggleLinkNewOffender: () => void;
  toggleLinkOffender: (faceId: null | string) => void;
  toggleViewMatches: (offenderId: null | string) => void;
  viewMatches: null | string;
}

const LightBox = ({
  close,
  images = [],
  index,
  linkNewOffender,
  linkOffender,
  open,
  showBoxes,
  toggleBoxes,
  toggleLinkNewOffender,
  toggleLinkOffender,
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
  const intl = useIntl();
  return open ? (
    <div className={classes.page}>
      <Row>
        <Col
          className={classes.imageContainer}
          span={currentImage?.faces && currentImage.faces.length > 0 ? 18 : 24}
        >
          <Carousel afterChange={setSlide} ref={carouselRef}>
            {images.map((image) => (
              // <div className={classes.imageContainer}>
              //   <WatermarkImage key={image.id} url={image.optimised} />
              // </div>
              <Slide image={image} key={image.id} showBoxes={showBoxes} />
            ))}
          </Carousel>
          {images.length > 1 && (
            <>
              <div className={classes.leftButton}>
                <Button
                  onClick={() => carouselRef.current?.prev()}
                  size="small"
                >
                  <FontAwesomeIcon icon={faAngleLeft} size="lg" />
                </Button>
              </div>
              <div className={classes.rightButton}>
                <Button
                  onClick={() => carouselRef.current?.next()}
                  size="small"
                >
                  <FontAwesomeIcon icon={faAngleRight} size="lg" />
                </Button>
              </div>
            </>
          )}
        </Col>
        <Col
          className={classes.offenders}
          span={currentImage?.faces && currentImage.faces.length > 0 ? 6 : 0}
        >
          <Row gutter={8} justify="end" style={{ marginBottom: 20 }}>
            <Col>
              <Button onClick={toggleBoxes}>
                {intl.formatMessage(
                  {
                    defaultMessage:
                      '{showboxes, plural, =0 {Hide Boxes} =1{Show Boxes} other{}}',
                  },
                  {
                    showboxes: showBoxes ? 0 : 1,
                  }
                )}
              </Button>
            </Col>
            <Col>
              <Button onClick={close}>
                <FontAwesomeIcon icon={faClose} size="lg" />
              </Button>
            </Col>
          </Row>
          {currentImage?.faces.map((face, faceIndex) => (
            <LightBoxFace
              face={face}
              faceIndex={faceIndex}
              imageUrl={currentImage.optimised}
              key={face.id}
              toggleLinkOffender={toggleLinkOffender}
              toggleViewMatches={toggleViewMatches}
            />
          ))}
        </Col>
      </Row>

      {currentImage?.faces && currentImage.faces.length === 0 && (
        <Button className={classes.close} onClick={close}>
          <FontAwesomeIcon icon={faClose} size="lg" />
        </Button>
      )}

      <Drawer
        extra={
          <Button onClick={toggleLinkNewOffender}>
            {linkNewOffender
              ? intl.formatMessage({
                  defaultMessage: 'Search Existing Offenders',
                })
              : intl.formatMessage({
                  defaultMessage: 'Add A New Offender',
                })}
          </Button>
        }
        onClose={() => toggleLinkOffender(null)}
        open={linkOffender !== null}
        title={intl.formatMessage({
          defaultMessage: 'Link an offender to face',
        })}
        width={linkNewOffender ? 600 : 1000}
      >
        {!linkNewOffender && linkOffender && (
          <AddExistingOffender
            addOverride="Link"
            offenderIds={[]}
            onClose={() => toggleLinkOffender(null)}
            update={() => {}}
          />
        )}
        {linkNewOffender && linkOffender && (
          // <AddNewOffender
          //   addOverride="Link"
          //   onClose={() => toggleLinkOffender(null)}
          //   update={() => {}}
          // />
          <AddNewOffenderSimple
            addOverride="Link"
            images={[]}
            onClose={() => toggleLinkOffender(null)}
          />
        )}
      </Drawer>

      <Drawer
        onClose={() => toggleViewMatches(null)}
        open={viewMatches !== null}
        title={intl.formatMessage({
          defaultMessage: 'View Face AI matches',
        })}
        width={800}
      >
        {viewMatches && <OffenderMatches offenderId={viewMatches} />}
      </Drawer>
    </div>
  ) : null;
};

export default LightBox;
