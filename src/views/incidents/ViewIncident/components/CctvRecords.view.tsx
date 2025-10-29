import type { CctvRecordData } from '#/types/DataType';
import type { ViewIncidentQuery } from '#/views/incidents/ViewIncident/__generated__/view-incident.generated';

import EditCctvRecord from '#/components/form-components/incident/EditCctvRecord';
import { useUpdateIncidentCctvRecordMutation } from '#/graphql/incidents/mutations/update/__generated__/update-incident-cctv-record.generated';
import {
  ProfileUpdatedModel,
  ProfileUpdatedType,
} from '#/types/enums/profile-update-type';
import errorNotification from '#/types/mutation_notifications/error_notification';
import successNotification from '#/types/mutation_notifications/success_notification';
import { ViewIncidentDocument } from '#/views/incidents/ViewIncident/__generated__/view-incident.generated';
import {
  faPenToSquare,
  // faPlus,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  Col,
  Drawer,
  Popconfirm,
  Row,
  Table,
  Tooltip,
  Typography,
} from 'antd';
import dayjs from 'dayjs';
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
  editRights,
  incidentId,
  loading,
  saving,
  setSaving,
}: Props) => {
  const intl = useIntl();
  const [editCctvRecord, setEditCctvRecord] = useState<CctvRecordData | null>(
    null
  );
  // const [addCctvRecord, setAddCctvRecord] = useState(false);

  const [updateIncident] = useUpdateIncidentCctvRecordMutation({
    onError: () => {
      errorNotification();
    },
  });

  // const toggleAddCctvRecord = () => {
  //   setAddCctvRecord(!addCctvRecord);
  // };
  // const updateCctvRecordList: MutationUpdaterFn<
  //   UpdateIncidentCctvRecordMutation
  // > = (store, { data: res }) => {
  //   if (res?.updateIncident === null || res?.updateIncident === undefined)
  //     return;

  //   const existingData = store.readQuery<ViewIncidentQuery>({
  //     query: ViewIncidentDocument,
  //     variables: {
  //       where: {
  //         id: incidentId,
  //       },
  //     },
  //   });

  //   if (!existingData?.incident) return;
  //   store.writeQuery<ViewIncidentQuery>({
  //     data: {
  //       __typename: 'Query',
  //       incident: {
  //         ...existingData.incident,
  //         incidentItems: res.updateIncident.incidentItems,
  //       },
  //     },
  //     query: ViewIncidentDocument,
  //     variables: {
  //       where: {
  //         id: incidentId,
  //       },
  //     },
  //   });
  // };

  // const onAddCctvRecord = (value: CctvRecordData) => {
  //   setSaving(true);
  //   if (value) {
  //     void updateIncident({
  //       onCompleted: () => {
  //         successNotification(
  //           ProfileUpdatedModel.Cctv_Record,
  //           ProfileUpdatedModel.Incident,
  //           ProfileUpdatedType.added
  //         );
  //       },
  //       // update: updateCctvRecordList,
  //       variables: {
  //         cctvRecords: {
  //           create: [
  //             {
  //               // aheadBehind: value.aheadBehind,
  //               cameraNumber: value.cameraNumber,
  //               // correctTime: value.correctTime,
  //               description: value.description,
  //               endTime: value.endTime,
  //               // incorrectBy: value.incorrectBy,
  //               showFace: !!value.showFace,
  //               showIncident: !!value.showIncident,
  //               startTime: value.startTime,
  //             },
  //           ],
  //         },
  //         id: incidentId,
  //       },
  //     }).finally(() => {
  //       toggleAddCctvRecord();
  //       setSaving(false);
  //     });
  //   }
  // };

  const onEditCctvRecord = (value: CctvRecordData) => {
    setSaving(true);

    if (value)
      void updateIncident({
        onCompleted: () => {
          successNotification(
            ProfileUpdatedModel.Cctv_Record,
            ProfileUpdatedModel.Incident,
            ProfileUpdatedType.updated
          );
        },
        variables: {
          cctvRecords: {
            update: [
              {
                data: {
                  description: value.description || '',
                  endTime: value.endTime,
                  showFace: value.showFace,
                  showIncident: value.showIncident,
                  startTime: value.startTime,
                },
                where: {
                  id: value.id,
                },
              },
            ],
          },
          id: incidentId,
        },
        // update: updateCctvRecordList,
      }).finally(() => {
        setEditCctvRecord(null);
        setSaving(false);
      });
  };
  const onDeleteCctvRecord = (value: string) => {
    setSaving(true);
    if (value)
      void updateIncident({
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
          cctvRecords: {
            deleteMany: [
              {
                id: {
                  equals: value,
                },
              },
            ],
          },
          id: incidentId,
        },
      });
  };
  // eslint-disable-next-line no-confusing-arrow
  return data?.incident && data.incident.cctvRecords.length > 0 ? (
    <>
      <Card loading={loading}>
        <Row align="middle" gutter={8} style={{ marginBottom: 10 }}>
          <Col flex={1}>
            <Title level={4}>
              <FormattedMessage defaultMessage="CCTV Evidence" />
            </Title>
          </Col>
          {/* {editRights && (
            <Col>
              <Button
                className="no-print"
                icon={
                  <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
                }
                onClick={toggleAddCctvRecord}
                size="small"
              >
                {intl.formatMessage({
                  defaultMessage: 'Add CCTV Evidence',
                })}
              </Button>
            </Col>
            )} */}
        </Row>

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
              // eslint-disable-next-line
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
              // eslint-disable-next-line
              render: (value: boolean) =>
                value ? (
                  <FormattedMessage defaultMessage="Yes" />
                ) : (
                  <FormattedMessage defaultMessage="No" />
                ),
              title: <FormattedMessage defaultMessage="Shows Incident" />,
            },
            // {
            //   dataIndex: 'description',
            //   ellipsis: true,
            //   key: 'description',
            //   render: (value: string) => (
            //     <Tooltip title={value}>{value}</Tooltip>
            //   ),
            //   title: <FormattedMessage defaultMessage="Description" />,
            // },
            {
              dataIndex: 'Options',
              key: 'Options',
              render: (_, record) => (
                <Row className="no-print" gutter={8}>
                  {editRights && (
                    <Col>
                      <Tooltip
                        title={intl.formatMessage({
                          defaultMessage: 'Edit CCTV Evidence',
                        })}
                      >
                        <Button
                          disabled={saving}
                          icon={<FontAwesomeIcon icon={faPenToSquare} />}
                          onClick={() => {
                            setEditCctvRecord(record.item || null);
                          }}
                          size="small"
                        />
                      </Tooltip>
                    </Col>
                  )}
                  {editRights && (
                    <Col>
                      <Tooltip
                        title={intl.formatMessage({
                          defaultMessage: 'Remove CCTV Evidence',
                        })}
                      >
                        <Popconfirm
                          cancelText={intl.formatMessage({
                            defaultMessage: 'No',
                          })}
                          okText={intl.formatMessage({
                            defaultMessage: 'Yes',
                          })}
                          onConfirm={() => onDeleteCctvRecord(record.key)}
                          overlayInnerStyle={{
                            padding: 10,
                          }}
                          placement="topLeft"
                          title={intl.formatMessage({
                            defaultMessage: 'Remove the Evidence?',
                          })}
                          trigger="hover"
                        >
                          <Button
                            disabled={saving}
                            // }
                            icon={<FontAwesomeIcon icon={faTrash} />}
                            // onClick={() =>
                            //   onDeleteGoods(record.key)
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
          dataSource={data?.incident.cctvRecords.map((item) => ({
            cameraNumber: item.cameraNumber,
            description: item.description,
            endTime: item.endTime,
            item,
            key: item.id,
            showFace: item.showFace,
            showIncident: item.showIncident,
            startTime: item.startTime,
          }))}
          loading={loading}
        />
      </Card>
      {/* <Drawer
        onClose={toggleAddCctvRecord}
        open={addCctvRecord}
        title={intl.formatMessage({
          defaultMessage: 'Add New CCTV Evidence',
        })}
        width="600"
        zIndex={999}
      >
        {addCctvRecord ? (
          <EditCctvRecord
            onClose={() => setEditCctvRecord(null)}
            saving={saving}
            update={onEditCctvRecord}
          />
        ) : (
          <div />
        )}
      </Drawer> */}
      <Drawer
        onClose={() => setEditCctvRecord(null)}
        open={!!editCctvRecord}
        title={intl.formatMessage({
          defaultMessage: 'Edit CCTV Evidence',
        })}
        width="400"
        zIndex={999}
      >
        {editCctvRecord ? (
          <EditCctvRecord
            data={editCctvRecord}
            onClose={() => setEditCctvRecord(null)}
            saving={saving}
            update={onEditCctvRecord}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </>
  ) : (
    <div />
  );
};
export default CctvRecords;
