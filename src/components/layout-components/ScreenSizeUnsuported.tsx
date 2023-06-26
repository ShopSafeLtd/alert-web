import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Typography } from 'antd';
import { useIntl } from 'react-intl';
import logo from '../../images/icon-192.png';

interface Props {
  children: JSX.Element;
}

const ScreenSizeUnsupported: React.FC<Props> = ({ children }: Props) => {
  const isSupported = useMediaQuery({ minWidth: 1024 });
  const intl = useIntl();

  if (isSupported) {
    return children;
  }
  return (
    <div
      style={{ height: window.screen.height }}
      className="unsupported-screen-size-container"
    >
      <img
        className="main-logo"
        alt={intl.formatMessage({ defaultMessage: 'Alert logo', id: 'HugE+F' })}
        src={logo}
      />
      <Typography.Title level={3} className="title-text">
        {intl.formatMessage({
          defaultMessage:
            'We no longer support this screen size on the web version of Alert!',
          id: 'TWIGMk',
        })}
      </Typography.Title>
      <Typography.Text type="secondary" className="subtitle-text">
        {intl.formatMessage({
          defaultMessage:
            'Please download our app to experience all the familiar features, with better performance!',
          id: '3yzV/I',
        })}
      </Typography.Text>
      <a href="https://play.google.com/store/apps/details?id=co.uk.shopsafealert.app&gl=GB&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1">
        <img
          className="google-logo"
          alt={intl.formatMessage({
            defaultMessage: 'Get it on Google Play',
            id: '08jKoU',
          })}
          src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
        />
      </a>
      <a
        href="https://apps.apple.com/gb/app/alert/id1497736226?itsct=apps_box_badge&amp;itscg=30200"
        className="apple-logo-container"
      >
        <img
          src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&amp;releaseDate=1596585600&h=d061bb2467a3829491c56c906653e3f9"
          alt={intl.formatMessage({
            defaultMessage: 'Download on the App Store',
            id: '1wokJ7',
          })}
          className="apple-logo"
        />
      </a>
    </div>
  );
};

export default ScreenSizeUnsupported;
