import { faUser } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Tooltip, Typography } from 'antd';
import WatermarkImage from 'components/images/WatermarkImage.view';
import React from 'react';
import { useIntl } from 'react-intl';

const { Paragraph } = Typography;

interface Props {
  incident: {
    images: { optimised?: null | string | undefined }[];
    subject?: null | string | undefined;
  };
  onClick: () => void;
}

const IncidentTile = ({ incident, onClick }: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <Tooltip
      placement="bottom"
      title={intl.formatMessage(
        { defaultMessage: 'Add {subject} to offender' },
        {
          subject: incident.subject,
        }
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
        <WatermarkImage url={incident.images[0]?.optimised} />
        {incident.images.length === 0 && (
          <FontAwesomeIcon
            icon={faUser}
            size="3x"
            style={{ color: 'rgb(114, 132, 154)' }}
          />
        )}
        <Paragraph
          style={{
            background: 'rgba(0,0,0,.5)',
            bottom: 0,
            color: '#FFF',
            left: 0,
            margin: 0,
            overflow: 'hidden',
            padding: '3px 10px 3px',
            position: 'absolute',
            right: 0,
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {incident.subject}
        </Paragraph>
      </Card>
    </Tooltip>
  );
};

export default IncidentTile;
