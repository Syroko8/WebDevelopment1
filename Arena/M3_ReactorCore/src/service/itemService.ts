export async function fetchItems(url: string): Promise<any> {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Tenrai API error: ${response.status}`);
    }
    return response.json();
}