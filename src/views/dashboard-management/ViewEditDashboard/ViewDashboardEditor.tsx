import React, { useEffect, useMemo, useState } from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import ActiveOffendersTemplate from '#/views/dashboard/components/ActiveOffenders/ActiveOffendersTemplate';
import { generateHeight } from '#/views/dashboard/Dashboard.context';
import Marquee from 'react-fast-marquee';
import AdminTodosTemplate from '#/views/dashboard/components/AdminTodos/AdminTodosTemplate';
import SearchRow from '#/views/dashboard/components/SearchRow/SearchRowTemplate';
import ArticlesSection from '#/views/dashboard/components/ArticlesSection/ArticlesSectionTemplate';
import DayOfWeekBar from '#/views/dashboard/components/DayOfWeek/DayOfWeekGraphTemplate';
import FeedItemCol from '#/views/dashboard/components/FeedItems/FeedItemColTemplate';
import IncidentCount from '#/views/dashboard/components/IncidentCount/IncidentCountTemplate.view';
import IncidentValue from '#/views/dashboard/components/IncidentValues/IncidentValueTemplate.view';
import { Button, Drawer, Input, Space } from 'antd';
import { useIntl } from 'react-intl';
import LatestIncident from '#/views/dashboard/components/LatestIncident/LatestIncidentTemplate.view';
import LatestIncidentsTemplate from '#/views/dashboard/components/LatestIncidents/LatestIncidentsTemplate';
import TargetedGoodsGraph from '#/views/dashboard/components/TargetedGoods/TargetedGoodsTemplate';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useDashboardTemplateQuery,
  useUpdateDashboardTemplateMutation,
} from 'graphql/generated';
import Loading from '#/components/shared-components/AntD/Loading';
import type { AvailableDashboardElements } from '#/state/dashboard-model';
import DashboardSelectorDrawer from '../../../components/dashboard/elements/DashboardElementSelector.view';
import TimeOfDay from '../../dashboard/components/TimeOfDay/TimeOfDayTemplate.view';

