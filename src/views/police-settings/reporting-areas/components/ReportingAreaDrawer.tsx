import type { FormInstance } from 'antd';

import { faTimes } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Typography } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import type { AreaGeometry, DrawerMode, DrawingMode } from '../types';

import ReportingAreaForm from './ReportingAreaForm';

const { Text } = Typography;

interface FormValues {
  color: string;
  description?: string;
  name: string;
}

interface ReportingAreaDrawerProps {
  drawingMode: DrawingMode;
  drawnGeometry: AreaGeometry | null;
  form: FormInstance;
  mode: DrawerMode;
  onClearDrawing: () => void;
  onClose: () => void;
  onDrawCircle: () => void;
  onDrawPolygon: () => void;
  onSubmit: (values: FormValues) => void;
  open: boolean;
  submitting: boolean;
}

export const ReportingAreaDrawer: React.FC<ReportingAreaDrawerProps> = ({
  drawingMode,
  drawnGeometry,
  form,
  mode,
  onClearDrawing,
  onClose,
  onDrawCircle,
  onDrawPolygon,
  onSubmit,
  open,
  submitting,
}) => {
  if (!mode || !open) return null;

  return (
    <div
      style={{
        backgroundColor: '#fafafa',
        borderRight: '1px solid #f0f0f0',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: 500,
      }}
    >
      <div
        style={{
          alignItems: 'center',
          borderBottom: '1px solid #f0f0f0',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '16px',
        }}
      >
        <Text strong>
          {mode === 'create' ? (
            <FormattedMessage defaultMessage="Create Reporting Area" />
          ) : (
            <FormattedMessage defaultMessage="Edit Reporting Area" />
          )}
        </Text>
        <Button
          disabled={submitting}
          icon={<FontAwesomeIcon icon={faTimes} />}
          onClick={onClose}
          type="text"
        />
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '16px' }}>
        <ReportingAreaForm
          drawingMode={drawingMode}
          drawnGeometry={drawnGeometry}
          form={form}
          mode={mode}
          onCancel={onClose}
          onClearDrawing={onClearDrawing}
          onDrawCircle={onDrawCircle}
          onDrawPolygon={onDrawPolygon}
          onSubmit={onSubmit}
          submitting={submitting}
        />
      </div>
    </div>
  );
};

export default ReportingAreaDrawer;
