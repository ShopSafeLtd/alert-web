import type { AvailableDashboardElements } from '#/state/dashboard-model';

import ArticleSkeletonCard from '#/components/Articles/ArticleSkeletonCard';
import { faFilter, faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Col, Row, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

import useStyles from './ArticlesSection.styles';

const { Title } = Typography;

const ArticlesSection = ({
  removeItem,
  w,
}: {
  removeItem: (item: AvailableDashboardElements) => void;
  w: number;
}): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl();
  return (
    <Col
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: 'inherit',
        overflow: 'hidden',
      }}
    >
      <Button
        icon={<FontAwesomeIcon icon={faTrash} />}
        onClick={() => removeItem('articlesSection')}
        style={{ position: 'absolute', right: 10, top: 10, zIndex: 10 }}
      />
      <Card
        bodyStyle={{
          padding: 0,
        }}
        style={{ margin: 0 }}
      >
        <Row
          align="middle"
          gutter={8}
          style={{ margin: '10px 0 10px 5px' }}
          wrap={false}
        >
          <Col>
            <Title className={classes.title} level={4}>
              {intl.formatMessage({
                defaultMessage: 'Recent Bulletins',
              })}
            </Title>
          </Col>
          <Col flex={1} />
          <Col>
            <Button
              icon={<FontAwesomeIcon icon={faFilter} size="lg" />}
              type="text"
            />
          </Col>
        </Row>
      </Card>
      <Row
        align="stretch"
        gutter={[8, 8]}
        style={{ alignItems: 'stretch', padding: 10 }}
      >
        {Array.from({ length: 24 }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Col key={index} span={w === 0 ? 24 : 4 % w === 0 ? 24 : 12}>
            <ArticleSkeletonCard />
          </Col>
        ))}
      </Row>
    </Col>
  );
};

export default ArticlesSection;
