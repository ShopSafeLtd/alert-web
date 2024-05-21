import React from 'react';
import { Button, Col, Drawer, Tooltip } from 'antd';
import type { ListArticlesQuery } from 'graphql/generated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/pro-light-svg-icons';
import { useIntl } from 'react-intl';
import ArticleCard from '#/components/feedItems/Articles/ArticleCard';
import ArticleFilter from '#/components/Articles/ArticleFilter';
import InfiniteSideScrollList from '#/components/side-list/InfiniteSideList';
import SideListItem from 'components/side-list/SideListItem.view';

interface Props {
  data:
    | Exclude<ListArticlesQuery['listArticles'], undefined | null>
    | null
    | undefined;
  loading: boolean;
  sortFilter: boolean;
  toggleSortFilter: () => void;
  fetchMoreScroll: () => void;
  current: string | undefined;
}

const ArticlesSection = ({
  data,
  loading,
  sortFilter,
  toggleSortFilter,
  fetchMoreScroll,
  current,
}: Props): JSX.Element => {
  const intl = useIntl();
  const articleItems = data?.articles.map((article) => (
    <Col span={24} style={{ marginBottom: 10 }}>
      <SideListItem current={current === article.id} noCard loading={loading}>
        <ArticleCard key={article.id} article={article} />
      </SideListItem>
    </Col>
  ));

  const filters = (
    <Tooltip
      title={intl.formatMessage({
        defaultMessage: 'Filters & sorting',
        id: 'dy5NrW',
      })}
    >
      <Button
        type="default"
        disabled={loading}
        icon={<FontAwesomeIcon icon={faFilter} size="lg" />}
        onClick={toggleSortFilter}
        shape="circle"
        style={{
          position: 'absolute',
          top: 10,
          right: 15,
          zIndex: 100,
        }}
      />
    </Tooltip>
  );
  return (
    <>
      <InfiniteSideScrollList
        filters={filters}
        dataLength={data?.articles.length}
        next={fetchMoreScroll}
        hasMore={(data?.articles.length || 0) < (data?.total || 0)}
        isLoading={loading}
        items={articleItems}
      />
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
    </>
  );
};

export default ArticlesSection;
