/* eslint-disable react/no-unknown-property */
import type { AvailableDashboardElements } from '#/state/dashboard-model';
import type { Dispatch, SetStateAction } from 'react';
import type RGL from 'react-grid-layout';

import ActiveOffendersTemplate from '#/views/dashboard/components/ActiveOffenders/ActiveOffendersTemplate';
import AdminTodosTemplate from '#/views/dashboard/components/AdminTodos/AdminTodosTemplate';
import ArticlesSection from '#/views/dashboard/components/ArticlesSection/ArticlesSectionTemplate';
import DayOfWeekBar from '#/views/dashboard/components/DayOfWeek/DayOfWeekGraphTemplate';
import DraftIncidentsTemplate from '#/views/dashboard/components/DraftIncidents/DraftIncidentsTemplate';
import FeedItemCol from '#/views/dashboard/components/FeedItems/FeedItemColTemplate';
import IncidentCount from '#/views/dashboard/components/IncidentCount/IncidentCountTemplate.view';
import IncidentValue from '#/views/dashboard/components/IncidentValues/IncidentValueTemplate.view';
import LatestIncident from '#/views/dashboard/components/LatestIncident/LatestIncidentTemplate.view';
import LatestIncidentsTemplate from '#/views/dashboard/components/LatestIncidents/LatestIncidentsTemplate';
import TargetedGoodsGraph from '#/views/dashboard/components/TargetedGoods/TargetedGoodsTemplate';
import TimeOfDay from '#/views/dashboard/components/TimeOfDay/TimeOfDayTemplate.view';
import { Button, Col, Divider, Drawer, Row, Space } from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

const removeItem = (_: AvailableDashboardElements) => {};

