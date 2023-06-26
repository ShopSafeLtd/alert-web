import React from 'react';
import type { GroupQuery } from 'graphql/generated';
import { Button, Card, Drawer, PageHeader, Table } from 'antd';
import EditGroup from 'components/form-components/group/EditGroup';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/pro-light-svg-icons';
import { FormattedMessage, useIntl } from 'react-intl';

interface Props {
  data: GroupQuery | undefined;
  loading: boolean;
  editGroup: boolean;
  toggleEditGroup: () => void;
  saving: boolean;
  deleteConfirm: () => void;
}

const GroupDetail = ({
  data,
  loading,
  editGroup,
  toggleEditGroup,
  saving,
  deleteConfirm,
}: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <div className="list-view">
      <PageHeader
        onBack={() => window.history.back()}
        title={data?.group?.name}
        subTitle={data?.group?.description}
        extra={[
          <Button
            key="2"
            disabled={saving}
            onClick={toggleEditGroup}
            icon={
              <FontAwesomeIcon
                size="lg"
                icon={faPenToSquare}
                style={{ marginRight: 5 }}
              />
            }
          >
            <FormattedMessage defaultMessage="Edit Group" id="h1fdng" />
          </Button>,
          <Button
            key="1"
            disabled={saving}
            onClick={deleteConfirm}
            icon={
              <FontAwesomeIcon
                size="lg"
                icon={faTrash}
                style={{ marginRight: 5 }}
              />
            }
          >
            <FormattedMessage defaultMessage="Delete Group" id="HC54OB" />
          </Button>,
        ]}
      />
      <Card>
        <Table
          size="small"
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
                id: 'HAlOn1',
              }),
              dataIndex: 'name',
              width: 300,
              render: (value, record) => (
                <Link to={`/app/scheme-settings/users/view/${record.key}`}>
                  {value}
                </Link>
              ),
            },
            {
              key: 'business',

              title: intl.formatMessage({
                defaultMessage: 'Business',
                id: 'w1Fanr',
              }),
              dataIndex: 'business',
            },
          ]}
          dataSource={data?.group?.users.map((user) => ({
            key: user.id,
            name: user.fullName,
            business: user.businesses[0]?.name,
          }))}
        />

        <Drawer
          title={intl.formatMessage({
            defaultMessage: 'Edit Group Details',
            id: 'mKqoi7',
          })}
          visible={editGroup}
          width="400"
          onClose={toggleEditGroup}
        >
          {editGroup ? <EditGroup onClose={toggleEditGroup} /> : <div />}
        </Drawer>
      </Card>
    </div>
  );
};
export default GroupDetail;
