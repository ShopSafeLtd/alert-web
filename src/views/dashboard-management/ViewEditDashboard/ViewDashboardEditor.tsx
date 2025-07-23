import type { AvailableDashboardElements } from '#/state/dashboard-model';
import type {
  ComponentMetadata,
  DashboardGraphMetadata,
} from '#/types/dashboard-metadata';

import Loading from '#/components/shared-components/AntD/Loading';
import { generateHeight } from '#/views/dashboard/Dashboard.context';
import ActiveOffendersTemplate from '#/views/dashboard/components/ActiveOffenders/ActiveOffendersTemplate';
import AdminTodosTemplate from '#/views/dashboard/components/AdminTodos/AdminTodosTemplate';
import ArticlesSection from '#/views/dashboard/components/ArticlesSection/ArticlesSectionTemplate';
import DashboardGraphTemplate from '#/views/dashboard/components/DashboardGraph/DashboardGraphTemplate';
import DayOfWeekBar from '#/views/dashboard/components/DayOfWeek/DayOfWeekGraphTemplate';
import DraftIncidentsTemplate from '#/views/dashboard/components/DraftIncidents/DraftIncidentsTemplate';
import FeedItemCol from '#/views/dashboard/components/FeedItems/FeedItemColTemplate';
import IncidentCount from '#/views/dashboard/components/IncidentCount/IncidentCountTemplate.view';
import IncidentValue from '#/views/dashboard/components/IncidentValues/IncidentValueTemplate.view';
import LatestIncident from '#/views/dashboard/components/LatestIncident/LatestIncidentTemplate.view';
import LatestIncidentsTemplate from '#/views/dashboard/components/LatestIncidents/LatestIncidentsTemplate';
import SearchRow from '#/views/dashboard/components/SearchRow/SearchRowTemplate';
import TargetedGoodsGraph from '#/views/dashboard/components/TargetedGoods/TargetedGoodsTemplate';
import { useUpdateDashboardTemplateMutation } from '#/views/dashboard-management/graphql/mutations/__generated__/dashboard.generated';
import { useDashboardTemplateQuery } from '#/views/dashboard-management/graphql/queries/__generated__/dashboard-template.generated';
import {
  faArrowLeft,
  faBars,
  faSave,
  faTextHeight,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Drawer, Input, Space } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import Marquee from 'react-fast-marquee';
