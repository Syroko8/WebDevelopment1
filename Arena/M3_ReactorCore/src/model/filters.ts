export interface Filters {
    "type": ItemTypes;
    "name": string;
    genresTags: string[];
    year: string;
    season: Seasons;
    airingStatus: AiringStatus;
}

type ItemTypes = 'anime' | 'manga';
export const airingStatus = ['Any', 'Airing' , 'Finished' , 'Not Yet Aired' , 'Cancelled'];
export type AiringStatus = typeof airingStatus[number];
export const seasons = ['Any', 'Winter' , 'Spring' , 'Summer' , 'Fall'];
export type Seasons = typeof seasons[number];