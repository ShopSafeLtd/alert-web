import type { FormInstance } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import type { RcFile } from 'rc-upload/lib/interface';

import GroupsSelect from '#/components/form-components/GroupsSelect/GroupsSelect.view';
import { faCloudUploadAlt } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Form, Input, Modal, Progress, Upload } from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

const { TextArea } = Input;
const { Dragger } = Upload;

interface FormData {
  description?: string;
  file?: UploadFile;
  groups: string[];
  tags?: string[];
  title: string;
}

interface UploadVideoModalViewProps {
  beforeUpload: (file: RcFile) => boolean;
  fileList: UploadFile[];
  form: FormInstance<FormData>;
  handleFileChange: (info: { fileList: UploadFile[] }) => void;
  handleSubmit: (values: FormData) => Promise<void>;
  onClose: () => void;
  uploadProgress: number;
  uploading: boolean;
  visible: boolean;
}

const UploadVideoModalView: React.FC<UploadVideoModalViewProps> = ({
  beforeUpload,
  fileList,
  form,
  handleFileChange,
  handleSubmit,
  onClose,
  uploadProgress,
  uploading,
  visible,
}) => {
  const intl = useIntl();

  return (
    <Modal
      footer={[
        <Button disabled={uploading} key="cancel" onClick={onClose}>
          <FormattedMessage defaultMessage="Cancel" />
        </Button>,
        <Button
          htmlType="submit"
          key="submit"
          loading={uploading}
          onClick={() => form.submit()}
          type="primary"
        >
          <FormattedMessage defaultMessage="Upload" />
        </Button>,
      ]}
      onCancel={onClose}
      open={visible}
      title={<FormattedMessage defaultMessage="Upload Training Video" />}
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          void handleSubmit(values);
        }}
      >
        <Form.Item
          label={intl.formatMessage({ defaultMessage: 'Video File' })}
          name="file"
          rules={[
            {
              required: true,
              validator: () => {
                if (fileList.length === 0) {
                  return Promise.reject(
                    new Error(
                      intl.formatMessage({
                        defaultMessage: 'Please select a video file',
                      })
                    )
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Dragger
            accept="video/*"
            beforeUpload={beforeUpload}
            disabled={uploading}
            fileList={fileList}
            maxCount={1}
            onChange={handleFileChange}
          >
            <p className="ant-upload-drag-icon">
              <FontAwesomeIcon icon={faCloudUploadAlt} size="3x" />
            </p>
            <p className="ant-upload-text">
              <FormattedMessage defaultMessage="Click or drag video file to this area to upload" />
            </p>
            <p className="ant-upload-hint">
              <FormattedMessage defaultMessage="Supported formats: MP4, MOV, AVI, WebM, MKV. Max file size: 500MB" />
            </p>
          </Dragger>
        </Form.Item>

        {uploading && uploadProgress > 0 && (
          <Form.Item>
            <Progress
              percent={uploadProgress}
              status={uploadProgress === 100 ? 'success' : 'active'}
            />
          </Form.Item>
        )}

        <Form.Item
          label={intl.formatMessage({ defaultMessage: 'Title' })}
          name="title"
          rules={[
            {
              message: intl.formatMessage({
                defaultMessage: 'Please enter a title',
              }),
              required: true,
            },
          ]}
        >
          <Input
            disabled={uploading}
            placeholder={intl.formatMessage({
              defaultMessage: 'Enter video title',
            })}
          />
        </Form.Item>

        <Form.Item
          label={intl.formatMessage({ defaultMessage: 'Description' })}
          name="description"
        >
          <TextArea
            disabled={uploading}
            placeholder={intl.formatMessage({
              defaultMessage: 'Enter video description (optional)',
            })}
            rows={4}
          />
        </Form.Item>

        <Form.Item
          label={intl.formatMessage({ defaultMessage: 'Content Groups' })}
          name="groups"
          rules={[
            {
              message: intl.formatMessage({
                defaultMessage: 'Please select at least one content group',
              }),
              required: true,
            },
          ]}
          tooltip={intl.formatMessage({
            defaultMessage:
              'Select the content groups that you would like this training video to be visible to.',
          })}
        >
          <GroupsSelect
            allowClear
            allowSelectAll
            allowTree
            disabled={uploading}
            maxTagCount={2}
            mode="multiple"
            placeholder={intl.formatMessage({
              defaultMessage: 'Select groups...',
            })}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UploadVideoModalView;
