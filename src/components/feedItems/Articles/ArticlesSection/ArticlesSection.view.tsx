import React from 'react';
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
import type { ListArticlesQuery } from 'graphql/generated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/pro-light-svg-icons';
import { useIntl } from 'react-intl';
import InfiniteScroll from 'react-infinite-scroll-component';
import useStyles from './ArticlesSection.styles';
import ArticleSkeletonCard from '../../../Articles/ArticleSkeletonCard';
import ArticleCard from '../ArticleCard';
import ArticleFilter from '../../../Articles/ArticleFilter';
import Loading from '../../../shared-components/AntD/Loading';

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
  adminRights: boolean;
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
  adminRights,
}: Props): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <Card
      bodyStyle={{
        padding: 0,
        overflowX: 'hidden',
      }}
      style={{
        margin: 0,
        padding: 0,
        overflow: 'auto',
        overflowX: 'hidden',
        height: 'calc(100vh - 300px)',
      }}
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

      <Divider style={{ margin: '0 0' }} />

      {loading ? (
        <Row
          gutter={[8, 8]}
          align="stretch"
          style={{ padding: 10, alignItems: 'stretch' }}
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
          next={() => fetchMoreScroll()}
          hasMore={data?.articles.length < data?.total}
          loader={<Loading />}
          height="calc(100vh - 370px)"
          style={{ overflowX: 'hidden' }}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
              <b>-----------</b>
            </p>
          }
        >
          <Row
            gutter={[8, 8]}
            align="stretch"
            style={{ alignItems: 'stretch', padding: 10, overflowX: 'hidden' }}
          >
            {data?.articles.map((article) => (
              <Col span={adminRights ? 24 : 12} xxl={12}>
                <ArticleCard key={article.id} article={article} />
              </Col>
            ))}
          </Row>
        </InfiniteScroll>
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
        visible={sortFilter}
        onClose={toggleSortFilter}
        width={500}
      >
        <ArticleFilter />
      </Drawer>
    </Card>
  );
};

export default ArticlesSection;
