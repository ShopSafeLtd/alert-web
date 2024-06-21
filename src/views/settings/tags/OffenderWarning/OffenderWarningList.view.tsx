import React from 'react';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPenToSquare,
  faPlus,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import type { TagData } from 'types/DataType';
import { FormattedMessage, useIntl } from 'react-intl';
import type { TagsQuery } from 'graphql/tags/queries/tags.generated';

interface Props {
  data: TagsQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  addOffenderWarning: boolean;
  toggleAddOffenderWarning: () => void;
  onAddOffenderWarning: (value: TagData) => void;
  offenderId: string;
  setOffenderId: (value: string) => void;
  editOffenderWarning: boolean;
  toggleEditOffenderWarning: () => void;
  saving: boolean;
  deleteConfirm: (value: string) => void;
}

const OffenderWarningList = ({
  data,
  loading,
  search,
  setSearch,
  editOffenderWarning,
  toggleEditOffenderWarning,
  addOffenderWarning,
  toggleAddOffenderWarning,
  onAddOffenderWarning,
  offenderId,
  setOffenderId,
  saving,
  deleteConfirm,
}: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <div className="list-view">
      <Row gutter={8} style={{ marginBottom: 10 }}>
        <Col span={8}>
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={intl.formatMessage({
              defaultMessage: 'Search offender tags...',
            })}
            allowClear
          />
        </Col>
        <Col flex={1} />
        <Col>
          <Button
            type="primary"
            onClick={toggleAddOffenderWarning}
            icon={
              <FontAwesomeIcon
                icon={faPlus}
                size="lg"
                style={{ marginRight: 5 }}
              />
            }
          >
            <FormattedMessage defaultMessage="Add Offender Warning" />
          </Button>
        </Col>
      </Row>
      <Table
        size="small"
        style={{ marginRight: 10 }}
        loading={loading}
        pagination={{
          hideOnSinglePage: true,
          defaultPageSize: 20,
          pageSize: 20,
        }}
        columns={[
          {
            key: 'name',
            title: intl.formatMessage({
              defaultMessage: 'Name',
            }),
            dataIndex: 'name',
            width: 300,
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
          },
          {
            key: 'description',
            title: intl.formatMessage({
              defaultMessage: 'Description',
            }),
            dataIndex: 'description',
            ellipsis: true,
          },

          {
            key: 'Options',
            title: '',
            dataIndex: 'Options',
            width: 100,
            render: (_, record) => (
              <Row gutter={8}>
                <Col>
                  <Tooltip
                    title={intl.formatMessage({
                      defaultMessage: 'Edit Tag',
                    })}
                  >
                    <Button
                      size="small"
                      disabled={saving}
                      onClick={() => {
                        setOffenderId(record.key);
                        toggleEditOffenderWarning();
                      }}
                      icon={<FontAwesomeIcon icon={faPenToSquare} />}
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
                      size="small"
                      disabled={saving}
                      onClick={() => {
                        deleteConfirm(record.key);
                      }}
                      icon={<FontAwesomeIcon icon={faTrash} />}
                    />
                  </Tooltip>
                </Col>
              </Row>
            ),
          },
        ]}
        dataSource={data?.tags.map((tag) => ({
          key: tag.id,
          name: tag.name,
          description: tag.description,
        }))}
      />

      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add Offender Warning',
        })}
        open={addOffenderWarning}
        width="400"
        onClose={toggleAddOffenderWarning}
      >
        {addOffenderWarning ? (
          <AddOffenderWarning
            update={onAddOffenderWarning}
            onClose={toggleAddOffenderWarning}
            saving={saving}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Edit Offender Warning',
        })}
        open={editOffenderWarning}
        width="400"
        onClose={toggleEditOffenderWarning}
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
