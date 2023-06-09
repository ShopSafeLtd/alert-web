import React, { useEffect, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';
import type {
  ListRekMatchesQuery,
  SchemeRekognitionQuery,
} from 'graphql/generated';
import { Card, Col, Row, Spin, Typography } from 'antd';

const { Title, Text } = Typography;

const useStyles = createUseStyles({
  loading: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  page: {
    padding: 20,
  },
  headerRow: {
    marginBottom: 20,
  },
  title: {
    marginBottom: '0px !important',
  },
});

interface RowProps {
  match: Exclude<
    ListRekMatchesQuery,
    undefined | null
  >['listRekMatches']['matches'][number];
}

const MatchRow = ({ match }: RowProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvas2Ref = useRef<HTMLCanvasElement | null>(null);

  const [height] = useState(300);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // search image
    const context = canvasRef.current?.getContext('2d');
    const image = new Image();
    image.src = match.searchedFace.image.optimised || '';
    image.onload = () => {
      if (context) {
        const canvasHeight = height;
        const imageHeight = image.height;
        const imageWidth = image.width;
        const ratio = imageHeight / canvasHeight;
        const canvasWidth = imageWidth / ratio;
        const boundingX =
          ((match.searchedFace.boundingLeft || 0) * imageWidth) / ratio;
        const boundingY =
          ((match.searchedFace.boundingTop || 0) * imageHeight) / ratio;
        const boundingWidth =
          ((match.searchedFace.boundingWidth || 0) * imageWidth) / ratio;
        const boundingHeight =
          ((match.searchedFace.boundingHeight || 0) * imageHeight) / ratio;

        setWidth(canvasWidth);
        context.drawImage(image, 0, 0, canvasWidth, canvasHeight);
        context.strokeStyle = '#de4436';
        context.lineWidth = 2;
        context.strokeRect(boundingX, boundingY, boundingWidth, boundingHeight);
      }
    };

    // match image
    const context2 = canvas2Ref.current?.getContext('2d');
    const image2 = new Image();
    image2.src = match.matchedFaces[0]?.rekFace.image.optimised || '';
    console.log(image2);
    image2.onload = () => {
      if (context2) {
        const canvasHeight = height;
        const imageHeight = image2.height;
        const imageWidth = image2.width;
        const ratio = imageHeight / canvasHeight;
        const canvasWidth = imageWidth / ratio;
        const boundingX =
          ((match.matchedFaces[0]?.rekFace.boundingLeft || 0) * imageWidth) /
          ratio;
        const boundingY =
          ((match.matchedFaces[0]?.rekFace.boundingTop || 0) * imageHeight) /
          ratio;
        const boundingWidth =
          ((match.matchedFaces[0]?.rekFace.boundingWidth || 0) * imageWidth) /
          ratio;
        const boundingHeight =
          ((match.matchedFaces[0]?.rekFace.boundingHeight || 0) * imageHeight) /
          ratio;

        setWidth(canvasWidth);
        context2.drawImage(image, 0, 0, canvasWidth, canvasHeight);
        context2.strokeStyle = '#de4436';
        context2.lineWidth = 2;
        context2.strokeRect(
          boundingX,
          boundingY,
          boundingWidth,
          boundingHeight
        );
      }
    };
  }, [match]);

  return (
    <Card>
      <Row>
        <Col>
          <Title level={4}>{match.offender?.name}</Title>

          <canvas ref={canvasRef} width={width} height={height} />
        </Col>
        <Col>
          <Text>Confidence: {match.avgSimilarity?.toFixed(2)}</Text>
        </Col>
        <Col>
          <Title level={4}>
            {match.matchedFaces[0]?.rekFace.offender?.name}
          </Title>

          <canvas ref={canvas2Ref} width={width} height={height} />
        </Col>
      </Row>
    </Card>
  );
};

interface Props {
  loading: boolean;
  data: SchemeRekognitionQuery | undefined;
  matchesData: ListRekMatchesQuery | undefined;
}

const Dashboard = ({ data, loading = true, matchesData }: Props) => {
  const classes = useStyles();

  return loading ? (
    <div className={classes.loading}>
      <Spin />
    </div>
  ) : (
    <div className={classes.page}>
      {data?.scheme?.facialRecognition ? (
        <div>
          <Row gutter={16} align="middle" className={classes.headerRow}>
            <Col flex={1}>
              <Title className={classes.title} level={3}>
                Face Matches
              </Title>
            </Col>
          </Row>
          <div>
            {matchesData?.listRekMatches.matches.map((match) => (
              <MatchRow match={match} key={match.id} />
            ))}
          </div>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

export default Dashboard;
