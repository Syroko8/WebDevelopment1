// Shared state for the filters + the events the components use to talk to each other.
import type { Filters } from './model/filters';

export const filters: Filters = {
    type: 'anime',
    name: '',
    genresTags: [],
    year: '',
    season: '',
    airingStatus: '',
};

export const TYPE_CHANGE = 'filters:typechange';
export const SEARCH = 'filters:search';

export function emitTypeChange(): void {
    document.dispatchEvent(new CustomEvent(TYPE_CHANGE, { detail: filters.type }));
}

// Sends a snapshot, so listeners can't mutate the live filters by accident.
export function emitSearch(): void {
    document.dispatchEvent(new CustomEvent<Filters>(SEARCH, { detail: structuredClone(filters) }));
}
