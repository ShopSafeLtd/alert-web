import type { InvestigationStatus } from 'graphql/types';

import {
  faCar,
  faChevronLeft,
  faChevronRight,
  faFileInvoice,
  faFolderOpen,
  faPlus,
  faUserGroup,
  faUsers,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Input, Tooltip } from 'antd';
import InfiniteSideList from 'components/side-list/InfiniteSideList';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import useStyles from './InvestigationSideList.styles';

interface Investigation {
  createdAt?: Date | null | string;
  crimeGroups?: Array<{ id: string }> | null;
  description?: null | string;
  groups?: Array<{ id: string; name?: null | string }> | null;
  id: string;
  incidents?: Array<{ id: string }> | null;
  name?: null | string;
  offenders?: Array<{ id: string }> | null;
  reference?: null | number | string;
  status?: InvestigationStatus | null;
  vehicles?: Array<{ id: string }> | null;
}

interface Props {
  collapsed: boolean;
  currentInvestigationId?: string;
  handleLoadMore: () => void;
  hasMore: boolean;
  investigations: Investigation[];
  loading: boolean;
  onCreateNew?: () => void;
  onToggleCollapse: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  totalCount: number;
}

const InvestigationSideListView: React.FC<Props> = ({
  collapsed,
  currentInvestigationId,
  handleLoadMore,
  hasMore,
  investigations,
  loading,
  onCreateNew,
  onToggleCollapse,
  searchQuery,
  setSearchQuery,
}) => {
  const classes = useStyles();
  const intl = useIntl();

  const renderItem = (investigation: Investigation) => {
    const isActive = investigation.id === currentInvestigationId;
    const incidentCount = investigation.incidents?.length || 0;
    const offenderCount = investigation.offenders?.length || 0;
    const vehicleCount = investigation.vehicles?.length || 0;
    const crimeGroupCount = investigation.crimeGroups?.length || 0;

    if (collapsed) {
      return (
        <Link
          key={investigation.id}
          style={{ textDecoration: 'none' }}
          to={`/app/investigations/view/${investigation.id}`}
        >
          <div
            className={`${classes.collapsedItem} ${isActive ? classes.activeCollapsedItem : ''}`}
          >
            <span className={classes.collapsedReference}>
              {investigation.reference}
            </span>
          </div>
        </Link>
      );
    }

    return (
      <Link
        key={investigation.id}
        style={{ textDecoration: 'none' }}
        to={`/app/investigations/view/${investigation.id}`}
      >
        <div
          className={`${classes.itemCard} ${isActive ? classes.activeItemCard : ''}`}
        >
          <div className={classes.itemContent}>
            <div className={classes.itemHeader}>
              <div className={classes.itemHeaderText}>
                <span className={classes.itemName}>
                  {investigation.name ||
                    intl.formatMessage({
                      defaultMessage: 'Untitled Investigation',
                    })}
                </span>
                {investigation.reference && (
                  <span className={classes.itemReference}>
                    {investigation.reference}
                  </span>
                )}
              </div>
            </div>

            <div className={classes.itemDivider} />

            <div className={classes.itemStats}>
              <div className={classes.itemStat}>
                <FontAwesomeIcon
                  className={classes.icon}
                  icon={faFileInvoice}
                />
                <div className={classes.statContent}>
                  <span className={classes.statLabel}>
                    {intl.formatMessage({ defaultMessage: 'Incidents' })}
                  </span>
                  <span className={classes.statValue}>{incidentCount}</span>
                </div>
              </div>
              <div className={classes.itemStat}>
                <FontAwesomeIcon className={classes.icon} icon={faUsers} />
                <div className={classes.statContent}>
                  <span className={classes.statLabel}>
                    {intl.formatMessage({ defaultMessage: 'Offenders' })}
                  </span>
                  <span className={classes.statValue}>{offenderCount}</span>
                </div>
              </div>
              <div className={classes.itemStat}>
                <FontAwesomeIcon className={classes.icon} icon={faCar} />
                <div className={classes.statContent}>
                  <span className={classes.statLabel}>
                    {intl.formatMessage({ defaultMessage: 'Vehicles' })}
                  </span>
                  <span className={classes.statValue}>{vehicleCount}</span>
                </div>
              </div>
              <div className={classes.itemStat}>
                <FontAwesomeIcon className={classes.icon} icon={faUserGroup} />
                <div className={classes.statContent}>
                  <span className={classes.statLabel}>
                    {intl.formatMessage({ defaultMessage: 'Groups' })}
                  </span>
                  <span className={classes.statValue}>{crimeGroupCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  };

  const emptyState = (
    <div className={classes.emptyState}>
      <FontAwesomeIcon className={classes.emptyIcon} icon={faFolderOpen} />
      <p className={classes.emptyText}>
        {intl.formatMessage({ defaultMessage: 'No investigations found' })}
      </p>
      <p className={classes.emptySubtext}>
        {searchQuery
          ? intl.formatMessage({
              defaultMessage: 'Try adjusting your search or filters',
            })
          : intl.formatMessage({
              defaultMessage: 'Create a new investigation to get started',
            })}
      </p>
      {!searchQuery && onCreateNew && (
        <Button
          className={classes.createButton}
          icon={<FontAwesomeIcon icon={faPlus} />}
          onClick={onCreateNew}
          type="primary"
        >
          {intl.formatMessage({ defaultMessage: 'New Investigation' })}
        </Button>
      )}
    </div>
  );

  return (
    <div
      className={`${classes.container} ${collapsed ? classes.collapsed : ''}`}
    >
      <div className={classes.collapseButtonContainer}>
        <Tooltip
          placement="right"
          title={
            collapsed
              ? intl.formatMessage({ defaultMessage: 'Expand' })
              : intl.formatMessage({ defaultMessage: 'Collapse' })
          }
        >
          <Button
            className={classes.collapseButton}
            icon={
              <FontAwesomeIcon
                icon={collapsed ? faChevronRight : faChevronLeft}
              />
            }
            onClick={onToggleCollapse}
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
              defaultMessage: 'Search investigations...',
            })}
            value={searchQuery}
          />
        </div>
      )}

      <div className={classes.listContainer}>
        {collapsed ? (
          <div className={classes.collapsedContent}>
            {investigations.map((investigation) => renderItem(investigation))}
          </div>
        ) : investigations.length === 0 && !loading ? (
          emptyState
        ) : (
          <InfiniteSideList
            dataLength={investigations.length}
            hasMore={hasMore}
            isLoading={loading}
            items={investigations.map(renderItem)}
            next={handleLoadMore}
          />
        )}
      </div>
    </div>
  );
};

export default InvestigationSideListView;
