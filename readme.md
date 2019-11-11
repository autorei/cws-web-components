![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

# CWS Web Components

This is the [CWS](https://cws.digital) Web Components library

## Using this component library

### Script tag

- Put a script tag `<script src='https://unpkg.com/cws-web-components@latest/dist/cws-web-components.js'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc

### Node Modules

- Run `npm install cws-web-components --save`
- Put a script `<script src='node_modules/cws-web-components/dist/cws-web-components.js'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc

### In a stencil-starter app

- Run `npm install cws-web-components --save`
- Add an import to the npm packages `import cws-web-components;`
- Then you can use the element anywhere in your template, JSX, html etc

### Required Tokens (CSS vars)

All components was built using CSS vars to be styled. So to use this library, all of these CSS varibles must exist in your application.

To set these variables you can:
1. Create a CSS file with all default variables (like the example below);
2. Or use [cws-theme-tokens](https://github.com/autorei/cws-theme-tokens) to set dynamic CSS variables (from API, database etc.);

* [Click here to see a stylesheet example.](https://github.com/autorei/cws-web-components/tree/master/src/global/tokens.css).
* [Click here to see an HTML file using the cws-theme-tokens.](https://github.com/autorei/cws-web-components/tree/master/src/index.html).

## Available Scripts

### `npm start`
Start development server

### `npm run generate [component-type] [component-name]`
Example to generate a new `cws-field` web component:
```bash
npm run generate component cws-field
````

It will create all file structure inside `src/components/cws-field` to start development a new web component

#### Naming Components

When creating new component tags, is required to use `cws-` prefix.
Ex: `cws-button`, `cws-field`, `cws-icon`, `cws-accordion`...

### `npm run build`

Build the components to deploy

### `npm test`

To run the unit tests for the components
