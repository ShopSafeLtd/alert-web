import type { ListArticlesQuery } from 'graphql/article/queries/__generated__/list_articles.generated';

import ArticleFilter from '#/components/Articles/ArticleFilter';
import ArticleSkeletonCard from '#/components/Articles/ArticleSkeletonCard';
import ArticleCard from '#/components/feedItems/Articles/ArticleCard';
import DashboardInfiniteScroll from '#/views/dashboard/components/DashboardInfiniteScroll';
import { faFilter } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Col, Drawer, Empty, Input, Row, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

import useStyles from './ArticlesSection.styles';

const { Title } = Typography;

interface Props {
  data:
    | Exclude<ListArticlesQuery['listArticles'], null | undefined>
    | null
    | undefined;
  fetchMoreScroll: () => void;
  loading: boolean;
  saving: boolean;
  search: string;
  setSearch: (value: string) => void;
  sortFilter: boolean;
  toggleSortFilter: () => void;
  width: number;
}

const ArticlesSection = ({
  data,
  fetchMoreScroll,
  loading,
  saving,
  search,
  setSearch,
  sortFilter,
  toggleSortFilter,
}: Props): JSX.Element => {
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
          <Col flex={1}>
            <Input
              // value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={intl.formatMessage({
                defaultMessage: 'Search for Bulletins...',
              })}
              size="small"
            />
          </Col>
          <Col>
            <Button
              disabled={saving}
              icon={<FontAwesomeIcon icon={faFilter} size="lg" />}
              onClick={toggleSortFilter}
              type="text"
            />
          </Col>
        </Row>
      </Card>

      {loading ? (
        <Row
          align="stretch"
          gutter={[8, 8]}
          style={{ alignItems: 'stretch', padding: 10 }}
        >
          {Array.from({ length: 24 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Col key={index} span={24} xl={12}>
              <ArticleSkeletonCard />
            </Col>
          ))}
        </Row>
      ) : data?.total ? (
        <DashboardInfiniteScroll
          dataLength={data?.articles.length}
          hasMore={data?.articles.length < data?.total}
          id="scroll-articles"
          next={() => fetchMoreScroll()}
        >
          <Row
            align="stretch"
            gutter={[8, 8]}
            style={{ alignItems: 'stretch', padding: 10 }}
          >
            {data?.articles.map((article) => (
              <Col sm={24} style={{ marginBottom: 10 }} xl={12}>
                <ArticleCard article={article} key={article.id} />
              </Col>
            ))}
          </Row>
        </DashboardInfiniteScroll>
      ) : (
        <Row
          align="stretch"
          gutter={[8, 8]}
          style={{ alignItems: 'stretch', padding: 10 }}
        >
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              height: 'calc(100vh - 400px)',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <Empty
              description={
                search === ''
                  ? intl.formatMessage({
                      defaultMessage: 'No Bulletins',
                    })
                  : intl.formatMessage({
                      defaultMessage: 'No bulletins match your search criteria',
                    })
              }
            />
          </div>
        </Row>
      )}

      <Drawer
        onClose={toggleSortFilter}
        open={sortFilter}
        title={intl.formatMessage({
          defaultMessage: 'Bulletin Filters',
        })}
        width={500}
      >
        <ArticleFilter />
      </Drawer>
    </Col>
  );
};

export default ArticlesSection;
