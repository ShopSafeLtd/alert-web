import { Card, Tooltip, Typography } from 'antd';
import WatermarkImage from 'components/images/WatermarkImage.view';
import React from 'react';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';

const { Paragraph } = Typography;

const useStyles = createUseStyles({
  details: {
    overflow: 'hidden',
    padding: 10,
  },
  image: {
    height: 140,
    width: 140,
  },
  text: {
    marginBottom: '5px !important',
  },
});

interface Props {
  onClick: () => void;
  vehicle: {
    colour?: null | string;
    id: string;
    images: { optimised?: null | string | undefined }[];
    make?: null | string;
    model?: null | string;
    reference?: null | number | undefined;
    registration?: null | string;
  };
}

const VehicleTile = ({ onClick, vehicle }: Props): JSX.Element => {
  const intl = useIntl();
  const classes = useStyles();
  const unknown = intl.formatMessage({
    defaultMessage: 'Unknown',
  });

  return (
    <Tooltip
      placement="bottom"
      title={intl.formatMessage(
        {
          defaultMessage: 'Add Alert ID: {ref} to incident',
        },
        { ref: vehicle.reference }
      )}
    >
      <Card
        bodyStyle={{
          borderRadius: '0.625rem',
          // justifyContent: 'center',
          cursor: 'pointer',
          display: 'flex',
          height: 140,
          overflow: 'hidden',
          // alignItems: 'center',
          padding: 0,
          position: 'relative',
        }}
        onClick={onClick}
      >
        {vehicle.images.length > 0 && (
          <div className={classes.image}>
            <WatermarkImage url={vehicle.images[0]?.optimised} />
          </div>
        )}
        <div className={classes.details}>
          <Paragraph className={classes.text} ellipsis>
            {intl.formatMessage(
              { defaultMessage: 'Alert ID: {ref}' },
              { ref: vehicle.reference }
            )}
          </Paragraph>
          <Paragraph className={classes.text} ellipsis>
            {intl.formatMessage(
              { defaultMessage: 'Registration: {reg}' },
              {
                reg: vehicle.registration || unknown,
              }
            )}
          </Paragraph>
          <Paragraph className={classes.text} ellipsis>
            {intl.formatMessage(
              { defaultMessage: 'Make: {make}' },
              {
                make: vehicle.make || unknown,
              }
            )}
          </Paragraph>
          <Paragraph className={classes.text} ellipsis>
            {intl.formatMessage(
              { defaultMessage: 'Model: {model}' },
              {
                model: vehicle.model || unknown,
              }
            )}
          </Paragraph>
          <Paragraph className={classes.text} ellipsis>
            {intl.formatMessage(
              { defaultMessage: 'Colour: {colour}' },
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
