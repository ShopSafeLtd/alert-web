import React from 'react';

import { Details, Exclusions, Incidents, Menu } from './components';
import { CardLayout } from 'components/shared-components';

interface Props {
  offender: any;
  actions: {
    deleteOffender: (id: string) => void;
    addExclusion: (id: string) => void;
    viewOffender: (offender: any) => void;
    approve: (id: string) => void;
    decline: (id: string) => void;
  };
}
/**
 *
 * @param props {@link Props}
 * @param props.offender - offender data fetched from the database
 * @param props.actions - { deleteOffender, addExclusion, viewOffender, approve, decline } object containing functions {@link Props[actions]}
 * @returns JSX Element
 *
 * @description A CardLayout component configured specifically for the OffenderFeed, with details, exclusion and incident tabs, an exclusion banner, and the offenders tags.
 */
const OffenderCard: React.FC<Props> = ({ offender, actions }) => {
  // excluded banner
  const isExcluded =
    offender.bans &&
    offender.bans.find(
      (ban: any) => new Date(ban.endDate) > new Date(Date.now())
    );
  const Excluded = isExcluded ? (
    <div className="banner-container">
      <div className="banner-rotation">
        <span className="banner-text">Excluded</span>
      </div>
    </div>
  ) : (
    <></>
  );
  // offender tags
  const hasTags = offender.tags.length > 0;
  const hasMoreTags = offender.tags.length > 1;
  const Tags = (
    <div className="tags-container">
      {hasTags && <div className="main-tag">{offender.tags[0].name}</div>}
      {hasMoreTags && (
        <div className="more-tags">{`+ ${
          offender.tags.length - 1
        } more...`}</div>
      )}
    </div>
  );

  return (
    <CardLayout
      key={offender.id}
      type="Offender"
      tabs={[
        {
          label: 'Details',
          content: (
            <Details
              offender={offender}
              onClick={() => actions.viewOffender(offender)}
            />
          ),
        },
        {
          label: 'Exclusions',
          content: (
            <Exclusions
              exclusions={offender.bans}
              onClick={() => actions.viewOffender(offender)}
            />
          ),
        },
        {
          label: 'Incidents',
          content: (
            <Incidents
              incidents={offender.incidents}
              onClick={() => actions.viewOffender(offender)}
            />
          ),
        },
      ]}
      images={offender.images}
      menu={() => <Menu id={offender.id} actions={actions} />}
      approval={{
        approved: offender.approved,
        approve: () => actions.approve(offender.id),
        decline: () => actions.decline(offender.id),
      }}
      additionalItems={[Excluded, Tags]}
    />
  );
};

export default OffenderCard;
