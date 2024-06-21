import type { ReactNode } from 'react';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import type { Incident } from 'graphql/types';
import {
  Age,
  BanType,
  Build,
  Gender,
  Height,
  IdSource,
  Race,
} from 'graphql/types';

export const getOffenderGender = (
  gender: Gender | undefined | null
): ReactNode => {
  if (gender === Gender.Female)
    return <FormattedMessage defaultMessage="Female" />;
  if (gender === Gender.Male) return <FormattedMessage defaultMessage="Male" />;
  return <FormattedMessage defaultMessage="Unknown" />;
};

export const getOffenderRace = (
  race: Race | undefined | null,
  short?: boolean
): ReactNode => {
  if (race === Race.Ic1)
    return short ? (
      <FormattedMessage defaultMessage="IC1" />
    ) : (
      <FormattedMessage defaultMessage="IC1 - White - North European" />
    );
  if (race === Race.Ic2)
    return short ? (
      <FormattedMessage defaultMessage="IC2" />
    ) : (
      <FormattedMessage defaultMessage="IC2 - White - South European" />
    );
  if (race === Race.Ic3)
    return short ? (
      <FormattedMessage defaultMessage="IC3" />
    ) : (
      <FormattedMessage defaultMessage="IC3 - Black" />
    );
  if (race === Race.Ic4)
    return short ? (
      <FormattedMessage defaultMessage="IC4" />
    ) : (
      <FormattedMessage defaultMessage="IC4 - South Asian" />
    );
  if (race === Race.Ic5)
    return short ? (
      <FormattedMessage defaultMessage="IC5" />
    ) : (
      <FormattedMessage defaultMessage="IC5 - Southeast Asian" />
    );
  if (race === Race.Ic6) return short ? 'IC6' : 'IC6 - North African or Arab';
  return <FormattedMessage defaultMessage="Unknown" />;
};

export const getIdSource = (
  idSource: IdSource | undefined | null
): ReactNode => {
  if (idSource === IdSource.DrivingLicence)
    return <FormattedMessage defaultMessage=": Driving Licence" />;
  if (idSource === IdSource.IdCard)
    return <FormattedMessage defaultMessage=": Id" />;
  if (idSource === IdSource.Known)
    return <FormattedMessage defaultMessage=": Known Offender" />;
  if (idSource === IdSource.Other)
    return <FormattedMessage defaultMessage=": Other" />;
  if (idSource === IdSource.Passport)
    return <FormattedMessage defaultMessage=": Passport" />;
  if (idSource === IdSource.Police)
    return <FormattedMessage defaultMessage=": Provided By Police" />;
  // TODO change if used other than view offender
  return '';
};

export const getOffenderBuild = (
  build: Build | undefined | null
): ReactNode => {
  if (build === Build.Large) return <FormattedMessage defaultMessage="Large" />;
  if (build === Build.Medium)
    return <FormattedMessage defaultMessage="Medium" />;
  if (build === Build.Small) return <FormattedMessage defaultMessage="Small" />;
  return <FormattedMessage defaultMessage="Unknown" />;
};

export const getOffenderHeight = (
  height: Height | undefined | null
): ReactNode => {
  if (height === Height.Tall) return <FormattedMessage defaultMessage="Tall" />;
  if (height === Height.Average)
    return <FormattedMessage defaultMessage="Average" />;
  if (height === Height.Short)
    return <FormattedMessage defaultMessage="Short" />;
  return <FormattedMessage defaultMessage="Unknown" />;
};

export const getOffenderAge = (age: Age | undefined | null): ReactNode => {
  if (age === Age.EighteenThirty)
    return <FormattedMessage defaultMessage="18 - 30" />;
  if (age === Age.FiftySixty)
    return <FormattedMessage defaultMessage="50 - 60" />;
  if (age === Age.FortyFifty)
    return <FormattedMessage defaultMessage="40 - 50" />;
  if (age === Age.OverEighty)
    return <FormattedMessage defaultMessage="Over 80" />;
  if (age === Age.SeventyEighty)
    return <FormattedMessage defaultMessage="70 - 80" />;
  if (age === Age.SixtySeventy)
    return <FormattedMessage defaultMessage="60 - 70" />;
  if (age === Age.ThirtyForty)
    return <FormattedMessage defaultMessage="30 - 40" />;
  if (age === Age.UnderEighteen)
    return <FormattedMessage defaultMessage="Under 18" />;
  return <FormattedMessage defaultMessage="Unknown" />;
};

