import type { OffenderData } from '#/types/DataType';
import type { ViewIncidentQuery } from '#/views/incidents/ViewIncident/__generated__/view-incident.generated';
import type { MutationUpdaterFn } from '@apollo/client';
import type { CreateSimpleOffenderMutation } from 'graphql/offenders/mutations/__generated__/create-simple-offender.generated';
import type { UpdateSimpleOffenderMutation } from 'graphql/offenders/mutations/__generated__/update-simple-offender.generated';

import AddNewOffenderSimple from '#/components/form-components/offender/AddNewOffenderSimple/AddNewOffender.container';
import SimpleEditOffender from '#/components/form-components/offender/SimpleEditOffender/SimpleEditOffender.container';
import OffenderTable from '#/components/tables/OffenderTable';
import errorNotification from '#/types/mutation_notifications/error_notification';
import { ViewIncidentDocument } from '#/views/incidents/ViewIncident/__generated__/view-incident.generated';
import { faMagnifyingGlass, faPlus } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  Col,
  Drawer,
  Dropdown,
  Empty,
  Menu,
  Row,
  Typography,
  notification,
} from 'antd';
import AddExistingOffender from 'components/form-components/offender/AddExistingOffender';
import { useUpdateIncidentOffendersMutation } from 'graphql/incidents/mutations/update/__generated__/update-incident-offenders.generated';
import update from 'immutability-helper';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

const { Title } = Typography;

interface Props {
  data: ViewIncidentQuery | undefined;
  deleteRights: boolean;
  editRights: boolean;
  incidentId: string;
  loading: boolean;
  saving: boolean;
  setSaving: (value: boolean) => void;
}

