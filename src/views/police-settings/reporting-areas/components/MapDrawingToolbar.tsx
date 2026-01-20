import {
  faCircle,
  faDrawPolygon,
  faEdit,
  faTimes,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Space, Tooltip } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import type { DrawingMode } from '../types';

interface MapDrawingToolbarProps {
  disabled?: boolean;
  drawingMode: DrawingMode;
  onCancel: () => void;
  onDrawCircle: () => void;
  onDrawPolygon: () => void;
  onEditMode: () => void;
}

export const MapDrawingToolbar: React.FC<MapDrawingToolbarProps> = ({
  disabled = false,
  drawingMode,
  onCancel,
  onDrawCircle,
  onDrawPolygon,
  onEditMode,
}) => (
  <div
    style={{
      backgroundColor: 'white',
      borderRadius: '4px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      padding: '8px',
      position: 'absolute',
      right: 10,
      top: 10,
      zIndex: 1,
    }}
  >
    <Space direction="vertical" size="small">
      <Tooltip
        placement="left"
        title={<FormattedMessage defaultMessage="Draw Circle" />}
      >
        <Button
          disabled={disabled}
          icon={<FontAwesomeIcon icon={faCircle} />}
          onClick={onDrawCircle}
          style={{ width: '100%' }}
          type={drawingMode === 'circle' ? 'primary' : 'default'}
        >
          <FormattedMessage defaultMessage="Circle" />
        </Button>
      </Tooltip>

      <Tooltip
        placement="left"
        title={<FormattedMessage defaultMessage="Draw Polygon" />}
      >
        <Button
          disabled={disabled}
          icon={<FontAwesomeIcon icon={faDrawPolygon} />}
          onClick={onDrawPolygon}
          style={{ width: '100%' }}
          type={drawingMode === 'polygon' ? 'primary' : 'default'}
        >
          <FormattedMessage defaultMessage="Polygon" />
        </Button>
      </Tooltip>

      <Tooltip
        placement="left"
        title={<FormattedMessage defaultMessage="Edit Shape" />}
      >
        <Button
          disabled={disabled}
          icon={<FontAwesomeIcon icon={faEdit} />}
          onClick={onEditMode}
          style={{ width: '100%' }}
          type={drawingMode === 'edit' ? 'primary' : 'default'}
        >
          <FormattedMessage defaultMessage="Edit" />
        </Button>
      </Tooltip>

      {drawingMode && (
        <Tooltip
          placement="left"
          title={<FormattedMessage defaultMessage="Cancel Drawing" />}
        >
          <Button
            danger
            icon={<FontAwesomeIcon icon={faTimes} />}
            onClick={onCancel}
            style={{ width: '100%' }}
          >
            <FormattedMessage defaultMessage="Cancel" />
          </Button>
        </Tooltip>
      )}
    </Space>
  </div>
);

export default MapDrawingToolbar;
