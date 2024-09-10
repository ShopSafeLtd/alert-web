import { faCheckCircle } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Tooltip, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl'; // Import the useIntl hook
import WatermarkImage from 'components/images/WatermarkImage.view';

import useStyles from './OffenderTile.styles';

const { Paragraph } = Typography;

export interface OffenderCard {
  id: string;
  images: {
    optimised?: null | string | undefined;
    optimisedPersisted?: null | string | undefined;
  }[];
  name?: null | string | undefined;
  reference?: null | number;
}

interface Props {
  offender: {
    id: string;
    images: {
      optimised?: null | string | undefined;
      optimisedPersisted?: null | string | undefined;
    }[];
    name?: null | string | undefined;
    reference?: null | number;
  };
  onClick: () => void;
  selectedOffenderIds?: string[];
}

const OffenderTile = ({
  offender,
  onClick,
  selectedOffenderIds,
}: Props): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl(); // Use the useIntl hook to access the intl object

  return (
    <Tooltip
      placement="bottom"
      title={intl.formatMessage(
        {
          defaultMessage: 'Add {name} to incident',
        },
        { name: offender.name }
      )}
    >
      <Card
        bodyStyle={{
          alignItems: 'center',
          borderRadius: '0.625rem',
          cursor: 'pointer',
          display: 'flex',
          height: 120,
          justifyContent: 'center',
          overflow: 'hidden',
          padding: 0,
          position: 'relative',
          width: '100%',
        }}
        onClick={onClick}
      >
        <WatermarkImage
          url={
            offender.images[0]?.optimised ||
            offender.images[0]?.optimisedPersisted
          }
        />
        <Paragraph
          className={classes.offenderParagraph}
          style={{
            top: 0,
          }}
        >
          {intl.formatMessage(
            {
              defaultMessage: 'Alert ID: {reference}',
            },
            { reference: offender.reference }
          )}
        </Paragraph>
        <Paragraph
          className={classes.offenderParagraph}
          style={{
            bottom: -15,
          }}
        >
          {offender.name}
        </Paragraph>
      </Card>
      {selectedOffenderIds?.find((id) => id === offender.id) && (
        <FontAwesomeIcon
          icon={faCheckCircle}
          size="lg"
          style={{
            color: 'rgb(222, 68, 54)',
            position: 'absolute',
            right: 10,
            top: 0,
          }}
        />
      )}
    </Tooltip>
  );
};

export default OffenderTile;
