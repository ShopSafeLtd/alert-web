import React from 'react';
import {
  Button,
  Card,
  Col,
  Divider,
  Drawer,
  Empty,
  Input,
  Pagination,
  Row,
  Typography,
} from 'antd';
import type {
  ArticlePriority,
  ListArticlesQuery,
  SortOrder,
} from 'graphql/generated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { DateType } from 'types/DataType';
import { faFilter } from '@fortawesome/pro-light-svg-icons';
import { useIntl } from 'react-intl';
import useStyles from './ArticlesSection.styles';
import ArticleSkeletonCard from '../../../Articles/ArticleSkeletonCard';
import ArticleCard from '../ArticleCard';
import ArticleFilter from '../../../Articles/ArticleFilter';

const { Title } = Typography;

interface Props {
  data:
    | Exclude<ListArticlesQuery['listArticles'], undefined | null>
    | null
    | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  onPaginationChange: (page: number, pageSize: number) => void;
  currentPage: number;
  currentPageSize: number;
  sortFilter: boolean;
  toggleSortFilter: () => void;
  clearFilters: () => void;
  groupsFilter: string[];
  setGroupsFilter: (value: string[]) => void;
  priorityFilter: ArticlePriority[];
  setPriorityFilter: (value: ArticlePriority[]) => void;

  setCreatedAtFilter: (value: DateType | undefined) => void;
  order: SortOrder;
  setOrder: (value: SortOrder) => void;
  saving: boolean;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  adminRights: boolean;
}

const ArticlesSection = ({
  data,
  loading,
  search,
  setSearch,
  onPaginationChange,
  currentPage,
  currentPageSize,
  priorityFilter,
  setPriorityFilter,
  groupsFilter,
  setGroupsFilter,
  sortFilter,
  toggleSortFilter,
  clearFilters,
  order,
  setOrder,
  setCreatedAtFilter,
  saving,
  groups,
  groupsLoading,
  adminRights,
}: Props): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <Card
      bodyStyle={{
        padding: 0,
        paddingBottom: 20,
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

      <Row
        gutter={[8, 8]}
        align="stretch"
        style={{ padding: 10, alignItems: 'stretch' }}
      >
        {loading ? (
          Array.from({ length: 24 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Col key={index} span={adminRights ? 24 : 12} xxl={12}>
              <ArticleSkeletonCard />
            </Col>
          ))
        ) : data?.total ? (
          data?.articles.map((article) => (
            <Col span={adminRights ? 24 : 12} xxl={12}>
              <ArticleCard key={article.id} article={article} />
            </Col>
          ))
        ) : (
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
        )}
      </Row>
      <Row justify="center" style={{ marginTop: 15 }}>
        <Col>
          <Pagination
            total={data?.total}
            // pageSizeOptions={['12']}
            showSizeChanger={false}
            pageSize={currentPageSize}
            current={currentPage}
            onChange={onPaginationChange}
            showTotal={(total) =>
              intl.formatMessage(
                { defaultMessage: `Total Bulletins: {total}`, id: '8LkFAr' },
                { total }
              )
            }
            hideOnSinglePage
          />
        </Col>
      </Row>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Bulletin Filters',
          id: 'o9w9ud',
        })}
        visible={sortFilter}
        onClose={toggleSortFilter}
        width={500}
      >
        <ArticleFilter
          order={order}
          setOrder={setOrder}
          groups={groups}
          groupsLoading={groupsLoading}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
          groupsFilter={groupsFilter}
          setGroupsFilter={setGroupsFilter}
          clearFilters={clearFilters}
          setCreatedAtFilter={setCreatedAtFilter}
        />
      </Drawer>
    </Card>
  );
};

export default ArticlesSection;
