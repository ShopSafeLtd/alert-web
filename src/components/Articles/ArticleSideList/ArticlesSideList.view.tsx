import type { ListArticlesQuery } from '#/graphql/article/queries/__generated__/list_articles.generated';

import ArticleFilter from '#/components/Articles/ArticleFilter';
import ArticleCard from '#/components/feedItems/Articles/ArticleCard';
import InfiniteSideScrollList from '#/components/side-list/InfiniteSideList';
import { faFilter } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Drawer, Tooltip } from 'antd';
import SideListItem from 'components/side-list/SideListItem.view';
import React from 'react';
import { useIntl } from 'react-intl';

interface Props {
  current: string | undefined;
  data:
    | Exclude<ListArticlesQuery['listArticles'], null | undefined>
    | null
    | undefined;
  fetchMoreScroll: () => void;
  loading: boolean;
  sortFilter: boolean;
  toggleSortFilter: () => void;
}

const ArticlesSection = ({
  current,
  data,
  fetchMoreScroll,
  loading,
  sortFilter,
  toggleSortFilter,
}: Props): JSX.Element => {
  const intl = useIntl();
  const articleItems = data?.articles.map((article) => (
    <Col span={24} style={{ marginBottom: 10 }}>
      <SideListItem current={current === article.id} loading={loading} noCard>
        <ArticleCard article={article} key={article.id} />
      </SideListItem>
    </Col>
  ));

  const filters = (
    <Tooltip
      title={intl.formatMessage({
        defaultMessage: 'Filters & sorting',
      })}
    >
      <Button
        disabled={loading}
        icon={<FontAwesomeIcon icon={faFilter} size="lg" />}
        onClick={toggleSortFilter}
        shape="circle"
        style={{
          position: 'absolute',
          right: 15,
          top: 10,
          zIndex: 100,
        }}
        type="default"
      />
    </Tooltip>
  );
  return (
    <>
      <InfiniteSideScrollList
        dataLength={data?.articles.length}
        filters={filters}
        hasMore={(data?.articles.length || 0) < (data?.total || 0)}
        isLoading={loading}
        items={articleItems}
        next={fetchMoreScroll}
      />
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
    </>
  );
};

export default ArticlesSection;
