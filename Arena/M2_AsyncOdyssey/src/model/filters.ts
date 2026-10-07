export interface Filters {
    type: 'anime' | 'manga';
    name: string;
    genresTags: string[];
    year: string;
    season: Seasons;
    airingStatus: ;
}

type Seasons = 'Winter' | 'Spring' | 'Summer' | 'Fall';
// type AiringStatus = 