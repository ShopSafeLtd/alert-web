import type { AvailableDashboardElements } from '#/state/dashboard-model';
import type { DashboardGraphMetadata } from '#/types/dashboard-metadata';
import type { WatermarkSlideType } from 'components/images/WatermartkSlide.view';

import { Drawer } from 'antd';
import FeedItemFilter from 'components/feedItems/FeedItemFilter';
import WatermarkSlide from 'components/images/WatermartkSlide.view';
import React, { useMemo } from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import { useIntl } from 'react-intl';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import { generateHeight, useDashboardContext } from './Dashboard.context';
import {
  ActiveOffenders,
  AdminTodos,
  ArticlesSection,
  DayOfWeek,
  DraftIncidents,
  FeedItemCol,
  IncidentCount,
  IncidentValues,
  LatestIncident,
  LatestIncidents,
  Marquee,
  MyStockRequests,
  SearchRow,
  TargetedGoodsContainer,
  TimeOfDay,
} from './components';
import DashboardGraphWrapper from './components/DashboardGraph/DashboardGraphWrapper';

// Helper function to get the base element type from an ID
const getElementType = (id: string): AvailableDashboardElements => {
  // Handle IDs like "dashboardGraph-1", "dashboardGraph-2", etc.
  const match = id.match(/^([^-]+)(?:-\d+)?$/);
  return (match ? match[1] : id) as AvailableDashboardElements;
};

// Create element based on type
const createElement = (
  elementId: string,
  elementType: AvailableDashboardElements,
  metadata?: DashboardGraphMetadata,
  gridHeight?: number
) => {
  switch (elementType) {
    case 'activeOffender': {
      return <ActiveOffenders />;
    }
    case 'adminTodos': {
      return <AdminTodos />;
    }
    case 'articlesSection': {
      return <ArticlesSection />;
    }
    case 'dashboardGraph': {
      // Use wrapper that handles both metadata and non-metadata cases
      return (
        <DashboardGraphWrapper
          elementId={elementId}
          gridHeight={gridHeight}
          metadata={metadata}
        />
      );
    }
    case 'dayOfWeekBar': {
      return <DayOfWeek />;
    }
    case 'draftIncidents': {
      return <DraftIncidents />;
    }
    case 'feedItemCol': {
      return <FeedItemCol />;
    }
    case 'incidentCount': {
      return <IncidentCount />;
    }
    case 'incidentValue': {
      return <IncidentValues />;
    }
    case 'latestIncident': {
      return <LatestIncident />;
    }
    case 'latestIncidents': {
      return <LatestIncidents />;
    }
    case 'myStockRequests': {
      return <MyStockRequests />;
    }
    case 'searchRow': {
      return <SearchRow />;
    }
    case 'targetedGoods': {
      return <TargetedGoodsContainer />;
    }
    case 'timeOfDayBar': {
      return <TimeOfDay />;
    }
    default: {
      return null;
    }
  }
};

const FeedItem = (): JSX.Element => {
  const {
    clearFilters,
    groups,
    groupsLoading,
    layout,
    lightBoxOpen,
    lightboxElements,
    marqueeString,
    openLightbox,
    setCreatedAtFilter,
    setGroupsFilter,
    setOrder,
    setTypesFilter,
    sortFilter,
    toggleSortFilter,
    variables,
  } = useDashboardContext();

  const intl = useIntl();

  const ReactGridLayout = useMemo(() => WidthProvider(RGL), []);

  return (
    <div
      className="feed-container"
      style={{
        // height: '100vh',
        overflowX: 'hidden',
        padding: 5,
        paddingTop: 0,
      }}
    >
      <div
        style={{
          marginBottom: 10,
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <Marquee />
        <SearchRow />
      </div>
      <ReactGridLayout
        autoSize
        containerPadding={[0, 0]}
        isDraggable={false}
        isResizable={false}
        layout={layout
          .filter((item) => item.i !== 'searchRow')
          .map((item) => ({
            ...item,
            y: item.y - 2,
          }))}
        margin={[0, 0]}
        rowHeight={generateHeight()}
        style={{
          height: marqueeString ? '90%' : '98%',
          marginTop: marqueeString ? 0 : 10,
        }}
        useCSSTransforms={false}
      >
        {layout
          .filter((item) => item.i !== 'searchRow')
          .map((layoutItem) => {
            const elementType = getElementType(layoutItem.i);

            // Parse metadata if it exists (only for components that support it)
            let metadata: DashboardGraphMetadata | undefined;
            if (layoutItem.metadata && elementType === 'dashboardGraph') {
              try {
                metadata =
                  typeof layoutItem.metadata === 'string'
                    ? (JSON.parse(
                        layoutItem.metadata
                      ) as DashboardGraphMetadata)
                    : layoutItem.metadata;
              } catch (error) {
                console.error(
                  'Failed to parse metadata for item',
                  layoutItem.i,
                  error
                );
              }
            }

            // Calculate the actual pixel height for this grid item
            const gridItemHeight = layoutItem.h * generateHeight();
            const component = createElement(
              layoutItem.i,
              elementType,
              metadata,
              gridItemHeight
            );

            if (!component) return null;

            return (
              <div
                key={layoutItem.i}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  margin: 10,
                  overflow: 'hidden',
                  padding: elementType === 'searchRow' ? 0 : 10,
                }}
              >
                {component}
              </div>
            );
          })}
      </ReactGridLayout>
      <Drawer
        onClose={toggleSortFilter}
        open={sortFilter}
        title={intl.formatMessage({
          defaultMessage: 'Feed Item Filters',
        })}
        width={500}
      >
        <FeedItemFilter
          clearFilters={clearFilters}
          groups={groups}
          groupsLoading={groupsLoading}
          setCreatedAtFilter={setCreatedAtFilter}
          setGroupsFilter={setGroupsFilter}
          setOrder={setOrder}
          setTypesFilter={setTypesFilter}
          variables={variables}
        />
      </Drawer>
      <Lightbox
        close={() => openLightbox([], 0)}
        controller={{
          closeOnBackdropClick: true,
        }}
        index={lightBoxOpen.index}
        open={lightBoxOpen.open}
        plugins={[Zoom]}
        render={{
          slide: (slide: WatermarkSlideType) => (
            <WatermarkSlide slide={slide} />
          ),
        }}
        slides={lightboxElements}
      />
    </div>
  );
};

export default FeedItem;
