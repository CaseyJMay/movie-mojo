export interface Movie {
    id: string;
    title: string;
    posterPath: string;
    description: string;
    releaseDate: string;
    watchProviders: Provider[];
    genreList: number[];
  }

export interface Provider {
    logo_path: string;
    provider_id: number;
    provider_name: string;
    display_priority: number;
  }

export type StreamingService = 'hulu' | 'netflix' | 'max' | 'peacock' | 'prime';