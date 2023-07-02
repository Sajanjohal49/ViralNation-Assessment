import gql from "graphql-tag";

export const GET_PROFILE_DETAILS = gql`
  query GetProfileById($getProfileById: String!) {
    getProfileById(id: $getProfileById) {
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