import RGL, { WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import { useIntl } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';

import DashboardSelectorDrawer from '../../../components/dashboard/elements/DashboardElementSelector.view';
import TimeOfDay from '../../dashboard/components/TimeOfDay/TimeOfDayTemplate.view';

// Helper function to get the base element type from an ID
const getElementType = (id: string): AvailableDashboardElements => {
  // Handle IDs like "dashboardGraph-1", "dashboardGraph-2", etc.
  const match = id.match(/^([^-]+)(?:-\d+)?$/);
  return (match ? match[1] : id) as AvailableDashboardElements;
};

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
  const [componentDrawerOpen, setComponentDrawerOpen] = useState(false);
  const [componentMetadata, setComponentMetadata] = useState<ComponentMetadata>(
    {}
  );
  // eslint-disable-next-line func-call-spacing
  const [layout, setLayout] = useState<
    ({
      i: string;
    } & RGL.Layout)[]
  >([
    {
      h: 2,
      i: 'searchRow',
      isDraggable: false,
      isResizable: false,
      maxH: 12,
      maxW: 12,
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
      const metadataObj: ComponentMetadata = {};
      const initLayout = initData.dashboard.layout.map((item) => {
        Ids.push(item.id);
        // Load metadata if it exists
        if (item.metadata) {
          try {
            // Parse metadata if it's a string, otherwise use as-is
            metadataObj[item.i] = item.metadata as DashboardGraphMetadata;
          } catch (error) {
            console.error('Failed to parse metadata for item', item.i, error);
          }
        }
        return {
          h: item.h,
          i: item.i,
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
      setComponentMetadata(metadataObj);
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
                  metadata: componentMetadata[i] || undefined,
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
    // Also remove the metadata for this component
    setComponentMetadata((prev) => {
      const newMetadata = { ...prev };
      delete newMetadata[item];
      return newMetadata;
    });
  };

  // Create element based on type
  const updateComponentMetadata = (
    componentId: string,
    metadata: DashboardGraphMetadata
  ) => {
    setComponentMetadata((prev) => ({
      ...prev,
      [componentId]: metadata,
    }));
  };

  const createElement = (
    elementId: string,
    elementType: AvailableDashboardElements
  ) => {
    const removeItemHandler = () => removeItem(elementId);
    const metadata = componentMetadata[elementId] || {};

    switch (elementType) {
      case 'activeOffender': {
        return <ActiveOffendersTemplate removeItem={removeItemHandler} />;
      }
      case 'adminTodos': {
        return <AdminTodosTemplate removeItem={removeItemHandler} />;
      }
      case 'articlesSection': {
        return (
          <ArticlesSection
            removeItem={removeItemHandler}
            w={layout.find(({ i }) => i === elementId)?.w ?? 0}
          />
        );
      }
      case 'dashboardGraph': {
        return (
          <DashboardGraphTemplate
            elementId={elementId}
            metadata={metadata}
            removeItem={removeItemHandler}
            updateMetadata={(data: DashboardGraphMetadata) =>
              updateComponentMetadata(elementId, data)
            }
          />
        );
      }
      case 'dayOfWeekBar': {
        return (
          <DayOfWeekBar
            _metadata={metadata}
            _updateMetadata={(data: DashboardGraphMetadata) =>
              updateComponentMetadata(elementId, data)
            }
            elementId={elementId}
            removeItem={removeItemHandler}
          />
        );
      }
      case 'draftIncidents': {
        return <DraftIncidentsTemplate removeItem={removeItemHandler} />;
      }
      case 'feedItemCol': {
        return <FeedItemCol removeItem={removeItemHandler} />;
      }
      case 'incidentCount': {
        return <IncidentCount removeItem={removeItemHandler} />;
      }
      case 'incidentValue': {
        return <IncidentValue removeItem={removeItemHandler} />;
      }
      case 'latestIncident': {
        return <LatestIncident removeItem={removeItemHandler} />;
      }
      case 'latestIncidents': {
        return <LatestIncidentsTemplate removeItem={removeItemHandler} />;
      }
      case 'searchRow': {
        return <SearchRow />;
      }
      case 'targetedGoods': {
        return (
          <TargetedGoodsGraph
            _metadata={metadata}
            _updateMetadata={(data: DashboardGraphMetadata) =>
              updateComponentMetadata(elementId, data)
            }
            elementId={elementId}
            removeItem={removeItemHandler}
          />
        );
      }
      case 'timeOfDayBar': {
        return (
          <TimeOfDay
            _metadata={metadata}
            _updateMetadata={(data: DashboardGraphMetadata) =>
              updateComponentMetadata(elementId, data)
            }
            elementId={elementId}
            removeItem={removeItemHandler}
          />
        );
      }
      default: {
        return null;
      }
    }
  };

  const ReactGridLayout = useMemo(() => WidthProvider(RGL), []);

  const [droppingItem, setDroppingItem] = useState<
    | {
        h: number;
        i: string;
        w: number;
      }
    | undefined
  >(undefined);
  const onDrop = (
    lay: ({
      i: string;
    } & RGL.Layout)[],
    _layoutItem: {
      i: string;
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
      {/* Floating Toolbar */}
      <Card
        bodyStyle={{
          padding: '8px 16px',
        }}
        style={{
          bottom: 20,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          position: 'fixed',
          right: 20,
          zIndex: 999,
        }}
      >
        <Space size="middle">
          <Button
            icon={
              <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: 8 }} />
            }
            onClick={() => navigate('/app/manage-dashboard')}
            type="default"
          >
            {intl.formatMessage({ defaultMessage: 'Back' })}
          </Button>
          <Button
            icon={<FontAwesomeIcon icon={faBars} style={{ marginRight: 8 }} />}
            onClick={() => setComponentDrawerOpen(!componentDrawerOpen)}
            type="default"
          >
            {intl.formatMessage({ defaultMessage: 'Add Components' })}
          </Button>
          <Button
            icon={
              <FontAwesomeIcon icon={faTextHeight} style={{ marginRight: 8 }} />
            }
            onClick={showDrawer}
            type="default"
          >
            {intl.formatMessage({ defaultMessage: 'Edit Banner' })}
          </Button>
          <Button
            icon={<FontAwesomeIcon icon={faSave} style={{ marginRight: 8 }} />}
            onClick={onSubmit}
            type="primary"
          >
            {intl.formatMessage({ defaultMessage: 'Save Dashboard' })}
          </Button>
        </Space>
      </Card>

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
          layout={layout}
          open={componentDrawerOpen}
          setDroppingItem={setDroppingItem}
          setOpen={setComponentDrawerOpen}
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
                i: string;
              } & RGL.Layout)[]
            )
          }
          rowHeight={generateHeight()}
          style={{ minHeight: '100vh' }}
        >
          {layout.map((layoutItem) => {
            const elementType = getElementType(layoutItem.i);
            const element = createElement(layoutItem.i, elementType);

            if (!element) return null;

            return (
              <div
                key={layoutItem.i}
                style={{
                  overflow: 'hidden',
                  padding: elementType === 'searchRow' ? 0 : 15,
                }}
              >
                {element}
              </div>
            );
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
