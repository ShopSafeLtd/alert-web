import React, { useState } from "react";
import { Menu } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;

export interface SideMenuItem<T = void> {
  key: string;
  name: string;
  to?: string;
  icon?: any;
  subMenu?: SideMenuItem[];
  onTitleClick?(): void;
  data?: T
}

interface Props<T> {
  selectedKey: string;
  menuItems: SideMenuItem[];
  width?: number;
  layout?: (data: SideMenuItem<T>) => JSX.Element;
}

export const SideMenu: <T>(props: Props<T>) => JSX.Element = ({ selectedKey, menuItems, width, layout }) => {
  const [open] = useState<string[]>([]);

  // useEffect(() => {
  //   location.pathname.includes("statistics") &&
  //     setOpen([`${match.url}/statistics`]);
  // }, [location, match]);

  // const toggleStats = () => {
  //   open.includes(`${match.url}/statistics`)
  //     ? setOpen(open.filter((path) => path !== `${match.url}/statistics`))
  //     : setOpen([...open, `${match.url}/statistics`]);
  // };


  return (
    <Menu
      defaultSelectedKeys={[]}
      mode="inline"
      style={{ width: width ? width : 250, borderRight: '1px solid #edf2f9', flex: 1 }}
      openKeys={open}
      selectedKeys={[selectedKey]}
    >
      {menuItems.map(({ icon, key, name, subMenu, onTitleClick, to }) => {
        return subMenu ? (
          <SubMenu
            icon={icon &&
              <span
                style={{ width: 10, justifyContent: "center", marginRight: 10 }}
              >
                <FontAwesomeIcon icon={icon} style={{ fontSize: 18 }} />
              </span>
            }
            title={name}
            key={key}
            onTitleClick={onTitleClick}
          >
            {subMenu.map(({ icon, key, name, to }) => (
              <Menu.Item key={key}>
                {icon && <span
                  style={{
                    width: 15,
                    display: "flex",
                    justifyContent: "center",
                    marginRight: 10,
                  }}
                >
                  <FontAwesomeIcon icon={icon} style={{ fontSize: 18 }} />
                </span>}
                <span>{name}</span>
                <Link to={to} />
              </Menu.Item>
            ))}
          </SubMenu>
        ) : layout ? (
          <Menu.Item key={key}>
            {layout}
            <Link to={to} />
          </Menu.Item>
        ) : (
          <Menu.Item key={key}>
            {icon && <span
              style={{
                width: 20,
                display: "flex",
                justifyContent: "center",
                marginRight: 10,
              }}
            >
              <FontAwesomeIcon icon={icon} style={{ fontSize: 18 }} />
            </span>}
            <span>{name}</span>
            <Link to={to} />
          </Menu.Item>
        )
      })}
    </Menu>
  );
};
