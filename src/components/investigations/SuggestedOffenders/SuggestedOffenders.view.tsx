import type { WatermarkSlideType } from 'components/images/WatermartkSlide.view';
import type { InvestigationSuggestionsQuery } from 'graphql/investigations/queries/__generated__/investigation-suggestions.generated';

import publicOffenderDob from '#/utils/public-offender-dob';
import {
  faCircleInfo,
  faFileLines,
  faPeopleGroup,
  faUser,
  faUserHair,
  faUserTag,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Divider, Skeleton, Typography } from 'antd';
import WatermarkImage from 'components/images/WatermarkImage.view';
import WatermarkSlide from 'components/images/WatermartkSlide.view';
import CrimeGroupTable from 'components/tables/CrimeGroupTable/CrimeGroupTable.view';
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

import useStyles from './SuggestedOffenders.style';

interface Props {
  handleAddSuggestion: (id: string) => void;
  onClose: () => void;
  suggestedData: InvestigationSuggestionsQuery | undefined;
}

const SuggestedOffenders = ({
  handleAddSuggestion,
  onClose,
  suggestedData,
}: Props) => {
  const intl = useIntl();
  const classes = useStyles();
  const publicOffenderDOB = publicOffenderDob();

  const [lightBoxOpen, setLightBoxOpen] = useState({
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

  const offenders = suggestedData?.investigation?.suggestedOffenders ?? [];

  return (
    <div style={{ paddingLeft: 30, paddingRight: 30 }}>
      {offenders.map((offender) => {
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
          <div key={offender.id}>
            <div className={classes.card}>
              {/* Primary image */}
              <div style={{ display: 'flex', flexShrink: 0, height: 220 }}>
                {offender.images.length > 0 ? (
                  <div
                    className={classes.image}
                    onClick={() => openLightbox(offender, 0)}
                    style={{ cursor: 'pointer' }}
                  >
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

                <div className={classes.infoSection}>
                  {/* Demographics: gender • ethnicity • age • build */}
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
                  {offender.alias.length > 0 && (
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

                {/* Action buttons */}
                <div className={classes.actionRow}>
                  <Link
                    onClick={onClose}
                    to={`/app/offenders/view/${offender.id}`}
                  >
                    <Button size="small">
                      {intl.formatMessage({ defaultMessage: 'View Offender' })}
                    </Button>
                  </Link>
                  <Button
                    danger
                    onClick={() => handleAddSuggestion(offender.id)}
                    size="small"
                    type="primary"
                  >
                    {intl.formatMessage({
                      defaultMessage: 'Add To Investigation',
                    })}
                  </Button>
                </div>
              </div>
            </div>

            {/* Shared incidents */}
            {offender.associatedIncidents &&
              offender.associatedIncidents.length > 0 && (
                <div className={classes.sharedSection}>
                  <div className={classes.sectionHeading}>
                    <FontAwesomeIcon icon={faFileLines} />
                    <span>
                      {intl.formatMessage({
                        defaultMessage: 'Shared Incidents',
                      })}
                    </span>
                    <span className={classes.sectionCount}>
                      {offender.totalAssociatedIncidents}
                    </span>
                  </div>
                  <IncidentTable
                    hasNavigation
                    incidents={offender.associatedIncidents}
                  />
                </div>
              )}

            {/* Shared crime groups */}
            {offender.associatedCrimeGroups &&
              offender.associatedCrimeGroups.length > 0 && (
                <div className={classes.sharedSection}>
                  <div className={classes.sectionHeading}>
                    <FontAwesomeIcon icon={faPeopleGroup} />
                    <span>
                      {intl.formatMessage({
                        defaultMessage: 'Shared Crime Groups',
                      })}
                    </span>
                    <span className={classes.sectionCount}>
                      {offender.totalAssociatedCrimeGroups}
                    </span>
                  </div>
                  <CrimeGroupTable
                    crimeGroups={offender.associatedCrimeGroups}
                    hasNavigation
                  />
                </div>
              )}
            <Divider style={{ borderWidth: 2, margin: '20px 0' }} />
          </div>
        );
      })}

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