const ViewDashboardEditor = () => {
  const { id: DashboardId } = useParams();
  const { data: initData, loading } = useDashboardTemplateQuery({
    variables: {
      where: {
        id: DashboardId || '',
      },
    },
  });
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(!open);
  };
  const onClose = () => {
    setOpen(false);
  };
  const intl = useIntl();
  const [marquee, setMarquee] = useState<string | null>(null);
  const [layout, setLayout] = useState<
    (RGL.Layout & {
      i: AvailableDashboardElements;
    })[]
  >([
    {
      w: 12,
      h: 2,
      maxH: 12,
      minH: 2,
      minW: 12,
      maxW: 2,
      x: 0,
      y: 0,
      i: 'searchRow',
      moved: false,
      static: true,
      isResizable: false,
      isDraggable: false,
    },
  ]);
  const navigate = useNavigate();
  const [idsToDelete, setIdsToDelete] = useState<string[]>([]);
  useEffect(() => {
    if (initData) {
      const Ids: string[] = [];
      const initLayout = initData.dashboard.layout.map((item) => {
        Ids.push(item.id);
        return {
          i: item.i as AvailableDashboardElements,
          x: item.x,
          y: item.y,
          w: item.w,
          h: item.h,
          minW: item.minW ?? 2,
          minH: item.minH ?? 2,
          maxW: item.maxW ?? undefined,
          maxH: item.maxH ?? undefined,
          static: false,
          moved: false,
        };
      });
      if (initLayout.some(({ i }) => i === 'searchRow')) {
        setLayout([
          {
            w: 12,
            h: 2,
            maxH: 2,
            minH: 2,
            minW: 12,
            maxW: 12,
            x: 0,
            y: 0,
            i: 'searchRow',
            moved: false,
            static: true,
            isResizable: false,
            isDraggable: false,
          },
          ...initLayout.filter(({ i }) => i !== 'searchRow'),
        ]);
      } else {
        setLayout([
          {
            w: 12,
            h: 2,
            maxH: 2,
            minH: 2,
            minW: 12,
            maxW: 12,
            x: 0,
            y: 0,
            i: 'searchRow',
            moved: false,
            static: true,
            isResizable: false,
            isDraggable: false,
          },
          ...initLayout,
        ]);
      }
      setIdsToDelete(Ids);
      setMarquee(initData.dashboard.runningBanner ?? '');
    }
  }, [initData]);

  const [editDashbaord] = useUpdateDashboardTemplateMutation();

  const onSubmit = () => {
    if (!DashboardId) return;
    void editDashbaord({
      variables: {
        where: {
          id: DashboardId,
        },
        data: {
          runningBanner: { set: marquee ?? '' },
          layout: {
            createMany: {
              data: layout.map((item) => {
                const { i, x, y, w, h, minW, minH, maxW, maxH, moved } = item;

                return {
                  i,
                  x,
                  y,
                  w,
                  h,
                  minW,
                  minH,
                  maxW,
                  maxH,
                  static: true,
                  moved,
                };
              }),
            },
            deleteMany: idsToDelete
              ? [
                  {
                    id: {
                      in: idsToDelete,
                    },
                  },
                ]
              : undefined,
          },
        },
      },
      onCompleted: () => navigate('/app/manage-dashboard'),
    });
  };

  const removeItem = (item: string) => {
    setLayout(layout.filter((i) => i.i !== item));
  };
  const layoutItems: { [key in AvailableDashboardElements]: JSX.Element } = {
    activeOffender: (
      <div key="activeOffender">
        <ActiveOffendersTemplate removeItem={removeItem} />
      </div>
    ),
    adminTodos: (
      <div key="adminTodos">
        <AdminTodosTemplate removeItem={removeItem} />
      </div>
    ),
    searchRow: (
      <div key="searchRow">
        <SearchRow />
      </div>
    ),
    articlesSection: (
      <div key="articlesSection">
        <ArticlesSection
          w={layout.find(({ i }) => i === 'articlesSection')?.w ?? 0}
          removeItem={removeItem}
        />
      </div>
    ),
    dayOfWeekBar: (
      <div key="dayOfWeekBar">
        <DayOfWeekBar removeItem={removeItem} />
      </div>
    ),
    feedItemCol: (
      <div key="feedItemCol">
        <FeedItemCol removeItem={removeItem} />
      </div>
    ),
    incidentCount: (
      <div key="incidentCount">
        <IncidentCount removeItem={removeItem} />
      </div>
    ),
    incidentValue: (
      <div key="incidentValue">
        <IncidentValue removeItem={removeItem} />
      </div>
    ),
    latestIncident: (
      <div key="latestIncident">
        <LatestIncident removeItem={removeItem} />
      </div>
    ),
    latestIncidents: (
      <div key="latestIncidents">
        <LatestIncidentsTemplate removeItem={removeItem} />
      </div>
    ),
    targetedGoods: (
      <div key="targetedGoods">
        <TargetedGoodsGraph removeItem={removeItem} />
      </div>
    ),
    timeOfDayBar: (
      <div key="timeOfDayBar">
        <TimeOfDay removeItem={removeItem} />
      </div>
    ),
  };

  const ReactGridLayout = useMemo(() => WidthProvider(RGL), []);

  const [droppingItem, setDroppingItem] = useState<
    | {
        i: AvailableDashboardElements;
        w: number;
        h: number;
      }
    | undefined
  >(undefined);
  const onDrop = (
    lay: (RGL.Layout & {
      i: AvailableDashboardElements;
    })[],
    _layoutItem: RGL.Layout & {
      i: AvailableDashboardElements;
    },
    _event: never
  ) => {
    setLayout(lay.map((i) => ({ ...i, minH: 2, minW: 2 })));
    setDroppingItem(undefined);
  };
  if (loading)
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Loading />
      </div>
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
      {marquee ? (
        <Marquee autoFill>
          {marquee}
          <div style={{ width: 200 }} />
        </Marquee>
      ) : null}
      <DashboardSelectorDrawer
        setDroppingItem={setDroppingItem}
        layout={layout}
        droppingItem={droppingItem}
      />
      <ReactGridLayout
        layout={layout}
        rowHeight={generateHeight()}
        containerPadding={[0, 0]}
        isDraggable
        isResizable
        autoSize
        margin={[8, 8]}
        onLayoutChange={(e) =>
          setLayout(
            e as (RGL.Layout & {
              i: AvailableDashboardElements;
            })[]
          )
        }
        style={{ height: '100vh' }}
        isDroppable
        droppingItem={droppingItem}
        onDrop={onDrop}
        isBounded
      >
        {Object.values(layoutItems).map((l) => {
          if (layout.some(({ i }) => i === l.key)) return l;
          return null;
        })}
      </ReactGridLayout>
      <Button
        style={{
          position: 'absolute',
          bottom: 140,
          right: 100,
          zIndex: 10_000,
        }}
        onClick={() => navigate('/app/manage-dashboard')}
        type="default"
      >
        {intl.formatMessage({
          defaultMessage: 'Back',
          id: 'cyR7Kh',
        })}
      </Button>
      <Button
        style={{
          position: 'absolute',
          bottom: 140,
          right: 20,
          zIndex: 10_000,
        }}
        onClick={onSubmit}
        type="primary"
      >
        {intl.formatMessage({
          defaultMessage: 'Save',
          id: 'jvo0vs',
        })}
      </Button>
      <Button
        style={{
          position: 'absolute',
          bottom: 80,
          right: 20,
          zIndex: 10_000,
        }}
        onClick={showDrawer}
        type="default"
      >
        {intl.formatMessage({
          defaultMessage: 'Edit/Add banner',
          id: 'B8Opq6',
        })}
      </Button>

      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Dashboard Banner',
          id: '6UK4Rk',
        })}
        placement="left"
        width={400}
        onClose={onClose}
        open={open}
        mask={false}
        closeIcon={null}
        extra={
          <Space>
            <Button type="primary" onClick={onClose}>
              {intl.formatMessage({ defaultMessage: 'Close', id: 'rbrahO' })}
            </Button>
          </Space>
        }
      >
        {intl.formatMessage({
          defaultMessage: 'Banner Text:',
          id: 'C21dmP',
        })}

        <Input
          allowClear
          style={{ marginTop: 10 }}
          onChange={(e) => setMarquee(e.target.value ?? '')}
          value={marquee ?? ''}
        />
      </Drawer>
    </div>
  );
};

export default ViewDashboardEditor;
