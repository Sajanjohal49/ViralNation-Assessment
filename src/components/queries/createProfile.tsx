import gql from "graphql-tag";

export const CREATE_PROFILE_MUTATION = gql`
  mutation CreateProfile(
    $firstName: String!
    $lastName: String!
    $email: String!
    $isVerified: Boolean!
    $imageUrl: String!
    $description: String!
  ) {
    createProfile(
      first_name: $firstName
      last_name: $lastName
      email: $email
      is_verified: $isVerified
      image_url: $imageUrl
      description: $description
    ) {
      id
      first_name
      last_name
      email
      is_verified
      image_url
      description
    }
  }
`;
