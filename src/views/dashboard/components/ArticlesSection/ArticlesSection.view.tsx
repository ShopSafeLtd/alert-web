import React from 'react';
import { Button, Card, Col, Drawer, Empty, Input, Row, Typography } from 'antd';
import type { ListArticlesQuery } from 'graphql/generated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/pro-light-svg-icons';
import { useIntl } from 'react-intl';
import ArticleSkeletonCard from '#/components/Articles/ArticleSkeletonCard';
import ArticleCard from '#/components/feedItems/Articles/ArticleCard';
import ArticleFilter from '#/components/Articles/ArticleFilter';
import DashboardInfiniteScroll from '#/views/dashboard/components/DashboardInfiniteScroll';
import useStyles from './ArticlesSection.styles';

const { Title } = Typography;

interface Props {
  data:
    | Exclude<ListArticlesQuery['listArticles'], undefined | null>
    | null
    | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  sortFilter: boolean;
  toggleSortFilter: () => void;
  fetchMoreScroll: () => void;
  saving: boolean;
  width: number;
}

const ArticlesSection = ({
  data,
  loading,
  search,
  setSearch,
  sortFilter,
  toggleSortFilter,
  fetchMoreScroll,
  saving,
  width,
}: Props): JSX.Element => {
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
          <Col flex={1}>
            <Input
              size="small"
              placeholder={intl.formatMessage({
                defaultMessage: 'Search for Bulletins...',
                id: '6PU5qG',
              })}
              // value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>
          <Col>
            <Button
              type="text"
              disabled={saving}
              icon={<FontAwesomeIcon icon={faFilter} size="lg" />}
              onClick={toggleSortFilter}
            />
          </Col>
        </Row>
      </Card>

      {loading ? (
        <Row
          gutter={[8, 8]}
          align="stretch"
          style={{ padding: 10, alignItems: 'stretch' }}
        >
          {Array.from({ length: 24 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Col key={index} span={4 % width === 0 ? 24 : 24 / (4 % width)}>
              <ArticleSkeletonCard />
            </Col>
          ))}
        </Row>
      ) : data?.total ? (
        <DashboardInfiniteScroll
          dataLength={data?.articles.length}
          next={() => fetchMoreScroll()}
          hasMore={data?.articles.length < data?.total}
          id="scroll-articles"
        >
          <Row
            gutter={[8, 8]}
            align="stretch"
            style={{ alignItems: 'stretch', padding: 10 }}
          >
            {data?.articles.map((article) => (
              <Col
                span={4 % width === 0 ? 24 : 24 / (4 % width)}
                style={{ marginBottom: 10 }}
              >
                <ArticleCard key={article.id} article={article} />
              </Col>
            ))}
          </Row>
        </DashboardInfiniteScroll>
      ) : (
        <Row
          gutter={[8, 8]}
          align="stretch"
          style={{ padding: 10, alignItems: 'stretch' }}
        >
          <div
            style={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              height: 'calc(100vh - 400px)',
            }}
          >
            <Empty
              description={
                search === ''
                  ? intl.formatMessage({
                      defaultMessage: 'No Bulletins',
                      id: '7Pv3BL',
                    })
                  : intl.formatMessage({
                      defaultMessage: 'No bulletins match your search criteria',
                      id: 'pZaTHe',
                    })
              }
            />
          </div>
        </Row>
      )}

      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Bulletin Filters',
          id: 'o9w9ud',
        })}
        open={sortFilter}
        onClose={toggleSortFilter}
        width={500}
      >
        <ArticleFilter />
      </Drawer>
    </Col>
  );
};

export default ArticlesSection;
