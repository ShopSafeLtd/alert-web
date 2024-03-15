import React from 'react';
import { Button, Card, Col, Row, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faTrash } from '@fortawesome/pro-light-svg-icons';
import { useIntl } from 'react-intl';
import ArticleSkeletonCard from '#/components/Articles/ArticleSkeletonCard';
import type { AvailableDashboardElements } from '#/state/dashboard-model';
import useStyles from './ArticlesSection.styles';

const { Title } = Typography;

const ArticlesSection = ({
  w,
  removeItem,
}: {
  w: number;
  removeItem: (item: AvailableDashboardElements) => void;
}): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl();
  return (
    <Col
      style={{
        height: 'inherit',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Button
        type="primary"
        style={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}
        onClick={() => removeItem('articlesSection')}
        icon={<FontAwesomeIcon icon={faTrash} />}
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
          wrap={false}
          style={{ margin: '10px 0 10px 5px' }}
        >
          <Col>
            <Title className={classes.title} level={4}>
              {intl.formatMessage({
                defaultMessage: 'Recent Bulletins',
                id: 'H40AZz',
              })}
            </Title>
          </Col>
          <Col flex={1} />
          <Col>
            <Button
              type="text"
              icon={<FontAwesomeIcon icon={faFilter} size="lg" />}
            />
          </Col>
        </Row>
      </Card>
      <Row
        gutter={[8, 8]}
        align="stretch"
        style={{ padding: 10, alignItems: 'stretch' }}
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
