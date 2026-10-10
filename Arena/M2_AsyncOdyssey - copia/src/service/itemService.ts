// Servicio: solo hace la petición HTTP y devuelve el JSON.
export async function fetchItems(url: string): Promise<any> {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Tenrai API error: ${response.status}`);
    }
    // OJO: json() es una función, hay que llamarla.
    return response.json();
}
