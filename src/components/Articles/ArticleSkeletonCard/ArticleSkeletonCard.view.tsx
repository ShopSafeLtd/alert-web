import { Card, Skeleton } from 'antd';
import React from 'react';

import useStyles from './ArticleCard.styles';

interface Props {
  inFeedList?: boolean;
}
const ArticleSkeletonCard = ({ inFeedList }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Card className={classes.card} style={{ height: inFeedList ? 500 : 395 }}>
      <Skeleton.Image
        className={classes.skeletonImage}
        style={{ height: inFeedList ? 260 : 180 }}
      />

      <div
        className="feedItem-card-content"
        style={{ marginTop: 10, paddingLeft: 10 }}
      >
        <Skeleton active />
      </div>
    </Card>
  );
};

export default ArticleSkeletonCard;
