import type { UpdateTaskMutation } from '#/components/form-components/Todos/ViewTodo/graphql/__generated__/update-todo.generated';
import type {
  ViewIncidentQuery,
  ViewIncidentQueryVariables,
} from '#/views/incidents/ViewIncident/__generated__/view-incident.generated';
import type { MutationUpdaterFn } from '@apollo/client';
import type { CreateTodoMutation } from 'graphql/todos/mutations/__generated__/create-todo.generated';

import AddTodo from '#/components/form-components/Todos/AddTodo';
import ViewTodo from '#/components/form-components/Todos/ViewTodo/Todo.container';
import ActivityTable from '#/components/tables/ActivityTable';
import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useQuestionGroupOnSchemeQuery } from '#/views/adminTodo/graphql/queries/__generated__/listTemplates.generated';
import { ViewIncidentDocument } from '#/views/incidents/ViewIncident/__generated__/view-incident.generated';
import { faPlus } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Col, Drawer, Empty, Row, Typography } from 'antd';
import update from 'immutability-helper';
import { useAtomValue } from 'jotai/index';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

const { Title } = Typography;

interface Props {
  data: ViewIncidentQuery | undefined;
  incidentId: string;
  loading: boolean;
  saving: boolean;
}

const Activities = ({ data, incidentId, loading, saving }: Props) => {
  const intl = useIntl();

  const schemeId = useAtomValue(currentSchemeIdAtom);
  const [addTodo, setAddTodo] = useState(false);
  const [completeTodoVisible, setCompleteTodoVisible] = useState<null | string>(
    null
  );
  const [viewTodoVisible, setViewTodoVisible] = useState<null | string>(null);

  const { data: templatesData, loading: templatesLoading } =
    useQuestionGroupOnSchemeQuery({
      variables: {
        questionGroupsWhere: {
          defaultForIncidents: {
            equals: true,
          },
        },
        where: {
          id: schemeId,
        },
      },
    });

  const toggleAddTodo = () => {
    setAddTodo(!addTodo);
  };

  const updateTodoList: MutationUpdaterFn<CreateTodoMutation> = (
    store,
    { data: res }
  ) => {
    if (res?.createTodo === null || res?.createTodo === undefined) return;
    const existingData = store.readQuery<ViewIncidentQuery>({
      query: ViewIncidentDocument,
      variables: {
        where: {
          id: incidentId,
        },
      },
    });

    if (!existingData?.incident) return;
    store.writeQuery<ViewIncidentQuery>({
      data: {
        __typename: 'Query',
        incident: {
          ...existingData.incident,
          todos: [...existingData.incident.todos, res.createTodo],
        },
      },
      query: ViewIncidentDocument,
      variables: {
        where: {
          id: incidentId,
        },
      },
    });
  };

  const updateTodo: MutationUpdaterFn<UpdateTaskMutation> = (
    store,
    { data: res }
  ) => {
    if (res === null || res === undefined) return;
    if (res.updateTodo === null || res.updateTodo === undefined) return;
    // get existing group list data from Apollo store
    const existingData = store.readQuery<
      ViewIncidentQuery,
      ViewIncidentQueryVariables
    >({
      query: ViewIncidentDocument,
      variables: {
        where: {
          id: incidentId,
        },
      },
    });

    if (existingData === null) return;
    if (existingData?.incident?.todos === undefined) return;

    // write the new data to the Apollo store
    store.writeQuery<ViewIncidentQuery, ViewIncidentQueryVariables>({
      data: {
        __typename: 'Query',
        incident: update<ViewIncidentQuery['incident']>(existingData.incident, {
          todos: {
            [existingData.incident.todos.findIndex(
              ({ id }) => id === res.updateTodo?.id
            )]: {
              $set: res.updateTodo,
            },
          },
        }),
      },
      query: ViewIncidentDocument,
      variables: {
        where: {
          id: incidentId,
        },
      },
    });
  };

  return (
    <>
      <Card loading={loading}>
        <Row align="middle" gutter={8} style={{ marginBottom: 10 }}>
          <Col flex={1}>
            <Title level={4}>
              {intl.formatMessage({
                defaultMessage: 'Activities',
              })}
            </Title>
          </Col>

          <Col className="no-print">
            <Button
              disabled={templatesLoading}
              icon={
                <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
              }
              loading={templatesLoading}
              onClick={toggleAddTodo}
              size="small"
            >
              {intl.formatMessage({
                defaultMessage: 'Add Activity',
              })}
            </Button>
          </Col>
        </Row>
        {data?.incident?.todos.length && !loading ? (
          <ActivityTable
            saving={saving || loading}
            // setCompleteTodoVisible={setCompleteTodoVisible}
            setViewTodoVisible={setViewTodoVisible}
            todos={data?.incident?.todos}
          />
        ) : (
          <Empty
            description={intl.formatMessage({
              defaultMessage: 'No activities for this incident',
            })}
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        )}
      </Card>
      <Drawer
        onClose={toggleAddTodo}
        open={addTodo}
        title={intl.formatMessage({
          defaultMessage: 'Add Activity',
        })}
        width="600"
      >
        {addTodo ? (
          <AddTodo
            incidentId={data?.incident?.id}
            initData={
              templatesData?.scheme &&
              templatesData.scheme.questionGroups.length > 0
                ? {
                    id: templatesData?.scheme?.questionGroups[0].id,
                  }
                : undefined
            }
            onClose={toggleAddTodo}
            update={updateTodoList}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={() => setCompleteTodoVisible(null)}
        open={completeTodoVisible !== null}
        title={intl.formatMessage({
          defaultMessage: 'Complete Activity',
        })}
        width={800}
      >
        {completeTodoVisible ? (
          <ViewTodo
            id={completeTodoVisible}
            onClose={() => setCompleteTodoVisible(null)}
            updateQuery={updateTodo}
            updateTodo={() => {}}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={() => setViewTodoVisible(null)}
        open={!!viewTodoVisible}
        title={intl.formatMessage({
          defaultMessage: 'View Activity',
        })}
        width={800}
      >
        {viewTodoVisible ? (
          <ViewTodo
            confirmText={intl.formatMessage({
              defaultMessage: 'Save Activity',
            })}
            id={viewTodoVisible}
            onClose={() => setViewTodoVisible(null)}
            updateQuery={updateTodo}
            updateTodo={() => {}}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </>
  );
};

export default Activities;
