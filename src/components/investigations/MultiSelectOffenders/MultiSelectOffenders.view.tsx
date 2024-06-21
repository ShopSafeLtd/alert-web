import React, { useState } from 'react';
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

import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import WatermarkImage from 'components/images/WatermarkImage.view';

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
import useStyles from './MultiSelectOffenders.style';
import { Role } from 'graphql/types';

const { Title, Text } = Typography;

interface Props {
  offenders: OffenderData[] | undefined;
  handleAddSuggestion: (ids: string[]) => void;
  onClose: () => void;
}

const SuggestedOffenders = ({
  offenders,
  onClose,
  handleAddSuggestion,
}: Props) => {
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
    // <div className={classes.container}>
    <div>
      {offenders?.map((offender) => (
        <Card onClick={() => onSelect(offender.id)}>
          <Row
            gutter={8}
            justify="start"
            align="middle"
            wrap={false}
            className={classes.images}
            style={{
              height:
                offender?.images && offender.images.length > 0 ? undefined : 0,
            }}
          >
            {offender?.images?.map((image) => (
              <Col
                key={image.id}
                // onClick={() => openLightbox(offender, i)}
              >
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
          <Row gutter={10}>
            <Col>
              <Checkbox
                value={offender.id}
                checked={selected.includes(offender.id)}
                onChange={() => onSelect(offender.id)}
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

          <Descriptions style={{ marginTop: 20, marginBottom: 20 }}>
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
              <Button danger type="ghost" onClick={() => onSelect(offender.id)}>
                {intl.formatMessage({
                  defaultMessage: 'Add To Investigation',
                })}
              </Button>
            </Col>
          </Row>

          {/* <Divider /> */}
        </Card>
      ))}
      <Row gutter={16} style={{ marginTop: 30 }} justify="end">
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

export default SuggestedOffenders;
