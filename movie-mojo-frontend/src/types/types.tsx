export interface Movie {
    id: string;
    title: string;
    image: string;
    description: string;
    genreList: string[];
    streamingList: StreamingService[];
    releaseYear: string;
}

export type StreamingService = 'hulu' | 'netflix' | 'max' | 'peacock' | 'prime';