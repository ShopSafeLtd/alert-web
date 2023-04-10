import React from 'react';
import { Card, Tooltip, Typography } from 'antd';
import WatermarkImage from 'components/images/WatermarkImage.view';

const { Paragraph } = Typography;

interface Props {
  vehicle: {
    id: string;
    reference?: number | null | undefined;
    images: { optimised?: string | null | undefined }[];
  };
  onClick: () => void;
}

const VehicleTile = ({ vehicle, onClick }: Props): JSX.Element => (
  <Tooltip placement="bottom" title={`Add ${vehicle.reference} to incident`}>
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
      <WatermarkImage url={vehicle.images[0]?.optimised} />
      {/* {vehicle.images.length === 0 && (
        <FontAwesomeIcon
          style={{ color: 'rgb(114, 132, 154)' }}
          icon={faUser}
          size="3x"
        />
      )} */}
      <Paragraph
        style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          background: 'rgba(0,0,0,.5)',
          color: '#FFF',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          margin: 0,
          padding: '3px 10px 3px',
        }}
      >
        Alert ID: {vehicle.reference}
      </Paragraph>
    </Card>
  </Tooltip>
);

export default VehicleTile;
