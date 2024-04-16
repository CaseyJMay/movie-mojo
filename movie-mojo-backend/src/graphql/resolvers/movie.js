const root = {
    fetchWatchProviders: async (movieId) => {
        const url = `https://api.themoviedb.org/3/movie/${movieId}/watch/providers`;
        const options = {
              method: 'GET',
              headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZWQyMjBkMDhmOWNkZGZlYjJjNjdlZTAxNjg4OWNkOCIsInN1YiI6IjY1N2Y2M2U0MTI0YzhkMDc0OTM5ODE0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gup_cgfe6I0Z6D4fxjVF3WpBg0GKNptMwyAFgwHjwlM'
              }
            };
          
            try {
              const response = await fetch(url, options);
              const json = await response.json();
              return json.results; // Adjust this according to the actual structure of the response
            } catch (error) {
              console.error('Error fetching watch providers:', error);
              return null;
            }
    },
    getMoviesBySearchTerm: async ({searchTerm}) => {
      let encodedText = searchTerm.replace(/ /g, "%20");
      const url = `https://api.themoviedb.org/3/search/movie?query=${encodedText}&include_adult=false&language=en-US&page=1`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZWQyMjBkMDhmOWNkZGZlYjJjNjdlZTAxNjg4OWNkOCIsInN1YiI6IjY1N2Y2M2U0MTI0YzhkMDc0OTM5ODE0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gup_cgfe6I0Z6D4fxjVF3WpBg0GKNptMwyAFgwHjwlM'
        }
      };
  
      try {
        const response = await fetch(url, options);
        const json = await response.json();
  
        // Check if json.results is defined and is an array 
        if (json && Array.isArray(json.results)) {
            const moviesWithProviders = await Promise.all(json.results.map(async (movie) => {
              const providers = await root.fetchWatchProviders(movie.id);
              const USproviders = providers && providers.US
              const StreamingUS = USproviders && USproviders.flatrate
              return {
                id: movie.id,
                title: movie.title,
                description: movie.overview,
                releaseDate: movie.release_date,
                posterPath: movie.poster_path,
                watchProviders: StreamingUS,
                genreList: movie.genre_ids,
              };
            }));
      
            return moviesWithProviders;
        }
        else {
          // Handle the case where json.results is not as expected
          console.error('Unexpected response structure:', json);
          return [];
        }
      } catch (error) {
        console.error('error:', error);
        return []; // Return an empty array or handle the error as needed
      }
    },
    getPopularMovies: async ({pageNumber}) => {
        const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageNumber}&sort_by=popularity.desc`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZWQyMjBkMDhmOWNkZGZlYjJjNjdlZTAxNjg4OWNkOCIsInN1YiI6IjY1N2Y2M2U0MTI0YzhkMDc0OTM5ODE0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gup_cgfe6I0Z6D4fxjVF3WpBg0GKNptMwyAFgwHjwlM'
            }
        };
    
        try {
            const response = await fetch(url, options);
            const json = await response.json();
    
            if (json && Array.isArray(json.results)) {
                const moviesWithProviders = await Promise.all(json.results.map(async (movie) => {
                    const providers = await root.fetchWatchProviders(movie.id);
                    const USproviders = providers && providers.US;
                    const StreamingUS = USproviders && USproviders.flatrate;
                    return {
                        id: movie.id,
                        title: movie.title,
                        description: movie.overview,
                        releaseDate: movie.release_date,
                        posterPath: movie.poster_path,
                        watchProviders: StreamingUS,
                        genreList: movie.genre_ids,
                    };
                }));
    
                // Filter out movies that don't have flatrate streaming options in the US
                const moviesWithFlatrateStreaming = moviesWithProviders.filter(movie => movie.watchProviders && movie.watchProviders.length > 0);
          
                return moviesWithFlatrateStreaming;
            } else {
                console.error('Unexpected response structure:', json);
                return [];
            }
        } catch (error) {
            console.error('error:', error);
            return []; // Return an empty array or handle the error as needed
        }
    },
  };
  
  module.exports = root;
