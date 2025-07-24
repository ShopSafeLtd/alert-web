import type { Theme } from 'configs/ThemeConfig';

import { useIncidentsMapDetailsListQuery } from '#/views/reports/incident-map/graphql/queries/__generated__/incidents-details-list.generated';
import {
  faChevronLeft,
  faChevronRight,
  faExternalLink,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Space, Typography } from 'antd';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FormattedMessage } from 'react-intl';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';

import IncidentPopup from '../IncidentPopup/IncidentPopup.view';

const { Text } = Typography;

const useStyles = createUseStyles((theme: Theme) => ({
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: 500,
    maxWidth: 450,
  },
  counter: {
    backgroundColor: theme.primary,
    borderRadius: 12,
    color: '#fff',
    fontSize: 11,
    fontWeight: 600,
    padding: '4px 8px',
  },
  footer: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? 'rgba(255, 255, 255, 0.04)'
        : 'rgba(0, 0, 0, 0.04)',
    borderRadius: '0 0 12px 12px',
    borderTop: `1px solid ${theme.borderColor}`,
    flexShrink: 0,
    padding: '12px 16px',
  },
  header: {
    alignItems: 'center',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? 'rgba(255, 255, 255, 0.04)'
        : 'rgba(0, 0, 0, 0.04)',
    borderBottom: `1px solid ${theme.borderColor}`,
    borderRadius: '12px 12px 0 0',
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'space-between',
    padding: '12px 16px',
  },
  incidentContainer: {
    '& > div': {
      borderRadius: '0 !important',
      height: '100%',
      overflow: 'auto',
    },
    flex: 1,
    overflow: 'hidden',
  },
  loadingSpinner: {
    animation: '$spin 1s linear infinite',
    border: '3px solid #f3f3f3',
    borderRadius: '50%',
    borderTop: '3px solid #1890ff',
    height: 40,
    margin: '0 auto',
    width: 40,
  },
  navButton: {
    '&:hover:not(:disabled)': {
      borderColor: theme.primary,
      color: theme.primary,
      transform: 'scale(1.05)',
    },
    borderRadius: 6,
    height: 28,
    transition: 'all 0.2s ease',
    width: 28,
  },
  navigation: {
    gap: 4,
  },
  viewButton: {
    '&:hover': {
      borderColor: theme.primary,
      color: theme.primary,
    },
    width: '100%',
  },
}));

interface Props {
  incidents: string[];
  initialIndex?: number;
}

const ITEMS_PER_PAGE = 10;

const MultiIncidentPopup: React.FC<Props> = ({
  incidents: allIncidentIds,
  initialIndex = 0,
}) => {
  const classes = useStyles();

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [loadedCount, setLoadedCount] = useState(ITEMS_PER_PAGE);
  const isFetchingMore = useRef(false);

  useEffect(() => {
    setLoadedCount(ITEMS_PER_PAGE);
    setCurrentIndex(0);
  }, [allIncidentIds]);

  const { data, fetchMore, loading } = useIncidentsMapDetailsListQuery({
    variables: {
      ids: allIncidentIds.slice(0, ITEMS_PER_PAGE),
    },
  });

  const loadMore = useCallback(async () => {
    if (
      isFetchingMore.current ||
      loading ||
      loadedCount >= allIncidentIds.length
    ) {
      return;
    }

    isFetchingMore.current = true;

    const nextBatch = allIncidentIds.slice(
      loadedCount,
      loadedCount + ITEMS_PER_PAGE
    );

    if (nextBatch.length > 0) {
      try {
        await fetchMore({
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult?.incidentMapRelay?.edges) {
              return prev;
            }
            return {
              ...prev,
              incidentMapRelay: {
                ...prev.incidentMapRelay,
                edges: [
                  ...(prev.incidentMapRelay?.edges ?? []),
                  ...fetchMoreResult.incidentMapRelay.edges,
                ],
              },
            };
          },
          variables: {
            ids: nextBatch,
          },
        });
        setLoadedCount((count) => count + nextBatch.length);
      } catch (error) {
        console.error('Failed to fetch more incidents:', error);
      } finally {
        isFetchingMore.current = false;
      }
    } else {
      isFetchingMore.current = false;
    }
  }, [allIncidentIds, fetchMore, loadedCount, loading]);

  useEffect(() => {
    if (currentIndex % 10 === 5) {
      const nextRequiredIndex = currentIndex + 6;
      if (
        nextRequiredIndex < allIncidentIds.length &&
        loadedCount <= nextRequiredIndex
      ) {
        void loadMore();
      }
    }
  }, [currentIndex, loadedCount, allIncidentIds.length, loadMore]);

  const incidentMap = useMemo(() => {
    const incidentData =
      data?.incidentMapRelay?.edges?.map((edge) => edge.node) ?? [];
    return new Map(incidentData.map((incident) => [incident.id, incident]));
  }, [data]);

  const currentIncidentId = allIncidentIds[currentIndex];
  const currentIncident = currentIncidentId
    ? incidentMap.get(currentIncidentId)
    : null;

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < allIncidentIds.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (allIncidentIds.length === 0) return null;

  const totalIncidents = allIncidentIds.length;
  const isMultiple = totalIncidents > 1;

  return (
    <div className={classes.container}>
      {isMultiple && (
        <div className={classes.header}>
          <Text className={classes.counter}>
            <FormattedMessage
              defaultMessage="{var1} of {var2} incidents"
              values={{ var1: currentIndex + 1, var2: totalIncidents }}
            />
          </Text>
          <Space className={classes.navigation}>
            <Button
              className={classes.navButton}
              disabled={currentIndex === 0}
              icon={<FontAwesomeIcon icon={faChevronLeft} />}
              onClick={handlePrevious}
              size="small"
              type="text"
            />
            <Button
              className={classes.navButton}
              disabled={currentIndex === totalIncidents - 1}
              icon={<FontAwesomeIcon icon={faChevronRight} />}
              onClick={handleNext}
              size="small"
              type="text"
            />
          </Space>
        </div>
      )}
      <div className={classes.incidentContainer}>
        {currentIncident ? (
          <IncidentPopup incident={currentIncident} />
        ) : (
          <div style={{ padding: '40px 20px', textAlign: 'center' }}>
            <div style={{ marginBottom: 16 }}>
              <div className={classes.loadingSpinner} />
            </div>
            <Text style={{ color: '#666' }}>
              <FormattedMessage defaultMessage="Loading incident..." />
            </Text>
          </div>
        )}
      </div>
      {currentIncident?.id ? (
        <Link
          target={'_blank'}
          to={`/app/incidents/view/${currentIncident.id}`}
        >
          <Button
            className={classes.viewButton}
            icon={
              <FontAwesomeIcon
                icon={faExternalLink}
                style={{ marginRight: 8 }}
              />
            }
            style={{
              borderRadius: '0 0 12px 12px',
            }}
            type="primary"
          >
            <FormattedMessage defaultMessage="View Full Details" />
          </Button>
        </Link>
      ) : null}
    </div>
  );
};

export default MultiIncidentPopup;
