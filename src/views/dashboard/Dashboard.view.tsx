import type { AvailableDashboardElements } from '#/state/dashboard-model';
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
      'activeOffender',
      <div
        key="activeOffender"
        style={{
          margin: 10,
          padding: 10,
        }}
      >
        <ActiveOffenders />
      </div>,
    ],
    [
      'adminTodos',
      <div
        key="adminTodos"
        style={{
          margin: 10,
          padding: 10,
        }}
      >
        <AdminTodos />
      </div>,
    ],
    [
      'articlesSection',
      <div
        key="articlesSection"
        style={{
          margin: 10,
          padding: 10,
        }}
      >
        <ArticlesSection />
      </div>,
    ],
    [
      'dayOfWeekBar',
      <div
        key="dayOfWeekBar"
        style={{
          margin: 10,
          padding: 10,
        }}
      >
        <DayOfWeek />
      </div>,
    ],
    [
      'feedItemCol',
      <div
        key="feedItemCol"
        style={{
          margin: 10,
          padding: 10,
        }}
      >
        <FeedItemCol />
      </div>,
    ],
    [
      'incidentCount',
      <div
        key="incidentCount"
        style={{
          margin: 10,
          padding: 10,
        }}
      >
        <IncidentCount />
      </div>,
    ],
    [
      'incidentValue',
      <div
        key="incidentValue"
        style={{
          margin: 10,
          padding: 10,
        }}
      >
        <IncidentValues />
      </div>,
    ],
    [
      'latestIncident',
      <div
        key="latestIncident"
        style={{
          margin: 10,
          padding: 10,
        }}
      >
        <LatestIncident />
      </div>,
    ],
    [
      'latestIncidents',
      <div
        key="latestIncidents"
        style={{
          margin: 10,
          padding: 10,
        }}
      >
        <LatestIncidents />
      </div>,
    ],
    [
      'searchRow',
      <div
        key="searchRow"
        style={{
          margin: 10,
          padding: 10,
        }}
      />,
    ],
    ['searchRow', <div key="searchRow" />],
    [
      'targetedGoods',
      <div
        key="targetedGoods"
        style={{
          margin: 10,
          padding: 10,
        }}
      >
        <TargetedGoodsContainer />
      </div>,
    ],
    [
      'timeOfDayBar',
      <div
        key="timeOfDayBar"
        style={{
          margin: 10,
          padding: 10,
        }}
      >
        <TimeOfDay />
      </div>,
    ],
  ]);

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
        layout={layout}
        margin={[0, 0]}
        rowHeight={generateHeight()}
        style={{
          height: marqueeString ? '90%' : '98%',
          marginTop: marqueeString ? 0 : 10,
        }}
        useCSSTransforms={false}
      >
        {...layoutWithComponents}
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
