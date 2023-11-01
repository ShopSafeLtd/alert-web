import React, { useState } from 'react';
import { Button, Col, Descriptions, Divider, Row, Typography } from 'antd';
import { Role } from 'graphql/generated';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import WatermarkImage from 'components/images/WatermarkImage.view';
import { Link } from 'react-router-dom';
import { useStoreState } from 'state';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleInfo,
  faEarth,
  faMarsAndVenus,
  faUserClock,
  faUserHair,
  faUserTag,
} from '@fortawesome/pro-light-svg-icons';
import { calcAge } from 'utils';
import {
  getOffenderAge,
  getOffenderBuild,
  getOffenderGender,
  getOffenderRace,
} from 'utils/offender/get-offender-desc';
import type { WatermarkSlideType } from 'components/images/WatermartkSlide.view';
import WatermarkSlide from 'components/images/WatermartkSlide.view';
import { useIntl } from 'react-intl';
import type { OffenderData } from 'types/DataType';
import useStyles from './potentialOffenders.style';

const { Title, Text } = Typography;

interface Props {
  suggestedData: OffenderData[];
  onClose: () => void;
}

const PotentialOffenders = ({ suggestedData, onClose }: Props) => {
  const intl = useIntl();
  const classes = useStyles();
  const role = useStoreState((state) => state.user.role);
  const publicOffenderDOB =
    useStoreState((state) => state.scheme.defaultPublicOffenderDOB) ||
    role !== Role.User;

  const [lightBoxOpen, setLightBoxOpen] = useState({
    open: false,
    index: 0,
  });
  const [lightboxElements, setLightboxElements] = useState<{ src: string }[]>(
    []
  );

  const openLightbox = (
    offender: {
      images: { id: string; optimised?: string | undefined | null }[];
    },
    index: number
  ) => {
    setLightboxElements(
      offender.images.map((image) => ({
        src: image.optimised || '',
      })) || []
    );
    setLightBoxOpen({ open: !lightBoxOpen.open, index });
  };

  return (
    <div className={classes.container}>
      {suggestedData.map((offender) => (
        <div>
          {offender?.images && offender?.images.length > 0 && (
            <Row
              gutter={8}
              justify="start"
              align="middle"
              wrap={false}
              className={classes.images}
              // style={{
              //   height:
              //     ? undefined : 0,
              // }}
            >
              {/* {offender?.images.map((image, i) => (
                <Col key={image.id}
                  onClick={() => openLightbox(offender, i)}
                >
                  <div className={classes.image}>
                    <WatermarkImage
                      url={image.optimised}
                      rotation={image.rotation}
                      position={image.position}
                    />
                  </div>
                </Col>
              ))} */}
              {offender?.images.map((image) => (
                <Col key={image.id}>
                  <div className={classes.image}>
                    <WatermarkImage
                      url={image.optimised}
                      rotation={image.rotation}
                      position={image.position}
                    />
                  </div>
                </Col>
              ))}
            </Row>
          )}
          <Title level={3} style={{ margin: 0 }}>
            {offender.name}
          </Title>
          <Text>
            {intl.formatMessage(
              { defaultMessage: 'Alert ID: {ref}', id: 'umL9sI' },
              { ref: offender.reference }
            )}
          </Text>
          <Descriptions style={{ marginTop: 20, marginBottom: 20 }}>
            {offender.alias && offender.alias.length > 0 ? (
              <Descriptions.Item
                label={intl.formatMessage({
                  defaultMessage: 'Alias: ',
                  id: 'eZm/Sa',
                })}
              >
                {offender.alias.map((item) => (
                  <Text>{item}</Text>
                ))}
              </Descriptions.Item>
            ) : undefined}
            {publicOffenderDOB ? (
              <Descriptions.Item
                label={
                  <span>
                    <FontAwesomeIcon
                      className={classes.descIcon}
                      icon={faUserClock}
                    />
                    {intl.formatMessage({
                      defaultMessage: 'Age',
                      id: '9oNQSC',
                    })}
                  </span>
                }
              >
                {offender.dateOfBirth
                  ? calcAge(offender.dateOfBirth)
                  : getOffenderAge(offender.age)}
              </Descriptions.Item>
            ) : undefined}
            <Descriptions.Item
              label={
                <span>
                  <FontAwesomeIcon
                    className={classes.descIcon}
                    icon={faMarsAndVenus}
                  />
                  {intl.formatMessage({ defaultMessage: 'Sex', id: 'eWJHGp' })}
                </span>
              }
            >
              {getOffenderGender(offender.gender)}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <span>
                  <FontAwesomeIcon
                    className={classes.descIcon}
                    icon={faUserTag}
                  />
                  {intl.formatMessage({
                    defaultMessage: 'Build',
                    id: 'RSctv1',
                  })}
                </span>
              }
            >
              {getOffenderBuild(offender.build)}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <span>
                  <FontAwesomeIcon
                    className={classes.descIcon}
                    icon={faEarth}
                  />
                  {intl.formatMessage({
                    defaultMessage: 'Ethnicity',
                    id: 'XtCAFo',
                  })}
                </span>
              }
            >
              {getOffenderRace(offender.race, false)}
            </Descriptions.Item>
            {offender.hair && (
              <Descriptions.Item
                label={
                  <span>
                    <FontAwesomeIcon
                      className={classes.descIcon}
                      icon={faUserHair}
                    />
                    {intl.formatMessage({
                      defaultMessage: 'Hair',
                      id: 'e4YBbX',
                    })}
                  </span>
                }
              >
                {offender.hair}
              </Descriptions.Item>
            )}
          </Descriptions>
          <Descriptions column={1}>
            {offender?.peculiarities && (
              <Descriptions.Item
                label={
                  <span>
                    <FontAwesomeIcon
                      className={classes.descIcon}
                      icon={faCircleInfo}
                    />
                    {intl.formatMessage({
                      defaultMessage: 'Additional Information',
                      id: 'laUK3e',
                    })}
                  </span>
                }
              >
                {offender.peculiarities}
              </Descriptions.Item>
            )}
          </Descriptions>

          <Row gutter={8} justify="end">
            <Col>
              <Link to={`/app/offenders/view/${offender.id}`} onClick={onClose}>
                <Button>
                  {intl.formatMessage({
                    defaultMessage: 'View Offender',
                    id: 'GszQTo',
                  })}
                </Button>
              </Link>
            </Col>
          </Row>
          <Divider />
        </div>
      ))}
      <Lightbox
        open={lightBoxOpen.open}
        close={() => openLightbox({ images: [] }, 0)}
        plugins={[Zoom]}
        index={lightBoxOpen.index}
        slides={lightboxElements}
        controller={{
          closeOnBackdropClick: true,
        }}
        render={{
          slide: (slide: WatermarkSlideType) => (
            <WatermarkSlide slide={slide} />
          ),
        }}
      />
    </div>
  );
};

export default PotentialOffenders;
