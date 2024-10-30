import AddDemGroup from '#/components/form-components/DemGroup/AddDemGroup';
import { faPenToSquare, faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Drawer, Modal, PageHeader, Table } from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import type { DemGroupQuery } from '../graphql/queries/__generated__/dem-group.generated';
const { confirm } = Modal;

interface Props {
  data: DemGroupQuery | undefined;
  deleteConfirm: () => void;
  editDemGroup: boolean;
  loading: boolean;
  saving: boolean;
  toggleEditDemGroup: () => void;
}

const DemGroupDetail = ({
  data,
  deleteConfirm,
  editDemGroup,
  loading,
  saving,
  toggleEditDemGroup,
}: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <div className="list-view">
      <PageHeader
        extra={[
          <Button
            disabled={saving}
            icon={
              <FontAwesomeIcon
                icon={faPenToSquare}
                size="lg"
                style={{ marginRight: 5 }}
              />
            }
            key="2"
            onClick={toggleEditDemGroup}
          >
            <FormattedMessage defaultMessage="Edit Details" />
          </Button>,
          <Button
            disabled={saving}
            icon={
              <FontAwesomeIcon
                icon={faTrash}
                size="lg"
                style={{ marginRight: 5 }}
              />
            }
            key="1"
            onClick={() => {
              confirm({
                content: intl.formatMessage({
                  defaultMessage: 'This action cannot be undone.',
                }),
                onOk() {
                  deleteConfirm();
                },

                title: intl.formatMessage({
                  defaultMessage: 'Do you want to delete the dem group?',
                }),
              });
            }}
            type="primary"
          >
            <FormattedMessage defaultMessage="Delete" />
          </Button>,
        ]}
        onBack={() => window.history.back()}
        // subTitle={data?.group?.description}
        title={data?.demGroup.name}
      />
      <Card>
        <Table
          columns={[
            {
              dataIndex: 'name',
              key: 'name',
              render: (value, record) => (
                <Link
                  to={`/app/scheme-settings/dem/dem-devices/view/${record.key}`}
                >
                  {value}
                </Link>
              ),
              title: intl.formatMessage({
                defaultMessage: 'Name',
              }),
            },
            {
              dataIndex: 'business',
              key: 'business',
              title: intl.formatMessage({
                defaultMessage: 'Business',
              }),
            },
          ]}
          dataSource={data?.demGroup.demDevices.map((device) => ({
            business: device.business.name,
            key: device.id,
            name: device.name,
          }))}
          loading={loading}
          pagination={{
            defaultPageSize: 20,
            hideOnSinglePage: true,
            pageSize: 20,
          }}
          size="small"
        />

        <Drawer
          onClose={toggleEditDemGroup}
          open={editDemGroup}
          title={intl.formatMessage({
            defaultMessage: 'Manage Dem Group Devices',
          })}
          width="400"
        >
          {editDemGroup ? (
            <AddDemGroup
              editData={{
                ...data?.demGroup,
                demDevices: data?.demGroup.demDevices.map(({ id }) => id) || [],
                id: data?.demGroup.id || '',
                name: data?.demGroup.name || '',
              }}
              onClose={toggleEditDemGroup}
            />
          ) : (
            <div />
          )}
        </Drawer>
      </Card>
    </div>
  );
};
export default DemGroupDetail;
