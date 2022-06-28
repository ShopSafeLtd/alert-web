import React from "react";
import { UserQuery } from "graphql/generated";

import { RoleValues } from "types";
import Header from "./userDetail.view/Header";
import Detail from "./userDetail.view/Detail";

interface Props {
  data: UserQuery | undefined;
  loading: boolean;
}

const userDetail = ({ data, loading }: Props) => {
  const openEdit = () => {};
  return (
    <div className="list-view">
      <Header data={data} loading={loading} />
      <Detail data={data} loading={loading} />
    </div>

    // <div className="list-view">
    //   <PageHeader
    //     // ghost={false}
    //     onBack={() => window.history.back()}
    //     title={data?.user?.fullName}
    //     subTitle={data?.user?.disabled && "User Disabled"}
    //     tags={<Tag color="red">{data?.user?.organisation}</Tag>}
    //     extra={[
    //       <Button
    //         key="3"
    //         type="primary"
    //         // disabled={isCurrent}
    //         // onClick={sendInvite}
    //         icon={<SendOutlined />}
    //       >
    //         Send Invite
    //       </Button>,
    //       data?.user?.disabled ? (
    //         <Button
    //           key="2"
    //           type="primary"
    //           // disabled={isCurrent}
    //           // onClick={enableUser}
    //           icon={<UnlockOutlined />}
    //         >
    //           Enable User
    //         </Button>
    //       ) : (
    //         <Button
    //           key="2"
    //           type="primary"
    //           // disabled={isCurrent}
    //           // onClick={disableUser}
    //           icon={<LockOutlined />}
    //         >
    //           Disable User
    //         </Button>
    //       ),
    //       <Button
    //         key="1"
    //         // disabled={isCurrent}
    //         // onClick={remove}
    //         type="primary"
    //         icon={<DeleteOutlined />}
    //       >
    //         Delete User
    //       </Button>,
    //     ]}
    //   />
    //   <Card>
    //     <Descriptions
    //       title="Details"
    //       // bordered={true}
    //       extra={
    //         <Button icon={<EditOutlined />} onClick={openEdit}>
    //           Edit Details
    //         </Button>
    //       }
    //     >
    //       <Descriptions.Item label="Full Name">
    //         {data?.user?.fullName}
    //       </Descriptions.Item>
    //       <Descriptions.Item label="Organisation">
    //         {data?.user?.organisation}
    //       </Descriptions.Item>
    //       <Descriptions.Item label="Email Address">
    //         {data?.user?.email}
    //       </Descriptions.Item>

    //       <Descriptions.Item label="Role">
    //         {!!data?.user?.schemes && RoleValues[data?.user?.schemes[0].role]}
    //       </Descriptions.Item>
    //       {data?.user?.addresses && data.user.addresses.length > 0 && (
    //         <Descriptions.Item label="Address">
    //           {data?.user?.addresses[0].premises &&
    //             `${data?.user?.addresses[0].premises}, `}
    //           {data?.user?.addresses[0].building &&
    //             `${data?.user?.addresses[0].building}, `}
    //           {data?.user?.addresses[0].street &&
    //             `${data?.user?.addresses[0].street}, `}
    //           {data?.user?.addresses[0].townCity &&
    //             `${data?.user?.addresses[0].townCity}, `}
    //           {data?.user?.addresses[0].county &&
    //             `${data?.user?.addresses[0].county}, `}
    //           {data?.user?.addresses[0].postcode &&
    //             `${data?.user?.addresses[0].postcode}`}
    //         </Descriptions.Item>
    //       )}
    //     </Descriptions>

    //     <Descriptions
    //       title="Groups"
    //       extra={[
    //         <Button icon={<EditOutlined />} onClick={openEdit}>
    //           Edit Groups
    //         </Button>,
    //       ]}
    //     >
    //       {!!data?.user?.groups && data?.user?.groups.length > 0 ? (
    //         <Descriptions.Item>
    //           {data?.user?.groups
    //             .map(({ name }, index) => (index === 0 ? name : ` ${name}`))
    //             .toString()}
    //         </Descriptions.Item>
    //       ) : (
    //         <Button icon={<UserAddOutlined />} onClick={openEdit}></Button>
    //       )}
    //     </Descriptions>
    //     <Descriptions
    //       title="Chat Groups"
    //       extra={[
    //         <Button icon={<EditOutlined />} onClick={openEdit}>
    //           Edit Chat Groups
    //         </Button>,
    //       ]}
    //     >
    //       {!!data?.user?.chats && data?.user?.chats.length > 0 ? (
    //         <Descriptions.Item>
    //           {data?.user?.chats
    //             .map(({ chat }) => chat)
    //             .map(({ name }, index) => (index === 0 ? name : ` ${name}`))
    //             .toString()}
    //         </Descriptions.Item>
    //       ) : (
    //         <Descriptions.Item>
    //           <Empty
    //             image={Empty.PRESENTED_IMAGE_SIMPLE}
    //             imageStyle={{
    //               height: 20,
    //             }}
    //             description="Create Now"
    //           >
    //             <Button icon={<UserAddOutlined />} onClick={openEdit}>
    //               Create
    //             </Button>
    //           </Empty>
    //         </Descriptions.Item>
    //       )}
    //     </Descriptions>
    //   </Card>
    // </div>
  );
};

export default userDetail;
