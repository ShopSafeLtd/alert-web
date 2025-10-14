import type { TagsQuery } from 'graphql/tags/queries/__generated__/tags.generated';
import type { TagData } from 'types/DataType';

import {
  faPenToSquare,
  faPlus,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Col,
  Drawer,
  Input,
  Row,
  Table,
  Tooltip,
  Typography,
} from 'antd';
import AddOffenderWarning from 'components/form-components/tags/offenderWarnings/AddOffenderWarning';
import EditOffenderWarning from 'components/form-components/tags/offenderWarnings/EditOffenderWarning';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

interface Props {
  addOffenderWarning: boolean;
  data: TagsQuery | undefined;
  deleteConfirm: (value: string) => void;
  editOffenderWarning: boolean;
  loading: boolean;
  offenderId: string;
  onAddOffenderWarning: (value: TagData) => void;
  saving: boolean;
  search: string;
  setOffenderId: (value: string) => void;
  setSearch: (value: string) => void;
  toggleAddOffenderWarning: () => void;
  toggleEditOffenderWarning: () => void;
}

const OffenderWarningList = ({
  addOffenderWarning,
  data,
  deleteConfirm,
  editOffenderWarning,
  loading,
  offenderId,
  onAddOffenderWarning,
  saving,
  search,
  setOffenderId,
  setSearch,
  toggleAddOffenderWarning,
  toggleEditOffenderWarning,
}: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <div className="list-view">
      <Row gutter={8} style={{ marginBottom: 10 }}>
        <Col span={8}>
          <Input
            allowClear
            onChange={(event) => setSearch(event.target.value)}
            placeholder={intl.formatMessage({
              defaultMessage: 'Search offender tags...',
            })}
            value={search}
          />
        </Col>
        <Col flex={1} />
        <Col>
          <Button
            icon={
              <FontAwesomeIcon
                icon={faPlus}
                size="lg"
                style={{ marginRight: 5 }}
              />
            }
            onClick={toggleAddOffenderWarning}
            type="primary"
          >
            <FormattedMessage defaultMessage="Add Offender Warning" />
          </Button>
        </Col>
      </Row>
      <Table
        columns={[
          {
            dataIndex: 'name',
            key: 'name',
            render: (value, record) => (
              <Typography.Link
                disabled={saving}
                onClick={() => {
                  setOffenderId(record.key);
                  toggleEditOffenderWarning();
                }}
              >
                {value}
              </Typography.Link>
            ),
            title: intl.formatMessage({
              defaultMessage: 'Name',
            }),
            width: 300,
          },
          {
            dataIndex: 'description',
            ellipsis: true,
            key: 'description',
            title: intl.formatMessage({
              defaultMessage: 'Description',
            }),
          },

          {
            dataIndex: 'Options',
            key: 'Options',
            render: (_, record) => (
              <Row gutter={8}>
                <Col>
                  <Tooltip
                    title={intl.formatMessage({
                      defaultMessage: 'Edit Tag',
                    })}
                  >
                    <Button
                      disabled={saving}
                      icon={<FontAwesomeIcon icon={faPenToSquare} />}
                      onClick={() => {
                        setOffenderId(record.key);
                        toggleEditOffenderWarning();
                      }}
                      size="small"
                    />
                  </Tooltip>
                </Col>
                <Col>
                  <Tooltip
                    title={intl.formatMessage({
                      defaultMessage: 'Remove Tag',
                    })}
                  >
                    <Button
                      disabled={saving}
                      icon={<FontAwesomeIcon icon={faTrash} />}
                      onClick={() => {
                        deleteConfirm(record.key);
                      }}
                      size="small"
                    />
                  </Tooltip>
                </Col>
              </Row>
            ),
            title: '',
            width: 100,
          },
        ]}
        dataSource={data?.tags.map((tag) => ({
          description: tag.description,
          key: tag.id,
          name: tag.name,
        }))}
        loading={loading}
        pagination={{
          defaultPageSize: 20,
          hideOnSinglePage: true,
          pageSize: 20,
        }}
        size="small"
        style={{ marginRight: 10 }}
      />

      <Drawer
        onClose={toggleAddOffenderWarning}
        open={addOffenderWarning}
        title={intl.formatMessage({
          defaultMessage: 'Add Offender Warning',
        })}
        width="400"
      >
        {addOffenderWarning ? (
          <AddOffenderWarning
            onClose={toggleAddOffenderWarning}
            saving={saving}
            update={onAddOffenderWarning}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={toggleEditOffenderWarning}
        open={editOffenderWarning}
        title={intl.formatMessage({
          defaultMessage: 'Edit Offender Warning',
        })}
        width="400"
      >
        <EditOffenderWarning
          offenderId={offenderId}
          onClose={toggleEditOffenderWarning}
        />
      </Drawer>
    </div>
  );
};

export default OffenderWarningList;
