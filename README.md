# CarServiceClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Solución al problema.
Primero que todo instalé bootstrap, para darle un estilo y hacer los formularios, listas,botones, de forma más sencilla y bonita. Organicé un poco los elementos, cree una carpeta components y services. En components metí los componetes que habían(car-edit y car-list) y además cree los componentes user-edit y user-list. en services metí la carpeta shared donde están los servicio car y giphy, también cree la carpeta user y ahí cree los servicios que se consumen en los componentes user-edit y user-list.

En el component user-list tenemos una tabla donde se muestra la información de los propietarios(id,dni,profesión y nombre), además de los botones para poder editar, eliminar un usuario y eliminar varios usuario.
En el component eser-edit está el formulariompara crear o editar un usuario especifico.
El servicio de user están todos los metodos implementados a través del httpClient y el link de la API.

Además modifique los componetes que ya estaban para poder visuaizar el nombre del carro y el dni del propietario, además de agregarle el campo  donde se ingresa el id del owner para relacionar el dni con el auto. 
IMPORTANTE se utiliza el id con el que se maneja en la api, no dni del propetario. 
Utilice solo la Api de cars en vez de cool-cars, porque no me estaba funcionando. Para obtener los id tanto de los carros como de los propietarios lo tuve que sacar del link href que nos da API en el json.
