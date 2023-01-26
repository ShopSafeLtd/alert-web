import React from 'react';
import { Card, Image, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import useImageLoaded from '../../utils/use-image-loaded';

const Icon = <LoadingOutlined style={{ fontSize: 35 }} spin />;

export interface Props {
  // align?: 'center' | 'left' | 'right';
  // cover?: string;
  size?: 'default' | 'small' | 'large' | undefined;
}

const Loading = ({
  // align = 'center',
  // cover = 'inline',
  size,
}: Props): JSX.Element => {
  const { ref, loaded } = useImageLoaded();

  return (
    <div
      className="h-100 w-100"
      style={{
        position: 'absolute',
        background: 'linear-gradient(to right, #cb2d3e, #ef473a)',
      }}
    >
      <div
        style={{
          height: '100vh',
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          flexGrow: 1,
        }}
      >
        <Card
          style={{
            paddingTop: '2em',
            paddingBottom: '2em',
            width: '400px',
            height: '210px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            style={{ width: '250px', paddingRight: '20px' }}
            preview={false}
            hidden={!loaded}
            src="/img/logo.svg"
            alt=""
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 30,
            }}
            ref={ref}
          >
            {loaded && <Spin size={size} indicator={Icon} />}
          </div>
        </Card>
      </div>
    </div>
  );
};

Loading.defaultProps = {
  // align: undefined,
  // cover: undefined,
  size: undefined,
};

export default Loading;
