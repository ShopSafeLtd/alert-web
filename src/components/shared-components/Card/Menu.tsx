import React from 'react';
import { Dropdown, DropDownProps } from 'antd';

interface Props {
  options: DropDownProps['overlay'];
}
/**
 *
 * @param options - 'overlay' prop for AntD Dropdown component
 * @returns JSX.Element
 *
 * @description Renders a kebab menu, which, when clicked, will display the content provided in the options prop.
 */
const Menu: React.FC<Props> = ({ options }: Props) => (
  <div className="dropdown-menu">
    <Dropdown overlay={options} trigger={['hover']} placement="bottomRight">
      <div className="kebab">
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
      </div>
    </Dropdown>
  </div>
);

export default Menu;
