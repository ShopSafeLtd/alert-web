import React from "react";
import { Menu, Dropdown, Avatar, Row } from "antd";
import { 
  LogoutOutlined 
} from '@ant-design/icons';
import Icon from 'components/util-components/Icon';
import { useStoreState } from 'state'
import useAuth from 'hooks/useAuth'

interface MenuItem {
  title: string;
  icon: string;
  path: string;
}

const menuItem: MenuItem[] = [
  // {
  //   title: "Edit Profile",
  //   icon: EditOutlined ,
  //   path: "/"
  //   },
    
  //   {
  //   title: "Account Setting",
  //   icon: SettingOutlined,
  //   path: "/"
  //   },
  //   {
  //   title: "Billing",
  //   icon: ShopOutlined ,
  //   path: "/"
  // },
  //   {
  //   title: "Help Center",
  //   icon: QuestionCircleOutlined,
  //   path: "/"
  // }
]

export const NavProfile = () => {
  const name = useStoreState(state => state.user.fullName)
  const email = useStoreState(state => state.user.email)
  const profileImg = useStoreState(state => state.user.picture)
  const { signOut } = useAuth()

  const profileMenu = (
    <div className="nav-profile nav-dropdown">
      <div className="nav-profile-header">
        <div className="d-flex" style={{ alignItems: 'center' }}>
          <Avatar style={{ backgroundColor: 'rgb(222, 68, 54)', minWidth: 35 }} size={35}>{name.charAt(0)}</Avatar>
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
                    <Icon className="mr-3" type={el.icon} />
                    <span className="font-weight-normal">{el.title}</span>
                  </Row>
                </a>
              </Menu.Item>
            );
          })}
          <Menu.Item key={menuItem.length + 1} onClick={e => signOut()}>
            <Row>
              <LogoutOutlined className="mr-3"/>
              <span className="font-weight-normal">Sign Out</span>
            </Row>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
  return (
    <Dropdown placement="bottomRight" overlay={profileMenu} trigger={["click"]}>
      <Menu className="d-flex align-item-center" mode="horizontal">
        <Menu.Item>
          <Avatar style={{ backgroundColor: 'rgb(222, 68, 54)' }}>{name.charAt(0)}</Avatar>
        </Menu.Item>
      </Menu>
    </Dropdown>
  );
}

export default NavProfile;
