import React from 'react';
import { Card, Tooltip, Typography } from 'antd';
import WatermarkImage from 'components/images/WatermarkImage.view';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';

const { Paragraph } = Typography;

const useStyles = createUseStyles({
  image: {
    height: 140,
    width: 140,
  },
  details: {
    padding: 10,
    overflow: 'hidden',
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
  const unknown = intl.formatMessage({
    defaultMessage: 'Unknown',
    id: '5jeq8P',
  });

  return (
    <Tooltip
      placement="bottom"
      title={intl.formatMessage(
        {
          defaultMessage: 'Add Alert ID: {ref} to incident',
          id: 'bwgI7n',
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
          // alignItems: 'center',
          // justifyContent: 'center',
          cursor: 'pointer',
          height: 140,
        }}
      >
        {vehicle.images.length > 0 && (
          <div className={classes.image}>
            <WatermarkImage url={vehicle.images[0]?.optimised} />
          </div>
        )}
        <div className={classes.details}>
          <Paragraph ellipsis className={classes.text}>
            {intl.formatMessage(
              { defaultMessage: 'Alert ID: {ref}', id: 'umL9sI' },
              { ref: vehicle.reference }
            )}
          </Paragraph>
          <Paragraph ellipsis className={classes.text}>
            {intl.formatMessage(
              { defaultMessage: 'Registration: {reg}', id: 'OkCUcT' },
              {
                reg: vehicle.registration || unknown,
              }
            )}
          </Paragraph>
          <Paragraph ellipsis className={classes.text}>
            {intl.formatMessage(
              { defaultMessage: 'Make: {make}', id: 'cPuur1' },
              {
                make: vehicle.make || unknown,
              }
            )}
          </Paragraph>
          <Paragraph ellipsis className={classes.text}>
            {intl.formatMessage(
              { defaultMessage: 'Model: {model}', id: '6gT5ZW' },
              {
                model: vehicle.model || unknown,
              }
            )}
          </Paragraph>
          <Paragraph ellipsis className={classes.text}>
            {intl.formatMessage(
              { defaultMessage: 'Colour: {colour}', id: 'pukOve' },
              {
                colour: vehicle.colour || unknown,
              }
            )}
          </Paragraph>
        </div>
      </Card>
    </Tooltip>
  );
};

export default VehicleTile;
