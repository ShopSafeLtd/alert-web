import { PoliceForce } from 'graphql/types';
import { formatPoliceAreas, formatPoliceAreasList } from '../formatPoliceAreas';

describe('formatPoliceAreas', () => {
  it('should return empty string for null or undefined', () => {
    expect(formatPoliceAreas(null)).toBe('');
    expect(formatPoliceAreas(undefined)).toBe('');
    expect(formatPoliceAreas([])).toBe('');
  });

  it('should format a single police area', () => {
    expect(formatPoliceAreas([PoliceForce.AvonAndSomerset])).toBe(
      'Avon And Somerset'
    );
    expect(formatPoliceAreas([PoliceForce.BritishTransportPolice])).toBe(
      'British Transport Police'
    );
  });

  it('should format two police areas with "and"', () => {
    expect(
      formatPoliceAreas([PoliceForce.AvonAndSomerset, PoliceForce.Bedfordshire])
    ).toBe('Avon And Somerset and Bedfordshire');
  });

  it('should format multiple police areas with commas and "and"', () => {
    expect(
      formatPoliceAreas([
        PoliceForce.AvonAndSomerset,
        PoliceForce.Bedfordshire,
        PoliceForce.Cambridgeshire,
      ])
    ).toBe('Avon And Somerset, Bedfordshire, and Cambridgeshire');
  });

  it('should handle complex enum values correctly', () => {
    expect(formatPoliceAreas([PoliceForce.DevonAndCornwall])).toBe(
      'Devon And Cornwall'
    );
    expect(formatPoliceAreas([PoliceForce.CityOfLondon])).toBe(
      'City Of London'
    );
  });
});

describe('formatPoliceAreasList', () => {
  it('should return empty array for null or undefined', () => {
    expect(formatPoliceAreasList(null)).toEqual([]);
    expect(formatPoliceAreasList(undefined)).toEqual([]);
    expect(formatPoliceAreasList([])).toEqual([]);
  });

  it('should format police areas as an array', () => {
    expect(
      formatPoliceAreasList([
        PoliceForce.AvonAndSomerset,
        PoliceForce.Bedfordshire,
        PoliceForce.BritishTransportPolice,
      ])
    ).toEqual([
      'Avon And Somerset',
      'Bedfordshire',
      'British Transport Police',
    ]);
  });
});
