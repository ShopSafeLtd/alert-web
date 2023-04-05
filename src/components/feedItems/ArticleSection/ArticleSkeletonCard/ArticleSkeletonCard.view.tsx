import React from 'react';
import { Card, Skeleton } from 'antd';
import useStyles from './ArticleCard.styles';

const ArticleSkeletonCard = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Skeleton.Image className={classes.skeletonImage} />

      <div style={{ paddingLeft: 10 }} className="feedItem-card-content">
        <Skeleton active />
      </div>
    </Card>
  );
};

export default ArticleSkeletonCard;
