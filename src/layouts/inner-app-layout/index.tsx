/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import { Grid, Drawer } from 'antd';
import utils from 'utils';
import { MenuOutlined } from '@ant-design/icons';
import type CSS from 'csstype';

const { useBreakpoint } = Grid;

interface SideContentProps {
  sideContent?: React.ReactNode;
  sideContentWidth?: number;
  border?: boolean;
}

export const SideContent = (props: SideContentProps): JSX.Element => {
  const { sideContent, sideContentWidth = 150, border } = props;
  return (
    <div
      className={`side-content ${border ? 'with-border' : ''}`}
      style={{ width: `${sideContentWidth}px` }}
    >
      {sideContent}
    </div>
  );
};

interface SideContentMobileProps {
  sideContent?: React.ReactNode;
  onSideContentClose(): void;
  visible?: boolean;
}

const SideContentMobile = (props: SideContentMobileProps) => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { sideContent, visible, onSideContentClose } = props;
  return (
    <Drawer
      width={320}
      placement="left"
      closable={false}
      onClose={onSideContentClose}
      visible={visible}
      bodyStyle={{ paddingLeft: 0, paddingRight: 0 }}
    >
      <div className="h-100">{sideContent}</div>
    </Drawer>
  );
};

interface InnerAppLayoutProps {
  mainContent: React.ReactNode;
  sideContent?: React.ReactNode;
  pageHeader?: boolean;
  sideContentGutter?: boolean;
  sideContentWidth?: number;
  style?: CSS.Properties;
  contentStyle?: CSS.Properties;
}

export const InnerAppLayout = (props: InnerAppLayoutProps): JSX.Element => {
  const { mainContent, pageHeader, sideContentGutter = true } = props;
  // ???
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const isMobile = !utils.getBreakPoint(useBreakpoint()).includes('lg');
  const [visible, setVisible] = useState(false);
  const { style, contentStyle } = props;
  const close = () => {
    setVisible(false);
  };

  const openSideContentMobile = () => {
    setVisible(true);
  };

  return (
    // @ts-ignore
    <div className="inner-app-layout" style={style}>
      {isMobile ? (
        <SideContentMobile
          visible={visible}
          onSideContentClose={close}
          {...props}
        />
      ) : (
        <SideContent {...props} />
      )}
      <div
        className={`main-content ${pageHeader ? 'has-page-header' : ''} ${
          sideContentGutter ? 'gutter' : 'no-gutter'
        }`}
        // @ts-ignore
        style={{ display: 'flex', ...contentStyle }}
      >
        {isMobile ? (
          <div
            className={`font-size-lg mb-3 ${
              sideContentGutter ? '' : 'pt-3 px-3'
            }`}
          >
            <MenuOutlined onClick={() => openSideContentMobile()} />
          </div>
        ) : null}
        {mainContent}
      </div>
    </div>
  );
};

export default InnerAppLayout;
