import React from 'react';
import { createUseStyles } from 'react-jss';
import type { ViewOffenderMatchesQuery } from 'graphql/generated';
import { Button, Card, Col, Row, Skeleton, Typography } from 'antd';
import WatermarkImage from 'components/images/WatermarkImage.view';
import {
  getOffenderAge,
  getOffenderBuild,
  getOffenderGender,
  getOffenderRace,
} from 'utils/offender/get-offender-desc';
import LightBox from 'components/images/LightBox/LightBox.container';
import type { Image } from 'components/images/LightBox/LightBox.types';
import { Link } from 'react-router-dom';
import MatchedFace from './MatchedFace.view';

const useStyles = createUseStyles({
  container: {},
  skeletonMatch: {
    width: '100%',
    marginBottom: 20,
  },
  ref: {
    fontSize: 14,
  },
  imageContainer: {
    height: 200,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  currentOffender: {
    marginBottom: 20,
  },
  matchImage: {
    height: 300,
    width: 200,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    overflow: 'hidden',
  },
  matchContainer: {
    padding: '10px 15px',
  },
  matchRef: {
    marginBottom: 10,
  },
});

interface LightBoxState {
  index: number;
  images: Image[];
}

interface Props {
  data: ViewOffenderMatchesQuery | undefined;
  loading: boolean;
  lightBox: LightBoxState | null;
  toggleLightBox: (data: LightBoxState | null) => void;
}

const OffenderMatches = ({
  data,
  loading,
  lightBox,
  toggleLightBox,
}: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Row gutter={16} className={classes.currentOffender}>
        <Col span={6}>
          {loading && <Skeleton.Image style={{ height: 200, width: 200 }} />}
          {!loading && (
            <div className={classes.imageContainer}>
              <WatermarkImage
                url={data?.offender?.images[0]?.optimised}
                position={data?.offender?.images[0]?.position}
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
                Alert ID: {data?.offender?.reference}
              </Typography.Text>
              <Row style={{ marginTop: 5, marginBottom: 10 }} gutter={16}>
                <Col>
                  <Typography.Text>
                    Age: {getOffenderAge(data?.offender?.age)}
                  </Typography.Text>
                </Col>
                <Col>
                  <Typography.Text>
                    Sex: {getOffenderGender(data?.offender?.gender)}
                  </Typography.Text>
                </Col>
                <Col>
                  <Typography.Text>
                    Ethnicity: {getOffenderRace(data?.offender?.race)}
                  </Typography.Text>
                </Col>
                <Col>
                  <Typography.Text>
                    Build: {getOffenderBuild(data?.offender?.build)}
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
            style={{ width: '100%', borderRadius: 10, height: 100 }}
            className={classes.skeletonMatch}
            active
          />
          <Skeleton.Avatar
            style={{ width: '100%', borderRadius: 10, height: 100 }}
            className={classes.skeletonMatch}
            active
          />
          <Skeleton.Avatar
            style={{ width: '100%', borderRadius: 10, height: 100 }}
            className={classes.skeletonMatch}
            active
          />
        </>
      )}

      {!loading && (
        <Typography.Title level={4}>Face AI Matches:</Typography.Title>
      )}
      {data?.offender?.searchedMatches.map((match) => (
        <>
          <Card
            key={match.id}
            bodyStyle={{ padding: 0 }}
            style={{ marginBottom: 10 }}
          >
            <Row wrap={false}>
              <Col>
                <div className={classes.matchImage}>
                  <WatermarkImage
                    url={match.matchedOffender?.images[0]?.optimised}
                    position={match.matchedOffender?.images[0]?.position}
                  />
                </div>
              </Col>
              <Col flex={1} className={classes.matchContainer}>
                <Typography.Title level={4} style={{ marginBottom: -3 }}>
                  {match.matchedOffender?.name}
                </Typography.Title>
                <Typography.Text>
                  Alert ID: {match.matchedOffender?.reference}
                </Typography.Text>
                <Row style={{ marginTop: 5, marginBottom: 10 }} gutter={16}>
                  <Col>
                    <Typography.Text>
                      Age: {getOffenderAge(match.matchedOffender?.age)}
                    </Typography.Text>
                  </Col>
                  <Col>
                    <Typography.Text>
                      Sex: {getOffenderGender(match.matchedOffender?.gender)}
                    </Typography.Text>
                  </Col>
                  <Col>
                    <Typography.Text>
                      Ethnicity: {getOffenderRace(match.matchedOffender?.race)}
                    </Typography.Text>
                  </Col>
                  <Col>
                    <Typography.Text>
                      Build: {getOffenderBuild(match.matchedOffender?.build)}
                    </Typography.Text>
                  </Col>
                </Row>
                <Typography.Text strong style={{ fontSize: 16 }}>
                  Matched Images
                </Typography.Text>
                <Row
                  wrap={false}
                  gutter={8}
                  style={{
                    marginTop: 5,
                    overflowX: 'auto',
                    colorScheme: 'dark',
                  }}
                >
                  {match.matchedFaces.map((matchedFace, index) => (
                    <Col key={matchedFace.id}>
                      <MatchedFace
                        face={matchedFace.rekFace}
                        similarity={matchedFace.similarity}
                        onClick={() =>
                          toggleLightBox({
                            images: match.matchedFaces.map(
                              (item) => item.rekFace.image
                            ),
                            index,
                          })
                        }
                      />
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          </Card>
          <Row justify="end" gutter={8}>
            <Col>
              <Button size="small">Dismiss Match</Button>
            </Col>
            <Col>
              <Link
                to={`/app/offenders/compare/${data.offender?.id}?${match.matchedOffender?.id}`}
              >
                <Button size="small" danger>
                  Compare & Merge
                </Button>
              </Link>
            </Col>
          </Row>
        </>
      ))}

      {lightBox !== null && (
        <LightBox
          close={() => toggleLightBox(null)}
          index={lightBox.index}
          open={lightBox !== null}
          images={lightBox?.images || []}
        />
      )}
    </div>
  );
};

export default OffenderMatches;
