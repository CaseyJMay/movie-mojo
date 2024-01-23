import { gql } from '@apollo/client';

export const GET_MOVIES_BY_SEARCH_TERM = gql`
  query GetMoviesBySearchTerm($searchTerm: String!) {
    getMoviesBySearchTerm(searchTerm: $searchTerm) {
      id
      title
      description
      releaseDate
      posterPath
      watchProviders {
        logo_path
        provider_name
        display_priority
      }
      genreList
    }
  }
`;