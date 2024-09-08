import type { VehicleData } from '#/types/DataType';
import type { ViewIncidentQuery } from '#/views/incidents/ViewIncident/__generated__/view-incident.generated';

import AddVehicleSimple from '#/components/form-components/Vehicle/AddVehicleSimple/AddVehicleSimple.container';
import EditVehicleSimple from '#/components/form-components/Vehicle/EditVehicleSimple';
import LinkVehicle from '#/components/form-components/linkOptions/LinkVehicle';
import VehicleTable from '#/components/tables/VehicleTable';
import { useStoreState } from '#/state';
import {
  ProfileUpdatedModel,
  ProfileUpdatedType,
} from '#/types/enums/profile-update-type';
import errorNotification from '#/types/mutation_notifications/error_notification';
import successNotification from '#/types/mutation_notifications/success_notification';
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
} from 'antd';
import { useUpdateIncidentVehiclesMutation } from 'graphql/incidents/mutations/update/__generated__/update-incident-vehicles.generated';
import { useCreateSimpleVehicleMutation } from 'graphql/vehicles/mutations/__generated__/create-simple-vehicle.generated';
import { useUpdateSimpleVehicleMutation } from 'graphql/vehicles/mutations/__generated__/update-simple-vehicle.generated';
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

const Vehicles = ({
  data,
  deleteRights,
  editRights,
  incidentId,
  loading,
  saving,
  setSaving,
}: Props) => {
  const intl = useIntl();
  const schemeId = useStoreState((state) => state.scheme.id);

  const [addVehicle, setAddVehicle] = useState(false);
  const [editVehicleData, setEditVehicleData] = useState<VehicleData | null>(
    null
  );
  const [addExistingVehicle, setAddExistingVehicle] = useState(false);

  const [updateIncidentVehicles] = useUpdateIncidentVehiclesMutation({
    onError: () => {
      errorNotification();
    },
  });
  const [createVehicle] = useCreateSimpleVehicleMutation({
    onError: () => {
      errorNotification();
    },
    update: (store, { data: res }) => {
      if (res?.createVehicle === null || res?.createVehicle === undefined)
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
            vehicles: [...existingData.incident.vehicles, res.createVehicle],
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
  });
  const [updateVehicle] = useUpdateSimpleVehicleMutation({
    onError: () => {
      errorNotification();
    },
    update: (store, { data: res }) => {
      if (res?.updateVehicle === null || res?.updateVehicle === undefined)
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
      const index = existingData?.incident?.vehicles
        .map((item) => item.id)
        .indexOf(res.updateVehicle.id);
      store.writeQuery<ViewIncidentQuery>({
        data: {
          __typename: 'Query',
          incident: {
            ...existingData.incident,
            vehicles: update(existingData.incident.vehicles, {
              [index]: {
                $set: { ...res.updateVehicle },
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
    },
  });

  const toggleAddExistingVehicle = () => {
    setAddExistingVehicle(!addExistingVehicle);
  };
  const toggleAddVehicle = () => {
    setAddVehicle(!addVehicle);
  };
  const onEditVehicle = (value: VehicleData) => {
    setSaving(true);
    if (value) {
      const existingImageIds = editVehicleData?.images?.map(({ id }) => id);
      const deleteIds = existingImageIds?.filter(
        (id) => !value.images?.map((el) => el.id).includes(id)
      );
      void updateVehicle({
        onCompleted: () => {
          successNotification(
            ProfileUpdatedModel.Vehicle,
            ProfileUpdatedModel.Incident,
            ProfileUpdatedType.updated
          );
        },
        variables: {
          data: {
            colour: { set: value.colour || '' },
            images:
              value.images && value.images.length > 0
                ? {
                    connect: value.images
                      ?.filter((image) => !image.new)
                      .map((image) => ({
                        id: image.id,
                      })),
                    delete:
                      deleteIds && deleteIds.length > 0
                        ? deleteIds.map((id) => ({ id }))
                        : undefined,
                    upload: value.images
                      ?.filter((image) => image.new)
                      .map((item) => ({
                        policeImage: item.policeImage,
                        position: item.position,
                        primary: item.primary,
                        rotation: item.rotation || 0,
                        url: {
                          filename: item.fileName || '',
                          mimetype: item.type || '',
                          url: item.url || '',
                        },
                      }))
                      .filter((obj) => obj.url !== undefined),
                  }
                : {
                    delete:
                      deleteIds && deleteIds.length > 0
                        ? deleteIds.map((id) => ({ id }))
                        : undefined,
                  },
            make: { set: value.make || '' },
            model: { set: value.model || '' },
            registration: { set: value.registration || '' },
          },
          where: {
            id: value.id,
          },
        },
      }).finally(() => {
        setEditVehicleData(null);
        setSaving(false);
      });
    }
  };

  const onDeleteVehicle = (value: string) => {
    setSaving(true);
    if (value)
      void updateIncidentVehicles({
        onCompleted: () => {
          successNotification(
            ProfileUpdatedModel.Vehicle,
            ProfileUpdatedModel.Incident,
            ProfileUpdatedType.deleted
          );
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
                vehicles: existingData.incident.vehicles.filter(
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
          vehicles: { disconnect: [{ id: value }] },
        },
      }).finally(() => {
        setSaving(false);
      });
  };
  const onAddVehicle = (value: VehicleData) => {
    setSaving(true);
    if (value) {
      void createVehicle({
        onCompleted: () => {
          successNotification(
            ProfileUpdatedModel.Vehicle,
            ProfileUpdatedModel.Incident,
            ProfileUpdatedType.added
          );
        },
        variables: {
          data: {
            colour: value.colour || '',
            image:
              value.images && value.images.length > 0
                ? {
                    connect: value.images
                      ?.filter((image) => !image.new)
                      .map((image) => ({
                        id: image.id,
                      })),
                    upload: value.images
                      ?.filter((image) => image.new)
                      .map((item) => ({
                        policeImage: item.policeImage,
                        position: item.position,
                        primary: item.primary,
                        rotation: item.rotation || 0,
                        url: {
                          filename: item.fileName || '',
                          mimetype: item.type || '',
                          url: item.url || '',
                        },
                      }))
                      .filter((obj) => obj.url !== undefined),
                  }
                : {},
            incidents: [{ id: incidentId }],
            make: value.make || '',
            model: value.model || '',
            registration: value.registration || '',
            schemes: schemeId,
          },
        },
      }).finally(() => {
        toggleAddVehicle();
        setSaving(false);
      });
    }
  };
  const onAddExistingVehicle = (value: string) => {
    setSaving(true);
    if (value)
      void updateIncidentVehicles({
        onCompleted: () => {
          successNotification(
            ProfileUpdatedModel.Vehicle,
            ProfileUpdatedModel.Incident,
            ProfileUpdatedType.added
          );
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
                vehicles: res.updateIncident.vehicles,
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
          vehicles: {
            connect: [{ id: value }],
          },
        },
      }).finally(() => {
        setAddExistingVehicle(false);
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
                defaultMessage: 'Vehicles',
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
                          defaultMessage: 'Add Existing Vehicles',
                        }),
                        onClick: () => toggleAddExistingVehicle(),
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
                          defaultMessage: 'Create New Vehicle',
                        }),
                        onClick: () => toggleAddVehicle(),
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
                    defaultMessage: 'Add Vehicles',
                  })}
                </Button>
              </Dropdown>
            </Col>
          )}
        </Row>

        {data?.incident?.vehicles.length && !loading ? (
          <VehicleTable
            deleteRights={deleteRights}
            editRights={editRights}
            hasNavigation
            onDeleteVehicle={onDeleteVehicle}
            saving={saving}
            setEditVehicleData={setEditVehicleData}
            vehicles={data?.incident?.vehicles}
          />
        ) : (
          <Empty
            description={intl.formatMessage({
              defaultMessage: 'No vehicles for this incident',
            })}
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        )}
      </Card>
      <Drawer
        bodyStyle={{ overflow: 'hidden' }}
        onClose={toggleAddExistingVehicle}
        open={addExistingVehicle}
        title={intl.formatMessage({
          defaultMessage: 'Add Existing Vehicles',
        })}
        width="800"
        zIndex={1001}
      >
        {addExistingVehicle ? (
          <LinkVehicle
            onClose={toggleAddExistingVehicle}
            update={(value) => onAddExistingVehicle(value.id)}
            vehicleIds={data?.incident?.vehicles.map(({ id }) => id)}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={toggleAddVehicle}
        open={addVehicle}
        title={intl.formatMessage({
          defaultMessage: 'Add New Vehicle',
        })}
        width="700"
        zIndex={999}
      >
        {addVehicle ? (
          <AddVehicleSimple
            images={data?.incident?.images.map((el) => ({ ...el, uid: el.id }))}
            onClose={toggleAddVehicle}
            update={onAddVehicle}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={() => setEditVehicleData(null)}
        open={!!editVehicleData}
        title={intl.formatMessage({
          defaultMessage: 'Edit Vehicle',
        })}
        width="800"
        zIndex={1001}
      >
        {editVehicleData ? (
          <EditVehicleSimple
            editData={editVehicleData}
            images={data?.incident?.images.map((el) => ({ ...el, uid: el.id }))}
            onClose={() => setEditVehicleData(null)}
            update={onEditVehicle}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </>
  );
};

export default Vehicles;
