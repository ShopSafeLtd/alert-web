import type { Image } from 'components/images/LightBox/LightBox.types';
import type { ViewOffenderMatchesQuery } from 'graphql/offenders/queries/__generated__/offender-macthes.generated';

import publicOffenderDob from '#/utils/public-offender-dob';
import { Button, Card, Col, Popconfirm, Row, Skeleton, Typography } from 'antd';
import LightBox from 'components/images/LightBox/LightBox.container';
import WatermarkImage from 'components/images/WatermarkImage.view';
import React from 'react';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';
import {
  getOffenderAge,
  getOffenderBuild,
  getOffenderGender,
  getOffenderRace,
} from 'utils/offender/get-offender-desc';

import MatchedFace from './MatchedFace.view';

const useStyles = createUseStyles({
  container: {},
  currentOffender: {
    marginBottom: 20,
  },
  imageContainer: {
    borderRadius: 10,
    height: 200,
    overflow: 'hidden',
    width: '100%',
  },
  matchContainer: {
    padding: '10px 15px',
  },
  matchImage: {
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    height: 300,
    overflow: 'hidden',
    width: 200,
  },
  matchRef: {
    marginBottom: 10,
  },
  ref: {
    fontSize: 14,
  },
  skeletonMatch: {
    marginBottom: 20,
    width: '100%',
  },
});

interface LightBoxState {
  images: Image[];
  index: number;
}

interface Props {
  data: ViewOffenderMatchesQuery | undefined;
  lightBox: LightBoxState | null;
  loading: boolean;
  onDismissMatch: (id: string) => void;
  toggleLightBox: (data: LightBoxState | null) => void;
}

