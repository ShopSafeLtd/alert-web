import type { FolderData } from '#/types/DataType';

import { faPlus } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Drawer, Form, Row } from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

import AddFolder from '../AddFolder';
import FoldersSelect from './FoldersSelect.view';

interface Props {
  onAddNewFolder: (value: FolderData) => void;
  onSelectFolder: (data: string) => void;
  saving: boolean;
}

const SelectFolderRow = ({
  onAddNewFolder,
  onSelectFolder,
  saving,
}: Props): JSX.Element => {
  const intl = useIntl();
  const [addFolderVisible, setAddFolderVisible] = useState(false);
  const toggleAddFolderVisible = () => {
    setAddFolderVisible(!addFolderVisible);
  };
  // const onSelectFolder = (value: string) => {
  //   form.setFieldsValue({
  //     folder: value,
  //   });
  // };
  return (
    <>
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
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Select a folder...',
                  })}
                  showSearch
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
            saving={saving}
          />
        )}
      </Drawer>
    </>
  );
};

export default SelectFolderRow;
