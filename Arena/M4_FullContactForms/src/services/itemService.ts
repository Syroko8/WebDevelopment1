import type { contentState, contentType } from "../schemas/ItemSchema";

export interface itemInfo {
    id: number,
    title: string,
    type: contentType,
    state: contentState,
    author_studio: string,
    rating: number,
}

export function getItems (): itemInfo[] | null {
    return null;
}