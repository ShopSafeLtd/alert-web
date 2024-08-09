import type { WatermarkSlideType } from 'components/images/WatermartkSlide.view';
import type { InvestigationSuggestionsQuery } from 'graphql/investigations/queries/__generated__/investigation-suggestions.generated';

import {
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Row,
  Tag,
  Typography,
} from 'antd';
import WatermarkImage from 'components/images/WatermarkImage.view';
import WatermarkSlide from 'components/images/WatermartkSlide.view';
import OffenderTable from 'components/tables/OffenderTable/OffenderTable.view';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
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
          <Title level={3} style={{ margin: 0 }}>
            {incident.subject}
          </Title>
          <Text>
            <FormattedMessage
              defaultMessage="Alert ID: {reference}"
              values={{ reference: incident.reference }}
            />
          </Text>
          <Paragraph>{incident.description}</Paragraph>
          <Descriptions style={{ marginBottom: 20, marginTop: 20 }}>
            <Descriptions.Item
              label={<FormattedMessage defaultMessage="Date/Time" />}
            >
              {incident.dayTime}
            </Descriptions.Item>
            {incident.business && (
              <Descriptions.Item
                label={<FormattedMessage defaultMessage="Business" />}
              >
                {incident.business?.name}
              </Descriptions.Item>
            )}
            <Descriptions.Item
              label={<FormattedMessage defaultMessage="Location" />}
            >
              {incident.location?.full}
            </Descriptions.Item>
            <Descriptions.Item
              label={<FormattedMessage defaultMessage="Crime Number" />}
            >
              {incident.policeRef}
            </Descriptions.Item>
            <Descriptions.Item
              label={<FormattedMessage defaultMessage="Incident Type" />}
            >
              <Row>
                {incident.crimeTypes.map((item) => (
                  <Col key={item.id}>
                    <Tag>{item.name}</Tag>
                  </Col>
                ))}
              </Row>
            </Descriptions.Item>
          </Descriptions>
          {incident.offenders && incident.offenders.length > 0 && (
            <Card
              bodyStyle={{ padding: 0 }}
              className={classes.tableContainer}
              headStyle={{ marginTop: -5 }}
              title={<FormattedMessage defaultMessage="Offenders" />}
            >
              <OffenderTable
                hasNavigation={false}
                offenders={incident.offenders}
              />
            </Card>
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
                danger
                onClick={() => handleAddSuggestion(incident.id)}
                type="ghost"
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
