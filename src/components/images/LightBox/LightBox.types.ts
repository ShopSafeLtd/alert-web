import type { Age, Build, Gender, Height, Race } from 'graphql/generated';

export interface Face {
  id: string;
  confidence?: number | null;
  boundingHeight?: number | null;
  boundingLeft?: number | null;
  boundingTop?: number | null;
  boundingWidth?: number | null;
  offender?: {
    id: string;
    name?: string | null;
    reference?: number | null;
    age?: Age | null;
    gender?: Gender | null;
    race?: Race | null;
    build?: Build | null;
    height?: Height | null;
  } | null;
  rekMatchedSearches: {
    id: string;
  }[];
}

export interface Image {
  id: string;
  optimised?: string | null;
  faces: Face[];
}
