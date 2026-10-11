import { UIInfo } from "../main";
import { genres } from "../model/genres";
import type { ItemInfo } from "../model/itemInfo";
import { fetchItems } from "../service/itemService";


const baseURL = 'https://api.tenrai.org/v1/';


/* La API trabaja con start_date y end_date para especificar las seasons de emisión, por lo que necesitamos
especificar los meses de cada season.*/
const seasonMonths: Record<string, [string, string]> = {
    Winter: ["01-01", "03-31"],
    Spring: ["04-01", "06-30"],
    Summer: ["07-01", "09-30"],
    Fall: ["10-01", "12-31"]
}

// 
const statusValues: Record<string, string> = {
    'Airing': 'airing',
    'Finished': 'complete',
    'Not Yet Aired': 'upcoming'
}

function buildURL(): string {
    const params = new URLSearchParams();
    
    if (UIInfo.name.trim() != "") params.set('q', UIInfo.name.trim()); 

    // Lista de IDS de géneros separados por comas.
    const ids = UIInfo.genresTags
    .map(genreName => genres.find(genre => genreName === genre.name))
    .map(genre => UIInfo.type === 'anime'? genre?.animeId : genre?.mangaId)
    .filter(id => id != null);
    if (ids.length > 0) params.set('genres', ids.join(','));

    // Solo usamos la temporada si un año ha sido introducido.
    if (UIInfo.year !== '') {
        const range = UIInfo.type === 'anime' ? seasonMonths[UIInfo.season] : undefined;
        params.set('start_date', `${UIInfo.year}-${range? range[0] : '01-01'}`);
        params.set('end_date', `${UIInfo.year}-${range? range[1]: '12-31'}`);
    }

    // Estado de emisión si es anime.
    if (UIInfo.type === 'anime' && statusValues[UIInfo.airingStatus]) {
        params.set('status', statusValues[UIInfo.airingStatus]);
    }

    // Ponemos un límite de 40.
    params.set('limit', '40');

    return `${baseURL}${UIInfo.type}?${params.toString()}`;
}

export async function searchItems(): Promise<ItemInfo[]> {
    const json = await fetchItems(buildURL());

    // Hacemos una función flecha que recibe cualquier objeto y devuelve un ItemInfo.
    return json.data.map((item:any): ItemInfo => ({
        id: item.mal_id,
        type: UIInfo.type,
        titleEnglish: item.title_english ?? item.title,
        titleJapanese: item.title_japanese ?? '',
        score: item.score ?? 0,
        status: item.status ?? '',
        synopsis: item.synopsis ?? '',
        image: item.images?.jpg?.image_url ?? '',
        genres: (item.genres ?? []).map((genre:any) => genre.name),
        themes: (item.themes ?? []).map((theme:any) => theme.name)
    }))
}