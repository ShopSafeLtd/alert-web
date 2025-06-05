import type { FormData } from '#/views/incidents/AddIncident/types/formData';
import type { FormInstance } from 'antd';

import { Col, Divider, Drawer, Form, Row, Typography } from 'antd';
import AddVehicle from 'components/form-components/Vehicle/AddVehicleSimple';
import EditVehicle from 'components/form-components/Vehicle/EditVehicleSimple/EditVehicleSimple.container';
import CountButton from 'components/form-components/count-buttons/CountButton.view';
import CounterButton from 'components/form-components/count-buttons/CounterButton.view';
import LinkVehicle from 'components/form-components/linkOptions/LinkVehicle';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import type { StateVehicleData } from './useVehicles';

import useStyles from '../Profiles.styles';
import VehicleProfile from './VehicleProfile.view';
import useVehicles from './useVehicles';

const { Paragraph } = Typography;

interface Props {
  addExistingOpen: boolean;
  addNewOpen: boolean;
  form: FormInstance<FormData>;
  onChange?: (value: StateVehicleData[]) => void;
  saving: boolean;
  toggleAddExistingOpen: () => void;
  toggleAddNewOpen: () => void;
  value?: StateVehicleData[];
}

const Vehicles = ({
  addExistingOpen,
  addNewOpen,
  form,
  onChange,
  saving,
  toggleAddExistingOpen,
  toggleAddNewOpen,
  value,
}: Props) => {
  const {
    matchExistingOpen,
    noVehicles,
    onAddBlankVehicles,
    onAddVehicles,
    onImagesUploadedInForm,
    onMatchVehicle,
    onRemoveVehicle,
    onUpdateVehicle,
    setMatchExistingOpen,
    setUpdateOpen,
    toggleNoVehicles,
    updateOpen,
    vehicles,
  } = useVehicles({
    form,
    onChange,
    value,
  });
  const classes = useStyles();
  const intl = useIntl();
  const images = Form.useWatch('images', form) || [];

  return (
    <>
      {vehicles.length === 0 && (
        <div>
          <Paragraph className={classes.subHeader}>
            {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
            <span className={classes.subHeaderRequired}>*</span>
            <FormattedMessage defaultMessage="How many vehicles were involved in the incident?" />
          </Paragraph>
          <Row gutter={[8, 8]}>
            <Col>
              <CountButton
                onClick={toggleNoVehicles}
                selected={noVehicles}
                text={intl.formatMessage({
                  defaultMessage: 'None',
                })}
                tooltip={intl.formatMessage({
                  defaultMessage: "Don't add any vehicles to this incident",
                })}
              />
            </Col>
            {[1, 2, 3, 4].map((count) => (
              <Col key={count}>
                <CountButton
                  onClick={() => onAddBlankVehicles(count)}
                  text={intl.formatMessage(
                    {
                      defaultMessage:
                        '{count} {count, plural, one {Vehicle} other {Vehicles}}',
                    },
                    {
                      count,
                    }
                  )}
                  tooltip={intl.formatMessage(
                    {
                      defaultMessage:
                        'Add {count} {count, plural, one {vehicle} other {vehicles}} to the incident',
                    },
                    {
                      count,
                    }
                  )}
                />
              </Col>
            ))}
            <Col>
              <CounterButton
                dataName={intl.formatMessage({
                  defaultMessage: 'Vehicles',
                })}
                onClick={onAddBlankVehicles}
              />
            </Col>
          </Row>
        </div>
      )}
      {vehicles.length > 0 ? (
        <>
          <Divider>
            {intl.formatMessage({
              defaultMessage: 'Vehicles',
            })}
          </Divider>
          <Row gutter={[16, 16]}>
            {vehicles.map((vehicle) => (
              <Col key={vehicle.id} lg={8} md={12} span={24} xxl={6}>
                <VehicleProfile
                  onRemoveVehicle={onRemoveVehicle}
                  saving={saving}
                  setMatchExistingOpen={setMatchExistingOpen}
                  setUpdateOpen={setUpdateOpen}
                  vehicle={vehicle}
                />
              </Col>
            ))}
          </Row>
        </>
      ) : null}

      <Drawer
        bodyStyle={{ overflow: 'hidden' }}
        onClose={toggleAddExistingOpen}
        open={addExistingOpen}
        title={intl.formatMessage({
          defaultMessage: 'Add Existing Vehicles',
        })}
        width="800"
        zIndex={1001}
      >
        {addExistingOpen ? (
          <LinkVehicle
            onClose={toggleAddExistingOpen}
            update={(data) => onAddVehicles([data], true)}
            vehicleIds={vehicles.map(({ id }) => id)}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        bodyStyle={{ overflow: 'hidden' }}
        onClose={() => setMatchExistingOpen(null)}
        open={!!matchExistingOpen}
        title={intl.formatMessage({
          defaultMessage: 'Search & Match Vehicle',
        })}
        width="800"
        zIndex={1001}
      >
        {matchExistingOpen ? (
          <LinkVehicle
            onClose={() => setMatchExistingOpen(null)}
            update={onMatchVehicle}
            vehicleIds={vehicles.map(({ id }) => id)}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={() => setUpdateOpen(null)}
        open={!!updateOpen}
        title={intl.formatMessage({
          defaultMessage: 'Update Vehicle',
        })}
        width="800"
        zIndex={1001}
      >
        {updateOpen ? (
          <EditVehicle
            editData={updateOpen}
            images={images}
            onClose={() => setUpdateOpen(null)}
            onImagesUploaded={onImagesUploadedInForm}
            update={(data) => {
              onUpdateVehicle(data);
            }}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={toggleAddNewOpen}
        open={addNewOpen}
        title={intl.formatMessage({
          defaultMessage: 'Add New Vehicle',
        })}
        width="700"
        zIndex={999}
      >
        {addNewOpen ? (
          <AddVehicle
            images={images}
            onClose={toggleAddNewOpen}
            onImagesUploaded={onImagesUploadedInForm}
            update={(data) => {
              onAddVehicles([data], false);
              toggleAddNewOpen();
            }}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </>
  );
};

export default Vehicles;
