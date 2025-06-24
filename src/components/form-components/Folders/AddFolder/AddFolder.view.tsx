import type { FormInstance } from 'antd';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { Button, Col, Form, Input, Row, Skeleton } from 'antd';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import { useIntl } from 'react-intl';

import type { FormData } from './useAddFolder';

import RoleSelect from '../../Roles/RoleSelect';
import FoldersSelect from '../FolderSelect/FoldersSelect.view';

interface Props {
  form: FormInstance<FormData>;
  loading: boolean;
  onClose: () => void;
  onSelectParent: (data: string) => void;
  onSubmit: (value: FormData) => void;
  parentFolderId?: string;
  saving: boolean;
}

const AddFolder = ({
  form,
  loading,
  onClose,
  onSelectParent,
  onSubmit,
  parentFolderId,
  saving,
}: Props): JSX.Element => {
  const intl = useIntl();

  const schemeId = useAtomValue(currentSchemeIdAtom);

  return (
    <div>
      {loading ? (
        <Skeleton />
      ) : (
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label={intl.formatMessage({ defaultMessage: 'Name' })}
                name="name"
                rules={[
                  {
                    message: intl.formatMessage({
                      defaultMessage: 'Please enter a name for the folder.',
                    }),
                    required: true,
                  },
                ]}
              >
                <Input disabled={saving} />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Description',
                })}
                name="description"
              >
                <Input.TextArea disabled={saving} rows={3} />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Parent Folder',
                })}
                name="parentId"
              >
                <FoldersSelect
                  allowClear
                  onChange={onSelectParent}
                  parentFolderId={parentFolderId}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Select a folder...',
                  })}
                  showSearch
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Roles',
                })}
                name="roles"
              >
                <RoleSelect multi schemeId={schemeId} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Row gutter={16} justify="end" style={{ marginTop: 30 }}>
              <Col>
                <Button disabled={saving} onClick={onClose}>
                  {intl.formatMessage({ defaultMessage: 'Cancel' })}
                </Button>
              </Col>
              <Col>
                <Button
                  disabled={saving}
                  htmlType="submit"
                  loading={saving}
                  type="primary"
                >
                  {intl.formatMessage({ defaultMessage: 'Create' })}
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default AddFolder;
