import type { Theme } from 'configs/ThemeConfig';
import type { ImagePosition } from 'graphql/types';

import { Row, Typography } from 'antd';
import WatermarkImage from 'components/images/WatermarkImage.view';
import React from 'react';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  matchedFace: {
    backgroundColor: theme.imageBackgroundColor,
    borderRadius: 10,
    cursor: 'pointer',
    height: 150,
    overflow: 'hidden',
    position: 'relative',
    width: 150,
  },
  similarity: {
    background: 'rgba(0,0,0,0.6)',
    bottom: 0,
    left: 0,
    padding: '5px 10px',
    position: 'absolute',
    right: 0,
    textAlign: 'center',
  },
}));

interface Props {
  face: {
    id: string;
    image?: {
      id: string;
      optimised?: null | string;
      position?: ImagePosition;
    } | null;
  };
  onClick?: () => void;
  similarity: number;
}

const MatchedFace = ({ face, onClick, similarity }: Props) => {
  const classes = useStyles();
  const intl = useIntl();
  return (
    <Row className={classes.matchedFace} onClick={onClick}>
      <WatermarkImage
        position={face.image?.position}
        url={face.image?.optimised}
      />
      <div className={classes.similarity}>
        <Typography.Text>
          {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
          {similarity?.toFixed(2) || 0}%
          {intl.formatMessage({
            defaultMessage: 'match',
          })}
        </Typography.Text>
      </div>
    </Row>
  );
};

export default MatchedFace;
