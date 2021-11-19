import React, { useEffect, useState } from 'react';
import { Dropdown, DropDownProps } from 'antd';

interface Props {
  options: DropDownProps['overlay'];
  feedContainerRef: React.RefObject<any>;
}
/**
 *
 * @param options - 'overlay' prop for AntD Dropdown component
 * @returns JSX.Element
 *
 * @description Renders a kebab menu, which, when clicked, will display the content provided in the options prop.
 */
const Menu: React.FC<Props> = ({ options, feedContainerRef }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const handleChange = (value: boolean) => setVisible(value);

  useEffect(() => {
    console.log(feedContainerRef);

    window.onscroll = () => handleChange(false);
  });

  console.log(visible);
  return (
    <div className="dropdown-menu">
      <Dropdown
        visible={visible}
        onVisibleChange={handleChange}
        overlay={options}
        trigger={['hover']}
        placement="bottomRight"
      >
        <div className="kebab">
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
        </div>
      </Dropdown>
    </div>
  );
};

export default Menu;
