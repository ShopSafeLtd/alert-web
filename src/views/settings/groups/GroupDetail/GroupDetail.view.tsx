import React from "react";
import { GroupQuery } from "graphql/generated";
import {
  DeleteOutlined,
  EditOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

import { Button, PageHeader, Card, Descriptions, Empty, Skeleton } from "antd";

interface Props {
  data: GroupQuery | undefined;
  loading: boolean;
}

const groupDetail = ({ data, loading }: Props) => {
  const openEdit = () => {};
  return (
    <div className="list-view">
      <PageHeader
        onBack={() => window.history.back()}
        title={data?.group?.name}
        subTitle={data?.group?.description}
        extra={[
          <Button
            key="2"
            type="primary"
            // disabled={isCurrent}
            // onClick={sendInvite}
            icon={<EditOutlined />}
          >
            Edit Group
          </Button>,
          <Button
            key="1"
            // disabled={isCurrent}
            // onClick={remove}
            type="primary"
            icon={<DeleteOutlined />}
          >
            Delete Group
          </Button>,
        ]}
      />
      <Card>
        {loading ? (
          <Skeleton />
        ) : (
          <Descriptions
            title="Users"
            bordered={true}
            extra={
              <Button icon={<EditOutlined />} onClick={openEdit}>
                Edit Users
              </Button>
            }
          >
            {data?.group?.users && data.group.users.length > 0 ? (
              data.group.users.map(({ id, fullName, organisation }) => (
                <Descriptions.Item label={fullName} key={id}>
                  {organisation}
                </Descriptions.Item>
              ))
            ) : (
              <Descriptions.Item>
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  imageStyle={{
                    height: 20,
                  }}
                  description="Create Now"
                >
                  <Button icon={<UserAddOutlined />} onClick={openEdit}>
                    Create
                  </Button>
                </Empty>
              </Descriptions.Item>
            )}
          </Descriptions>
        )}
      </Card>
    </div>
  );
};

export default groupDetail;
