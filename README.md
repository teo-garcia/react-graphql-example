# GraphQL para React Developers

¡Hola! 👋🏼

Mi nombre es Mateo y escribí [este artículo](www.escuelafrontend.com) para enseñarle a desarrolladores en que consiste GraphQL y cuales son los fundamentos necesarios para empezar a usarlo desde el frontend.

## Cómo usar este proyecto?

### Instalación de dependencias

Para instalar las dependencias del proyecto debes usar [yarn](https://classic.yarnpkg.com), y ejecutar el siguiente comando dentro del repositorio

```bash
  yarn
```

### Ejecución del proyecto

Este repositorio está compuesto de:

- Un servidor mock creado usando `graphql-json-server`.
- Una aplicación React creada usando `vite`.

Para levantar el servidor debes ejecutar:

```bash
  yarn dev:server
```

Para levantar el cliente debes ejecutar:

```bash
  yarn dev:client 
```

Con estos comandos podrás hacer uso de:

- La aplicación de React en `http://localhost:3000`
- La consola de GraphIQL en `http://localhost:3001`


Finalmente, el código de los ejemplos esta ubicado en el fichero llamado `App.jsx`.