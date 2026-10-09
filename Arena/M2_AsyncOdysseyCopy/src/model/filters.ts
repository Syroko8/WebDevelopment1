export type ItemTypes = 'anime' | 'manga';
export type Seasons = 'Winter' | 'Spring' | 'Summer' | 'Fall';
export type AiringStatus = 'Airing' | 'Finished' | 'Not Yet Aired' | 'Cancelled';

export interface Filters {
    type: ItemTypes;
    name: string;
    genresTags: string[];
    year: string;
    season: Seasons | '';          // '' = any
    airingStatus: AiringStatus | ''; // '' = any
}
