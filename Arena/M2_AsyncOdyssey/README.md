# Delusion Tracker

Misión M2 · Async Odyssey — Web Development I.

## Cómo probarlo

Se debe lanzar el proyecto con 'npm run dev'.
Una vez abierto en el navegador, se nos permitirá buscar con distintos filtros
animes y mangas contra la API de [Tenrai](https://tenrai.org/), una API que usa el mismo esquema que [Jikan v4](https://jikan.moe/) para dar servicio como APIs no oficiales de [myanimelist](https://myanimelist.net/apiconfig/references/api/v2).

Al introducir los filtros, que funcionarán como parámetros en la API, debemos seleccionar el bitón de 'Search', para lanzar la petición.

## Uso de IA
Usé el cliente web de Claude Sonnet 5.5 para aclarar y corregir errores en el formato de los parámetros de la url.

También se empleó el cliente web de Gemini para hacer correcciones puntuales en el CSS de diversos componentes del proyecto.

## Autopsia
1. En la generación de los filtros, se planeó introducir las temporadas por las que filtrar, al igual que los distintos estados de emisión, como opciones de los elementos select directamente en el HTML, pero se acabó optando por insertarlos desde los scripts, para hacer cualquier cambio en dichos elementos más sencillo en el fututo.

2. Se encontró un problema al implementar el filtro por géneros, ya que se encesitaba poder escribir el nombre del género, y listar las coincidencias.
Al final se rechazó emplear un select, y se introdujo un campo de texto sobre un div, en el que se muestra una lista de botones con los nombres de los géneros.
Se muestran todos los filtros disponibles cuando el foco del usuario está en el campo de texto, y se esconden los filtros que no coincidan con la búsqueda del usuario.
Esto ahorra tener que estar eliminando e insertando nuevos elementos en cada cambio del valor del campo de texto.

## Authors
[Nicolás Puebla](https://github.com/Syroko8) 