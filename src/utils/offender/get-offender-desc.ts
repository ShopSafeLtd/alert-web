import type { Incident } from 'graphql/generated';
import { Height, Age, Build, Gender, IdSource, Race } from 'graphql/generated';

export const getOffenderGender = (
  gender: Gender | undefined | null
): string => {
  if (gender === Gender.Female) return 'Female';
  if (gender === Gender.Male) return 'Male';
  return 'Unknown';
};

export const getOffenderRace = (
  race: Race | undefined | null,
  short?: boolean
): string => {
  if (race === Race.Ic1) return short ? 'IC1' : 'IC1 - White - North European';
  if (race === Race.Ic2) return short ? 'IC2' : 'IC2 - White - South European';
  if (race === Race.Ic3) return short ? 'IC3' : 'IC3 - Black';
  if (race === Race.Ic4) return short ? 'IC4' : 'IC4 - South Asian';
  if (race === Race.Ic5) return short ? 'IC5' : 'IC5 - Southeast Asian';
  if (race === Race.Ic6) return short ? 'IC6' : 'IC6 - North African or Arab';
  return 'Unknown';
};

export const getIdSource = (idSource: IdSource | undefined | null): string => {
  if (idSource === IdSource.DrivingLicence) return 'Driving Licence';
  if (idSource === IdSource.IdCard) return 'IdCard';
  if (idSource === IdSource.Known) return 'Known';
  if (idSource === IdSource.Other) return 'Other';
  if (idSource === IdSource.Passport) return 'Passport';
  return 'Not Verified';
};

export const getOffenderBuild = (build: Build | undefined | null): string => {
  if (build === Build.Large) return 'Large';
  if (build === Build.Medium) return 'Medium';
  if (build === Build.Small) return 'Small';
  return 'Unknown';
};

export const getOffenderHeight = (
  height: Height | undefined | null
): string => {
  if (height === Height.Tall) return 'Tall';
  if (height === Height.Average) return 'Average';
  if (height === Height.Short) return 'Short';
  return 'Unknown';
};

export const getOffenderAge = (age: Age | undefined | null): string => {
  if (age === Age.EighteenThirty) return '18 - 30';
  if (age === Age.FiftySixty) return '50 - 60';
  if (age === Age.FortyFifty) return '40 - 50';
  if (age === Age.OverEighty) return 'Over 80';
  if (age === Age.SeventyEighty) return '70 - 80';
  if (age === Age.SixtySeventy) return '60 - 70';
  if (age === Age.ThirtyForty) return '30 - 40';
  if (age === Age.UnderEighteen) return 'Under 18';
  return 'Unknown';
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
 * @param incidentsArray Array of incidents which must each include a date and location property
 * @param short
 * @returns Object - { days, location } where days is the number of days since the incident, and location is the location.full of the incident
 */
export const getLastOffence = (
  incidentsArray: unknown[],
  short?: boolean
): {
  message: string | undefined;
  id: string | undefined;
} => {
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
    const text = `, reported by ${location}`;
    // eslint-disable-next-line consistent-return
    return {
      message: `${((now - incident) / 1000 / 60 / 60 / 24).toFixed(
        0
      )} days ago${short ? '' : text}`,
      id: incidents[0].id,
    };
  }
  // eslint-disable-next-line consistent-return
  return { message: 'No offense', id: undefined };
};
