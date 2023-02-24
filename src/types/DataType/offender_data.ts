import { Age, Build, Gender, Race } from 'graphql/generated';

export interface OffenderData {
  id: string;
  name?: string | null;
  age?: Age | null;
  gender?: Gender | null;
  race?: Race | null;
  build?: Build | null;
  dateOfBirth?: Date | null;
  hair?: string | null;
  dateSource?: string | null;
  peculiarities?: string | null;
  approved?: boolean | null;
  groups?:
    | {
        id: string;
        name: string;
      }[]
    | undefined;
  images?: {
    id: string;
    optimised?: string | null;
    url?: string | null;
    fileName?: string | null;
    type?: string | null;
    new?: boolean;
  }[];
  imageUid?: string[] | undefined;
  bans?:
    | {
        id: string;
        title?: string | null | undefined;
        endDate: Date;
        startDate: Date;
        location: string;
        description?: string | null | undefined;
      }[]
    | undefined;
}
