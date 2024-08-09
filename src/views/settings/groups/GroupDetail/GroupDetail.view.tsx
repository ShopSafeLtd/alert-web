import type { GroupQuery } from 'graphql/group/queries/__generated__/group.generated';

import { faPenToSquare, faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Drawer, PageHeader, Table } from 'antd';
import EditGroup from 'components/form-components/group/EditGroup';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

interface Props {
  data: GroupQuery | undefined;
  deleteConfirm: () => void;
  editGroup: boolean;
  loading: boolean;
  saving: boolean;
  toggleEditGroup: () => void;
}

const GroupDetail = ({
  data,
  deleteConfirm,
  editGroup,
  loading,
  saving,
  toggleEditGroup,
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
            onClick={toggleEditGroup}
          >
            <FormattedMessage defaultMessage="Edit Group" />
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
            onClick={deleteConfirm}
          >
            <FormattedMessage defaultMessage="Delete Group" />
          </Button>,
        ]}
        onBack={() => window.history.back()}
        subTitle={data?.group?.description}
        title={data?.group?.name}
      />
      <Card>
        <Table
          columns={[
            {
              dataIndex: 'name',

              key: 'name',
              render: (value, record) => (
                <Link to={`/app/scheme-settings/users/view/${record.key}`}>
                  {value}
                </Link>
              ),
              title: intl.formatMessage({
                defaultMessage: 'Name',
              }),
              width: 300,
            },
            {
              dataIndex: 'business',

              key: 'business',
              title: intl.formatMessage({
                defaultMessage: 'Business',
              }),
            },
          ]}
          dataSource={data?.group?.users.map((user) => ({
            business: user.businesses[0]?.name,
            key: user.id,
            name: user.fullName,
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
          onClose={toggleEditGroup}
          open={editGroup}
          title={intl.formatMessage({
            defaultMessage: 'Edit Group Details',
          })}
          width="400"
        >
          {editGroup ? <EditGroup onClose={toggleEditGroup} /> : <div />}
        </Drawer>
      </Card>
    </div>
  );
};
export default GroupDetail;
