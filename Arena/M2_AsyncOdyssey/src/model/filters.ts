export interface Filters {
    type: ItemTypes;
    name: string;
    genresTags: string[];
    year: string;
    season: Seasons;
    airingStatus: AiringStatus;
}

type Seasons = 'Winter' | 'Spring' | 'Summer' | 'Fall';
type AiringStatus = 'Airing' | 'Finished' | 'Not Yet Aired' | 'Cancelled';
type ItemTypes = 'anime' | 'manga';