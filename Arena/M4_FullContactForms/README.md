# Delusion List

Misión M4 · Full Contact Forms — Web Development I.

## Cómo probarlo

Se debe lanzar el servidor de datos con `npx json-server db.json --port 4000` y el proyecto con `npm run dev`.
Una vez abierto en el navegador, se pueden añadir obras (animes, mangas, libros) mediante el formulario de la izquierda, indicando su título, tipo, estado, autor/estudio y valoración.
Los items registrados aparecen en la lista de la derecha, donde pueden ser modificados o eliminados.
Al pulsar 'Modificar' en un item, el formulario se rellena con sus datos para su edición.

## Uso de IA

Se empleó Gemini para un atapa previa de exploración sobre opciones posibles y realistas para el proyecto dado el temario de la asignatura.
Se emplearon Gemini y Claude Sonnet para realizar correcciones en las interacciones entre la interfaz y el servicio.

Por último se empleó claude para realizar retoques en el estilado de los componentes.

## Autopsia

1. Para pasar el item a editar desde `ItemList` hasta `Formulary`, se optó por elevar el estado a `App`, que almacena el item completo como objeto y lo pasa como prop al formulario.
Se planteó pasar únicamente el `id` del item y hacer un fetch independiente desde `Formulary` para obtener sus datos, pero esto habría supuesto una petición adicional innecesaria, ya que los datos ya estaban disponibles en la lista cargada por `ItemList`.

2. Para eliminar un item, la mutación de borrado se gestiona dentro de `ItemList`, donde ya se dispone del `id` correspondiente a través de las props de cada `ItemCard`.
Se planteó delegar la eliminación al componente `Formulary` mediante su `useMutation`, pero esto habría costado innecesariamente tener que elevar el estado a `App` y ser pasado como prop a `Formulary`, tal y como se hace con las modificaciones de los items.

## Authors
[Nicolás Puebla](https://github.com/Syroko8)
