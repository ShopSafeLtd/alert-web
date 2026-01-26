import type { FormInstance } from 'antd';
import type { ColorResult } from 'react-color';

import { Alert, Button, Form, Input, Space, Typography } from 'antd';
import React from 'react';
import { ChromePicker } from 'react-color';
import { FormattedMessage, useIntl } from 'react-intl';

import type { AreaGeometry, DrawingMode } from '../types';

const { TextArea } = Input;
const { Text } = Typography;

interface FormValues {
  color: string;
  description?: string;
  name: string;
}

interface ReportingAreaFormProps {
  drawingMode: DrawingMode;
  drawnGeometry: AreaGeometry | null;
  form: FormInstance;
  mode: 'create' | 'edit';
  onCancel: () => void;
  onClearDrawing: () => void;
  onDrawCircle: () => void;
  onDrawPolygon: () => void;
  onSubmit: (values: FormValues) => void;
  submitting: boolean;
}

export const ReportingAreaForm: React.FC<ReportingAreaFormProps> = ({
  drawingMode,
  drawnGeometry,
  form,
  mode,
  onCancel,
  onClearDrawing,
  onDrawCircle,
  onDrawPolygon,
  onSubmit,
  submitting,
}) => {
  const intl = useIntl();
  const [colorPickerVisible, setColorPickerVisible] = React.useState(false);
  const color =
    (Form.useWatch('color', form) as string | undefined) || '#1890ff';

  const getGeometryDescription = () => {
    if (!drawnGeometry) {
      return <FormattedMessage defaultMessage="No area drawn" />;
    }

    if (drawnGeometry.type === 'circle') {
      const radiusKm = (drawnGeometry.radiusMeters / 1000).toFixed(2);
      return (
        <FormattedMessage
          defaultMessage="Circle: Center ({lat}, {lng}), Radius: {radius} km"
          values={{
            lat: drawnGeometry.latitude.toFixed(4),
            lng: drawnGeometry.longitude.toFixed(4),
            radius: radiusKm,
          }}
        />
      );
    } else {
      const pointCount = drawnGeometry.coordinates.length;
      return (
        <FormattedMessage
          defaultMessage="Polygon: {count} vertices"
          values={{ count: pointCount }}
        />
      );
    }
  };

  return (
    <Form
      form={form}
      initialValues={{
        color: '#1890ff',
      }}
      layout="vertical"
      onFinish={onSubmit}
    >
      <Form.Item
        label={<FormattedMessage defaultMessage="Name" />}
        name="name"
        rules={[
          {
            message: intl.formatMessage({
              defaultMessage: 'Please enter a name',
            }),
            required: true,
          },
          {
            max: 100,
            message: intl.formatMessage({
              defaultMessage: 'Name must be less than 100 characters',
            }),
          },
        ]}
      >
        <Input
          placeholder={intl.formatMessage({
            defaultMessage: 'Enter area name',
          })}
        />
      </Form.Item>

      <Form.Item
        label={<FormattedMessage defaultMessage="Description" />}
        name="description"
        rules={[
          {
            max: 500,
            message: intl.formatMessage({
              defaultMessage: 'Description must be less than 500 characters',
            }),
          },
        ]}
      >
        <TextArea
          maxLength={500}
          placeholder={intl.formatMessage({
            defaultMessage: 'Enter description (optional)',
          })}
          rows={3}
          showCount
        />
      </Form.Item>

      <Form.Item
        label={<FormattedMessage defaultMessage="Color" />}
        name="color"
        rules={[{ required: true }]}
      >
        <div>
          <div
            onClick={() => setColorPickerVisible(!colorPickerVisible)}
            style={{
              alignItems: 'center',
              backgroundColor: color,
              border: '1px solid #d9d9d9',
              borderRadius: 4,
              cursor: 'pointer',
              display: 'flex',
              height: 40,
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>
              <FormattedMessage defaultMessage="Click to pick color" />
            </Text>
          </div>
          {colorPickerVisible && (
            <div style={{ marginTop: 8 }}>
              <ChromePicker
                color={color}
                onChange={(newColor: ColorResult) =>
                  form.setFieldValue('color', newColor.hex)
                }
              />
            </div>
          )}
        </div>
      </Form.Item>

      <Form.Item label={<FormattedMessage defaultMessage="Area Geometry" />}>
        <Space direction="vertical" style={{ width: '100%' }}>
          {mode === 'create' && !drawnGeometry && (
            <Alert
              description={
                <FormattedMessage defaultMessage="Use the drawing tools to create a circle or polygon on the map." />
              }
              message={
                <FormattedMessage defaultMessage="Draw an area on the map" />
              }
              showIcon
              type="info"
            />
          )}

          {drawnGeometry && (
            <div>
              <Alert
                description={getGeometryDescription()}
                message={<FormattedMessage defaultMessage="Area Drawn" />}
                showIcon
                type="success"
              />
              <Button
                danger
                disabled={submitting}
                onClick={onClearDrawing}
                style={{ marginTop: 8 }}
              >
                <FormattedMessage defaultMessage="Clear Drawing" />
              </Button>
            </div>
          )}

          <Space>
            <Button
              disabled={submitting}
              onClick={onDrawCircle}
              type={drawingMode === 'circle' ? 'primary' : 'default'}
            >
              <FormattedMessage defaultMessage="Draw Circle" />
            </Button>
            <Button
              disabled={submitting}
              onClick={onDrawPolygon}
              type={drawingMode === 'polygon' ? 'primary' : 'default'}
            >
              <FormattedMessage defaultMessage="Draw Polygon" />
            </Button>
          </Space>
        </Space>
      </Form.Item>

      <Form.Item>
        <Space style={{ justifyContent: 'flex-end', width: '100%' }}>
          <Button disabled={submitting} onClick={onCancel}>
            <FormattedMessage defaultMessage="Cancel" />
          </Button>
          <Button htmlType="submit" loading={submitting} type="primary">
            {mode === 'create' ? (
              <FormattedMessage defaultMessage="Create Area" />
            ) : (
              <FormattedMessage defaultMessage="Update Area" />
            )}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default ReportingAreaForm;
