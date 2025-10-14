import { Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import { useMediaQuery } from 'react-responsive';

import logo from '../../images/icon-192.png';

interface Props {
  children: JSX.Element;
}

const ScreenSizeUnsupported: React.FC<Props> = ({ children }: Props) => {
  const isSupported = useMediaQuery({ minWidth: 600 });
  const intl = useIntl();

  if (isSupported) {
    return children;
  }
  return (
    <div
      className="unsupported-screen-size-container"
      style={{ height: window.screen.height }}
    >
      <img
        alt={intl.formatMessage({ defaultMessage: 'Alert logo' })}
        className="main-logo"
        src={logo}
      />
      <Typography.Title className="title-text" level={3}>
        {intl.formatMessage({
          defaultMessage: 'Download our mobile app',
        })}
      </Typography.Title>
      <Typography.Text className="subtitle-text" type="secondary">
        {intl.formatMessage({
          defaultMessage:
            'The app gives you a better experience on your mobile than the website.',
        })}
      </Typography.Text>
      <a href="https://play.google.com/store/apps/details?id=co.uk.shopsafealert.app&gl=GB&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1">
        <img
          alt={intl.formatMessage({
            defaultMessage: 'Get it on Google Play',
          })}
          className="google-logo"
          src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
        />
      </a>
      <a
        className="apple-logo-container"
        href="https://apps.apple.com/gb/app/alert/id1497736226?itsct=apps_box_badge&amp;itscg=30200"
      >
        <img
          alt={intl.formatMessage({
            defaultMessage: 'Download on the App Store',
          })}
          className="apple-logo"
          src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&amp;releaseDate=1596585600&h=d061bb2467a3829491c56c906653e3f9"
        />
      </a>
    </div>
  );
};

export default ScreenSizeUnsupported;
