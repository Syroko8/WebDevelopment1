export interface Filters {
    type: ItemTypes;
    name: string;
    genresTags: string[];
    year: string;
    season: Seasons;
    airingStatus: AiringStatus;
}

type Seasons = 'Winter' | 'Spring' | 'Summer' | 'Fall' | 'Any';
type AiringStatus = 'Airing' | 'Finished' | 'Not Yet Aired' | 'Cancelled' | 'Any';
type ItemTypes = 'anime' | 'manga';