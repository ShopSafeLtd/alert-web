import React from 'react';
// import { faUser } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Tooltip, Typography } from 'antd';
import { faCheckCircle } from '@fortawesome/pro-solid-svg-icons';
import WatermarkImage from 'components/images/WatermarkImage.view';

const { Paragraph } = Typography;

interface Props {
  offender: {
    id: string;
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
}: Props): JSX.Element => (
  <Tooltip placement="bottom" title={`Add ${offender.name} to incident`}>
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
      {/* {offender.images && offender.images.length > 0 ? (
        <WatermarkImage url={offender.images[0]?.optimised} />
      ) : (
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
        {offender.name}
      </Paragraph>
    </Card>
    {selectedOffenderIds?.find((id) => id === offender.id) && (
      // <div
      //   style={{
      //     position: 'absolute',
      //     width: 20,
      //     height: 20,
      //     top: 0,
      //     right: 10,
      //     borderRadius: 50,
      //     // backgroundColor: 'rgb(222, 68, 54)',
      //     alignItems: 'center',
      //     display: 'flex',
      //     justifyContent: 'center',
      //     // borderWidth: 3,
      //     // borderColor: 'rgb(222, 68, 54)',
      //   }}
      // >
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
      // </div>
    )}
  </Tooltip>
);

export default OffenderTile;
