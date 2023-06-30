import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Tooltip, Typography } from 'antd';
import { faCheckCircle } from '@fortawesome/pro-solid-svg-icons';
import { useIntl } from 'react-intl'; // Import the useIntl hook
import WatermarkImage from 'components/images/WatermarkImage.view';
import useStyles from './OffenderTile.styles';

const { Paragraph } = Typography;

interface Props {
  offender: {
    id: string;
    reference?: number | null;
    name?: string | null | undefined;
    images: { optimised?: string | null | undefined }[];
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
          id: 'RZ0IMu',
          defaultMessage: `Add {name} to incident`,
        },
        { name: offender.name }
      )}
    >
      <Card
        onClick={onClick}
        bodyStyle={{
          width: '100%',
          height: 120,
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
        <WatermarkImage url={offender.images[0]?.optimised} />
        <Paragraph
          className={classes.offenderParagraph}
          style={{
            top: 0,
          }}
        >
          {intl.formatMessage(
            {
              id: '377fsC',
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
            top: 0,
            right: 10,
          }}
        />
      )}
    </Tooltip>
  );
};

export default OffenderTile;
