/* eslint-disable react/jsx-key */
import type { WatermarkSlideType } from 'components/images/WatermartkSlide.view';
import type { SuggestedCrimeGroupMembersQuery } from 'graphql/crime-groups/queries/__generated__/suggested-memebrs.generated';

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
import { Button, Col, Descriptions, Divider, Row, Typography } from 'antd';
import WatermarkImage from 'components/images/WatermarkImage.view';
import WatermarkSlide from 'components/images/WatermartkSlide.view';
import IncidentTable from 'components/tables/IncidentTable/IncidentTable.view';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { calcAge } from 'utils';
import {
  getOffenderAge,
  getOffenderBuild,
  getOffenderGender,
  getOffenderRace,
} from 'utils/offender/get-offender-desc';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import useStyles from './SuggestedMembers.style';

const { Paragraph, Text, Title } = Typography;

interface Props {
  handleAddSuggestion: (id: string) => void;
  onClose: () => void;
  suggestedData: SuggestedCrimeGroupMembersQuery | undefined;
}
type Offender =
  SuggestedCrimeGroupMembersQuery['crimeGroup']['suggestedMembers'][number];
const SuggestedMembers = ({
  handleAddSuggestion,
  onClose,
  suggestedData,
}: Props) => {
  const classes = useStyles();

  const publicOffenderDOB = publicOffenderDob();

  const [lightBoxOpen, setLightBoxOpen] = useState({
    index: 0,
    open: false,
  });
  const [lightboxElements, setLightboxElements] = useState<{ src: string }[]>(
    []
  );

  const openLightbox = (offender: Pick<Offender, 'images'>, index: number) => {
    setLightboxElements(
      offender.images.map((image) => ({
        src: image.optimised || '',
      })) || []
    );
    setLightBoxOpen({ index, open: !lightBoxOpen.open });
  };
  const intl = useIntl();
  return (
    <div className={classes.container}>
      {suggestedData?.crimeGroup?.suggestedMembers?.map((offender) => (
        <div>
          <Row
            align="middle"
            className={classes.images}
            gutter={8}
            justify="start"
            style={{
              height: offender.images.length > 0 ? undefined : 0,
            }}
            wrap={false}
          >
            {offender?.images.map((image, i) => (
              <Col key={image.id} onClick={() => openLightbox(offender, i)}>
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
          <Title level={3} style={{ margin: 0 }}>
            {offender.name}
          </Title>
          <Text>
            {intl.formatMessage(
              { defaultMessage: 'Alert ID: {ref}' },
              {
                ref: offender.reference,
              }
            )}
          </Text>
          <Descriptions style={{ marginBottom: 20, marginTop: 20 }}>
            {offender.alias.length > 0 ? (
              <Descriptions.Item
                label={intl.formatMessage({
                  defaultMessage: 'Alias ',
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
          {offender.associatedIncidents &&
            offender.associatedIncidents.length > 0 && (
              <div className={classes.tableContainer}>
                <Paragraph className={classes.explainText}>
                  {intl.formatMessage(
                    {
                      defaultMessage:
                        'This offender shares {total} incidents with offenders in this group',
                    },
                    {
                      total: offender.totalAssociatedIncidents,
                    }
                  )}
                </Paragraph>
                <IncidentTable
                  hasNavigation
                  incidents={offender?.associatedIncidents || []}
                />
              </div>
            )}
          <Row gutter={8} justify="end">
            <Col>
              <Link onClick={onClose} to={`/app/offenders/view/${offender.id}`}>
                <Button>
                  {intl.formatMessage({
                    defaultMessage: 'View Offender',
                  })}
                </Button>
              </Link>
            </Col>
            <Col>
              <Button
                danger
                onClick={() => handleAddSuggestion(offender.id)}
                type="ghost"
              >
                {intl.formatMessage({
                  defaultMessage: 'Add Offender',
                })}
              </Button>
            </Col>
          </Row>
          <Divider />
        </div>
      ))}
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

export default SuggestedMembers;
