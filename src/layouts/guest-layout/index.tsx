import React from 'react';
import Loading from 'components/shared-components/AntD/Loading';
// import PageHeader from 'components/layout-components/AntD/PageHeader';
import { Layout } from 'antd';
import { useThemeSwitcher } from 'react-css-theme-switcher/src';
import { GuestViews } from '../../navigation/guest-views/router';

const { Content } = Layout;

export const GuestLayout = (): JSX.Element => {
  const { status } = useThemeSwitcher();

  if (status === 'loading') {
    return <Loading cover="page" />;
  }

  return (
    <Layout>
      <Layout className="app-container">
        <Layout
          className=""
          style={{
            paddingLeft: 0,
          }}
        >
          <div
            className="app-content"
            style={{
              padding: 0,
            }}
          >
            <Content>
              <GuestViews />
            </Content>
          </div>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default React.memo(GuestLayout);