const OffenderMatches = ({
  data,
  lightBox,
  loading,
  onDismissMatch,
  toggleLightBox,
}: Props) => {
  const classes = useStyles();
  const intl = useIntl();
  const publicOffenderDOB = publicOffenderDob();
  return (
    <div className={classes.container}>
      <Row className={classes.currentOffender} gutter={16}>
        <Col span={6}>
          {loading && <Skeleton.Image style={{ height: 200, width: 200 }} />}
          {!loading && (
            <div className={classes.imageContainer}>
              <WatermarkImage
                position={data?.offender?.images[0]?.position}
                url={data?.offender?.images[0]?.optimised}
              />
            </div>
          )}
        </Col>
        <Col>
          {loading && <Skeleton active />}
          {!loading && (
            <>
              <Typography.Title level={3} style={{ marginBottom: 0 }}>
                {data?.offender?.name}
              </Typography.Title>
              <Typography.Text className={classes.ref} type="secondary">
                {intl.formatMessage(
                  {
                    defaultMessage: 'Alert ID: {reference}',
                  },
                  {
                    reference: data?.offender?.reference,
                  }
                )}
              </Typography.Text>
              <Row gutter={16} style={{ marginBottom: 10, marginTop: 5 }}>
                {publicOffenderDOB && (
                  <Col>
                    <Typography.Text>
                      {intl.formatMessage({
                        defaultMessage: 'Age: ',
                      })}
                      {getOffenderAge(data?.offender?.age)}
                    </Typography.Text>
                  </Col>
                )}
                <Col>
                  <Typography.Text>
                    {intl.formatMessage({
                      defaultMessage: 'Sex: ',
                    })}
                    {getOffenderGender(data?.offender?.gender)}
                  </Typography.Text>
                </Col>
                <Col>
                  <Typography.Text>
                    {intl.formatMessage({
                      defaultMessage: 'Ethnicity: ',
                    })}
                    {getOffenderRace(data?.offender?.race)}
                  </Typography.Text>
                </Col>
                <Col>
                  <Typography.Text>
                    {intl.formatMessage({
                      defaultMessage: 'Build: ',
                    })}
                    {getOffenderBuild(data?.offender?.build)}
                  </Typography.Text>
                </Col>
              </Row>
            </>
          )}
        </Col>
      </Row>

      {loading && (
        <>
          <Skeleton.Avatar
            active
            className={classes.skeletonMatch}
            style={{ borderRadius: 10, height: 100, width: '100%' }}
          />
          <Skeleton.Avatar
            active
            className={classes.skeletonMatch}
            style={{ borderRadius: 10, height: 100, width: '100%' }}
          />
          <Skeleton.Avatar
            active
            className={classes.skeletonMatch}
            style={{ borderRadius: 10, height: 100, width: '100%' }}
          />
        </>
      )}

      {!loading && (
        <Typography.Title level={4}>
          {intl.formatMessage({
            defaultMessage: 'Face AI Matches:',
          })}
        </Typography.Title>
      )}
      {data?.offender?.searchedMatches.map((match) => (
        <>
          <Card
            bodyStyle={{ padding: 0 }}
            key={match.id}
            style={{ marginBottom: 10 }}
          >
            <Row wrap={false}>
              <Col>
                <div className={classes.matchImage}>
                  <WatermarkImage
                    position={match.matchedOffender?.images[0]?.position}
                    url={match.matchedOffender?.images[0]?.optimised}
                  />
                </div>
              </Col>
              <Col className={classes.matchContainer} flex={1}>
                <Typography.Title level={4} style={{ marginBottom: -3 }}>
                  {match.matchedOffender?.name}
                </Typography.Title>
                <Typography.Text>
                  {intl.formatMessage(
                    {
                      defaultMessage: 'Alert ID: {reference}',
                    },
                    {
                      reference: match.matchedOffender?.reference,
                    }
                  )}
                </Typography.Text>
                <Row gutter={16} style={{ marginBottom: 10, marginTop: 5 }}>
                  <Col>
                    <Typography.Text>
                      {intl.formatMessage({
                        defaultMessage: 'Age: ',
                      })}
                      {getOffenderAge(match.matchedOffender?.age)}
                    </Typography.Text>
                  </Col>
                  <Col>
                    <Typography.Text>
                      {intl.formatMessage({
                        defaultMessage: 'Sex: ',
                      })}
                      {getOffenderGender(match.matchedOffender?.gender)}
                    </Typography.Text>
                  </Col>
                  <Col>
                    <Typography.Text>
                      {intl.formatMessage({
                        defaultMessage: 'Ethnicity: ',
                      })}
                      {getOffenderRace(match.matchedOffender?.race)}
                    </Typography.Text>
                  </Col>
                  <Col>
                    <Typography.Text>
                      {intl.formatMessage({
                        defaultMessage: 'Build: ',
                      })}
                      {getOffenderBuild(match.matchedOffender?.build)}
                    </Typography.Text>
                  </Col>
                </Row>
                <Typography.Text strong style={{ fontSize: 16 }}>
                  {intl.formatMessage({
                    defaultMessage: 'Matched Images',
                  })}
                </Typography.Text>
                <Row
                  gutter={8}
                  style={{
                    colorScheme: 'dark',
                    marginTop: 5,
                    overflowX: 'auto',
                  }}
                  wrap={false}
                >
                  {match.matchedFaces.map((matchedFace, index) => (
                    <Col key={matchedFace.id}>
                      <MatchedFace
                        face={matchedFace.rekFace}
                        onClick={() =>
                          toggleLightBox({
                            images: match.matchedFaces.map(
                              (item) => item.rekFace.image
                            ),
                            index,
                          })
                        }
                        similarity={matchedFace.similarity}
                      />
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          </Card>
          <Row gutter={8} justify="end" style={{ marginBottom: 20 }}>
            <Col>
              <Popconfirm
                onConfirm={() => onDismissMatch(match.id)}
                overlayInnerStyle={{ padding: 10 }}
                title={intl.formatMessage({
                  defaultMessage: 'Are you sure?',
                })}
              >
                <Button size="small">
                  {intl.formatMessage({
                    defaultMessage: 'Dismiss Match',
                  })}
                </Button>
              </Popconfirm>
            </Col>
            <Col>
              <Link
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                to={`/app/offenders/compare/${match.matchedOffender?.id}?offenders=${data.offender?.id}`}
              >
                <Button danger size="small">
                  {intl.formatMessage({
                    defaultMessage: 'Compare & Merge',
                  })}
                </Button>
              </Link>
            </Col>
          </Row>
        </>
      ))}

      {lightBox !== null && (
        <LightBox
          close={() => toggleLightBox(null)}
          images={lightBox?.images || []}
          index={lightBox.index}
          open={lightBox !== null}
        />
      )}
    </div>
  );
};

export default OffenderMatches;
