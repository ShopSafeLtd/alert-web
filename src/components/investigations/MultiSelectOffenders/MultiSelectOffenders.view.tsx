import type { WatermarkSlideType } from 'components/images/WatermartkSlide.view';
import type { OffenderData } from 'types/DataType';

import publicOffenderDob from '#/utils/public-offender-dob';
import {
  faCircleInfo,
  faEarth,
  faMarsAndVenus,
  faUserClock,
  faUserHair,
  faUserTag,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  Checkbox,
  Col,
  Descriptions,
  // Divider,
  Row,
  Typography,
} from 'antd';
import WatermarkImage from 'components/images/WatermarkImage.view';
import WatermarkSlide from 'components/images/WatermartkSlide.view';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { calcAge } from 'utils';
import {
  getOffenderAge,
  getOffenderBuild,
  getOffenderGender,
  getOffenderRace,
} from 'utils/offender/get-offender-desc';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import useStyles from './MultiSelectOffenders.style';

const { Text, Title } = Typography;

interface Props {
  handleAddSuggestion: (ids: string[]) => void;
  offenders: OffenderData[] | undefined;
  onClose: () => void;
}

const SuggestedOffenders = ({
  handleAddSuggestion,
  offenders,
  onClose,
}: Props) => {
  const intl = useIntl();
  const classes = useStyles();
  const publicOffenderDOB = publicOffenderDob();

  const [lightBoxOpen, setLightBoxOpen] = useState({
    index: 0,
    open: false,
  });
  const [selected, setSelected] = useState<string[]>([]);

  const onSelect = (id: string) => {
    if (id) {
      if (selected.includes(id)) {
        setSelected(selected.filter((index) => index !== id));
      } else {
        setSelected([...selected, id]);
      }
    }
  };
  const [lightboxElements, setLightboxElements] = useState<{ src: string }[]>(
    []
  );

  const openLightbox = (
    offender: {
      images: { id: string; optimised?: null | string | undefined }[];
    },
    index: number
  ) => {
    setLightboxElements(
      offender.images.map((image) => ({
        src: image.optimised || '',
      })) || []
    );
    setLightBoxOpen({ index, open: !lightBoxOpen.open });
  };

  return (
    // <div className={classes.container}>
    <div>
      {offenders?.map((offender) => (
        <Card onClick={() => onSelect(offender.id)}>
          <Row
            align="middle"
            className={classes.images}
            gutter={8}
            justify="start"
            style={{
              height:
                offender?.images && offender.images.length > 0 ? undefined : 0,
            }}
            wrap={false}
          >
            {offender?.images?.map((image) => (
              <Col
                key={image.id}
                // onClick={() => openLightbox(offender, i)}
              >
                <div className={classes.image}>
                  <WatermarkImage
                    position={image.position}
                    rotation={image.rotation}
                    url={image.optimised}
                  />
                </div>
              </Col>
            ))}
          </Row>
          <Row gutter={10}>
            <Col>
              <Checkbox
                checked={selected.includes(offender.id)}
                onChange={() => onSelect(offender.id)}
                value={offender.id}
                // style={{ bord }}
              />
            </Col>
            <Col>
              <Title level={3} style={{ margin: 0 }}>
                {offender.name}
              </Title>
            </Col>
            <Col style={{ marginTop: 3 }}>
              <Text>
                {intl.formatMessage(
                  { defaultMessage: 'Alert ID: {ref}' },
                  { ref: offender.reference }
                )}
              </Text>
            </Col>
          </Row>

          <Descriptions style={{ marginBottom: 20, marginTop: 20 }}>
            {offender.alias && offender.alias.length > 0 ? (
              <Descriptions.Item
                label={intl.formatMessage({
                  defaultMessage: 'Alias: ',
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
                  {intl.formatMessage({
                    defaultMessage: 'Sex',
                  })}
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
                    })}
                  </span>
                }
              >
                {offender.hair}
              </Descriptions.Item>
            )}
          </Descriptions>
          <Descriptions column={1}>
            {offender.peculiarities && (
              <Descriptions.Item
                label={
                  <span>
                    <FontAwesomeIcon
                      className={classes.descIcon}
                      icon={faCircleInfo}
                    />
                    {intl.formatMessage({
                      defaultMessage: 'Additional Information',
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
              <Button danger onClick={() => onSelect(offender.id)} type="ghost">
                {intl.formatMessage({
                  defaultMessage: 'Add To Investigation',
                })}
              </Button>
            </Col>
          </Row>

          {/* <Divider /> */}
        </Card>
      ))}
      <Row gutter={16} justify="end" style={{ marginTop: 30 }}>
        <Col>
          <Button onClick={onClose} type="text">
            {intl.formatMessage({ defaultMessage: 'Cancel' })}
          </Button>
        </Col>
        <Col>
          <Button
            // loading={saving}
            disabled={selected.length === 0}
            onClick={() => handleAddSuggestion(selected)}
            type="primary"
          >
            {intl.formatMessage({
              defaultMessage: 'Add Offedners',
            })}
          </Button>
        </Col>
      </Row>
      <Lightbox
        close={() => openLightbox({ images: [] }, 0)}
        controller={{
          closeOnBackdropClick: true,
        }}
        index={lightBoxOpen.index}
        open={lightBoxOpen.open}
        plugins={[Zoom]}
        render={{
          slide: (slide: WatermarkSlideType) => (
            <WatermarkSlide slide={slide} />
          ),
        }}
        slides={lightboxElements}
      />
    </div>
  );
};

export default SuggestedOffenders;
