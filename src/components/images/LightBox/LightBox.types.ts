import type { Age, Build, Gender, Height, Race } from 'graphql/types';

export interface Face {
  boundingHeight?: null | number;
  boundingLeft?: null | number;
  boundingTop?: null | number;
  boundingWidth?: null | number;
  confidence?: null | number;
  id: string;
  offender?: {
    age?: Age | null;
    build?: Build | null;
    gender?: Gender | null;
    height?: Height | null;
    id: string;
    name?: null | string;
    race?: Race | null;
    reference?: null | number;
  } | null;
  rekMatchedSearches: {
    id: string;
  }[];
}

export interface Image {
  faces: Face[];
  id: string;
  optimised?: null | string;
}