const DashboardSelectorDrawer = ({
  droppingItem,
  layout,
  setDroppingItem,
}: {
  droppingItem:
    | { h: number; i: AvailableDashboardElements; w: number }
    | undefined;
  layout: RGL.Layout[];
  setDroppingItem: Dispatch<
    SetStateAction<
      { h: number; i: AvailableDashboardElements; w: number } | undefined
    >
  >;
}) => {
  const usedKeys = new Set(
    layout.map(({ i }) => i).filter((i) => i !== droppingItem?.i)
  );
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(!open);
  };

  const onClose = () => {
    setOpen(false);
  };
  const dragStyle = {
    cursor: 'grab',
    height: 190,
    overflow: 'hidden',
    transform: 'translate3d(0, 0, 0)',
    width: 300,
  };

  const intl = useIntl();
  return (
    <>
      <Button
        onClick={showDrawer}
        style={{
          bottom: 20,
          position: 'absolute',
          right: 20,
          zIndex: 10_000,
        }}
        type="default"
      >
        {intl.formatMessage({
          defaultMessage: 'Open component drawer',
        })}
      </Button>

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
        open={open && !droppingItem}
        placement="left"
        title={intl.formatMessage({
          defaultMessage: 'Drag Items to Add',
        })}
        width={400}
      >
        <Row gutter={[12, 12]}>
          <Col hidden={usedKeys.has('activeOffender')} span={24}>
            <div
              className="droppable-element"
              draggable
              key="activeOffender"
              // @see https://bugzilla.mozilla.org/show_bug.cgi?id=568313
              onDragStart={(e) => {
                e.dataTransfer.setData('text/plain', '');
                setDroppingItem({
                  h: 5,
                  i: 'activeOffender',
                  w: 3,
                });
              }}
              // this is a hack for firefox
              // Firefox requires some kind of initialization
              // which we can do by adding this attribute
              style={dragStyle}
              unselectable="on"
            >
              <ActiveOffendersTemplate removeItem={removeItem} />
            </div>
            <Divider
              style={{ marginBottom: 10, marginTop: 10 }}
              type="horizontal"
            />
          </Col>
          <Col hidden={usedKeys.has('adminTodos')} span={24}>
            <div
              className="droppable-element"
              draggable
              key="adminTodos"
              onDragStart={(e) => {
                e.dataTransfer.setData('text/plain', '');
                setDroppingItem({
                  h: 5,
                  i: 'adminTodos',
                  w: 3,
                });
              }}
              style={dragStyle}
              unselectable="on"
            >
              <AdminTodosTemplate removeItem={removeItem} />
            </div>
            <Divider
              style={{ marginBottom: 10, marginTop: 10 }}
              type="horizontal"
            />
          </Col>
          <Col hidden={usedKeys.has('articlesSection')} span={24}>
            <div
              className="droppable-element"
              draggable
              key="articlesSection"
              onDragEnd={() => setDroppingItem(undefined)}
              onDragStart={(e) => {
                setDroppingItem({
                  h: 5,
                  i: 'articlesSection',
                  w: 3,
                });
                e.dataTransfer.setData('text/plain', '');
              }}
              style={dragStyle}
              unselectable="on"
            >
              <ArticlesSection removeItem={removeItem} w={0} />
            </div>
            <Divider
              style={{ marginBottom: 10, marginTop: 10 }}
              type="horizontal"
            />
          </Col>
          <Col hidden={usedKeys.has('dayOfWeekBar')} span={24}>
            <div
              className="droppable-element"
              draggable
              key="dayOfWeekBar"
              onDragEnd={() => setDroppingItem(undefined)}
              onDragStart={(e) => {
                setDroppingItem({
                  h: 5,
                  i: 'dayOfWeekBar',
                  w: 3,
                });
                e.dataTransfer.setData('text/plain', '');
              }}
              style={dragStyle}
              unselectable="on"
            >
              <DayOfWeekBar removeItem={removeItem} />
            </div>
            <Divider
              style={{ marginBottom: 10, marginTop: 10 }}
              type="horizontal"
            />
          </Col>
          <Col hidden={usedKeys.has('feedItemCol')} span={24}>
            <div
              className="droppable-element"
              draggable
              key="feedItemCol"
              onDragEnd={() => setDroppingItem(undefined)}
              onDragStart={(e) => {
                setDroppingItem({
                  h: 5,
                  i: 'feedItemCol',
                  w: 3,
                });
                e.dataTransfer.setData('text/plain', '');
              }}
              style={dragStyle}
              unselectable="on"
            >
              <FeedItemCol removeItem={removeItem} />
            </div>
            <Divider
              style={{ marginBottom: 10, marginTop: 10 }}
              type="horizontal"
            />
          </Col>
          <Col hidden={usedKeys.has('incidentCount')} span={24}>
            <div
              className="droppable-element"
              draggable
              key="incidentCount"
              onDragEnd={() => setDroppingItem(undefined)}
              onDragStart={(e) => {
                setDroppingItem({
                  h: 3,
                  i: 'incidentCount',
                  w: 2,
                });
                e.dataTransfer.setData('text/plain', '');
              }}
              style={dragStyle}
              unselectable="on"
            >
              <IncidentCount removeItem={removeItem} />
            </div>
            <Divider
              style={{ marginBottom: 10, marginTop: 10 }}
              type="horizontal"
            />
          </Col>
          <Col hidden={usedKeys.has('incidentValue')} span={24}>
            <div
              className="droppable-element"
              draggable
              key="incidentValue"
              onDragEnd={() => setDroppingItem(undefined)}
              onDragStart={(e) => {
                setDroppingItem({
                  h: 3,
                  i: 'incidentValue',
                  w: 2,
                });
                e.dataTransfer.setData('text/plain', '');
              }}
              style={dragStyle}
              unselectable="on"
            >
              <IncidentValue removeItem={removeItem} />
            </div>
            <Divider
              style={{ marginBottom: 10, marginTop: 10 }}
              type="horizontal"
            />
          </Col>
          <Col hidden={usedKeys.has('latestIncident')} span={24}>
            <div
              className="droppable-element"
              draggable
              key="latestIncident"
              onDragEnd={() => setDroppingItem(undefined)}
              onDragStart={(e) => {
                setDroppingItem({
                  h: 3,
                  i: 'latestIncident',
                  w: 3,
                });
                e.dataTransfer.setData('text/plain', '');
              }}
              style={dragStyle}
              unselectable="on"
            >
              <LatestIncident removeItem={removeItem} />
            </div>
            <Divider
              style={{ marginBottom: 10, marginTop: 10 }}
              type="horizontal"
            />
          </Col>
          <Col hidden={usedKeys.has('latestIncidents')} span={24}>
            <div
              className="droppable-element"
              draggable
              key="latestIncidents"
              onDragEnd={() => setDroppingItem(undefined)}
              onDragStart={(e) => {
                setDroppingItem({
                  h: 3,
                  i: 'latestIncidents',
                  w: 3,
                });
                e.dataTransfer.setData('text/plain', '');
              }}
              style={dragStyle}
              unselectable="on"
            >
              <LatestIncidentsTemplate removeItem={removeItem} />
            </div>
            <Divider
              style={{ marginBottom: 10, marginTop: 10 }}
              type="horizontal"
            />
          </Col>
          <Col hidden={usedKeys.has('draftIncidents')} span={24}>
            <div
              className="droppable-element"
              draggable
              key="draftIncidents"
              onDragEnd={() => setDroppingItem(undefined)}
              onDragStart={(e) => {
                setDroppingItem({
                  h: 3,
                  i: 'draftIncidents',
                  w: 3,
                });
                e.dataTransfer.setData('text/plain', '');
              }}
              style={dragStyle}
              unselectable="on"
            >
              <DraftIncidentsTemplate removeItem={removeItem} />
            </div>
            <Divider
              style={{ marginBottom: 10, marginTop: 10 }}
              type="horizontal"
            />
          </Col>
          <Col hidden={usedKeys.has('targetedGoods')} span={24}>
            <div
              className="droppable-element"
              draggable
              key="targetedGoods"
              onDragEnd={() => setDroppingItem(undefined)}
              onDragStart={(e) => {
                setDroppingItem({
                  h: 3,
                  i: 'targetedGoods',
                  w: 3,
                });
                e.dataTransfer.setData('text/plain', '');
              }}
              style={dragStyle}
              unselectable="on"
            >
              <TargetedGoodsGraph removeItem={removeItem} />
            </div>
            <Divider
              style={{ marginBottom: 10, marginTop: 10 }}
              type="horizontal"
            />
          </Col>
          <Col hidden={usedKeys.has('timeOfDayBar')} span={24}>
            <div
              className="droppable-element"
              draggable
              key="timeOfDayBar"
              onDragEnd={() => setDroppingItem(undefined)}
              onDragStart={(e) => {
                setDroppingItem({
                  h: 3,
                  i: 'timeOfDayBar',
                  w: 3,
                });
                e.dataTransfer.setData('text/plain', '');
              }}
              style={dragStyle}
              unselectable="on"
            >
              <TimeOfDay removeItem={removeItem} />
            </div>
            <Divider
              style={{ marginBottom: 10, marginTop: 10 }}
              type="horizontal"
            />
          </Col>
        </Row>
      </Drawer>
    </>
  );
};

export default DashboardSelectorDrawer;
