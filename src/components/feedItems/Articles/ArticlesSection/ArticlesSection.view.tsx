import type { ListArticlesQuery } from 'graphql/article/queries/__generated__/list_articles.generated';

import { faFilter } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  Col,
  Divider,
  Drawer,
  Empty,
  Input,
  Row,
  Typography,
} from 'antd';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useIntl } from 'react-intl';

import ArticleFilter from '../../../Articles/ArticleFilter';
import ArticleSkeletonCard from '../../../Articles/ArticleSkeletonCard';
import Loading from '../../../shared-components/AntD/Loading';
import ArticleCard from '../ArticleCard';
import useStyles from './ArticlesSection.styles';

const { Title } = Typography;

interface Props {
  adminRights: boolean;
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
}

const ArticlesSection = ({
  adminRights,
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
    <Card
      bodyStyle={{
        overflowX: 'hidden',
        padding: 0,
      }}
      style={{
        height: 'calc(100vh - 300px)',
        margin: 0,
        overflow: 'auto',
        overflowX: 'hidden',
        padding: 0,
      }}
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

      <Divider style={{ margin: '0 0' }} />

      {loading ? (
        <Row
          align="stretch"
          gutter={[8, 8]}
          style={{ alignItems: 'stretch', padding: 10 }}
        >
          {Array.from({ length: 24 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Col key={index} span={adminRights ? 24 : 12} xxl={12}>
              <ArticleSkeletonCard />
            </Col>
          ))}
        </Row>
      ) : data?.total ? (
        <InfiniteScroll
          dataLength={data?.articles.length}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
              <b>-----------</b>
            </p>
          }
          hasMore={data?.articles.length < data?.total}
          height="calc(100vh - 370px)"
          loader={<Loading />}
          next={() => fetchMoreScroll()}
          style={{ overflowX: 'hidden' }}
        >
          <Row
            align="stretch"
            gutter={[8, 8]}
            style={{ alignItems: 'stretch', overflowX: 'hidden', padding: 10 }}
          >
            {data?.articles.map((article) => (
              <Col span={adminRights ? 24 : 12} xxl={12}>
                <ArticleCard article={article} key={article.id} />
              </Col>
            ))}
          </Row>
        </InfiniteScroll>
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
    </Card>
  );
};

export default ArticlesSection;