const Offenders = ({
  data,
  deleteRights,
  editRights,
  incidentId,
  loading,
  saving,
  setSaving,
}: Props) => {
  const intl = useIntl();

  const [addExistingOffender, setAddExistingOffender] = useState(false);
  const [addOffender, setAddOffender] = useState(false);
  const [editOffenderData, setEditOffenderData] = useState<OffenderData | null>(
    null
  );

  const [updateIncidentOffenders] = useUpdateIncidentOffendersMutation({
    onError: () => {
      errorNotification();
    },
  });

  const toggleAddOffender = () => {
    setAddOffender(!addOffender);
  };
  const toggleAddExistingOffender = () => {
    setAddExistingOffender(!addExistingOffender);
  };
  const updateEditOffenderList: MutationUpdaterFn<
    UpdateSimpleOffenderMutation
  > = (store, { data: res }) => {
    if (res?.updateOffender === null || res?.updateOffender === undefined)
      return;
    const existingData = store.readQuery<ViewIncidentQuery>({
      query: ViewIncidentDocument,
      variables: {
        where: {
          id: incidentId,
        },
      },
    });
    if (!existingData?.incident) return;
    const index = existingData?.incident?.offenders
      .map((item) => item.id)
      .indexOf(res.updateOffender.id);

    store.writeQuery<ViewIncidentQuery>({
      data: {
        __typename: 'Query',
        incident: {
          ...existingData.incident,
          offenders: update(existingData.incident.offenders, {
            [index]: {
              $set: { ...res.updateOffender },
            },
          }),
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
  const updateAddOffenderList: MutationUpdaterFn<
    CreateSimpleOffenderMutation
  > = (store, { data: res }) => {
    if (res?.createOffender === null || res?.createOffender === undefined)
      return;
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
          offenders: [...existingData.incident.offenders, res.createOffender],
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
  const onCompletedAddOffender = () =>
    notification.success({
      description: intl.formatMessage({
        defaultMessage: 'The offender has been added to the incident!',
      }),
      message: intl.formatMessage({
        defaultMessage: 'Successfully added!',
      }),
      placement: 'bottomRight',
    });
  const onCompletedEditOffender = () =>
    notification.success({
      description: intl.formatMessage({
        defaultMessage: 'The offender has been updated on the incident!',
      }),
      message: intl.formatMessage({
        defaultMessage: 'Successfully updated!',
      }),
      placement: 'bottomRight',
    });
  const onDeleteOffender = (value: string) => {
    setSaving(true);
    if (value)
      void updateIncidentOffenders({
        onCompleted: () => {
          onCompletedAddOffender();
        },
        update: (store, { data: res }) => {
          if (res?.updateIncident === null || res?.updateIncident === undefined)
            return;
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
                offenders: existingData.incident.offenders.filter(
                  ({ id }) => id !== value
                ),
              },
            },
            query: ViewIncidentDocument,
            variables: {
              where: {
                id: incidentId,
              },
            },
          });
        },
        variables: {
          id: incidentId,
          offenders: { disconnect: [{ id: value }] },
        },
      }).finally(() => {
        setSaving(false);
      });
  };
  const onAddExistingOffender = (value: string) => {
    setSaving(true);
    if (value)
      void updateIncidentOffenders({
        onCompleted: () => {
          onCompletedAddOffender();
        },
        update: (store, { data: res }) => {
          if (res?.updateIncident === null || res?.updateIncident === undefined)
            return;

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
                offenders: res.updateIncident.offenders,
              },
            },
            query: ViewIncidentDocument,
            variables: {
              where: {
                id: incidentId,
              },
            },
          });
        },
        variables: {
          id: incidentId,
          offenders: {
            connect: [{ id: value }],
          },
        },
      }).finally(() => {
        setAddExistingOffender(false);
        setSaving(false);
      });
  };

  return (
    <>
      <Card loading={loading}>
        <Row align="middle" gutter={8} style={{ marginBottom: 10 }}>
          <Col flex={1}>
            <Title level={4}>
              {intl.formatMessage({
                defaultMessage: 'Offenders',
              })}
            </Title>
          </Col>
          {editRights && (
            <Col>
              <Dropdown
                overlay={
                  <Menu
                    items={[
                      {
                        icon: (
                          <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            style={{ marginRight: 5 }}
                          />
                        ),
                        key: '1',
                        label: intl.formatMessage({
                          defaultMessage: 'Add Existing Offender',
                        }),
                        onClick: () => toggleAddExistingOffender(),
                      },
                      {
                        icon: (
                          <FontAwesomeIcon
                            icon={faPlus}
                            style={{ marginRight: 5 }}
                          />
                        ),
                        key: '2',
                        label: intl.formatMessage({
                          defaultMessage: 'Create New Offender',
                        }),
                        onClick: () => toggleAddOffender(),
                      },
                    ]}
                  />
                }
              >
                <Button
                  icon={
                    <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
                  }
                  size="small"
                >
                  {intl.formatMessage({
                    defaultMessage: 'Add Offenders',
                  })}
                </Button>
              </Dropdown>
            </Col>
          )}
        </Row>

        {data?.incident?.offenders.length && !loading ? (
          <OffenderTable
            deleteRights={deleteRights}
            editRights={editRights}
            hasNavigation
            offenders={data?.incident?.offenders}
            onDeleteOffender={onDeleteOffender}
            saving={saving}
            setEditOffenderData={setEditOffenderData}
          />
        ) : (
          <Empty
            description={intl.formatMessage({
              defaultMessage: 'No offenders for this incident',
            })}
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        )}
      </Card>
      <Drawer
        onClose={() => setEditOffenderData(null)}
        open={!!editOffenderData}
        title={intl.formatMessage({
          defaultMessage: 'Edit Offender',
        })}
        width="700"
      >
        {editOffenderData ? (
          <SimpleEditOffender
            data={editOffenderData}
            images={data?.incident?.images}
            incidentBusinessId={data?.incident.business?.id}
            onClose={() => setEditOffenderData(null)}
            onCompleted={onCompletedEditOffender}
            update={updateEditOffenderList}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={toggleAddOffender}
        open={addOffender}
        title={intl.formatMessage({
          defaultMessage: 'Add New Offender',
        })}
        width="700"
        zIndex={999}
      >
        {addOffender ? (
          <AddNewOffenderSimple
            groupsIds={data?.incident.groups.map(({ id }) => id)}
            images={data?.incident?.images.map((el) => ({ ...el, uid: el.id }))}
            incidentBusinessId={data?.incident.business?.id}
            incidentId={data?.incident.id}
            onClose={toggleAddOffender}
            onCompleted={onCompletedAddOffender}
            update={updateAddOffenderList}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={toggleAddExistingOffender}
        open={addExistingOffender}
        title={intl.formatMessage({
          defaultMessage: 'Add Existing Offenders',
        })}
        width="1000"
        zIndex={1001}
      >
        {addExistingOffender ? (
          <AddExistingOffender
            offenderIds={data?.incident?.offenders.map(({ id }) => id)}
            onClose={toggleAddExistingOffender}
            update={(value) => onAddExistingOffender(value.id)}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </>
  );
};

export default Offenders;
