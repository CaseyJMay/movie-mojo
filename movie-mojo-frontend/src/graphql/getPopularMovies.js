import { gql } from '@apollo/client';

export const GET_POPULAR_MOVIES = gql`
  query GetPopularMovies {
    getPopularMovies {
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