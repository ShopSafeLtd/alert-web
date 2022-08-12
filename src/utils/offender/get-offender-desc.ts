import { Age, Build, Gender, Race } from 'graphql/generated';

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

export const getOffenderBuild = (build: Build | undefined | null): string => {
  if (build === Build.Large) return 'Large';
  if (build === Build.Medium) return 'Medium';
  if (build === Build.Small) return 'Small';
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
  const birthDate = new Date(date);
  const now = new Date(Date.now());

  // @ts-expect-error doesnt like subtracting dates
  return Math.floor((now - birthDate) / 1000 / 60 / 60 / 24 / 365.25);
};

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 *
 * @param incidentsArray Array of incidents which must each include a date and location property
 * @returns Object - { days, location } where days is the number of days since the incident, and location is the location.full of the incident
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getLastOffence = (
  incidentsArray: any[]
): { days: number; location: string } | undefined => {
  if (!incidentsArray) return;
  const incidents = [...incidentsArray];

  if (incidents.length > 0) {
    incidents.sort(
      (a, b) =>
        // @ts-expect-error doesnt like date arithmatic
        new Date(b.date) - new Date(a.date)
    );
    const incident = new Date(incidents[0].date);
    const location = incidents[0]?.location?.full;

    const now = Date.now();

    // @ts-expect-error doesnt like date arithmatic
    // eslint-disable-next-line consistent-return
    return { days: (now - incident) / 1000 / 60 / 60 / 24, location };
  }
  // eslint-disable-next-line consistent-return
  return { days: -1, location: 'Unknown' };
};
