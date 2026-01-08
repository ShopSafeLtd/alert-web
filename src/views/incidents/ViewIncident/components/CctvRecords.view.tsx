import type { CctvRecordData } from '#/types/DataType';
import type { ViewIncidentQuery } from '#/views/incidents/ViewIncident/__generated__/view-incident.generated';
import type { MutationUpdaterFn } from '@apollo/client';
import type { UpdateIncidentCctvRecordMutation } from 'graphql/incidents/mutations/update/__generated__/update-incident-cctv-record.generated';

import AddCctvRecord from '#/components/form-components/incident/AddCctvRecord';
import EditCctvRecord from '#/components/form-components/incident/EditCctvRecord';
import {
  ProfileUpdatedModel,
  ProfileUpdatedType,
} from '#/types/enums/profile-update-type';
import errorNotification from '#/types/mutation_notifications/error_notification';
import successNotification from '#/types/mutation_notifications/success_notification';
import { ViewIncidentDocument } from '#/views/incidents/ViewIncident/__generated__/view-incident.generated';
import {
  faPenToSquare,
  faPlus,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  Col,
  Drawer,
  Empty,
  Popconfirm,
  Row,
  Table,
  Tooltip,
  Typography,
} from 'antd';
import dayjs from 'dayjs';
import { useUpdateIncidentCctvRecordMutation } from 'graphql/incidents/mutations/update/__generated__/update-incident-cctv-record.generated';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

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

