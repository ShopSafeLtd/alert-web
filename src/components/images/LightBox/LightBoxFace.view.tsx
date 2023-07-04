import React, { useEffect, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';
import type { Theme } from 'configs/ThemeConfig';
import { Button, Card, Col, Popconfirm, Row, Tooltip, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faTrash } from '@fortawesome/pro-light-svg-icons';
import { useStoreState } from 'state';
import { Role } from 'graphql/generated';
import {
  getOffenderAge,
  getOffenderBuild,
  getOffenderGender,
  getOffenderRace,
} from 'utils/offender/get-offender-desc';
import { useIntl } from 'react-intl';
import type { Face } from './LightBox.types';
import WatermarkOverlay from '../WatermarkOverlay.view';

const useStyles = createUseStyles((theme: Theme) => ({
  wrapper: {
    marginBottom: 20,
  },
  offender: {
    display: 'flex',
  },
  offenderContainer: {
    padding: 10,
  },
  offenderImage: {
    height: 110,
    width: 120,
    backgroundColor: theme.imageBackgroundColor,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    overflow: 'hidden',
  },
  offenderName: {
    fontSize: 16,
  },
  offenderText: {
    marginBottom: '0px !important',
  },
}));

interface Props {
  face: Face;
  faceIndex: number;
  imageUrl?: string | null;
  toggleLinkOffender: (faceId: string | null) => void;
  toggleViewMatches: (offenderId: string | null) => void;
}

const LightBoxFace = ({
  face,
  faceIndex,
  imageUrl,
  toggleLinkOffender,
  toggleViewMatches,
}: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const intl = useIntl();
  const classes = useStyles();

  const role = useStoreState((state) => state.user.role);

  const [isAdmin, setIsAdmin] = useState(false);
  const [height, setHeight] = useState(500);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setIsAdmin(role !== Role.User);
  }, [role]);

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d');
    const canvasImage = new Image();
    canvasImage.src = imageUrl || '';
    canvasImage.onload = () => {
      if (context) {
        const imageHeight = canvasImage.height;
        const imageWidth = canvasImage.width;

        const viewHeight = 200;
        const ratio = imageHeight / viewHeight;
        const canvasWidth = imageWidth / ratio;

        setHeight(viewHeight);
        setWidth(canvasWidth);

        const boundingWidth = (face.boundingWidth || 0) * imageWidth;
        const boundingHeight = (face.boundingHeight || 0) * imageHeight;
        const xOffset = (boundingWidth / 110) * 30;
        const yOffset = (boundingHeight / 110) * 30;
        const boundingX = (face.boundingLeft || 0) * imageWidth - xOffset;
        const boundingY = (face.boundingTop || 0) * imageHeight - yOffset;
        let extendedBoundingWidth = boundingWidth + xOffset * 2;
        const extendedBoundingHeight = boundingHeight + yOffset;

        if (extendedBoundingWidth < 120) {
          extendedBoundingWidth = 120 * ratio;
        }
        const croppedHeight = 110;
        const croppedRatio = extendedBoundingHeight / croppedHeight;

        const croppedWidth = extendedBoundingWidth / croppedRatio;

        context.drawImage(
          canvasImage,
          boundingX,
          boundingY,
          extendedBoundingWidth,
          extendedBoundingHeight,
          0,
          0,
          croppedWidth,
          croppedHeight
        );
      }
    };
  }, [face]);

  return (
    <div className={classes.wrapper}>
      <Card bodyStyle={{ padding: 0 }} style={{ marginBottom: 8 }}>
        <div className={classes.offender}>
          <div className={classes.offenderImage}>
            <WatermarkOverlay>
              <canvas ref={canvasRef} width={width} height={height} />
            </WatermarkOverlay>
          </div>
          <div className={classes.offenderContainer}>
            <Typography.Text
              key={face.id}
              strong
              className={classes.offenderName}
            >
              {face.offender
                ? face.offender?.name
                : intl.formatMessage(
                    {
                      defaultMessage: 'Face {num}',
                      id: 'zR1xaG',
                    },
                    {
                      num: faceIndex + 1,
                    }
                  )}
            </Typography.Text>
            {!face.offender && isAdmin && (
              <Row gutter={8} wrap={false}>
                <Col>
                  <Button
                    onClick={() => toggleLinkOffender(face.id)}
                    size="small"
                    style={{ marginTop: 12 }}
                  >
                    {intl.formatMessage({
                      defaultMessage: 'Link Offender',
                      id: 'IWqg0R',
                    })}
                  </Button>
                </Col>
                <Col>
                  <Tooltip
                    title={intl.formatMessage({
                      defaultMessage: 'Delete Face',
                      id: 'f/S/kU',
                    })}
                    placement="top"
                  >
                    <Popconfirm
                      overlayInnerStyle={{ padding: 10 }}
                      title={intl.formatMessage({
                        defaultMessage:
                          '"Are you sure you want to delete this face?"',
                        id: 'XtSElZ',
                      })}
                    >
                      <Button size="small" style={{ marginTop: 12 }}>
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </Popconfirm>
                  </Tooltip>
                </Col>
              </Row>
            )}
            {!face.offender && !isAdmin && (
              <Row gutter={8} wrap={false} style={{ marginTop: 10 }}>
                <Col>
                  <FontAwesomeIcon size="lg" icon={faExclamationCircle} />
                </Col>
                <Col>
                  <Typography.Text>
                    {intl.formatMessage({
                      defaultMessage: 'No Offender linked to this face',
                      id: 'PTTNcF',
                    })}
                  </Typography.Text>
                </Col>
              </Row>
            )}
            {face.offender && (
              <>
                <Typography.Paragraph
                  className={classes.offenderText}
                  type="secondary"
                >
                  {intl.formatMessage(
                    {
                      defaultMessage: 'Alert ID: {ref}',
                      id: 'umL9sI',
                    },
                    {
                      ref: face.offender.reference,
                    }
                  )}
                </Typography.Paragraph>
                <Row gutter={16}>
                  <Col>
                    <Typography.Paragraph
                      className={classes.offenderText}
                      type="secondary"
                    >
                      {intl.formatMessage({
                        defaultMessage: 'Age: ',
                        id: 'anqdpr',
                      })}
                      {getOffenderAge(face.offender.age)}
                    </Typography.Paragraph>
                  </Col>
                  <Col>
                    <Typography.Paragraph
                      className={classes.offenderText}
                      type="secondary"
                    >
                      {intl.formatMessage({
                        defaultMessage: 'Gender: ',
                        id: 'dMrZIO',
                      })}
                      {getOffenderGender(face.offender.gender)}
                    </Typography.Paragraph>
                  </Col>
                  <Col>
                    <Typography.Paragraph
                      className={classes.offenderText}
                      type="secondary"
                    >
                      {intl.formatMessage({
                        defaultMessage: 'Ethnicity: ',
                        id: 'H+Sv5C',
                      })}
                      {getOffenderRace(face.offender.race, true)}
                    </Typography.Paragraph>
                  </Col>
                  <Col>
                    <Typography.Paragraph
                      className={classes.offenderText}
                      type="secondary"
                    >
                      {intl.formatMessage({
                        defaultMessage: 'Build: ',
                        id: 'iXQkAi',
                      })}
                      {getOffenderBuild(face.offender.build)}
                    </Typography.Paragraph>
                  </Col>
                </Row>
              </>
            )}
          </div>
        </div>
      </Card>
      <Row gutter={8} justify="end">
        {face.rekMatchedSearches.length > 0 && (
          <Col>
            <Button
              size="small"
              danger
              onClick={() => toggleViewMatches(face.offender?.id || null)}
            >
              {face.rekMatchedSearches.length > 0 &&
                intl.formatMessage(
                  {
                    defaultMessage:
                      '{itemCount} {itemCount, plural, one {Match Found} other {Matches Found}}',
                    id: 'hv7GuO',
                  },
                  {
                    itemCount: face.rekMatchedSearches.length,
                  }
                )}
            </Button>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default LightBoxFace;
