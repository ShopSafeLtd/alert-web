/* eslint-disable react/no-unknown-property */
import { Button, Col, Divider, Drawer, Row, Space } from 'antd';
import type { Dispatch, SetStateAction } from 'react';
import React, { useState } from 'react';
import ActiveOffendersTemplate from '#/views/dashboard/components/ActiveOffenders/ActiveOffendersTemplate';
import { useIntl } from 'react-intl';
import AdminTodosTemplate from '#/views/dashboard/components/AdminTodos/AdminTodosTemplate';
import ArticlesSection from '#/views/dashboard/components/ArticlesSection/ArticlesSectionTemplate';
import DayOfWeekBar from '#/views/dashboard/components/DayOfWeek/DayOfWeekGraphTemplate';
import type RGL from 'react-grid-layout';
import FeedItemCol from '#/views/dashboard/components/FeedItems/FeedItemColTemplate';
import IncidentCount from '#/views/dashboard/components/IncidentCount/IncidentCountTemplate.view';
import IncidentValue from '#/views/dashboard/components/IncidentValues/IncidentValueTemplate.view';
import LatestIncident from '#/views/dashboard/components/LatestIncident/LatestIncidentTemplate.view';
import LatestIncidentsTemplate from '#/views/dashboard/components/LatestIncidents/LatestIncidentsTemplate';
import TargetedGoodsGraph from '#/views/dashboard/components/TargetedGoods/TargetedGoodsTemplate';
import TimeOfDay from '#/views/dashboard/components/TimeOfDay/TimeOfDayTemplate.view';
import type { AvailableDashboardElements } from '#/state/dashboard-model';

const removeItem = (_: AvailableDashboardElements) => {};

