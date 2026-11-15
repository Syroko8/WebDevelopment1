import { z } from "zod";

const contentTypes = ["pelicula", "serie", "libro", "comic", "manga"];
const states = ["pendiente", "en progreso", "completado"];

export const itemSchema = z.object({
    title: z.string().trim().min(2, "El título debe de tener al menos dos caracteres."),
    author_studio: z.string().trim().optional(),
    type: z.enum(contentTypes, {
        error: "Selecciona el tipo de contenido",
    }),
    state: z.enum(states, {
        error: "Selecciona un estado",
    }),
    score: z.preprocess(
        (score) => (score === "" || score === null || score === undefined ? undefined : Number(score)),
        z.
        number({error: "La puntuación debe ser un número entero"})
        .min(0, {error: "La puntuación mínima es 0"})
        .max(10, {error: "La puntuación máxima es 10"})
    ),
    notes: z.string().max(250, {error: "El texto supera los 250 caracteres"}).optional()
}).refine(
    data => (data.state != "completado" && data.score !== undefined),
    {
        error: "No puedes puntuar algo que aún tienes pendiente",
        path: ["score"],
    }
);