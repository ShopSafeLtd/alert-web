/**
 *
 * @param incidentsArray Array of incidents which must each include a date and location property
 * @returns Object - { days, location } where days is the number of days since the incident, and location is the location.full of the incident
 */
const getLastOffence = (incidentsArray: any[]) => {
  const incidents = [...incidentsArray];

  if (incidents.length > 0) {
    incidents.sort((a, b) => {
      // @ts-expect-error doesnt like date arithmatic
      return new Date(b.date) - new Date(a.date);
    });
    const incident = new Date(incidents[0].date);
    const location = incidents[0].location.full;

    const now = Date.now();

    // @ts-expect-error doesnt like date arithmatic
    return { days: (now - incident) / 1000 / 60 / 60 / 24, location };
  } else {
    return { days: -1, location: 'Unknown' };
  }
};

export default getLastOffence;
