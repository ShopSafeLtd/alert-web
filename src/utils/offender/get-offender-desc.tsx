import type { ReactNode } from 'react';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import type { Incident } from 'graphql/generated';
import {
  Age,
  Build,
  Gender,
  Height,
  IdSource,
  Race,
  BanType,
} from 'graphql/generated';

export const getOffenderGender = (
  gender: Gender | undefined | null
): ReactNode => {
  if (gender === Gender.Female)
    return <FormattedMessage id="74BYXL" defaultMessage="Female" />;
  if (gender === Gender.Male)
    return <FormattedMessage id="jIbAky" defaultMessage="Male" />;
  return <FormattedMessage id="5jeq8P" defaultMessage="Unknown" />;
};

export const getOffenderRace = (
  race: Race | undefined | null,
  short?: boolean
): ReactNode => {
  if (race === Race.Ic1)
    return short ? (
      <FormattedMessage id="0Zmi9H" defaultMessage="IC1" />
    ) : (
      <FormattedMessage
        id="fOT1qj"
        defaultMessage="IC1 - White - North European"
      />
    );
  if (race === Race.Ic2)
    return short ? (
      <FormattedMessage id="Pyvi24" defaultMessage="IC2" />
    ) : (
      <FormattedMessage
        id="cDtVVW"
        defaultMessage="IC2 - White - South European"
      />
    );
  if (race === Race.Ic3)
    return short ? (
      <FormattedMessage id="NWUJ/a" defaultMessage="IC3" />
    ) : (
      <FormattedMessage id="k0NwMh" defaultMessage="IC3 - Black" />
    );
  if (race === Race.Ic4)
    return short ? (
      <FormattedMessage id="nZrbJ+" defaultMessage="IC4" />
    ) : (
      <FormattedMessage id="nok2Wh" defaultMessage="IC4 - South Asian" />
    );
  if (race === Race.Ic5)
    return short ? (
      <FormattedMessage id="1zh6c6" defaultMessage="IC5" />
    ) : (
      <FormattedMessage id="u7exuh" defaultMessage="IC5 - Southeast Asian" />
    );
  if (race === Race.Ic6) return short ? 'IC6' : 'IC6 - North African or Arab';
  return <FormattedMessage id="5jeq8P" defaultMessage="Unknown" />;
};

export const getIdSource = (
  idSource: IdSource | undefined | null
): ReactNode => {
  if (idSource === IdSource.DrivingLicence)
    return <FormattedMessage id="wstpvP" defaultMessage="Driving Licence" />;
  if (idSource === IdSource.IdCard)
    return <FormattedMessage id="KlfRFL" defaultMessage="IdCard" />;
  if (idSource === IdSource.Known)
    return <FormattedMessage id="he2Vcw" defaultMessage="Known Offender" />;
  if (idSource === IdSource.Other)
    return <FormattedMessage id="/VnDMl" defaultMessage="Other" />;
  if (idSource === IdSource.Passport)
    return <FormattedMessage id="OSJSb9" defaultMessage="Passport" />;
  if (idSource === IdSource.Police)
    return <FormattedMessage id="rZEvPc" defaultMessage="Provided By Police" />;

  return <FormattedMessage id="r+TWun" defaultMessage="Not Verified" />;
};

export const getOffenderBuild = (
  build: Build | undefined | null
): ReactNode => {
  if (build === Build.Large)
    return <FormattedMessage id="/06iwc" defaultMessage="Large" />;
  if (build === Build.Medium)
    return <FormattedMessage id="ovJ26C" defaultMessage="Medium" />;
  if (build === Build.Small)
    return <FormattedMessage id="BPnT3T" defaultMessage="Small" />;
  return <FormattedMessage id="5jeq8P" defaultMessage="Unknown" />;
};

export const getOffenderHeight = (
  height: Height | undefined | null
): ReactNode => {
  if (height === Height.Tall)
    return <FormattedMessage id="hnj65D" defaultMessage="Tall" />;
  if (height === Height.Average)
    return <FormattedMessage id="FnRTEV" defaultMessage="Average" />;
  if (height === Height.Short)
    return <FormattedMessage id="juU558" defaultMessage="Short" />;
  return <FormattedMessage id="5jeq8P" defaultMessage="Unknown" />;
};

export const getOffenderAge = (age: Age | undefined | null): ReactNode => {
  if (age === Age.EighteenThirty)
    return <FormattedMessage id="088rlR" defaultMessage="18 - 30" />;
  if (age === Age.FiftySixty)
    return <FormattedMessage id="xuMURn" defaultMessage="50 - 60" />;
  if (age === Age.FortyFifty)
    return <FormattedMessage id="FEg968" defaultMessage="40 - 50" />;
  if (age === Age.OverEighty)
    return <FormattedMessage id="oFu9sf" defaultMessage="Over 80" />;
  if (age === Age.SeventyEighty)
    return <FormattedMessage id="yjJSPV" defaultMessage="70 - 80" />;
  if (age === Age.SixtySeventy)
    return <FormattedMessage id="W8pA9z" defaultMessage="60 - 70" />;
  if (age === Age.ThirtyForty)
    return <FormattedMessage id="cENhUd" defaultMessage="30 - 40" />;
  if (age === Age.UnderEighteen)
    return <FormattedMessage id="Cwx1GS" defaultMessage="Under 18" />;
  return <FormattedMessage id="5jeq8P" defaultMessage="Unknown" />;
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
          id="UXMnah"
          defaultMessage="{reference} days {reference2}"
          values={{
            reference: latestIncident.dateAgo.toFixed(0),
            reference2: short ? (
              ''
            ) : (
              <FormattedMessage
                id="4bSKnr"
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
        id="4bSKnr"
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
          id="UXMnah"
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
    return <FormattedMessage id="r+lvQa" defaultMessage="Community Ban" />;
  if (type === BanType.Cbo)
    return <FormattedMessage id="m7K38U" defaultMessage="CBO" />;
  if (type === BanType.Cpn)
    return <FormattedMessage id="H3YXfH" defaultMessage="CPN" />;
  if (type === BanType.Cpw)
    return <FormattedMessage id="X8p8Hd" defaultMessage="CPW" />;
  if (type === BanType.Wip)
    return <FormattedMessage id="HvnBb5" defaultMessage="WIP" />;
  if (type === BanType.Pspo)
    return <FormattedMessage id="Wexw/H" defaultMessage="PSPO" />;
  if (type === BanType.Fine)
    return <FormattedMessage id="x4AKsM" defaultMessage="Fine" />;
  if (type === BanType.PrisonSentence)
    return <FormattedMessage id="an2/b4" defaultMessage="Prison Sentence" />;
  if (type === BanType.RehabilitationOrder)
    return (
      <FormattedMessage id="DPZMqn" defaultMessage="Rehabilitation Order" />
    );
  if (type === BanType.Arrest)
    return <FormattedMessage id="8w3wDa" defaultMessage="Arrest" />;
  return <FormattedMessage id="/VnDMl" defaultMessage="Other" />;
};
