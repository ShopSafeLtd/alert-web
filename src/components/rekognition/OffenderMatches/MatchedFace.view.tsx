import React from 'react';
import { createUseStyles } from 'react-jss';
import type { Theme } from 'configs/ThemeConfig';
import WatermarkImage from 'components/images/WatermarkImage.view';
import type { ImagePosition } from 'graphql/generated';
import { Row, Typography } from 'antd';
import { useIntl } from 'react-intl';

const useStyles = createUseStyles((theme: Theme) => ({
  matchedFace: {
    backgroundColor: theme.imageBackgroundColor,
    height: 150,
    width: 150,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    cursor: 'pointer',
  },
  similarity: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '5px 10px',
    background: 'rgba(0,0,0,0.6)',
    textAlign: 'center',
  },
}));

interface Props {
  face: {
    id: string;
    image?: {
      id: string;
      optimised?: string | null;
      position?: ImagePosition;
    } | null;
  };
  similarity: number;
  onClick?: () => void;
}

const MatchedFace = ({ face, similarity, onClick }: Props) => {
  const classes = useStyles();
  const intl = useIntl();
  return (
    <Row className={classes.matchedFace} onClick={onClick}>
      <WatermarkImage
        url={face.image?.optimised}
        position={face.image?.position}
      />
      <div className={classes.similarity}>
        <Typography.Text>
          {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
          {similarity?.toFixed(2) || 0}%
          {intl.formatMessage({
            defaultMessage: 'match',
            id: 'zHoH3/',
          })}
        </Typography.Text>
      </div>
    </Row>
  );
};

export default MatchedFace;
