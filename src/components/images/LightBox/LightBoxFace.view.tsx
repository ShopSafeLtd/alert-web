import type { Theme } from 'configs/ThemeConfig';

import PermissionCheckWrapper from '#/components/PermissionCheck/PermissionCheckWrapper';
import publicOffenderDob from '#/utils/public-offender-dob';
import { faExclamationCircle, faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Col, Popconfirm, Row, Tooltip, Typography } from 'antd';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import {
  getOffenderAge,
  getOffenderBuild,
  getOffenderGender,
  getOffenderRace,
} from 'utils/offender/get-offender-desc';

import type { Face } from './LightBox.types';

import WatermarkOverlay from '../WatermarkOverlay.view';

const useStyles = createUseStyles((theme: Theme) => ({
  offender: {
    display: 'flex',
  },
  offenderContainer: {
    padding: 10,
  },
  offenderImage: {
    backgroundColor: theme.imageBackgroundColor,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    height: 110,
    overflow: 'hidden',
    width: 120,
  },
  offenderName: {
    fontSize: 16,
  },
  offenderText: {
    marginBottom: '0px !important',
  },
  wrapper: {
    marginBottom: 20,
  },
}));

interface Props {
  face: Face;
  faceIndex: number;
  imageUrl?: null | string;
  toggleLinkOffender: (faceId: null | string) => void;
  toggleViewMatches: (offenderId: null | string) => void;
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

  const publicOffenderDOB = publicOffenderDob();

  const [height, setHeight] = useState(500);
  const [width, setWidth] = useState(0);

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
              <canvas height={height} ref={canvasRef} width={width} />
            </WatermarkOverlay>
          </div>
          <div className={classes.offenderContainer}>
            <Typography.Text
              className={classes.offenderName}
              key={face.id}
              strong
            >
              {face.offender
                ? face.offender?.name
                : intl.formatMessage(
                    {
                      defaultMessage: 'Face {num}',
                    },
                    {
                      num: faceIndex + 1,
                    }
                  )}
            </Typography.Text>
            {!face.offender && (
              <PermissionCheckWrapper
                permission={{
                  method: PermissionMethod.Edit,
                  model: PermissionModel.Offenders,
                }}
              >
                <Row gutter={8} wrap={false}>
                  <Col>
                    <Button
                      onClick={() => toggleLinkOffender(face.id)}
                      size="small"
                      style={{ marginTop: 12 }}
                    >
                      {intl.formatMessage({
                        defaultMessage: 'Link Offender',
                      })}
                    </Button>
                  </Col>
                  <Col>
                    <Tooltip
                      placement="top"
                      title={intl.formatMessage({
                        defaultMessage: 'Delete Face',
                      })}
                    >
                      <Popconfirm
                        overlayInnerStyle={{ padding: 10 }}
                        title={intl.formatMessage({
                          defaultMessage:
                            '"Are you sure you want to delete this face?"',
                        })}
                      >
                        <Button size="small" style={{ marginTop: 12 }}>
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </Popconfirm>
                    </Tooltip>
                  </Col>
                </Row>
              </PermissionCheckWrapper>
            )}
            {!face.offender && (
              <PermissionCheckWrapper
                permission={{
                  method: PermissionMethod.Edit,
                  model: PermissionModel.Offenders,
                }}
              >
                <Row gutter={8} style={{ marginTop: 10 }} wrap={false}>
                  <Col>
                    <FontAwesomeIcon icon={faExclamationCircle} size="lg" />
                  </Col>
                  <Col>
                    <Typography.Text>
                      {intl.formatMessage({
                        defaultMessage: 'No Offender linked to this face',
                      })}
                    </Typography.Text>
                  </Col>
                </Row>
              </PermissionCheckWrapper>
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
                    },
                    {
                      ref: face.offender.reference,
                    }
                  )}
                </Typography.Paragraph>
                <Row gutter={16}>
                  {publicOffenderDOB && (
                    <Col>
                      <Typography.Paragraph
                        className={classes.offenderText}
                        type="secondary"
                      >
                        {intl.formatMessage({
                          defaultMessage: 'Age: ',
                        })}
                        {getOffenderAge(face.offender.age)}
                      </Typography.Paragraph>
                    </Col>
                  )}
                  <Col>
                    <Typography.Paragraph
                      className={classes.offenderText}
                      type="secondary"
                    >
                      {intl.formatMessage({
                        defaultMessage: 'Gender: ',
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
              danger
              onClick={() => toggleViewMatches(face.offender?.id || null)}
              size="small"
            >
              {face.rekMatchedSearches.length > 0 &&
                intl.formatMessage(
                  {
                    defaultMessage:
                      '{itemCount} {itemCount, plural, one {Match Found} other {Matches Found}}',
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
