import type { WatermarkSlideType } from 'components/images/WatermartkSlide.view';
import type { OffenderData } from 'types/DataType';

import publicOffenderDob from '#/utils/public-offender-dob';
import {
  faCheckCircle,
  faCircleInfo,
  faTag,
  faUser,
  faUserHair,
  faUserTag,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Row, Skeleton, Typography } from 'antd';
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
  const [lightboxElements, setLightboxElements] = useState<{ src: string }[]>(
    []
  );

  const onSelect = (id: string) => {
    if (id) {
      if (selected.includes(id)) {
        setSelected(selected.filter((index) => index !== id));
      } else {
        setSelected([...selected, id]);
      }
    }
  };

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
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {offenders?.map((offender) => {
          const isSelected = selected.includes(offender.id);

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
              className={`${classes.card} ${isSelected ? classes.cardSelected : ''}`}
              key={offender.id}
              onClick={() => onSelect(offender.id)}
            >
              {/* Selection checkmark */}
              {isSelected && (
                <FontAwesomeIcon
                  className={classes.checkmark}
                  icon={faCheckCircle}
                />
              )}

              {/* Primary image */}
              <div style={{ display: 'flex', flexShrink: 0, height: 220 }}>
                {offender.images && offender.images.length > 0 ? (
                  <div className={classes.image}>
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
                  <span className={classes.reference} style={{ flexShrink: 0 }}>
                    #{offender.reference}
                  </span>
                </Typography.Text>

                {/* Demographics row */}
                {hasDemographics && (
                  <div className={classes.detailRow}>
                    <FontAwesomeIcon
                      className={classes.detailIcon}
                      icon={faUser}
                    />
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

                {/* Alias */}
                {offender.alias && offender.alias.length > 0 && (
                  <div className={classes.detailRow}>
                    <FontAwesomeIcon
                      className={classes.detailIcon}
                      icon={faUserTag}
                    />
                    <Typography.Text className={classes.detailText}>
                      {offender.alias.join(', ')}
                    </Typography.Text>
                  </div>
                )}

                {/* Hair */}
                {offender.hair && (
                  <div className={classes.detailRow}>
                    <FontAwesomeIcon
                      className={classes.detailIcon}
                      icon={faUserHair}
                    />
                    <Typography.Text className={classes.detailText}>
                      {offender.hair}
                    </Typography.Text>
                  </div>
                )}

                {/* Known for */}
                {offender.knownFor && offender.knownFor.length > 0 && (
                  <div className={classes.detailRow}>
                    <FontAwesomeIcon
                      className={classes.detailIcon}
                      icon={faTag}
                    />
                    <Typography.Text className={classes.detailText}>
                      {offender.knownFor.slice(0, 2).join(', ')}
                      {offender.knownFor.length > 2 &&
                        intl.formatMessage(
                          { defaultMessage: ' +{count}' },
                          { count: offender.knownFor.length - 2 }
                        )}
                    </Typography.Text>
                  </div>
                )}

                {/* Peculiarities */}
                {offender.peculiarities && (
                  <div className={classes.detailRow}>
                    <FontAwesomeIcon
                      className={classes.detailIcon}
                      icon={faCircleInfo}
                    />
                    <Typography.Text className={classes.detailText}>
                      {offender.peculiarities}
                    </Typography.Text>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Row gutter={16} justify="end" style={{ marginTop: 24 }}>
        <Col>
          <Button onClick={onClose} type="text">
            {intl.formatMessage({ defaultMessage: 'Cancel' })}
          </Button>
        </Col>
        <Col>
          <Button
            disabled={selected.length === 0}
            onClick={() => handleAddSuggestion(selected)}
            type="primary"
          >
            {intl.formatMessage(
              { defaultMessage: 'Add {count} Offender(s)' },
              { count: selected.length }
            )}
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