const CctvRecords = ({
  data,
  deleteRights,
  editRights,
  incidentId,
  loading,
  saving,
  setSaving,
}: Props) => {
  const intl = useIntl();
  const [editCctvData, setEditCctvData] = useState<CctvRecordData | null>(null);
  const [addCctv, setAddCctv] = useState(false);

  const [updateIncidentCctvRecord] = useUpdateIncidentCctvRecordMutation({
    onError: () => {
      errorNotification();
    },
  });

  const toggleAddCctv = () => {
    setAddCctv(!addCctv);
  };

  const updateCctvList: MutationUpdaterFn<UpdateIncidentCctvRecordMutation> = (
    store,
    { data: res }
  ) => {
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
          cctvRecords: res.updateIncident.cctvRecords,
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

  const onAddCctv = (value: Omit<CctvRecordData, 'id'>) => {
    setSaving(true);
    if (value) {
      void updateIncidentCctvRecord({
        onCompleted: () => {
          successNotification(
            ProfileUpdatedModel.Cctv_Record,
            ProfileUpdatedModel.Incident,
            ProfileUpdatedType.added
          );
        },
        update: updateCctvList,
        variables: {
          cctvRecords: {
            create: [
              {
                cameraNumber: value.cameraNumber,
                description: value.description,
                endTime: dayjs(value.endTime).toDate(),
                showFace: value.showFace,
                showIncident: value.showIncident,
                startTime: dayjs(value.startTime).toDate(),
              },
            ],
          },
          id: incidentId,
        },
      }).finally(() => {
        toggleAddCctv();
        setSaving(false);
      });
    }
  };

  const onEditCctv = (value: CctvRecordData) => {
    setSaving(true);
    if (value) {
      void updateIncidentCctvRecord({
        onCompleted: () => {
          successNotification(
            ProfileUpdatedModel.Cctv_Record,
            ProfileUpdatedModel.Incident,
            ProfileUpdatedType.updated
          );
        },
        update: updateCctvList,
        variables: {
          cctvRecords: {
            update: [
              {
                data: {
                  cameraNumber: value.cameraNumber,
                  description: value.description,
                  endTime: dayjs(value.endTime).toDate(),
                  showFace: value.showFace,
                  showIncident: value.showIncident,
                  startTime: dayjs(value.startTime).toDate(),
                },
                where: {
                  id: value.id,
                },
              },
            ],
          },
          id: incidentId,
        },
      }).finally(() => {
        setEditCctvData(null);
        setSaving(false);
      });
    }
  };

  const onDeleteCctv = (cctvId: string) => {
    setSaving(true);
    if (cctvId) {
      void updateIncidentCctvRecord({
        onCompleted: () => {
          successNotification(
            ProfileUpdatedModel.Cctv_Record,
            ProfileUpdatedModel.Incident,
            ProfileUpdatedType.deleted
          );
          setSaving(false);
        },
        onError: () => {
          setSaving(false);
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
                cctvRecords: existingData.incident.cctvRecords.filter(
                  ({ id }) => id !== cctvId
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
          cctvRecords: {
            deleteMany: [
              {
                id: {
                  equals: cctvId,
                },
              },
            ],
          },
          id: incidentId,
        },
      });
    }
  };

  return (
    <>
      <Card loading={loading}>
        <Row align="middle" gutter={8} style={{ marginBottom: 10 }}>
          <Col flex={1}>
            <Title level={4}>
              <FormattedMessage defaultMessage="CCTV Evidence" />
            </Title>
          </Col>
          {editRights && (
            <Col>
              <Button
                className="no-print"
                icon={
                  <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
                }
                onClick={toggleAddCctv}
                size="small"
              >
                {intl.formatMessage({
                  defaultMessage: 'Add CCTV Record',
                })}
              </Button>
            </Col>
          )}
        </Row>
        {data?.incident?.cctvRecords.length && !loading ? (
          <Table
            columns={[
              {
                dataIndex: 'cameraNumber',
                key: 'cameraNumber',
                title: <FormattedMessage defaultMessage="Camera Number" />,
              },
              {
                dataIndex: 'startTime',
                key: 'startTime',
                render: (value: Date) =>
                  dayjs(value).format('HH:mm:ss DD/MM/YYYY'),
                title: <FormattedMessage defaultMessage="Start Time" />,
              },
              {
                dataIndex: 'endTime',
                key: 'endTime',
                render: (value: Date) =>
                  dayjs(value).format('HH:mm:ss DD/MM/YYYY'),
                title: <FormattedMessage defaultMessage="End Time" />,
              },
              {
                dataIndex: 'showFace',
                key: 'showFace',
                render: (value: boolean) =>
                  value ? (
                    <FormattedMessage defaultMessage="Yes" />
                  ) : (
                    <FormattedMessage defaultMessage="No" />
                  ),
                title: <FormattedMessage defaultMessage="Shows Face" />,
              },
              {
                dataIndex: 'showIncident',
                key: 'showIncident',
                render: (value: boolean) =>
                  value ? (
                    <FormattedMessage defaultMessage="Yes" />
                  ) : (
                    <FormattedMessage defaultMessage="No" />
                  ),
                title: <FormattedMessage defaultMessage="Shows Incident" />,
              },
              {
                dataIndex: 'description',
                ellipsis: true,
                key: 'description',
                render: (value: string) => (
                  <Tooltip title={value}>{value}</Tooltip>
                ),
                title: <FormattedMessage defaultMessage="Description" />,
              },
              {
                dataIndex: 'Options',
                key: 'Options',
                render: (_, record) => (
                  <Row className="no-print" gutter={8}>
                    {editRights && (
                      <Col>
                        <Tooltip
                          title={intl.formatMessage({
                            defaultMessage: 'Edit CCTV Record',
                          })}
                        >
                          <Button
                            disabled={saving}
                            icon={<FontAwesomeIcon icon={faPenToSquare} />}
                            onClick={() => {
                              setEditCctvData(record.item);
                            }}
                            size="small"
                          />
                        </Tooltip>
                      </Col>
                    )}
                    {deleteRights && (
                      <Col>
                        <Tooltip
                          title={intl.formatMessage({
                            defaultMessage: 'Remove CCTV Record',
                          })}
                        >
                          <Popconfirm
                            cancelText={intl.formatMessage({
                              defaultMessage: 'No',
                            })}
                            okText={intl.formatMessage({
                              defaultMessage: 'Yes',
                            })}
                            onConfirm={() => onDeleteCctv(record.key)}
                            overlayInnerStyle={{
                              padding: 10,
                            }}
                            placement="topLeft"
                            title={intl.formatMessage({
                              defaultMessage: 'Remove the CCTV record?',
                            })}
                            trigger="hover"
                          >
                            <Button
                              disabled={saving}
                              icon={<FontAwesomeIcon icon={faTrash} />}
                              size="small"
                            />
                          </Popconfirm>
                        </Tooltip>
                      </Col>
                    )}
                  </Row>
                ),
                title: '',
                width: 100,
              },
            ]}
            dataSource={data.incident.cctvRecords.map((item) => ({
              cameraNumber: item.cameraNumber,
              description: item.description,
              endTime: item.endTime,
              item: {
                cameraNumber: item.cameraNumber,
                description: item.description,
                endTime: item.endTime,
                id: item.id,
                showFace: item.showFace,
                showIncident: item.showIncident,
                startTime: item.startTime,
              },
              key: item.id,
              showFace: item.showFace,
              showIncident: item.showIncident,
              startTime: item.startTime,
            }))}
            loading={loading}
            pagination={{
              hideOnSinglePage: true,
              pageSize: 100,
            }}
            size="small"
          />
        ) : (
          <Empty
            description={intl.formatMessage({
              defaultMessage: 'No CCTV records for this incident',
            })}
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        )}
      </Card>
      <Drawer
        onClose={toggleAddCctv}
        open={addCctv}
        title={intl.formatMessage({
          defaultMessage: 'Add CCTV Record',
        })}
        width="500"
        zIndex={999}
      >
        {addCctv ? (
          <AddCctvRecord
            onClose={toggleAddCctv}
            saving={saving}
            update={onAddCctv}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={() => setEditCctvData(null)}
        open={!!editCctvData}
        title={intl.formatMessage({
          defaultMessage: 'Edit CCTV Record',
        })}
        width="500"
        zIndex={999}
      >
        {editCctvData ? (
          <EditCctvRecord
            data={editCctvData}
            onClose={() => setEditCctvData(null)}
            saving={saving}
            update={onEditCctv}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </>
  );
};

export default CctvRecords;
