import React from 'react';
import { Card, Tooltip, Typography } from 'antd';
import WatermarkImage from 'components/images/WatermarkImage.view';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';

const { Paragraph } = Typography;

const useStyles = createUseStyles({
  image: {
    height: 160,
    minWidth: 140,
  },
  details: {
    padding: 15,
  },
  text: {
    marginBottom: '5px !important',
  },
});

interface Props {
  vehicle: {
    id: string;
    reference?: number | null | undefined;
    images: { optimised?: string | null | undefined }[];
    registration?: string | null;
    model?: string | null;
    make?: string | null;
    colour?: string | null;
  };
  onClick: () => void;
}

const VehicleTile = ({ vehicle, onClick }: Props): JSX.Element => {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Tooltip
      placement="bottom"
      title={intl.formatMessage(
        {
          defaultMessage: 'Add {ref} to incident',
          id: 'XnxQnj',
        },
        { ref: vehicle.reference }
      )}
    >
      <Card
        onClick={onClick}
        bodyStyle={{
          position: 'relative',
          padding: 0,
          borderRadius: '0.625rem',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        {vehicle.images.length > 0 && (
          <div className={classes.image}>
            <WatermarkImage url={vehicle.images[0]?.optimised} />
          </div>
        )}
        <div className={classes.details}>
          <Paragraph className={classes.text}>
            {intl.formatMessage(
              { defaultMessage: 'Alert ID: {ref}', id: 'umL9sI' },
              { ref: vehicle.reference }
            )}
          </Paragraph>
          <Paragraph className={classes.text}>
            {intl.formatMessage(
              { defaultMessage: 'Registration: {reg}', id: 'OkCUcT' },
              {
                reg:
                  vehicle.registration ||
                  intl.formatMessage({
                    defaultMessage: 'Unknown',
                    id: '5jeq8P',
                  }),
              }
            )}
          </Paragraph>
          <Paragraph className={classes.text}>
            {intl.formatMessage(
              { defaultMessage: 'Make: {make}', id: 'cPuur1' },
              {
                make:
                  vehicle.make ||
                  intl.formatMessage({
                    defaultMessage: 'Unknown',
                    id: '5jeq8P',
                  }),
              }
            )}
          </Paragraph>
          <Paragraph className={classes.text}>
            {intl.formatMessage(
              { defaultMessage: 'Model: {model}', id: '6gT5ZW' },
              {
                model:
                  vehicle.model ||
                  intl.formatMessage({
                    defaultMessage: 'Unknown',
                    id: '5jeq8P',
                  }),
              }
            )}
          </Paragraph>
          <Paragraph className={classes.text}>
            {intl.formatMessage(
              { defaultMessage: 'Colour: {colour}', id: 'pukOve' },
              {
                colour:
                  vehicle.colour ||
                  intl.formatMessage({
                    defaultMessage: 'Unknown',
                    id: '5jeq8P',
                  }),
              }
            )}
          </Paragraph>
        </div>
      </Card>
    </Tooltip>
  );
};

export default VehicleTile;
