import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Button, Col, Popconfirm, Row, Tooltip, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/pro-light-svg-icons';
import WatermarkImage from '../../../../images/WatermarkImage.view';
import type { StateVehicleData, AddVehicleData } from './useVehicles';
import useStyles from '../Profiles.styles';

const { Text } = Typography;

interface Props {
  vehicle: StateVehicleData;
  onRemoveVehicle: (id: string) => void;
  setMatchExistingOpen: (value: AddVehicleData | null) => void;
  setUpdateOpen: (value: StateVehicleData | null) => void;
  saving: boolean;
}

const VehicleProfileView = ({
  vehicle,
  onRemoveVehicle,
  setMatchExistingOpen,
  setUpdateOpen,
  saving,
}: Props) => {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <div className={classes.profileCard}>
      {vehicle.images && vehicle.images.length > 0 && (
        <div className={classes.profileImage}>
          <WatermarkImage url={vehicle.images[0]?.optimised || ''} />
        </div>
      )}
      <div className={classes.profileContent}>
        <div className={classes.profileDetails}>
          <div className={classes.profileText}>
            <Text>
              <FormattedMessage
                defaultMessage="Registration: {registration}"
                id="ykRerG"
                values={{
                  registration:
                    vehicle.registration ||
                    intl.formatMessage({
                      id: '5jeq8P',
                      defaultMessage: 'Unknown',
                    }),
                }}
              />
            </Text>
          </div>
          <div className={classes.profileText}>
            <Text>
              <FormattedMessage
                defaultMessage="Make: {make}"
                id="cPuur1"
                values={{
                  make:
                    vehicle.make ||
                    intl.formatMessage({
                      id: '5jeq8P',
                      defaultMessage: 'Unknown',
                    }),
                }}
              />
            </Text>
          </div>
          <div className={classes.profileText}>
            <Text>
              <FormattedMessage
                defaultMessage="Model: {model}"
                id="6gT5ZW"
                values={{
                  model:
                    vehicle.model ||
                    intl.formatMessage({
                      id: '5jeq8P',
                      defaultMessage: 'Unknown',
                    }),
                }}
              />
            </Text>
          </div>
          <div className={classes.profileText}>
            <Text>
              <FormattedMessage
                defaultMessage="Colour: {colour}"
                id="pukOve"
                values={{
                  colour:
                    vehicle.colour ||
                    intl.formatMessage({
                      id: '5jeq8P',
                      defaultMessage: 'Unknown',
                    }),
                }}
              />
            </Text>
          </div>
        </div>
        <div className={classes.grow} />
        <Row gutter={8} justify="end">
          <Col>
            <Tooltip
              title={intl.formatMessage({
                id: 'JKhQNG',
                defaultMessage:
                  'Change values or add new details this this vehicle.',
              })}
            >
              <Button
                size="small"
                onClick={() => setUpdateOpen(vehicle)}
                className={vehicle.blank ? classes.redButton : ''}
                disabled={saving}
              >
                <FormattedMessage defaultMessage="Add Details" id="g5aL72" />
              </Button>
            </Tooltip>
          </Col>
          {!vehicle.existing && (
            <Col>
              <Tooltip
                title={intl.formatMessage({
                  id: '/h1vw6',
                  defaultMessage:
                    'Search existing vehicles if this vehicle already exists in the system.',
                })}
              >
                <Button
                  size="small"
                  onClick={() => setMatchExistingOpen(vehicle)}
                  disabled={saving}
                >
                  <FormattedMessage
                    defaultMessage="Match Vehicle"
                    id="/utTvH"
                  />
                </Button>
              </Tooltip>
            </Col>
          )}
          <Col>
            <Popconfirm
              placement="topLeft"
              title={intl.formatMessage({
                id: 'hHs0lD',
                defaultMessage: 'Remove the vehicle?',
              })}
              onConfirm={() => {
                onRemoveVehicle(vehicle.id);
              }}
              okText={intl.formatMessage({
                id: 'a5msuh',
                defaultMessage: 'Yes',
              })}
              cancelText={intl.formatMessage({
                id: 'oUWADl',
                defaultMessage: 'No',
              })}
              overlayInnerStyle={{ padding: 10 }}
            >
              <Button
                disabled={saving}
                style={{ height: 36 }}
                icon={<FontAwesomeIcon size="xs" icon={faTrash} />}
              />
            </Popconfirm>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default VehicleProfileView;
