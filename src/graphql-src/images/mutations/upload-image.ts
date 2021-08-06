import { gql } from '@apollo/client';
import { Image, ImageType } from '../fragments'

export const UploadImage = gql`
  mutation uploadImage(
    $file: Upload!
    $scheme: String!
    $incident: IncidentWhereUniqueInput!
    $offenders: [UniqueId!]
  ) {
    uploadImage(
      file: $file
      scheme: $scheme
      incident: $incident
      offenders: $offenders
    ) {
      ...Image
    }
  }
  ${Image}
`;

export interface UploadImageArgs {
  file: any;
  scheme: string;
  incident?: { id: string; };
  offenders?: { id: string; }[];
}

export interface UploadImageRes {
  uploadImage: ImageType
}