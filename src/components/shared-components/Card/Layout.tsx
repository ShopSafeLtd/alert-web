/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
import React, { useEffect, useRef, useState } from 'react';
import type { DropDownProps } from 'antd';
import { Button, Carousel, Col, Row, Tabs, Typography } from 'antd';
import {
  IoChevronBack,
  IoChevronForward,
  IoImagesOutline,
} from 'react-icons/io5';

import { useStoreActions, useStoreState } from 'state';
import type { CarouselRef } from 'antd/lib/carousel';
import WatermarkImage from 'components/images/WatermarkImage.view';
import { useIntl } from 'react-intl';
import CardMenu from './Menu';

const { TabPane } = Tabs;

interface Approval {
  approved: boolean;
  approve: () => void;
  decline: () => void;
}

interface Props {
  key: string;
  type: 'Offender' | 'Incident';
  tabs: { label: string; content: JSX.Element }[];
  images: { id: string; url: string; optimised: string | undefined }[];
  menu: DropDownProps['overlay'];
  approval: Approval;
  // eslint-disable-next-line react/require-default-props
  additionalItems?: JSX.Element[];
}

/**
 *
 * @param props - {@link Props}
 * @param props.key - Unique string for React to use as a key. Ideally item.id.
 * @param props.type - 'Offender' | 'Incident'
 * @param props.tabs - Array<{ label: string, content: JSX.Element }>.
 * @param props.images - Array<{ id: string, url: string, optimised: string | undefined }.
 * @param props.menu - AntD Dropdown 'overlay' prop.
 * @param props.approval - { approved: boolean, approve: ()=>void, decline: ()=>void }
 * @param props.additionalItems - Array of JSX.Element to display.
 *
 * @returns JSX.Element to be rendered in a feed.
 *
 * @description Provides the default structure for a feed card. The provided tabs are iterated over to generate the content on the card, and the provided images will be displayed in a swiper which supports lightbox on click. The menu prop expects the same format as the 'overlay' prop on the AntD Dropdown component. The additional items prop expects an array of JSX.Elements to be displayed. This allows for the addition of extra elements on the card, and are expected to be styled with position: absolute (for reference, the image section has a height of 265px, ).
 */
const Layout: React.FC<Props> = ({
  key,
  type,
  tabs,
  images,
  menu,
  approval,
  additionalItems,
}: Props) => {
  const intl = useIntl();
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [overlay, setOverlay] = useState<boolean>(!approval.approved);
  const userRole = useStoreState((state) => state.user.role);

  const carouselRef = useRef<CarouselRef>(null);
  useEffect(() => {
    carouselRef.current?.goTo(0);
  }, []);

  const toggleOverlay = () => setOverlay((prev) => !prev);
  const toggleLightBox = useStoreActions(
    (actions) => actions.theme.toggleLightBox
  );
  const lightBoxImages = images.map((img) => img.optimised || img.url);

  const showPrev = images.length > 0 && imageIndex !== 0;
  const showNext = images.length > 0 && imageIndex < images.length - 1;
  const nextImage = () => carouselRef.current?.next();
  const prevImage = () => carouselRef.current?.prev();
  const onImageIndexChange = (index: number) => setImageIndex(index);

  const admin = userRole !== 'USER';

  return (
    <div key={key} className="feed-card">
      {overlay && (
        <div className="unapproved-overlay">
          {admin && (
            <Button type="primary" onClick={toggleOverlay}>
              {intl.formatMessage(
                {
                  defaultMessage: `View & Approve {type}`,
                  id: 'wy4d6A',
                },
                {
                  type: type.toLowerCase(),
                }
              )}
            </Button>
          )}
          {!admin && (
            <Row align="middle" justify="center">
              <Col span={16}>
                <Row align="middle" justify="center" gutter={[0, 8]}>
                  <Typography.Title level={3}>
                    {intl.formatMessage({
                      defaultMessage: 'Awaiting Approval...',
                      id: 'YLoz+Y',
                    })}
                  </Typography.Title>
                  <Typography.Text>
                    {intl.formatMessage(
                      {
                        defaultMessage:
                          'Your administrator has not yet approved this {type}',
                        id: 'tYju2G',
                      },
                      {
                        type: type.toLowerCase(),
                      }
                    )}
                  </Typography.Text>
                </Row>
              </Col>
            </Row>
          )}
        </div>
      )}
      {!approval.approved && !overlay && (
        <div className="unapproved-options">
          <button className="option approve" onClick={approval.approve}>
            {intl.formatMessage({
              defaultMessage: 'APPROVE',
              id: 'CrPB/+',
            })}
          </button>
          <button className="option decline" onClick={approval.decline}>
            {intl.formatMessage({
              defaultMessage: 'DECLINE',
              id: '39UGGJ',
            })}
          </button>
          <button className="option cancel" onClick={toggleOverlay}>
            {intl.formatMessage({
              defaultMessage: 'CANCEL',
              id: 'X5wtUo',
            })}
          </button>
        </div>
      )}

      {additionalItems}
      {admin && <CardMenu options={menu} />}

      {images.length > 0 ? (
        <div className="image-carousel">
          <Carousel
            afterChange={onImageIndexChange}
            ref={carouselRef}
            dots={false}
          >
            {images.map((image) => (
              // eslint-disable-next-line jsx-a11y/no-static-element-interactions
              <div
                key={image.id}
                onClick={() =>
                  toggleLightBox({
                    images: lightBoxImages,
                    index: imageIndex,
                  })
                }
              >
                <WatermarkImage url={image.url} />
              </div>
            ))}
          </Carousel>
          {showPrev && (
            <button className="arrow left" onClick={prevImage}>
              <IoChevronBack size={24} color="#fff" />
            </button>
          )}
          {showNext && (
            <button className="arrow right" onClick={nextImage}>
              <IoChevronForward size={24} color="#fff" />
            </button>
          )}
        </div>
      ) : (
        <div className="no-image">
          <IoImagesOutline color="#959595" size="36px" />
          <Typography.Text>
            {intl.formatMessage({
              defaultMessage: 'No Images',
              id: 'SxFGH/',
            })}
          </Typography.Text>
        </div>
      )}

      <Tabs defaultActiveKey="1" centered animated>
        {tabs.map((tab) => (
          <TabPane tab={tab.label.toUpperCase()} key={tab.label}>
            <div className="tab-pane-content">{tab.content}</div>
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default Layout;
