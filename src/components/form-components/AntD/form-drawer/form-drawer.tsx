import { Drawer, DrawerProps } from 'antd';
import React from 'react';

/**
 * @description In addition to the defined props, accepts any AntD drawer props. https://ant.design/components/drawer/
 */
interface FormDrawerProps extends DrawerProps {
  title: React.ReactNode;
  visible: boolean;
  onClose: () => void;
  width?: number;
  children: JSX.Element;
}

/**
 * @see {@link FormDrawerProps}
 * @param {React.ReactNode} props.title - form title
 * @param {boolean} props.visible - if false, drawer closed
 * @param {function} props.onClose - action to perform when 'x' close button is pressed
 * @param {number} props.width - default = 480
 * @param {JSX.Element} props.children - the component to render inside the form drawer
 * @returns JSX.Element
 *
 * @description A small abstraction over the AntD drawer component which provides a way to keep all form drawers consistent across the application.
 */
const FormDrawer = ({
  title,
  visible,
  onClose,
  width = 480,
  children,
  ...props
}: FormDrawerProps): JSX.Element => (
  <Drawer
    title={title}
    visible={visible}
    onClose={onClose}
    width={width}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  >
    {children}
  </Drawer>
);

FormDrawer.defaultProps = {
  width: 480,
};

export default FormDrawer;
