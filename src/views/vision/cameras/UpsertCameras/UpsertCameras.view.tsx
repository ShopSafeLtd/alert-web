import type { ViewAiCameraQuery } from '#/views/vision/cameras/UpsertCameras/graphql/queries/__generated__/ViewCamera.generated';
import type { CameraUpsertForm } from '#/views/vision/cameras/UpsertCameras/useUpsertCameras';
import type { DetectionConfigItem } from '#/views/vision/detection-configs/ListDetectionConfigs/types';
import type { FormInstance } from 'antd';

import CameraDetails from '#/views/vision/cameras/UpsertCameras/components/CameraDetails';
import ConfigSelect from '#/views/vision/cameras/UpsertCameras/components/ConfigSelect.view';
import { Col, Form, Row } from 'antd';
import React from 'react';

import ConfigHeader from './components/CameraHeader';

const UpsertCamerasView = ({
  loading,
  data: _,
  form,
  detectionConfigs,
  handleFormSubmit,
  editId,
}: {
  loading: boolean;
  data: ViewAiCameraQuery['aiVisionCamera'] | null | undefined;
  form: FormInstance<CameraUpsertForm>;
  detectionConfigs: DetectionConfigItem[];
  handleFormSubmit: (formData: CameraUpsertForm) => void;
  editId: string | null;
}) => (
  <div style={{ padding: 15, width: '100%' }}>
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <Form<CameraUpsertForm>
        disabled={loading}
        form={form}
        layout="vertical"
        onFinish={handleFormSubmit}
        style={{ width: '100%' }}
      >
        <ConfigHeader editId={editId || undefined} saving={loading} />

        <Row gutter={16}>
          <Col span={10}>
            <CameraDetails />
            <ConfigSelect form={form} configs={detectionConfigs} />
          </Col>
        </Row>
      </Form>
    </div>
  </div>
);

export default UpsertCamerasView;
