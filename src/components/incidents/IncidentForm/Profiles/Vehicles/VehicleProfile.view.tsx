import { faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Popconfirm, Row, Tooltip, Typography } from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import type { AddVehicleData, StateVehicleData } from './useVehicles';

import WatermarkImage from '../../../../images/WatermarkImage.view';
import useStyles from '../Profiles.styles';

const { Text } = Typography;

interface Props {
  onRemoveVehicle: (id: string) => void;
  saving: boolean;
  setMatchExistingOpen: (value: AddVehicleData | null) => void;
  setUpdateOpen: (value: StateVehicleData | null) => void;
  vehicle: StateVehicleData;
}

const VehicleProfileView = ({
  onRemoveVehicle,
  saving,
  setMatchExistingOpen,
  setUpdateOpen,
  vehicle,
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
                values={{
                  registration:
                    vehicle.registration ||
                    intl.formatMessage({
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
                values={{
                  make:
                    vehicle.make ||
                    intl.formatMessage({
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
                values={{
                  model:
                    vehicle.model ||
                    intl.formatMessage({
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
                values={{
                  colour:
                    vehicle.colour ||
                    intl.formatMessage({
                      defaultMessage: 'Unknown',
                    }),
                }}
              />
            </Text>
          </div>
        </div>
        <div className={classes.grow} />
        <Row gutter={[8, 8]} justify="end">
          <Col>
            <Tooltip
              title={intl.formatMessage({
                defaultMessage:
                  'Change values or add new details this this vehicle.',
              })}
            >
              <Button
                className={vehicle.blank ? classes.redButton : ''}
                disabled={saving}
                onClick={() => setUpdateOpen(vehicle)}
                size="small"
              >
                <FormattedMessage defaultMessage="Add Details" />
              </Button>
            </Tooltip>
          </Col>
          {!vehicle.existing && (
            <Col>
              <Tooltip
                title={intl.formatMessage({
                  defaultMessage:
                    'Search existing vehicles if this vehicle already exists in the system.',
                })}
              >
                <Button
                  disabled={saving}
                  onClick={() => setMatchExistingOpen(vehicle)}
                  size="small"
                >
                  <FormattedMessage defaultMessage="Match Vehicle" />
                </Button>
              </Tooltip>
            </Col>
          )}
          <Col>
            <Popconfirm
              cancelText={intl.formatMessage({
                defaultMessage: 'No',
              })}
              okText={intl.formatMessage({
                defaultMessage: 'Yes',
              })}
              onConfirm={() => {
                onRemoveVehicle(vehicle.id);
              }}
              overlayInnerStyle={{ padding: 10 }}
              placement="topLeft"
              title={intl.formatMessage({
                defaultMessage: 'Remove the vehicle?',
              })}
            >
              <Button
                disabled={saving}
                icon={<FontAwesomeIcon icon={faTrash} size="xs" />}
                style={{ height: 36 }}
              />
            </Popconfirm>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default VehicleProfileView;
