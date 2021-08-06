import gql from "graphql-tag";

export const ImageWithOffenders = gql`
  fragment Image on Image {
    id
    url
    optimised
    card
    offenders {
      id
      name
    }
  }
`;

export interface ImageWithOffendersType {
  __typename: "Image";
  id: string;
  url: string;
  optimised: string;
  card?: string;
  offenders?: {
    id: string;
    name: string;
  }[];
}