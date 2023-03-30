import React from 'react';
import { Dropdown, DropDownProps, Menu } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
// TODO: fix
// @ts-ignore
interface Props extends DropDownProps {
  menu: JSX.Element;
}

const EllipsisDropdown = ({
  placement,
  menu = <Menu />,
}: Props): JSX.Element => (
  <Dropdown overlay={menu} placement={placement} trigger={['click']}>
    <div className="ellipsis-dropdown">
      <EllipsisOutlined />
    </div>
  </Dropdown>
);

export default EllipsisDropdown;
