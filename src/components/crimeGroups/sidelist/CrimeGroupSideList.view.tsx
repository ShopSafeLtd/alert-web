import type { ListCrimeGroupsQuery } from 'graphql/crime-groups/queries/__generated__/list-crime-groups.generated';

import { currencyAtom } from '#/providers/SchemeProvider/SchemeProvider';
import {
  CaretLeftOutlined,
  CaretRightOutlined,
  DollarOutlined,
  FileTextOutlined,
  FolderOpenOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Divider,
  Input,
  Row,
  Space,
  Tooltip,
  Typography,
} from 'antd';
import InfiniteSideScrollList from 'components/side-list/InfiniteSideList';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useAtomValue } from 'jotai';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import useStyles from './CrimeGroupSideList.styles';

dayjs.extend(relativeTime);

const { Text } = Typography;

interface Props {
  // eslint-disable-next-line react/require-default-props
  current?: string;
  data:
    | Exclude<ListCrimeGroupsQuery['listCrimeGroups'], null | undefined>
    | null
    | undefined;
  forceCollapsed?: boolean;
  loading: boolean;
  next: () => void;
  onExpandRequest?: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  to?: string;
}

const CrimeGroupSideList = ({
  current,
  data,
  forceCollapsed = false,
  loading,
  next,
  onExpandRequest,
  searchQuery,
  setSearchQuery,
  to,
}: Props): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl();
  const currency = useAtomValue(currencyAtom);
  const [localCollapsed, setLocalCollapsed] = useState(false);

  // Use forceCollapsed if provided, otherwise use local state
  const collapsed = forceCollapsed || localCollapsed;

  const toggleCollapsed = () => {
    if (!forceCollapsed) {
      if (localCollapsed && onExpandRequest) {
        // If expanding the side list, close the right sidebar
        onExpandRequest();
      }
      setLocalCollapsed(!localCollapsed);
    }
  };

  const isLoading = loading && !data?.total;

  const items = data?.crimeGroups.map((group) => {
    const isCurrent = current === group.id;

    return (
      <Link key={group.id} to={`${to || '/app/crime-groups/view/'}${group.id}`}>
        <Card
          bordered={false}
          className={`${classes.crimeGroupCard} ${isCurrent ? classes.currentCard : ''} ${collapsed ? classes.collapsedCard : ''}`}
          size="small"
        >
          {/* Header Row */}
          <Row align="middle" gutter={[8, 8]}>
            <Col span={24}>
              <Space direction="vertical" size={0}>
                {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                <Text className={classes.reference} strong>
                  CG-{group.reference}
                </Text>
                {group.alias && (
                  <Text className={classes.alias} ellipsis>
                    {group.alias}
                  </Text>
                )}
              </Space>
            </Col>
          </Row>

          <Divider className={classes.cardDivider} />

          {/* Stats Grid */}
          <Row gutter={[8, 8]}>
            <Col span={12}>
              <div className={classes.statItem}>
                <TeamOutlined className={classes.icon} />
                <Space
                  className={classes.statContent}
                  direction="vertical"
                  size={0}
                >
                  <Text className={classes.statLabel}>
                    {intl.formatMessage({ defaultMessage: 'Offenders' })}
                  </Text>
                  <Text className={classes.statValue} strong>
                    {group.totalOffenders || 0}
                  </Text>
                </Space>
              </div>
            </Col>
            <Col span={12}>
              <div className={classes.statItem}>
                <FileTextOutlined className={classes.icon} />
                <Space
                  className={classes.statContent}
                  direction="vertical"
                  size={0}
                >
                  <Text className={classes.statLabel}>
                    {intl.formatMessage({ defaultMessage: 'Incidents' })}
                  </Text>
                  <Text className={classes.statValue} strong>
                    {group.totalIncidents || 0}
                  </Text>
                </Space>
              </div>
            </Col>
            <Col span={12}>
              <div className={classes.statItem}>
                <DollarOutlined className={classes.icon} />
                <Space
                  className={classes.statContent}
                  direction="vertical"
                  size={0}
                >
                  <Text className={classes.statLabel}>
                    {intl.formatMessage({ defaultMessage: 'Total' })}
                  </Text>
                  <Text className={classes.statValue} strong>
                    {intl.formatNumber(group.totalValue || 0, {
                      currency,
                      notation: 'compact',
                      style: 'currency',
                    })}
                  </Text>
                </Space>
              </div>
            </Col>
            <Col span={12}>
              <div className={classes.statItem}>
                <DollarOutlined className={`${classes.icon}`} />
                <Space
                  className={classes.statContent}
                  direction="vertical"
                  size={0}
                >
                  <Text className={classes.statLabel}>
                    {intl.formatMessage({ defaultMessage: 'Recovered' })}
                  </Text>
                  <Text className={`${classes.statValue}`} strong>
                    {intl.formatNumber(group.totalRecoveredValue || 0, {
                      currency,
                      notation: 'compact',
                      style: 'currency',
                    })}
                  </Text>
                </Space>
              </div>
            </Col>
          </Row>
        </Card>
      </Link>
    );
  });

  const emptyState = (
    <div className={classes.emptyState}>
      <FolderOpenOutlined className={classes.emptyIcon} />
      <Typography.Text className={classes.emptyText}>
        {intl.formatMessage({ defaultMessage: 'No crime groups found' })}
      </Typography.Text>
      <Typography.Text className={classes.emptySubtext}>
        {searchQuery
          ? intl.formatMessage({
              defaultMessage: 'Try adjusting your search',
            })
          : intl.formatMessage({
              defaultMessage: 'No crime groups available',
            })}
      </Typography.Text>
    </div>
  );

  return (
    <div
      className={`${classes.sideListContainer} ${collapsed ? classes.collapsed : ''}`}
    >
      <div className={classes.collapseButtonContainer}>
        <Tooltip
          placement="right"
          title={
            forceCollapsed
              ? intl.formatMessage({
                  defaultMessage:
                    'Side list is collapsed to make room for sidebar',
                })
              : collapsed
                ? intl.formatMessage({ defaultMessage: 'Expand' })
                : intl.formatMessage({ defaultMessage: 'Collapse' })
          }
        >
          <Button
            className={classes.collapseButton}
            disabled={forceCollapsed}
            icon={collapsed ? <CaretRightOutlined /> : <CaretLeftOutlined />}
            onClick={toggleCollapsed}
            size="small"
            type="text"
          />
        </Tooltip>
      </div>

      {!collapsed && (
        <div className={classes.searchContainer}>
          <Input.Search
            allowClear
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={intl.formatMessage({
              defaultMessage: 'Search crime groups...',
            })}
            value={searchQuery}
          />
        </div>
      )}

      <div className={classes.scrollContainer}>
        {collapsed ? (
          <div className={classes.collapsedContent}>
            {data?.crimeGroups.map((group) => {
              const isCurrent = current === group.id;
              return (
                <div className={classes.collapsedItemWrapper} key={group.id}>
                  <Link to={`${to || '/app/crime-groups/view/'}${group.id}`}>
                    <div
                      className={`${classes.collapsedItem} ${isCurrent ? classes.currentCollapsedItem : ''}`}
                      title={intl.formatMessage(
                        { defaultMessage: 'CG-{reference}{alias}' },
                        {
                          alias: group.alias ? ` - ${group.alias}` : '',
                          reference: group.reference,
                        }
                      )}
                    >
                      <div className={classes.collapsedRef}>
                        {group.reference}
                      </div>
                    </div>
                  </Link>

                  {/* Hover Card - Temporarily disabled to fix carousel blocking issue
                  <div className={classes.hoverCard} style={{ pointerEvents: 'none' }}>
                    <Card
                      bordered={false}
                      className={`${classes.crimeGroupCard} ${isCurrent ? classes.currentCard : ''}`}
                      size="small"
                    >
                      ... hover card content ...
                    </Card>
                  </div>
                  */}
                </div>
              );
            })}
          </div>
        ) : data?.crimeGroups?.length === 0 && !loading ? (
          emptyState
        ) : (
          <InfiniteSideScrollList
            dataLength={data?.crimeGroups?.length}
            hasMore={(data?.crimeGroups?.length || 0) < (data?.total || 0)}
            isLoading={isLoading}
            items={items}
            next={next}
          />
        )}
      </div>
    </div>
  );
};

export default CrimeGroupSideList;
