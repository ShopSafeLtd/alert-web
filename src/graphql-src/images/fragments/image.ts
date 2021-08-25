import gql from "graphql-tag";

export const Image = gql`
  fragment Image on Image {
    id
    url
    optimised
    card
    offenders {
      id
    }
  }
`;

export interface ImageType {
  __typename: "Image";
  id: string;
  url: string;
  optimised: string;
  card?: string;
}