/**
 *
 * @param date string representation of a date, or Date object.
 * @returns number
 */
export const calcAge = (date: string | Date): number => {
  if (!date) return -1;
  const birthDate = new Date(date).getTime();
  const now = new Date(Date.now()).getTime();

  return Math.floor((now - birthDate) / 1000 / 60 / 60 / 24 / 365.25);
};

/**
 *
 * @param latestIncident
 * @param incidentsArray Array of incidents which must each include a date and location property
 * @param short
 * @returns Object - { days, location } where days is the number of days since the incident, and location is the location.full of the incident
 */
export const getLastOffence = (
  incidentsArray?: unknown[],
  short?: boolean,
  latestIncident?: {
    id: string;
    dateAgo: number;
    reportedBusinessName: string;
  }
): {
  message: ReactNode | undefined;
  id: string | undefined;
} => {
  if (latestIncident) {
    return {
      message: (
        <FormattedMessage
          defaultMessage="{reference} days {reference2}"
          values={{
            reference: latestIncident.dateAgo.toFixed(0),
            reference2: short ? (
              ''
            ) : (
              <FormattedMessage
                defaultMessage=", reported by {reference}"
                values={{
                  reference: latestIncident.reportedBusinessName,
                }}
              />
            ),
          }}
        />
      ),
      id: latestIncident.id,
    };
  }
  if (!incidentsArray) return { message: undefined, id: undefined };
  const incidents = [...incidentsArray] as Incident[];

  if (incidents.length > 0) {
    incidents.sort(
      (a, b) =>
        // @ts-expect-error doesnt like date arithmatic
        new Date(b.date) - new Date(a.date)
    );
    const incident = new Date(incidents[0].date).getTime();
    const location = incidents[0]?.createdBy.businesses[0]?.name;

    const now = Date.now();
    const text = (
      <FormattedMessage
        defaultMessage=", reported by {reference}"
        values={{
          reference: location,
        }}
      />
    );
    // eslint-disable-next-line consistent-return
    return {
      message: (
        <FormattedMessage
          defaultMessage="{reference} days {reference2}"
          values={{
            reference: ((now - incident) / 1000 / 60 / 60 / 24).toFixed(0),
            reference2: short ? '' : text,
          }}
        />
      ),
      id: incidents[0].id,
    };
  }
  // eslint-disable-next-line consistent-return
  return { message: 'No offense', id: undefined };
};

export const getBanType = (type: BanType | undefined | null): ReactNode => {
  if (type === BanType.CommunityBan)
    return <FormattedMessage defaultMessage="Community Ban" />;
  if (type === BanType.Cbo) return <FormattedMessage defaultMessage="CBO" />;
  if (type === BanType.Cpn) return <FormattedMessage defaultMessage="CPN" />;
  if (type === BanType.Cpw) return <FormattedMessage defaultMessage="CPW" />;
  if (type === BanType.Wip) return <FormattedMessage defaultMessage="WIP" />;
  if (type === BanType.Pspo) return <FormattedMessage defaultMessage="PSPO" />;
  if (type === BanType.Fine) return <FormattedMessage defaultMessage="Fine" />;
  if (type === BanType.PrisonSentence)
    return <FormattedMessage defaultMessage="Prison Sentence" />;
  if (type === BanType.RehabilitationOrder)
    return <FormattedMessage defaultMessage="Rehabilitation Order" />;
  if (type === BanType.Arrest)
    return <FormattedMessage defaultMessage="Arrest" />;
  return <FormattedMessage defaultMessage="Other" />;
};
