import React from "react";
import { UserQuery } from "graphql/generated";
import {
  SendOutlined,
  LockOutlined,
  UnlockOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { Button, PageHeader, Tag } from "antd";

interface Props {
  data: UserQuery | undefined;
  loading: boolean;
}

const Header = ({ data, loading }: Props) => {
  const openEdit = () => {};
  return (
    <div className="list-view">
      <PageHeader
        // ghost={false}
        onBack={() => window.history.back()}
        title={data?.user?.fullName}
        subTitle={data?.user?.disabled && "User Disabled"}
        tags={<Tag color="red">{data?.user?.organisation}</Tag>}
        extra={[
          <Button
            key="3"
            type="primary"
            // disabled={isCurrent}
            // onClick={sendInvite}
            icon={<SendOutlined />}
          >
            Send Invite
          </Button>,
          data?.user?.disabled ? (
            <Button
              key="2"
              type="primary"
              // disabled={isCurrent}
              // onClick={enableUser}
              icon={<UnlockOutlined />}
            >
              Enable User
            </Button>
          ) : (
            <Button
              key="2"
              type="primary"
              // disabled={isCurrent}
              // onClick={disableUser}
              icon={<LockOutlined />}
            >
              Disable User
            </Button>
          ),
          <Button
            key="1"
            // disabled={isCurrent}
            // onClick={remove}
            type="primary"
            icon={<DeleteOutlined />}
          >
            Delete User
          </Button>,
        ]}
      />
    </div>
  );
};

export default Header;
