import MapCard from '#/components/map/LocatingCard/MapCard.view';
import {
  Button,
  Col,
  Descriptions,
  Divider,
  Row,
  Skeleton,
  Typography,
} from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import type { TodoQuery } from '../ViewTodo/graphql/__generated__/view-task.generated';

interface Props {
  loading: boolean;
  onAuthorisedTodo: () => void;
  onClose: () => void;
  saving: boolean;
  todo: TodoQuery | undefined;
}

const TodoView = ({
  loading,
  onAuthorisedTodo,
  onClose,
  saving,
  todo,
}: Props) => {
  const intl = useIntl();

  return (
    <div>
      <Typography.Title level={4}>
        {intl.formatMessage({
          defaultMessage: 'Details',
        })}
      </Typography.Title>
      <Descriptions>
        <Descriptions.Item
          label={intl.formatMessage({
            defaultMessage: 'Name',
          })}
        >
          {loading ? (
            <Skeleton.Input style={{ height: 24 }} />
          ) : (
            todo?.todo?.name || ''
          )}
        </Descriptions.Item>
        <Descriptions.Item
          label={intl.formatMessage({
            defaultMessage: 'Created At',
          })}
        >
          {todo?.todo ? dayjs(todo.todo.createdAt).format('DD/MM/YY') : null}
        </Descriptions.Item>
        <Descriptions.Item
          label={intl.formatMessage({
            defaultMessage: 'Due Date',
          })}
        >
          {todo?.todo ? dayjs(todo.todo.dueDate).format('DD/MM/YY') : null}
        </Descriptions.Item>
        <Descriptions.Item
          label={intl.formatMessage({
            defaultMessage: 'Description',
          })}
        >
          {todo?.todo?.description}
        </Descriptions.Item>
      </Descriptions>
      <Divider style={{ marginTop: 10 }} />
      <Row>
        {todo?.todo.business ? (
          <Typography.Text
            style={{ fontSize: 16, fontWeight: 500, marginBottom: 10 }}
          >
            {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
            <FormattedMessage defaultMessage="Business" /> -{' '}
            {todo.todo.business.name}
          </Typography.Text>
        ) : null}
      </Row>
      {todo?.todo.business?.locations[0].geoLat &&
        todo?.todo.business?.locations[0].geoLng && (
          <>
            <Typography.Text style={{ fontSize: 16, fontWeight: 500 }}>
              {intl.formatMessage({ defaultMessage: 'Location' })}
            </Typography.Text>
            <MapCard
              height={194}
              viewport={{
                latitude: todo?.todo.business?.locations[0].geoLat,
                longitude: todo?.todo.business?.locations[0].geoLng,
              }}
              width="100%"
            />
            <Divider style={{ marginTop: 10 }} />
          </>
        )}

      <Row gutter={16} justify="end" style={{ marginTop: 10 }}>
        <Col>
          <Button
            disabled={saving}
            onClick={() => {
              onClose();
            }}
          >
            {intl.formatMessage({
              defaultMessage: 'Cancel',
            })}
          </Button>
        </Col>
        <Col>
          <Button
            disabled={saving}
            loading={saving}
            onClick={() => {
              onAuthorisedTodo();
            }}
            type="primary"
          >
            {intl.formatMessage({
              defaultMessage: 'Authorise Activity',
            })}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default TodoView;
