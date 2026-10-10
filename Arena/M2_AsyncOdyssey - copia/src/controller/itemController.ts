import { UIInfo } from "../main";
import { genres } from "../model/genres";
import type { ItemInfo } from "../model/itemInfo";
import { fetchItems } from "../service/itemService";

const baseURL = 'https://api.tenrai.org/v1';

// Tenrai no tiene "season" ni "year" en la búsqueda: se traducen a un rango de fechas.
const seasonMonths: Record<string, [string, string]> = {
    Winter: ['01-01', '03-31'],
    Spring: ['04-01', '06-30'],
    Summer: ['07-01', '09-30'],
    Fall:   ['10-01', '12-31'],
};

// Nuestro texto del select -> valor que espera la API (solo anime).
const statusValues: Record<string, string> = {
    'Airing': 'airing',
    'Finished': 'complete',
    'Not Yet Aired': 'upcoming',
};

function buildURL(): string {
    const params = new URLSearchParams();

    if (UIInfo.name.trim() !== '') params.set('q', UIInfo.name.trim());

    // IDs de géneros separados por comas (el ID cambia entre anime y manga).
    const ids = UIInfo.genresTags
        .map(name => genres.find(g => g.name === name))
        .map(g => UIInfo.type === 'anime' ? g?.animeId : g?.mangaId)
        .filter(id => id != null);
    if (ids.length > 0) params.set('genres', ids.join(','));

    // Año y temporada -> start_date / end_date (formato YYYY-MM-DD).
    if (UIInfo.year !== '') {
        const range = UIInfo.type === 'anime' ? seasonMonths[UIInfo.season] : undefined;
        params.set('start_date', `${UIInfo.year}-${range ? range[0] : '01-01'}`);
        params.set('end_date', `${UIInfo.year}-${range ? range[1] : '12-31'}`);
    }

    // Estado de emisión: solo anime.
    if (UIInfo.type === 'anime' && statusValues[UIInfo.airingStatus]) {
        params.set('status', statusValues[UIInfo.airingStatus]);
    }

    params.set('sfw', '');   // opcional: oculta contenido adulto
    params.set('limit', '24');

    return `${baseURL}/${UIInfo.type}?${params.toString()}`;
}

// Devuelve los items ya convertidos a nuestro modelo ItemInfo.
export async function searchItems(): Promise<ItemInfo[]> {
    const json = await fetchItems(buildURL());

    // La API responde { data: [...], pagination: {...} } (esquema Jikan v4).
    return json.data.map((item: any): ItemInfo => ({
        id: item.mal_id,
        type: UIInfo.type,
        titleEnglish: item.title_english ?? item.title,
        titleJapanese: item.title_japanese ?? '',
        score: item.score ?? 0,
        status: item.status ?? '',
        synopsis: item.synopsis ?? '',
        image: item.images?.jpg?.image_url ?? '',
        genres: (item.genres ?? []).map((g: any) => g.name),
        themes: (item.themes ?? []).map((t: any) => t.name),
    }));
}
