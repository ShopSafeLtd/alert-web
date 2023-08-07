import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import type { FormInstance } from 'antd';
import { Col, Divider, Drawer, Row, Typography, Form } from 'antd';
import CounterButton from 'components/form-components/count-buttons/CounterButton.view';
import CountButton from 'components/form-components/count-buttons/CountButton.view';
import LinkVehicle from 'components/form-components/linkOptions/LinkVehicle';
import EditVehicle from 'components/form-components/Vehicle/EditVehicleSimple/EditVehicleSimple.container';
import AddVehicle from 'components/form-components/Vehicle/AddVehicleSimple';
import type { FormData } from 'views/incidents/AddIncident/useAddIncident';
import type { StateVehicleData } from './useVehicles';
import useVehicles from './useVehicles';
import useStyles from '../Profiles.styles';
import VehicleProfile from './VehicleProfile.view';

const { Paragraph } = Typography;

interface Props {
  value?: StateVehicleData[];
  onChange?: (value: StateVehicleData[]) => void;
  saving: boolean;
  toggleAddNewOpen: () => void;
  addNewOpen: boolean;
  toggleAddExistingOpen: () => void;
  addExistingOpen: boolean;
  form: FormInstance<FormData>;
}

const Vehicles = ({
  value,
  onChange,
  saving,
  toggleAddNewOpen,
  addNewOpen,
  toggleAddExistingOpen,
  addExistingOpen,
  form,
}: Props) => {
  const {
    vehicles,
    toggleNoVehicles,
    noVehicles,
    onAddBlankVehicles,
    onAddVehicles,
    onRemoveVehicle,
    matchExistingOpen,
    setMatchExistingOpen,
    setUpdateOpen,
    onUpdateVehicle,
    updateOpen,
    onMatchVehicle,
    onImagesUploadedInForm,
  } = useVehicles({
    value,
    onChange,
    form,
  });
  const classes = useStyles();
  const intl = useIntl();
  const images = Form.useWatch('images', form) || [];

  return (
    <>
      {vehicles.length === 0 && (
        <div>
          <Paragraph className={classes.subHeader} style={{ marginTop: 40 }}>
            {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
            <span className={classes.subHeaderRequired}>*</span>
            <FormattedMessage
              defaultMessage="How many vehicles were involved in the incident?"
              id="Vlg3h/"
            />
          </Paragraph>
          <Row gutter={8}>
            <Col>
              <CountButton
                tooltip={intl.formatMessage({
                  defaultMessage: "Don't add any vehicles to this incident",
                  id: '+qwThC',
                })}
                text={intl.formatMessage({
                  defaultMessage: 'None',
                  id: '450Fty',
                })}
                onClick={toggleNoVehicles}
                selected={noVehicles}
              />
            </Col>
            {[1, 2, 3, 4].map((count) => (
              <Col key={count}>
                <CountButton
                  tooltip={intl.formatMessage(
                    {
                      defaultMessage:
                        'Add {count} {count, plural, one {vehicle} other {vehicles}} to the incident',
                      id: 'KylvfF',
                    },
                    {
                      count,
                    }
                  )}
                  text={intl.formatMessage(
                    {
                      defaultMessage:
                        '{count} {count, plural, one {Vehicle} other {Vehicles}}',
                      id: '7g/xvk',
                    },
                    {
                      count,
                    }
                  )}
                  onClick={() => onAddBlankVehicles(count)}
                />
              </Col>
            ))}
            <Col>
              <CounterButton
                onClick={onAddBlankVehicles}
                dataName={intl.formatMessage({
                  id: 'r6wuJ3',
                  defaultMessage: 'Vehicles',
                })}
              />
            </Col>
          </Row>
        </div>
      )}
      {vehicles.length > 0 ? (
        <>
          <Divider>
            {intl.formatMessage({
              id: 'r6wuJ3',
              defaultMessage: 'Vehicles',
            })}
          </Divider>
          <Row gutter={[16, 16]}>
            {vehicles.map((vehicle) => (
              <Col key={vehicle.id}>
                <VehicleProfile
                  saving={saving}
                  vehicle={vehicle}
                  onRemoveVehicle={onRemoveVehicle}
                  setUpdateOpen={setUpdateOpen}
                  setMatchExistingOpen={setMatchExistingOpen}
                />
              </Col>
            ))}
          </Row>
        </>
      ) : null}

      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add Existing Vehicles',
          id: 'goP1s6',
        })}
        open={addExistingOpen}
        width="800"
        onClose={toggleAddExistingOpen}
        zIndex={1001}
      >
        {addExistingOpen ? (
          <LinkVehicle
            update={(data) => onAddVehicles([data], true)}
            vehicleIds={vehicles.map(({ id }) => id)}
            onClose={toggleAddExistingOpen}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Search & Match Vehicle',
          id: 'IiCPGz',
        })}
        open={!!matchExistingOpen}
        width="800"
        onClose={() => setMatchExistingOpen(null)}
        zIndex={1001}
      >
        {matchExistingOpen ? (
          <LinkVehicle
            update={onMatchVehicle}
            vehicleIds={vehicles.map(({ id }) => id)}
            onClose={() => setMatchExistingOpen(null)}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Update Vehicle',
          id: 'BBPVid',
        })}
        open={!!updateOpen}
        width="800"
        onClose={() => setUpdateOpen(null)}
        zIndex={1001}
      >
        {updateOpen ? (
          <EditVehicle
            update={(data) => {
              onUpdateVehicle(data);
            }}
            onClose={() => setUpdateOpen(null)}
            editData={updateOpen}
            images={images}
            onImagesUploaded={onImagesUploadedInForm}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add New Vehicle',
          id: 'cHbTr7',
        })}
        open={addNewOpen}
        width="700"
        zIndex={999}
        onClose={toggleAddNewOpen}
      >
        {addNewOpen ? (
          <AddVehicle
            update={(data) => {
              onAddVehicles([data], false);
              toggleAddNewOpen();
            }}
            onClose={toggleAddNewOpen}
            images={images}
            onImagesUploaded={onImagesUploadedInForm}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </>
  );
};

export default Vehicles;
