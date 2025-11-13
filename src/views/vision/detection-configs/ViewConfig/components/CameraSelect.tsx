import type { FormData } from '#/views/vision/detection-configs/ViewConfig/useDetectionConfigForm';
import type { FormInstance } from 'antd';

import { useVisionCamerasSelectQuery } from '#/views/vision/detection-configs/graphql/queries/__generated__/list-cameras.generated';
import { Form, Transfer } from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

export const CameraSelect: React.FC<{
  form: FormInstance<FormData>;
  schemeId: string;
}> = ({ form, schemeId }) => {
  const intl = useIntl();

  const { data, loading } = useVisionCamerasSelectQuery({
    variables: {
      schemeIds: schemeId ? [schemeId] : [],
    },
  });

  const dataSource = (data?.aiVisionCameras.edges || []).map(({ node }) => {
    const title =
      node.make || node.model
        ? `${(node.make || '').trim()} ${(node.model || '').trim()}`.trim()
        : node.serialNumber || node.id;
    const description =
      node.serialNumber || `${node.make || ''} ${node.model || ''}`.trim();
    return {
      key: node.id,
      title,
      description,
    };
  });

  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const handleChange = (nextTargetKeys: string[]) => {
    form.setFieldsValue({ selectedCameras: nextTargetKeys });
    setSelectedKeys([]);
  };

  return (
    <div>
      <Form.Item
        shouldUpdate={(prevValues, currentValues) =>
          (prevValues as FormData).selectedCameras !==
          (currentValues as FormData).selectedCameras
        }
      >
        {() => {
          const raw = form.getFieldValue('selectedCameras') as
            | string[]
            | undefined;
          const targetKeys = Array.isArray(raw) ? raw : [];

          return (
            <Form.Item
              name="selectedCameras"
              label={intl.formatMessage({ defaultMessage: 'Select Cameras' })}
            >
              <Transfer
                dataSource={dataSource}
                titles={[
                  intl.formatMessage({ defaultMessage: 'Available Cameras' }),
                  intl.formatMessage({ defaultMessage: 'Selected Cameras' }),
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
                disabled={loading}
                rowKey={(record) => record.key}
              />
            </Form.Item>
          );
        }}
      </Form.Item>
    </div>
  );
};

export default CameraSelect;
