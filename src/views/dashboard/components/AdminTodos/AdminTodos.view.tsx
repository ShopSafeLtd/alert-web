/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { MutationUpdaterFn } from '@apollo/client';
import type { FeedTodosQuery } from 'graphql/feedItems/queries/__generated__/feed-todos.generated';
import type { CreateTodoMutation } from 'graphql/todos/mutations/__generated__/create-todo.generated';

import AddTodo from '#/components/form-components/Todos/AddTodo';
import FormatCalendar from '#/utils/format-calendar-24h';
// import type { TodoData } from '../../../utils/get-to-do-url';
import DashboardInfiniteScroll from '#/views/dashboard/components/DashboardInfiniteScroll';
import { faPlus } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  Col,
  Divider,
  Drawer,
  Empty,
  Input,
  Row,
  Skeleton,
  Typography,
} from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import getTodoUrl from '../../../../utils/get-to-do-url';
import useStyles from './AdminTodos.styles';

const { Text, Title } = Typography;

interface Props {
  // onUncompletedTodo: (id: string) => void;
  addTodo: boolean;
  data:
    | Exclude<FeedTodosQuery['listTodos'], null | undefined>
    | null
    | undefined;
  fetchMoreScroll: () => void;
  // onCompletedTodo: (id: string) => void;
  loading: boolean;
  saving: boolean;
  setSearch: (value: string) => void;
  toggleAddTodo: () => void;

  updateTodoList: MutationUpdaterFn<CreateTodoMutation>;
}

// interface TableItem {
//   key: string;
//   name: string | null | undefined;
//   description: string | null | undefined;
//   completedDate?: Date | null | undefined;
//   completedBy?: string | undefined;
//   completed?: boolean | null | undefined;
//   todo: TodoData;
// }

const AdminTodos = ({
  // onUncompletedTodo,
  addTodo,
  data,
  fetchMoreScroll,
  // onCompletedTodo,
  loading,
  saving,
  setSearch,
  toggleAddTodo,
  updateTodoList,
}: Props): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl();

  // const expandedRowRender = (record: TableItem) => (
  //   <Text style={{ fontSize: 14, padding: 0, margin: 0 }}>
  //     {intl.formatMessage(
  //       { defaultMessage: 'Description: {description}', id: 'US7L2J' },
  //       {
  //         description: record.description,
  //       }
  //     )}
  //   </Text>
  // );

  return (
    <Col
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: 'inherit',
        overflow: 'hidden',
      }}
    >
      <Card
        bodyStyle={{
          padding: 0,
        }}
        style={{ margin: 0 }}
      >
        <Row
          align="middle"
          gutter={8}
          style={{ margin: '10px 0 10px 5px' }}
          wrap={false}
        >
          <Col style={{ minWidth: 'min-content' }}>
            <Title className={classes.title} style={{ fontSize: 16 }}>
              {intl.formatMessage({
                defaultMessage: 'Activities',
              })}
            </Title>
          </Col>
          <Col flex={1} style={{ marginLeft: 5, marginRight: -10 }}>
            <Input
              allowClear
              onChange={(e) => setSearch(e.target.value)}
              placeholder={intl.formatMessage({
                defaultMessage: 'Search for a activity...',
              })}
            />
          </Col>
          <Col>
            <Button
              danger
              disabled={saving}
              icon={
                <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
              }
              onClick={toggleAddTodo}
              style={{ marginRight: -5 }}
              type="text"
            >
              {intl.formatMessage({
                defaultMessage: 'New',
              })}
            </Button>
          </Col>
        </Row>
      </Card>
      {loading ? (
        <Row
          align="stretch"
          gutter={[8, 8]}
          style={{ alignItems: 'stretch', padding: 10 }}
        >
          {Array.from({ length: 5 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Skeleton key={index} />
          ))}
        </Row>
      ) : data?.uncompletedTotal ? (
        <DashboardInfiniteScroll
          dataLength={data?.uncompletedTodos?.length}
          hasMore={
            (data?.uncompletedTodos?.length || 0) <
            (data?.uncompletedTotal || 0)
          }
          id="scroll-todos"
          next={() => fetchMoreScroll()}
        >
          <Row className={classes.header} wrap={false}>
            <Col flex={1}>
              {intl.formatMessage({
                defaultMessage: 'Name',
              })}
            </Col>
            <Col>
              {intl.formatMessage({
                defaultMessage: 'Due Date',
              })}
            </Col>
          </Row>
          <Divider style={{ margin: 0 }} />
          <div>
            {data?.uncompletedTodos.map((todo) => (
              <>
                <Row className={classes.contentRow} wrap={false}>
                  <Col flex={1}>
                    <Text style={{ fontSize: 14 }}>
                      <Link key={todo.id} to={`${getTodoUrl(todo)}`}>
                        {todo.name}
                      </Link>
                    </Text>
                  </Col>
                  {todo.dueDate && (
                    <Col>
                      <Text style={{ fontSize: 14 }}>
                        {FormatCalendar(todo.dueDate, intl)}
                      </Text>
                    </Col>
                  )}
                </Row>
                <Divider style={{ margin: 0 }} />
              </>
            ))}
          </div>
        </DashboardInfiniteScroll>
      ) : (
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <Empty
            description={intl.formatMessage({
              defaultMessage: 'You have no open activities',
            })}
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        </div>
      )}
      <Drawer
        onClose={toggleAddTodo}
        open={addTodo}
        title={intl.formatMessage({
          defaultMessage: 'New Activity',
        })}
        width="800"
      >
        {addTodo ? (
          <AddTodo onClose={toggleAddTodo} update={updateTodoList} />
        ) : (
          <div />
        )}
      </Drawer>
    </Col>
  );
};

export default AdminTodos;
