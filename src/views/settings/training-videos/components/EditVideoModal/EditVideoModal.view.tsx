import type { FormInstance } from 'antd';

import GroupsSelect from '#/components/form-components/GroupsSelect/GroupsSelect.view';
import { Button, Checkbox, Form, Input, Modal } from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

const { TextArea } = Input;

interface FormData {
  description?: string;
  groups: string[];
  loginPrompt?: boolean;
  mandatory?: boolean;
  tags?: string[];
  title: string;
}

interface EditVideoModalViewProps {
  form: FormInstance<FormData>;
  handleSubmit: (values: FormData) => void;
  onClose: () => void;
  saving: boolean;
  visible: boolean;
}

const EditVideoModalView: React.FC<EditVideoModalViewProps> = ({
  form,
  handleSubmit,
  onClose,
  saving,
  visible,
}) => {
  const intl = useIntl();
  const loginPrompt = Form.useWatch('loginPrompt', form);

  return (
    <Modal
      footer={[
        <Button disabled={saving} key="cancel" onClick={onClose}>
          <FormattedMessage defaultMessage="Cancel" />
        </Button>,
        <Button
          htmlType="submit"
          key="submit"
          loading={saving}
          onClick={() => form.submit()}
          type="primary"
        >
          <FormattedMessage defaultMessage="Save" />
        </Button>,
      ]}
      onCancel={onClose}
      open={visible}
      title={<FormattedMessage defaultMessage="Edit Training Video" />}
      width={600}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
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
            disabled={saving}
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
            disabled={saving}
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
            disabled={saving}
            maxTagCount={2}
            mode="multiple"
            placeholder={intl.formatMessage({
              defaultMessage: 'Select groups...',
            })}
          />
        </Form.Item>

        <Form.Item
          name="loginPrompt"
          tooltip={intl.formatMessage({
            defaultMessage:
              'Show this video to users when they log in or load the app',
          })}
          valuePropName="checked"
        >
          <Checkbox disabled={saving}>
            <FormattedMessage defaultMessage="Show on Login" />
          </Checkbox>
        </Form.Item>

        <Form.Item
          name="mandatory"
          tooltip={intl.formatMessage({
            defaultMessage:
              'Users must watch to 90% completion before they can proceed',
          })}
          valuePropName="checked"
        >
          <Checkbox disabled={saving || !loginPrompt}>
            <FormattedMessage defaultMessage="Mandatory Viewing" />
          </Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditVideoModalView;
