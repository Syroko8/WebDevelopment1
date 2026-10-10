import type {Seasons, AiringStatus} from '../components/formulary'

export interface Filters {
    "type": ItemTypes;
    "name": string;
    genresTags: string[];
    year: string;
    season: Seasons;
    airingStatus: AiringStatus;
}

type ItemTypes = 'anime' | 'manga';