const DashboardSelectorDrawer = ({
  setDroppingItem,
  layout,
  droppingItem,
}: {
  setDroppingItem: Dispatch<
    SetStateAction<
      { i: AvailableDashboardElements; w: number; h: number } | undefined
    >
  >;
  droppingItem:
    | { i: AvailableDashboardElements; w: number; h: number }
    | undefined;
  layout: RGL.Layout[];
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
    width: 300,
    overflow: 'hidden',
    height: 190,
    transform: 'translate3d(0, 0, 0)',
    cursor: 'grab',
  };

  const intl = useIntl();
  return (
    <>
      <Button
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          zIndex: 10_000,
        }}
        onClick={showDrawer}
        type="default"
      >
        {intl.formatMessage({
          defaultMessage: 'Open component drawer',
        })}
      </Button>

      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Drag Items to Add',
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
              {intl.formatMessage({ defaultMessage: 'Close' })}
            </Button>
          </Space>
        }
      >
        <Row gutter={[12, 12]}>
          <Col hidden={usedKeys.has('activeOffender')} span={24}>
            <div
              className="droppable-element"
              draggable
              unselectable="on"
              key="activeOffender"
              // this is a hack for firefox
              // Firefox requires some kind of initialization
              // which we can do by adding this attribute
              // @see https://bugzilla.mozilla.org/show_bug.cgi?id=568313
              onDragStart={(e) => {
                e.dataTransfer.setData('text/plain', '');
                setDroppingItem({
                  i: 'activeOffender',
                  w: 3,
                  h: 5,
                });
              }}
              style={dragStyle}
            >
              <ActiveOffendersTemplate removeItem={removeItem} />
            </div>
            <Divider
              style={{ marginTop: 10, marginBottom: 10 }}
              type="horizontal"
            />
          </Col>
          <Col span={24} hidden={usedKeys.has('adminTodos')}>
            <div
              className="droppable-element"
              draggable
              unselectable="on"
              key="adminTodos"
              onDragStart={(e) => {
                e.dataTransfer.setData('text/plain', '');
                setDroppingItem({
                  i: 'adminTodos',
                  w: 3,
                  h: 5,
                });
              }}
              style={dragStyle}
            >
              <AdminTodosTemplate removeItem={removeItem} />
            </div>
            <Divider
              style={{ marginTop: 10, marginBottom: 10 }}
              type="horizontal"
            />
          </Col>
          <Col span={24} hidden={usedKeys.has('articlesSection')}>
            <div
              className="droppable-element"
              draggable
              unselectable="on"
              key="articlesSection"
              onDragStart={(e) => {
                setDroppingItem({
                  i: 'articlesSection',
                  w: 3,
                  h: 5,
                });
                e.dataTransfer.setData('text/plain', '');
              }}
              onDragEnd={() => setDroppingItem(undefined)}
              style={dragStyle}
            >
              <ArticlesSection w={0} removeItem={removeItem} />
            </div>
            <Divider
              style={{ marginTop: 10, marginBottom: 10 }}
              type="horizontal"
            />
          </Col>
          <Col span={24} hidden={usedKeys.has('dayOfWeekBar')}>
            <div
              className="droppable-element"
              draggable
              unselectable="on"
              key="dayOfWeekBar"
              onDragStart={(e) => {
                setDroppingItem({
                  i: 'dayOfWeekBar',
                  w: 3,
                  h: 5,
                });
                e.dataTransfer.setData('text/plain', '');
              }}
              onDragEnd={() => setDroppingItem(undefined)}
              style={dragStyle}
            >
              <DayOfWeekBar removeItem={removeItem} />
            </div>
            <Divider
              style={{ marginTop: 10, marginBottom: 10 }}
              type="horizontal"
            />
          </Col>
          <Col span={24} hidden={usedKeys.has('feedItemCol')}>
            <div
              className="droppable-element"
              draggable
              unselectable="on"
              key="feedItemCol"
              onDragStart={(e) => {
                setDroppingItem({
                  i: 'feedItemCol',
                  w: 3,
                  h: 5,
                });
                e.dataTransfer.setData('text/plain', '');
              }}
              onDragEnd={() => setDroppingItem(undefined)}
              style={dragStyle}
            >
              <FeedItemCol removeItem={removeItem} />
            </div>
            <Divider
              style={{ marginTop: 10, marginBottom: 10 }}
              type="horizontal"
            />
          </Col>
          <Col span={24} hidden={usedKeys.has('incidentCount')}>
            <div
              className="droppable-element"
              draggable
              unselectable="on"
              key="incidentCount"
              onDragStart={(e) => {
                setDroppingItem({
                  i: 'incidentCount',
                  w: 2,
                  h: 3,
                });
                e.dataTransfer.setData('text/plain', '');
              }}
              onDragEnd={() => setDroppingItem(undefined)}
              style={dragStyle}
            >
              <IncidentCount removeItem={removeItem} />
            </div>
            <Divider
              style={{ marginTop: 10, marginBottom: 10 }}
              type="horizontal"
            />
          </Col>
          <Col span={24} hidden={usedKeys.has('incidentValue')}>
            <div
              className="droppable-element"
              draggable
              unselectable="on"
              key="incidentValue"
              onDragStart={(e) => {
                setDroppingItem({
                  i: 'incidentValue',
                  w: 2,
                  h: 3,
                });
                e.dataTransfer.setData('text/plain', '');
              }}
              onDragEnd={() => setDroppingItem(undefined)}
              style={dragStyle}
            >
              <IncidentValue removeItem={removeItem} />
            </div>
            <Divider
              style={{ marginTop: 10, marginBottom: 10 }}
              type="horizontal"
            />
          </Col>
          <Col span={24} hidden={usedKeys.has('latestIncident')}>
            <div
              className="droppable-element"
              draggable
              unselectable="on"
              key="latestIncident"
              onDragStart={(e) => {
                setDroppingItem({
                  i: 'latestIncident',
                  w: 3,
                  h: 3,
                });
                e.dataTransfer.setData('text/plain', '');
              }}
              onDragEnd={() => setDroppingItem(undefined)}
              style={dragStyle}
            >
              <LatestIncident removeItem={removeItem} />
            </div>
            <Divider
              style={{ marginTop: 10, marginBottom: 10 }}
              type="horizontal"
            />
          </Col>
          <Col span={24} hidden={usedKeys.has('latestIncidents')}>
            <div
              className="droppable-element"
              draggable
              unselectable="on"
              key="latestIncidents"
              onDragStart={(e) => {
                setDroppingItem({
                  i: 'latestIncidents',
                  w: 3,
                  h: 3,
                });
                e.dataTransfer.setData('text/plain', '');
              }}
              onDragEnd={() => setDroppingItem(undefined)}
              style={dragStyle}
            >
              <LatestIncidentsTemplate removeItem={removeItem} />
            </div>
            <Divider
              style={{ marginTop: 10, marginBottom: 10 }}
              type="horizontal"
            />
          </Col>
          <Col span={24} hidden={usedKeys.has('targetedGoods')}>
            <div
              className="droppable-element"
              draggable
              unselectable="on"
              key="targetedGoods"
              onDragStart={(e) => {
                setDroppingItem({
                  i: 'targetedGoods',
                  w: 3,
                  h: 3,
                });
                e.dataTransfer.setData('text/plain', '');
              }}
              onDragEnd={() => setDroppingItem(undefined)}
              style={dragStyle}
            >
              <TargetedGoodsGraph removeItem={removeItem} />
            </div>
            <Divider
              style={{ marginTop: 10, marginBottom: 10 }}
              type="horizontal"
            />
          </Col>
          <Col span={24} hidden={usedKeys.has('timeOfDayBar')}>
            <div
              className="droppable-element"
              draggable
              unselectable="on"
              key="timeOfDayBar"
              onDragStart={(e) => {
                setDroppingItem({
                  i: 'timeOfDayBar',
                  w: 3,
                  h: 3,
                });
                e.dataTransfer.setData('text/plain', '');
              }}
              onDragEnd={() => setDroppingItem(undefined)}
              style={dragStyle}
            >
              <TimeOfDay removeItem={removeItem} />
            </div>
            <Divider
              style={{ marginTop: 10, marginBottom: 10 }}
              type="horizontal"
            />
          </Col>
        </Row>
      </Drawer>
    </>
  );
};

export default DashboardSelectorDrawer;
