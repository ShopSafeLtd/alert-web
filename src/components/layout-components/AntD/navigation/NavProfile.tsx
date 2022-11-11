import React from 'react';
import { Menu, Dropdown, Avatar, Row } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useStoreState } from 'state';
import { useAuth } from 'hooks';
import { APP_PREFIX_PATH } from 'configs/AppConfig';
import { useAuth0 } from '@auth0/auth0-react';

interface MenuItem {
  title: string;
  icon: string;
  path: string;
}

const menuItem: MenuItem[] = [
  {
    title: 'User Settings',
    icon: '', //EditOutlined,
    path: `${APP_PREFIX_PATH}/user-settings`,
  },
  {
    title: 'Terms & Conditions',
    icon: '', //EditOutlined,
    path: `${APP_PREFIX_PATH}/user-settings/terms`,
  },

  // {
  //   title: "Account Setting",
  //   icon: "", // SettingOutlined,
  //   path: `${APP_PREFIX_PATH}/`,
  // },
  // {
  //   title: "Billing",
  //   icon: "", // ShopOutlined,
  //   path: `${APP_PREFIX_PATH}/`,
  // },
  // {
  //   title: "Help Center",
  //   icon: "", // QuestionCircleOutlined,
  //   path: `${APP_PREFIX_PATH}/`,
  // },
];

export const NavProfile = () => {
  const name = useStoreState((state) => state.user.fullName);
  const email = useStoreState((state) => state.user.email);
  const { signOut } = useAuth();
  const { logout } = useAuth0();

  const profileMenu = (
    <div className="nav-profile nav-dropdown">
      <div className="nav-profile-header">
        <div className="d-flex" style={{ alignItems: 'center' }}>
          <Avatar
            style={{ backgroundColor: 'rgb(222, 68, 54)', minWidth: 35 }}
            size={35}
          >
            {name?.charAt(0)}
          </Avatar>
          <div className="pl-2">
            <h4 className="mb-0">{name}</h4>
            <span className="text-muted">{email}</span>
          </div>
        </div>
      </div>
      <div className="nav-profile-body">
        <Menu>
          {menuItem.map((el, i) => {
            return (
              <Menu.Item key={i}>
                <a href={el.path}>
                  <Row>
                    {/* <Icon className="mr-3" type={el.icon} /> */}
                    <span className="font-weight-normal">{el.title}</span>
                  </Row>
                </a>
              </Menu.Item>
            );
          })}
          <Menu.Item
            key={menuItem.length + 1}
            onClick={() => {
              signOut();
              logout({ returnTo: window.location.origin });
            }}
          >
            <Row>
              <LogoutOutlined className="mr-3" />
              <span className="font-weight-normal">Sign Out</span>
            </Row>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
  return (
    <Dropdown placement="bottomRight" overlay={profileMenu} trigger={['click']}>
      <Menu
        className="d-flex align-item-center"
        mode="horizontal"
        items={[
          {
            key: 0,
            label: (
              <Avatar style={{ backgroundColor: 'rgb(222, 68, 54)' }}>
                {name?.charAt(0)}
              </Avatar>
            ),
          },
        ]}
      />
    </Dropdown>
  );
};

export default NavProfile;
