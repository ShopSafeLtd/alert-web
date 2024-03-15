/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React from 'react';
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
import type { CreateTodoMutation, FeedTodosQuery } from 'graphql/generated';
import type { MutationUpdaterFn } from '@apollo/client';
import AddTodo from '#/components/form-components/Todos/AddTodo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-light-svg-icons';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import FormatCalendar from '#/utils/format-calendar-24h';
// import type { TodoData } from '../../../utils/get-to-do-url';
import DashboardInfiniteScroll from '#/views/dashboard/components/DashboardInfiniteScroll';
import getTodoUrl from '../../../../utils/get-to-do-url';
import useStyles from './AdminTodos.styles';

const { Title, Text } = Typography;

interface Props {
  data:
    | Exclude<FeedTodosQuery['listTodos'], undefined | null>
    | null
    | undefined;
  loading: boolean;
  saving: boolean;
  // onCompletedTodo: (id: string) => void;
  // onUncompletedTodo: (id: string) => void;
  addTodo: boolean;
  toggleAddTodo: () => void;
  updateTodoList: MutationUpdaterFn<CreateTodoMutation>;
  setSearch: (value: string) => void;

  fetchMoreScroll: () => void;
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
  data,
  loading,
  saving,
  // onCompletedTodo,
  // onUncompletedTodo,
  addTodo,
  toggleAddTodo,
  updateTodoList,
  setSearch,
  fetchMoreScroll,
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
        height: 'inherit',
        display: 'flex',
        flexDirection: 'column',
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
          wrap={false}
          style={{ margin: '10px 0 10px 5px' }}
        >
          <Col style={{ minWidth: 'min-content' }}>
            <Title className={classes.title} style={{ fontSize: 16 }}>
              {intl.formatMessage({
                defaultMessage: 'Activities',
                id: 'UmEsZF',
              })}
            </Title>
          </Col>
          <Col flex={1} style={{ marginRight: -10, marginLeft: 5 }}>
            <Input
              placeholder={intl.formatMessage({
                defaultMessage: 'Search for a activity...',
                id: '8KsNIu',
              })}
              onChange={(e) => setSearch(e.target.value)}
              allowClear
            />
          </Col>
          <Col>
            <Button
              type="text"
              style={{ marginRight: -5 }}
              danger
              disabled={saving}
              icon={
                <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
              }
              onClick={toggleAddTodo}
            >
              {intl.formatMessage({
                defaultMessage: 'New',
                id: 'bW7B87',
              })}
            </Button>
          </Col>
        </Row>
      </Card>
      {loading ? (
        <Row
          gutter={[8, 8]}
          align="stretch"
          style={{ padding: 10, alignItems: 'stretch' }}
        >
          {Array.from({ length: 5 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Skeleton key={index} />
          ))}
        </Row>
      ) : data?.uncompletedTotal ? (
        <DashboardInfiniteScroll
          dataLength={data?.uncompletedTodos?.length}
          next={() => fetchMoreScroll()}
          hasMore={
            (data?.uncompletedTodos?.length || 0) <
            (data?.uncompletedTotal || 0)
          }
          id="scroll-todos"
        >
          <Row wrap={false} className={classes.header}>
            <Col flex={1}>
              {intl.formatMessage({
                id: 'HAlOn1',
                defaultMessage: 'Name',
              })}
            </Col>
            <Col>
              {intl.formatMessage({
                id: '8XUukm',
                defaultMessage: 'Due Date',
              })}
            </Col>
          </Row>
          <Divider style={{ margin: 0 }} />
          <div>
            {data?.uncompletedTodos.map((todo) => (
              <>
                <Row wrap={false} className={classes.contentRow}>
                  <Col flex={1}>
                    <Text style={{ fontSize: 14 }}>
                      <Link to={`${getTodoUrl(todo)}`} key={todo.id}>
                        {todo.name}
                      </Link>
                    </Text>
                  </Col>
                  {todo.dueDate && (
                    <Col>
                      <Text style={{ fontSize: 14 }}>
                        {FormatCalendar(todo.dueDate)}
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
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={intl.formatMessage({
              defaultMessage: 'You have no open activities',
              id: '/grXWE',
            })}
          />
        </div>
      )}
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'New Activity',
          id: '6kyt/v',
        })}
        open={addTodo}
        width="400"
        onClose={toggleAddTodo}
      >
        {addTodo ? (
          <AddTodo update={updateTodoList} onClose={toggleAddTodo} />
        ) : (
          <div />
        )}
      </Drawer>
    </Col>
  );
};

export default AdminTodos;
