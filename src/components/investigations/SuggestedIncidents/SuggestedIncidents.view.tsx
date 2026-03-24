import type { WatermarkSlideType } from 'components/images/WatermartkSlide.view';
import type { InvestigationSuggestionsQuery } from 'graphql/investigations/queries/__generated__/investigation-suggestions.generated';

import { currencyAtom } from '#/providers/SchemeProvider/SchemeProvider';
import publicOffenderDob from '#/utils/public-offender-dob';
import { faUsers } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Col,
  Descriptions,
  Divider,
  Row,
  Skeleton,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import WatermarkImage from 'components/images/WatermarkImage.view';
import WatermarkSlide from 'components/images/WatermartkSlide.view';
import IncidentPriorityTag from 'components/incidents/IncidentPriority/IncidentPriorityTag.view';
import { useAtomValue } from 'jotai';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
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

import useStyles from './SuggestedIncidents.style';

const { Paragraph, Text, Title } = Typography;

interface Props {
  handleAddSuggestion: (id: string) => void;
  onClose: () => void;
  suggestedData: InvestigationSuggestionsQuery | undefined;
}

const SuggestedIncidents = ({
  handleAddSuggestion,
  onClose,
  suggestedData,
}: Props) => {
  const classes = useStyles();
  const intl = useIntl();
  const currency = useAtomValue(currencyAtom);
  const publicOffenderDOB = publicOffenderDob();
  const [lightBoxOpen, setLightBoxOpen] = useState<{
    index: number;
    open: boolean;
  }>({
    index: 0,
    open: false,
  });
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
    <div className={classes.container}>
      {suggestedData?.investigation?.suggestedIncidents?.map((incident) => (
        <div key={incident.id}>
          <Row
            align="middle"
            className={classes.images}
            gutter={8}
            justify="start"
            style={{
              height: incident.images.length > 0 ? undefined : 0,
            }}
            wrap={false}
          >
            {incident?.images.map((image, i) => (
              <Col key={image.id} onClick={() => openLightbox(incident, i)}>
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

          {/* Header: title + priority/status badges */}
          <Row align="middle" gutter={8} style={{ marginBottom: 4 }}>
            <Col flex="auto">
              <Title level={3} style={{ margin: 0 }}>
                {incident.subject}
              </Title>
            </Col>
            {incident.priority && (
              <Col>
                <IncidentPriorityTag value={incident.priority} />
              </Col>
            )}
            {incident.status && (
              <Col>
                <Tooltip title={incident.status.tooltip ?? undefined}>
                  <Tag>{incident.status.name}</Tag>
                </Tooltip>
              </Col>
            )}
          </Row>

          <Text type="secondary">
            <FormattedMessage
              defaultMessage="Alert ID: {reference}"
              values={{ reference: incident.reference }}
            />
          </Text>
          {incident.description && (
            <Paragraph style={{ marginTop: 8 }}>
              {incident.description}
            </Paragraph>
          )}

          <Descriptions
            bordered={false}
            column={{ lg: 3, md: 2, sm: 2, xl: 3, xs: 1 }}
            size="small"
            style={{ marginBottom: 20, marginTop: 16 }}
          >
            <Descriptions.Item
              label={<FormattedMessage defaultMessage="Date/Time" />}
            >
              {incident.dayTime}
            </Descriptions.Item>

            {incident.business && (
              <Descriptions.Item
                label={<FormattedMessage defaultMessage="Business" />}
              >
                <Link
                  onClick={onClose}
                  to={`/app/businesses/view/${incident.business.id}`}
                >
                  {incident.business.name}
                </Link>
              </Descriptions.Item>
            )}

            {incident.location?.full && (
              <Descriptions.Item
                label={<FormattedMessage defaultMessage="Location" />}
              >
                {incident.location.full}
              </Descriptions.Item>
            )}

            {incident.policeRef && (
              <Descriptions.Item
                label={<FormattedMessage defaultMessage="Crime Number" />}
              >
                {incident.policeRef}
              </Descriptions.Item>
            )}

            {incident.crimeTypes.length > 0 && (
              <Descriptions.Item
                label={<FormattedMessage defaultMessage="Incident Type" />}
              >
                <Row gutter={[4, 4]}>
                  {incident.crimeTypes.map((item) => (
                    <Col key={item.id}>
                      <Tag>{item.name}</Tag>
                    </Col>
                  ))}
                </Row>
              </Descriptions.Item>
            )}

            {incident.totalValue > 0 && (
              <Descriptions.Item
                label={<FormattedMessage defaultMessage="Total Loss" />}
              >
                <Text strong>
                  {intl.formatNumber(incident.totalValue, {
                    currency,
                    style: 'currency',
                  })}
                </Text>
              </Descriptions.Item>
            )}

            {incident.totalRecoveredValue > 0 && (
              <Descriptions.Item
                label={<FormattedMessage defaultMessage="Recovered" />}
              >
                {intl.formatNumber(incident.totalRecoveredValue, {
                  currency,
                  style: 'currency',
                })}
              </Descriptions.Item>
            )}

            {incident.assignedUsers.length > 0 && (
              <Descriptions.Item
                label={<FormattedMessage defaultMessage="Assigned To" />}
              >
                {incident.assignedUsers.map((u) => u.fullName).join(', ')}
              </Descriptions.Item>
            )}
          </Descriptions>

          {incident.offenders && incident.offenders.length > 0 && (
            <div className={classes.offendersSection}>
              <div className={classes.sectionHeading}>
                <FontAwesomeIcon icon={faUsers} />
                <span>
                  {intl.formatMessage({ defaultMessage: 'Offenders' })}
                </span>
                <span className={classes.sectionCount}>
                  {incident.offenders.length}
                </span>
              </div>
              {incident.offenders.map((offender) => {
                const gender = getOffenderGender(offender.gender);
                const ethnicity = getOffenderRace(offender.race, true);
                const age = publicOffenderDOB
                  ? offender.dateOfBirth
                    ? String(calcAge(offender.dateOfBirth))
                    : getOffenderAge(offender.age)
                  : undefined;
                const build = getOffenderBuild(offender.build);
                const demographicParts = [gender, ethnicity, age, build].filter(
                  Boolean
                );
                const hasDemographics = demographicParts.length > 0;

                return (
                  <div
                    className={classes.card}
                    key={offender.id}
                    style={{ marginBottom: 12 }}
                  >
                    {/* Primary image */}
                    <div
                      style={{ display: 'flex', flexShrink: 0, height: 220 }}
                    >
                      {offender.images.length > 0 ? (
                        <div className={classes.offenderImage}>
                          <WatermarkImage
                            position={offender.images[0].position}
                            rotation={offender.images[0].rotation}
                            url={offender.images[0].optimised}
                          />
                        </div>
                      ) : (
                        <Skeleton.Image className={classes.imageSkeleton} />
                      )}
                    </div>

                    {/* Content */}
                    <div className={classes.cardContent}>
                      {/* Name + reference */}
                      <Typography.Text className={classes.offenderName}>
                        <span
                          style={{
                            flex: 1,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {offender.name ||
                            intl.formatMessage({ defaultMessage: 'Unknown' })}
                        </span>
                        {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                        <span
                          className={classes.reference}
                          style={{ flexShrink: 0 }}
                        >
                          #{offender.reference}
                        </span>
                      </Typography.Text>

                      <div className={classes.infoSection}>
                        {/* Demographics */}
                        {hasDemographics && (
                          <div className={classes.detailRow}>
                            <Typography.Text className={classes.detailText}>
                              {demographicParts.map((part, i) => (
                                // eslint-disable-next-line react/no-array-index-key
                                <React.Fragment key={i}>
                                  {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                                  {i > 0 && ' • '}
                                  {part}
                                </React.Fragment>
                              ))}
                            </Typography.Text>
                          </div>
                        )}

                        {/* Known for */}
                        {offender.knownFor.length > 0 && (
                          <div className={classes.detailRow}>
                            <Typography.Text className={classes.detailText}>
                              {offender.knownFor.join(', ')}
                            </Typography.Text>
                          </div>
                        )}

                        {/* Wanted badge */}
                        {offender.wanted && (
                          <Tag color="red" style={{ marginTop: 4 }}>
                            <FormattedMessage defaultMessage="Wanted" />
                          </Tag>
                        )}
                      </div>

                      {/* Action */}
                      <div className={classes.actionRow}>
                        <Link
                          onClick={onClose}
                          to={`/app/offenders/view/${offender.id}`}
                        >
                          <Button size="small">
                            {intl.formatMessage({
                              defaultMessage: 'View Offender',
                            })}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <Row gutter={8} justify="end">
            <Col>
              <Link onClick={onClose} to={`/app/incidents/view/${incident.id}`}>
                <Button>
                  <FormattedMessage defaultMessage="View Incident" />
                </Button>
              </Link>
            </Col>
            <Col>
              <Button
                onClick={() => handleAddSuggestion(incident.id)}
                type="primary"
              >
                <FormattedMessage defaultMessage="Add To Investigation" />
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

export default SuggestedIncidents;
