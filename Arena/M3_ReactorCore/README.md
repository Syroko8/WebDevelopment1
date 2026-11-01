# Delusion Tracker

Misión M3 · ReactorCore — Web Development I.

## Cómo probarlo

Se debe lanzar el proyecto con 'npm run dev'.
Una vez abierto en el navegador, se nos permitirá buscar con distintos filtros
animes y mangas contra la API de [Tenrai](https://tenrai.org/), una API que usa el mismo esquema que [Jikan v4](https://jikan.moe/) para dar servicio como APIs no oficiales de [myanimelist](https://myanimelist.net/apiconfig/references/api/v2).

Al introducir los filtros, que funcionarán como parámetros en la API, debemos seleccionar el bitón de 'Search', para lanzar la petición.

## Uso de IA
Usé el cliente web de Gemini 3.1 Pro para aclarar conceptos en la gestión de useEffect
en la invocación del método del controlador, en el componente ItemsContainer.

## Autopsia
1. Una decisión discutible ha sido el manejo de la visualización géneros a la hora de reaccionar al input del usuario.
Se deben mostrar los géneros cuyos nombres contengan el valor introducido por el usuario.
Al hacer esto se planteó usar una lista iterable para almacenar referencias a los elementos HTML, y modificar sus atributos 'hidden'. 
En vez de eseo, se incluyó un atributo en sus props, que se determina dinámicamente en el renderizado.

2. Se cuestionó la manera de activar la búsqueda de items al ser pulsado el botón de búsqueda en el formulario.
Para esto se emplea una variable en el componente App, que puede cambiar el componente Sidebar a través de un callback.
Al modificarse, se mandará el cambio al componente ItemsContainer (que realiza la petición), que detectará el cambio en el atributo gracias a un useEffect.
Tras acabar la operación, empleará un callback para reestaurar el valor inicial de la variable interemedia en App.

Al enfrentarse a este dilema, se descartó el uso useContext, estableciendo un contexto en el HTML de App, que pudiese ser percibido por los dos componentes, pudiendo indicar cuando activar el método de llamada a la API.

## Authors
[Nicolás Puebla](https://github.com/Syroko8) 