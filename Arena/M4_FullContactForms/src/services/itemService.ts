import { ItemListSchema, ItemResponseSchema, type contentState, type contentType, type CreateItemInput, type Item } from "../schemas/ItemSchema";
import { z } from "zod";

export interface itemInfo {
    id: string,
    title: string,
    type: contentType,
    state: contentState,
    author_studio: string,
    rating: number,
}

const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
    throw new Error("No environment variable VITE_API_URL set.");
}

const ITEMS_ENDPOINT = `${BASE_URL}/items`;

async function parseAndValidate<T>(
    response: Response,
    schema: z.ZodType<T>,
): Promise<T> {
    if (!response.ok) {
        throw Error(`Error de red: ${response.status}`);
    }

    const rawData: unknown = await response.json();
    const parsed = schema.safeParse(rawData);

    if (!parsed.success) {
        throw new Error("Data error: unexpected data structure.");
    }
    return parsed.data;
}

export async function getItems(): Promise<Item[]> {
    const response = await fetch(ITEMS_ENDPOINT);
    return await parseAndValidate(response, ItemListSchema)
}


export async function createItem(newItem: CreateItemInput): Promise<Item> {
    const response = await fetch(ITEMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem)
    });

    return parseAndValidate(response, ItemResponseSchema);
}

export async function updateItem(
    id: string,
    updates: Partial<CreateItemInput>
) {
    const response = await fetch(`${ITEMS_ENDPOINT}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
    });

    return parseAndValidate(response, ItemResponseSchema);
}

export async function deleteItem(id: string): Promise<void> {
    const response = await fetch(`${ITEMS_ENDPOINT}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error(`Error al eliminar el elemento: (${response.status})`);
    }
}