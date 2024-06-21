import React, { useMemo } from 'react';
import { Drawer } from 'antd';
import FeedItemFilter from 'components/feedItems/FeedItemFilter';
import { useIntl } from 'react-intl';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import type { WatermarkSlideType } from 'components/images/WatermartkSlide.view';
import WatermarkSlide from 'components/images/WatermartkSlide.view';
import RGL, { WidthProvider } from 'react-grid-layout';
import type { AvailableDashboardElements } from '#/state/dashboard-model';
import { generateHeight, useDashboardContext } from './Dashboard.context';

import 'react-grid-layout/css/styles.css';

import {
  ActiveOffenders,
  AdminTodos,
  ArticlesSection,
  DayOfWeek,
  FeedItemCol,
  IncidentCount,
  IncidentValues,
  LatestIncident,
  LatestIncidents,
  Marquee,
  SearchRow,
  TargetedGoodsContainer,
  TimeOfDay,
} from './components';

const DashboardComponents: Map<AvailableDashboardElements, JSX.Element> =
  new Map([
    [
      'feedItemCol',
      <div key="feedItemCol">
        <FeedItemCol />
      </div>,
    ],
    [
      'adminTodos',
      <div key="adminTodos">
        <AdminTodos />
      </div>,
    ],
    [
      'articlesSection',
      <div key="articlesSection">
        <ArticlesSection />
      </div>,
    ],
    [
      'searchRow',
      <div key="searchRow">
        <SearchRow />
      </div>,
    ],
    [
      'activeOffender',
      <div key="activeOffender">
        <ActiveOffenders />
      </div>,
    ],
    [
      'dayOfWeekBar',
      <div key="dayOfWeekBar">
        <DayOfWeek />
      </div>,
    ],
    [
      'timeOfDayBar',
      <div key="timeOfDayBar">
        <TimeOfDay />
      </div>,
    ],
    [
      'latestIncident',
      <div key="latestIncident">
        <LatestIncident />
      </div>,
    ],
    [
      'latestIncidents',
      <div key="latestIncidents">
        <LatestIncidents />
      </div>,
    ],
    [
      'incidentCount',
      <div key="incidentCount">
        <IncidentCount />
      </div>,
    ],
    [
      'searchRow',
      <div key="searchRow">
        <SearchRow />
      </div>,
    ],
    [
      'incidentValue',
      <div key="incidentValue">
        <IncidentValues />
      </div>,
    ],
    [
      'targetedGoods',
      <div key="targetedGoods">
        <TargetedGoodsContainer />
      </div>,
    ],
  ]);

const FeedItem = (): JSX.Element => {
  const {
    setOrder,
    groups,
    variables,
    setTypesFilter,
    setGroupsFilter,
    sortFilter,
    toggleSortFilter,
    clearFilters,
    setCreatedAtFilter,
    lightboxElements,
    openLightbox,
    lightBoxOpen,
    groupsLoading,
    marqueeString,
    layout,
  } = useDashboardContext();

  const intl = useIntl();

  const ReactGridLayout = useMemo(() => WidthProvider(RGL), []);

  const layoutWithComponents = useMemo(
    () =>
      layout?.map((item) =>
        DashboardComponents.get(item.i as AvailableDashboardElements)
      ) ?? [],
    [layout]
  );

  return (
    <div
      className="feed-container"
      style={{
        height: '100vh',
        padding: 15,
        paddingTop: 0,
        overflow: 'hidden',
      }}
    >
      <Marquee />

      <ReactGridLayout
        layout={layout}
        isDraggable={false}
        isResizable={false}
        margin={[8, 8]}
        style={{
          height: marqueeString ? '90%' : '98%',
          marginTop: marqueeString ? 0 : 10,
        }}
        rowHeight={generateHeight()}
        containerPadding={[0, 0]}
        autoSize
        useCSSTransforms={false}
      >
        {...layoutWithComponents}
      </ReactGridLayout>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Feed Item Filters',
        })}
        open={sortFilter}
        onClose={toggleSortFilter}
        width={500}
      >
        <FeedItemFilter
          variables={variables}
          setOrder={setOrder}
          groups={groups}
          groupsLoading={groupsLoading}
          setTypesFilter={setTypesFilter}
          setGroupsFilter={setGroupsFilter}
          clearFilters={clearFilters}
          setCreatedAtFilter={setCreatedAtFilter}
        />
      </Drawer>
      <Lightbox
        open={lightBoxOpen.open}
        close={() => openLightbox([], 0)}
        plugins={[Zoom]}
        index={lightBoxOpen.index}
        slides={lightboxElements}
        controller={{
          closeOnBackdropClick: true,
        }}
        render={{
          slide: (slide: WatermarkSlideType) => (
            <WatermarkSlide slide={slide} />
          ),
        }}
      />
    </div>
  );
};

export default FeedItem;
