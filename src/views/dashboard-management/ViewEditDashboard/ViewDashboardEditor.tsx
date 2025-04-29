import type { AvailableDashboardElements } from '#/state/dashboard-model';

import Loading from '#/components/shared-components/AntD/Loading';
import { generateHeight } from '#/views/dashboard/Dashboard.context';
import ActiveOffendersTemplate from '#/views/dashboard/components/ActiveOffenders/ActiveOffendersTemplate';
import AdminTodosTemplate from '#/views/dashboard/components/AdminTodos/AdminTodosTemplate';
import ArticlesSection from '#/views/dashboard/components/ArticlesSection/ArticlesSectionTemplate';
import DayOfWeekBar from '#/views/dashboard/components/DayOfWeek/DayOfWeekGraphTemplate';
import FeedItemCol from '#/views/dashboard/components/FeedItems/FeedItemColTemplate';
import IncidentCount from '#/views/dashboard/components/IncidentCount/IncidentCountTemplate.view';
import IncidentValue from '#/views/dashboard/components/IncidentValues/IncidentValueTemplate.view';
import LatestIncident from '#/views/dashboard/components/LatestIncident/LatestIncidentTemplate.view';
import LatestIncidentsTemplate from '#/views/dashboard/components/LatestIncidents/LatestIncidentsTemplate';
import SearchRow from '#/views/dashboard/components/SearchRow/SearchRowTemplate';
import TargetedGoodsGraph from '#/views/dashboard/components/TargetedGoods/TargetedGoodsTemplate';
import { useUpdateDashboardTemplateMutation } from '#/views/dashboard-management/graphql/mutations/__generated__/dashboard.generated';
import { useDashboardTemplateQuery } from '#/views/dashboard-management/graphql/queries/__generated__/dashboard-template.generated';
import { Button, Drawer, Input, Space } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import Marquee from 'react-fast-marquee';
import RGL, { WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import { useIntl } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';

import DashboardSelectorDrawer from '../../../components/dashboard/elements/DashboardElementSelector.view';
import TimeOfDay from '../../dashboard/components/TimeOfDay/TimeOfDayTemplate.view';

const ViewDashboardEditor = () => {
  const { id: DashboardId } = useParams();
  const { data: initData, loading } = useDashboardTemplateQuery({
    fetchPolicy: 'network-only',
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
  const [marquee, setMarquee] = useState<null | string>(null);
  // eslint-disable-next-line func-call-spacing
  const [layout, setLayout] = useState<
    ({
      i: AvailableDashboardElements;
    } & RGL.Layout)[]
  >([
    {
      h: 2,
      i: 'searchRow',
      isDraggable: false,
      isResizable: false,
      maxH: 12,
      maxW: 2,
      minH: 2,
      minW: 12,
      moved: false,
      static: true,
      w: 12,
      x: 0,
      y: 0,
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
          h: item.h,
          i: item.i as AvailableDashboardElements,
          maxH: item.maxH ?? undefined,
          maxW: item.maxW ?? undefined,
          minH: item.minH ?? 2,
          minW: item.minW ?? 2,
          moved: false,
          static: false,
          w: item.w,
          x: item.x,
          y: item.y,
        };
      });
      if (initLayout.some(({ i }) => i === 'searchRow')) {
        setLayout([
          {
            h: 2,
            i: 'searchRow',
            isDraggable: false,
            isResizable: false,
            maxH: 2,
            maxW: 12,
            minH: 2,
            minW: 12,
            moved: false,
            static: true,
            w: 12,
            x: 0,
            y: 0,
          },
          ...initLayout.filter(({ i }) => i !== 'searchRow'),
        ]);
      } else {
        setLayout([
          {
            h: 2,
            i: 'searchRow',
            isDraggable: false,
            isResizable: false,
            maxH: 2,
            maxW: 12,
            minH: 2,
            minW: 12,
            moved: false,
            static: true,
            w: 12,
            x: 0,
            y: 0,
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
      onCompleted: () => navigate('/app/manage-dashboard'),
      variables: {
        data: {
          layout: {
            createMany: {
              data: layout.map((item) => {
                const { h, i, maxH, maxW, minH, minW, moved, w, x, y } = item;

                return {
                  h,
                  i,
                  maxH,
                  maxW,
                  minH,
                  minW,
                  moved,
                  static: true,
                  w,
                  x,
                  y,
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
          runningBanner: { set: marquee ?? '' },
        },
        where: {
          id: DashboardId,
        },
      },
    });
  };

  const removeItem = (item: string) => {
    setLayout(layout.filter((i) => i.i !== item));
  };
  const layoutItems: { [key in AvailableDashboardElements]: JSX.Element } = {
    activeOffender: (
      <div
        key="activeOffender"
        style={{
          overflow: 'hidden',
          padding: 15,
        }}
      >
        <ActiveOffendersTemplate removeItem={removeItem} />
      </div>
    ),
    adminTodos: (
      <div
        key="adminTodos"
        style={{
          overflow: 'hidden',
          padding: 15,
        }}
      >
        <AdminTodosTemplate removeItem={removeItem} />
      </div>
    ),
    articlesSection: (
      <div
        key="articlesSection"
        style={{
          overflow: 'hidden',
          padding: 15,
        }}
      >
        <ArticlesSection
          removeItem={removeItem}
          w={layout.find(({ i }) => i === 'articlesSection')?.w ?? 0}
        />
      </div>
    ),
    dayOfWeekBar: (
      <div
        key="dayOfWeekBar"
        style={{
          overflow: 'hidden',
          padding: 15,
        }}
      >
        <DayOfWeekBar removeItem={removeItem} />
      </div>
    ),
    feedItemCol: (
      <div
        key="feedItemCol"
        style={{
          overflow: 'hidden',
          padding: 15,
        }}
      >
        <FeedItemCol removeItem={removeItem} />
      </div>
    ),
    incidentCount: (
      <div
        key="incidentCount"
        style={{
          overflow: 'hidden',
          padding: 15,
        }}
      >
        <IncidentCount removeItem={removeItem} />
      </div>
    ),
    incidentValue: (
      <div
        key="incidentValue"
        style={{
          overflow: 'hidden',
          padding: 15,
        }}
      >
        <IncidentValue removeItem={removeItem} />
      </div>
    ),
    latestIncident: (
      <div
        key="latestIncident"
        style={{
          overflow: 'hidden',
          padding: 15,
        }}
      >
        <LatestIncident removeItem={removeItem} />
      </div>
    ),
    latestIncidents: (
      <div
        key="latestIncidents"
        style={{
          overflow: 'hidden',
          padding: 15,
        }}
      >
        <LatestIncidentsTemplate removeItem={removeItem} />
      </div>
    ),
    searchRow: (
      <div key="searchRow">
        <SearchRow />
      </div>
    ),
    targetedGoods: (
      <div
        key="targetedGoods"
        style={{
          overflow: 'hidden',
          padding: 15,
        }}
      >
        <TargetedGoodsGraph removeItem={removeItem} />
      </div>
    ),
    timeOfDayBar: (
      <div
        key="timeOfDayBar"
        style={{
          overflow: 'hidden',
          padding: 15,
        }}
      >
        <TimeOfDay removeItem={removeItem} />
      </div>
    ),
  };

  const ReactGridLayout = useMemo(() => WidthProvider(RGL), []);

  const [droppingItem, setDroppingItem] = useState<
    | {
        h: number;
        i: AvailableDashboardElements;
        w: number;
      }
    | undefined
  >(undefined);
  const onDrop = (
    lay: ({
      i: AvailableDashboardElements;
    } & RGL.Layout)[],
    _layoutItem: {
      i: AvailableDashboardElements;
    } & RGL.Layout,
    _event: never
  ) => {
    setLayout(lay.map((i) => ({ ...i, minH: 2, minW: 2 })));
    setDroppingItem(undefined);
  };

  if (loading)
    return (
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          height: '100vh',
          justifyContent: 'center',
        }}
      >
        <Loading />
      </div>
    );
  return (
    <>
      <Button
        onClick={() => navigate('/app/manage-dashboard')}
        style={{
          bottom: 140,
          position: 'absolute',
          right: 100,
          zIndex: 10_000,
        }}
        type="default"
      >
        {intl.formatMessage({
          defaultMessage: 'Back',
        })}
      </Button>
      <Button
        onClick={onSubmit}
        style={{
          bottom: 140,
          position: 'absolute',
          right: 20,
          zIndex: 10_000,
        }}
        type="primary"
      >
        {intl.formatMessage({
          defaultMessage: 'Save',
        })}
      </Button>
      <Button
        onClick={showDrawer}
        style={{
          bottom: 80,
          position: 'absolute',
          right: 20,
          zIndex: 10_000,
        }}
        type="default"
      >
        {intl.formatMessage({
          defaultMessage: 'Edit/Add banner',
        })}
      </Button>
      <div
        className="feed-container"
        style={{
          height: '100vh',
          overflowX: 'hidden',
          padding: 15,
          paddingTop: 0,
        }}
      >
        {marquee ? (
          <Marquee autoFill>
            {marquee}
            <div style={{ width: 200 }} />
          </Marquee>
        ) : null}
        <DashboardSelectorDrawer
          droppingItem={droppingItem}
          layout={layout}
          setDroppingItem={setDroppingItem}
        />
        <ReactGridLayout
          autoSize={true}
          containerPadding={[0, 0]}
          droppingItem={droppingItem}
          isBounded={true}
          isDraggable
          isDroppable
          isResizable
          layout={layout}
          margin={[0, 0]}
          onDrop={onDrop}
          onLayoutChange={(e) =>
            setLayout(
              e as ({
                i: AvailableDashboardElements;
              } & RGL.Layout)[]
            )
          }
          rowHeight={generateHeight()}
          // style={{ height: '100vh' }}
        >
          {Object.values(layoutItems).map((l) => {
            if (layout.some(({ i }) => i === l.key)) return l;
            return null;
          })}
        </ReactGridLayout>

        <Drawer
          closeIcon={null}
          extra={
            <Space>
              <Button onClick={onClose} type="primary">
                {intl.formatMessage({ defaultMessage: 'Close' })}
              </Button>
            </Space>
          }
          mask={false}
          onClose={onClose}
          open={open}
          placement="left"
          title={intl.formatMessage({
            defaultMessage: 'Dashboard Banner',
          })}
          width={400}
        >
          {intl.formatMessage({
            defaultMessage: 'Banner Text:',
          })}

          <Input
            allowClear
            onChange={(e) => setMarquee(e.target.value ?? '')}
            style={{ marginTop: 10 }}
            value={marquee ?? ''}
          />
        </Drawer>
      </div>
    </>
  );
};

export default ViewDashboardEditor;
