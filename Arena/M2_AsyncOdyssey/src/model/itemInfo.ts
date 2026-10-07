export interface ItemInfo {
    id: number;
    type: ItemTypes;
    titleEnglish : string;
    titleJapanese: string;
    score: number;
    status: string;
    synopsis: string;
    image: string;
    genres: string[];
    themes: string[];
}

export interface Anime extends ItemInfo {
    type: 'anime';
    trailer: Trailer | null;
    episodes: number | null;
    aired: string | null;
    rating: string | null;
    season: string | null;
    year: number | null;
    producers: string[];
    studios: string[];
}

export interface Manga extends ItemInfo {
    type: 'manga';
    authors: string[];
    volumes: number | null;
    chapters: number | null;
    published: string;
}

export interface Trailer {
    url: string;
    youtubeCover: string;
}

type ItemTypes = 'anime' | 'manga';