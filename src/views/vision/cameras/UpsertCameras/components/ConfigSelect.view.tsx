import type { CameraUpsertForm } from '#/views/vision/cameras/UpsertCameras/useUpsertCameras';
import type { DetectionConfigItem } from '#/views/vision/detection-configs/ListDetectionConfigs/types';
import type { FormInstance } from 'antd';

import { Form, Transfer } from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

export const ConfigSelect: React.FC<{
  form: FormInstance<CameraUpsertForm>;
  configs: DetectionConfigItem[];
}> = ({ form, configs }) => {
  const intl = useIntl();

  const dataSource = configs.map((config) => ({
    key: config.id,
    title: config.name,
    description: `Type: ${config.type}, Min Confidence: ${config.minimumConfidenceTrigger}, Min Priority: ${config.minimumPriorityTrigger}, Cameras Assigned: ${config.cameraCount}`,
  }));

  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const handleChange = (nextTargetKeys: string[]) => {
    form.setFieldsValue({ detectionConfigs: nextTargetKeys });
    setSelectedKeys([]);
  };

  return (
    <div>
      <Form.Item
        shouldUpdate={(prevValues, currentValues) =>
          (prevValues as CameraUpsertForm).detectionConfigs !==
          (currentValues as CameraUpsertForm).detectionConfigs
        }
      >
        {() => {
          const raw = form.getFieldValue('detectionConfigs') as
            | string[]
            | undefined;
          const targetKeys = Array.isArray(raw) ? raw : [];

          return (
            <Form.Item name="detectionConfigs" noStyle>
              <Transfer
                dataSource={dataSource}
                titles={[
                  intl.formatMessage({ defaultMessage: 'Available Configs' }),
                  intl.formatMessage({ defaultMessage: 'Selected Configs' }),
                ]}
                targetKeys={targetKeys}
                selectedKeys={selectedKeys}
                onChange={(next) => handleChange(next)}
                onSelectChange={(sourceSelectedKeys, targetSelectedKeys) => {
                  setSelectedKeys([
                    ...sourceSelectedKeys,
                    ...targetSelectedKeys,
                  ]);
                }}
                render={(item) => item.title}
                listStyle={{ width: 400, height: 300 }}
                rowKey={(record) => record.key}
              />
            </Form.Item>
          );
        }}
      </Form.Item>
    </div>
  );
};

export default ConfigSelect;
