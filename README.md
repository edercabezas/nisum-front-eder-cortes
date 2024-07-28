# FrontNisum
Este proyecto está corriendo sobre la version de Angular 17

Requisitos para ejecutar este proyecto

# 1 Nodejs 
# 2 npm
# 3 Angular

## Clonar el proyecto desde GitHub

Ejecutar `git clone https://github.com/edercabezas/nisum-front-eder-cortes`. rama develop

## Instalación de dependencia

Navegar a la carpeta del proyecto

Ejecutar `npm install o npm ci` para instalar las dependencias

## Ejecutar el proyecto

Ejecutar `ng serve` este comando ejecutar la app local en esta url `http://localhost:4200/`. Copiar y pegar en el navegador


## Pruebas unitarias 

Ejecutar `ng test` para ver el estado de cada uno de los componentes las pruebas unitarias no quedaron al 100% peró garanticé que los componentes no generaran ningún tipo de error


## Construir la app para despliegue en un servidor 

Ejecutar `ng build` Este construye la app lista para el despliegue en   `dist/` .

## Funcionalidad de la aplicación

Dentro de app hay tres carpetas `core, features, shared`
#Core Para servicios singleton y proveedores de aplicación a nivel global.
#feature. Para agrupar funcionalidades relacionadas específicas a características.
#shared. Para componentes, directivas y pipes reutilizables usados en múltiples módulos.


## Api usadas
En este casos e usaron dos Apis de `https://rapidapi.com/hub`

#1 Para listar los equipos de futbol `https://api-football-v1.p.rapidapi.com/v3/teams?league=39&season=2024` Esta recibe dos parámetros la liga y el año
#2 Para listar los jugadores basándome en el equipo seleccionado  `https://api-football-v1.p.rapidapi.com/v3/players/squads?team=39` recibe como parámetro tram que es el ID del equipo y devuelve los jugadores

Este consumo se hace en el servicio ubicado en `src/app/core/services/api/api.service.ts` 


## Crud en la app

Para esto se crea el servicio `src/app/core/services/crud/crud.service.ts` el cual están todas las acciones requeridas `listar, agregar, editar, eliminar`. Todo esto se hace con datos del storage




