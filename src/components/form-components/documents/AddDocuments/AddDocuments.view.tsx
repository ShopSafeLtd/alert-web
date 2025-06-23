import type { FolderData } from '#/types/DataType';
import type { FormInstance, SelectProps, UploadProps } from 'antd';

import { UploadOutlined } from '@ant-design/icons';
import { faPlus } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Drawer, Form, Row, Select, Upload } from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

import type { FormData } from './useAddDocuments';

import AddFolder from '../../Folders/AddFolder';
import FoldersSelect from '../../Folders/FolderSelect/FoldersSelect.view';
import useStyles from './AddDocuments.styles';

interface Props {
  categories: SelectProps['options'];
  categoriesChange: (categories: { value: string }[]) => void;
  categoriesLoading: boolean;
  documentUploadProps: UploadProps;
  folderId?: string;
  form: FormInstance<FormData>;
  onAddNewFolder: (value: FolderData) => void;
  onClose: () => void;
  onSelectFolder: (value: string) => void;
  onSubmit: () => void;
  providedId: boolean;
  saving: boolean;
  selectedCategories: { value: string }[];
}

const AddDocument = ({
  categories,
  categoriesChange,
  categoriesLoading,
  documentUploadProps,
  folderId,
  form,
  onAddNewFolder,
  onClose,
  onSelectFolder,
  onSubmit,
  providedId,
  saving,
  selectedCategories,
}: Props) => {
  const intl = useIntl();
  const classes = useStyles();
  const [addFolderVisible, setAddFolderVisible] = useState(false);
  const toggleAddFolderVisible = () => {
    setAddFolderVisible(!addFolderVisible);
  };
  return (
    <Form
      form={form}
      initialValues={{
        categories: [],
        name: '',
        url: '',
      }}
      onFinish={onSubmit}
    >
      {/* <Row gutter={16} style={{ marginLeft: 10, marginRight: 10 }}>
        <Col span={24}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Name',
            })}
            name="name"
            rules={[
              {
                message: intl.formatMessage({
                  defaultMessage: 'Please input a name!',
                }),
                required: true,
              },
            ]}
          >
            <Input
              placeholder={intl.formatMessage({
                defaultMessage: 'Name',
              })}
            />
          </Form.Item>
        </Col>
      </Row> */}
      <Row gutter={16} style={{ marginLeft: 10, marginRight: 10 }}>
        <Col span={24}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Category',
            })}
            name="category"
          >
            <Select
              labelInValue
              loading={categoriesLoading}
              maxTagCount={2}
              mode="tags"
              onChange={categoriesChange}
              optionFilterProp="value"
              options={categories}
              placeholder={intl.formatMessage({
                defaultMessage: 'Category',
              })}
              size="small"
              style={{ minWidth: 200 }}
              value={selectedCategories}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginLeft: 10, marginRight: 10 }}>
        <Col flex={1}>
          <Row align="top" gutter={20}>
            <Col flex={1}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Folder',
                })}
                name="folder"
                tooltip={intl.formatMessage({
                  defaultMessage: 'Please select a folder for the document',
                })}
              >
                <FoldersSelect
                  allowClear
                  onChange={onSelectFolder}
                  parentFolderId={folderId}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Select a folder...',
                  })}
                  showSearch
                  // showOption={sele}
                />
              </Form.Item>
            </Col>

            <Col>
              <Button
                disabled={saving}
                icon={
                  <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
                }
                onClick={toggleAddFolderVisible}
                style={{ color: 'red', marginTop: 3, padding: 8 }}
              >
                {intl.formatMessage({
                  defaultMessage: 'New Folder',
                })}
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      {/* <SelectFolderRow
        onAddNewFolder={onAddNewFolder}
        onSelectFolder={onSelectFolder}
        saving={saving}
      /> */}
      <Row className={classes.btn}>
        <Upload
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...documentUploadProps}
          listType="picture"
          maxCount={5}
          style={{ display: 'flex' }}
        >
          <Button icon={<UploadOutlined />}>
            {intl.formatMessage({
              defaultMessage: 'Upload Document',
            })}
          </Button>
        </Upload>
      </Row>
      <Form.Item>
        <Row gutter={10} justify="end" style={{ marginTop: 30 }}>
          <Col>
            <Button disabled={saving} onClick={onClose}>
              {intl.formatMessage({
                defaultMessage: 'Cancel',
              })}
            </Button>
          </Col>
          <Col>
            <Button
              disabled={saving}
              htmlType="submit"
              loading={saving}
              type="primary"
            >
              {providedId
                ? intl.formatMessage({
                    defaultMessage: 'Create Evidence',
                  })
                : intl.formatMessage({
                    defaultMessage: 'Create Document',
                  })}
            </Button>
          </Col>
        </Row>
      </Form.Item>
      <Drawer
        onClose={toggleAddFolderVisible}
        open={addFolderVisible}
        title={intl.formatMessage({
          defaultMessage: 'Add New Folder',
        })}
        width={600}
        zIndex={1001}
      >
        {addFolderVisible && (
          <AddFolder
            onAddNewFolder={onAddNewFolder}
            onClose={toggleAddFolderVisible}
            parentFolderId={folderId}
            saving={saving}
          />
        )}
      </Drawer>
    </Form>
  );
};

export default AddDocument;
