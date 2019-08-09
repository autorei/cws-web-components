![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

# CWS Web Components

This is the [CWS](https://cws.digital) Web Components library

## Using this component library

### Script tag

- Put a script tag  `<script src='https://unpkg.com/cws-web-components@latest/dist/cws-web-components.js'></script>` in the head of your index.html
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
All components was built using CSS vars to be styled. So to use this library, these css varibles must exist in your application.

<details>
  <summary>Click to see a stylesheet example!</summary>
  
  ```css
    /* CUSTOM THEME FONT */
    @import url('https://fonts.googleapis.com/css?family=Roboto+Condensed:300,400,700|Roboto:300,400,700&display=swap');

    :root {
      /* GENERIC TOKENS */
      --spacing-stack-xxxs: 4px;
      --spacing-stack-xxs: 8px;
      --spacing-stack-xs: 16px;
      --spacing-stack-sm: 24px;
      --spacing-stack-md: 32px;
      --spacing-stack-lg: 40px;
      --spacing-stack-xl: 48px;
      --spacing-stack-xxl: 56px;
      --spacing-stack-xxxl: 64px;

      --spacing-squish-xs: 8px 16px;
      --spacing-squish-sm: 8px 24px;
      --spacing-squish-md: 16px 24px;
      --spacing-squish-lg: 16px 32px;
      --spacing-squish-xl: 32px 48px;

      --spacing-inset-xxs: 4px;
      --spacing-inset-xs: 8px;
      --spacing-inset-sm: 16px;
      --spacing-inset-md: 24px;
      --spacing-inset-lg: 32px;
      --spacing-inset-xl: 48px;

      --spacing-inline-xxxs: 4px;
      --spacing-inline-xxs: 8px;
      --spacing-inline-xs: 16px;
      --spacing-inline-sm: 24px;
      --spacing-inline-md: 32px;
      --spacing-inline-lg: 40px;
      --spacing-inline-xl: 48px;
      --spacing-inline-xxl: 56px;
      --spacing-inline-xxxl: 64px;

      --size-icon-xxs: 16px;
      --size-icon-xs: 20px;
      --size-icon-sm: 24px;
      --size-icon-md: 32px;
      --size-icon-lg: 40px;
      --size-icon-xl: 48px;

      --shadow-inset-1: inset 0 0 0 2px rgba(0,0,0,0.2);

      --shadow-1: 0 4px 8px rgba(0,0,0,0.2);
      --shadow-2: 0 8px 16px rgba(0,0,0,0.2);
      --shadow-3: 0 16px 32px rgba(0,0,0,0.2);
      --shadow-4: 0 32px 64px rgba(0,0,0,0.2);

      --border-width-none: 0px;
      --border-width-thin: 1px;
      --border-width-medium: 2px;
      --border-width-thick: 4px;

      --border-radius-none: 0px;
      --border-radius-xxs: 2px;
      --border-radius-xs: 4px;
      --border-radius-sm: 8px;
      --border-radius-md: 16px;
      --border-radius-circle: 50%;
      --border-radius-pill: 500px;

      --opacity-0: 0;
      --opacity-1: 0.16;
      --opacity-2: 0.24;
      --opacity-3: 0.32;
      --opacity-4: 0.40;
      --opacity-5: 0.64;
      --opacity-6: 0.80;

      --grid-container: 1400px;
      --grid-column-width: 102px;
      --grid-column-gutter: 16px;

      /* BRAND TOKENS */
      --font-size-xs: 10px;
      --font-size-sm: 12px;
      --font-size-md: 14px;
      --font-size-lg: 16px;
      --font-size-xl: 24px;
      --font-size-xxl: 36px;

      --font-weight-light: 300;
      --font-weight-regular: 400;
      --font-weight-bold: 700;

      --font-family-1: 'Roboto', sans-serif;
      --font-family-2: 'Roboto Condensed', sans-serif;

      --text-transform: uppercase;
      --text-decoration: underline;

      --color-primary-100: #E7F4FC;
      --color-primary-200: #8BCAF0;
      --color-primary-300: #5CB5EA;
      --color-primary-400: #2EA0E4;
      --color-primary-500: #008CDF;
      --color-primary-600: #0073B7;
      --color-primary-700: #005A8E;
      --color-primary-800: #004066;
      --color-primary-900: #00273D;

      --color-primary-100-contrast: #202020;
      --color-primary-200-contrast: #202020;
      --color-primary-300-contrast: #FFFFFF;
      --color-primary-400-contrast: #FFFFFF;
      --color-primary-500-contrast: #FFFFFF;
      --color-primary-600-contrast: #FFFFFF;
      --color-primary-700-contrast: #FFFFFF;
      --color-primary-800-contrast: #FFFFFF;
      --color-primary-900-contrast: #FFFFFF;

      --color-secondary-100: #ECECEC;
      --color-secondary-200: #A0A0A0;
      --color-secondary-300: #7B7B7B;
      --color-secondary-400: #555555;
      --color-secondary-500: #303030;
      --color-secondary-600: #282828;
      --color-secondary-700: #1F1F1F;
      --color-secondary-800: #161616;
      --color-secondary-900: #0E0E0E;

      --color-secondary-100-contrast: #202020;
      --color-secondary-200-contrast: #202020;
      --color-secondary-300-contrast: #202020;
      --color-secondary-400-contrast: #FFFFFF;
      --color-secondary-500-contrast: #FFFFFF;
      --color-secondary-600-contrast: #FFFFFF;
      --color-secondary-700-contrast: #FFFFFF;
      --color-secondary-800-contrast: #FFFFFF;
      --color-secondary-900-contrast: #FFFFFF;

      --color-contrast-light: #FFFFFF;
      --color-contrast-dark: #202020;

      --color-neutral-100: #FFFFFF;
      --color-neutral-200: #FBFBFB;
      --color-neutral-300: #F2F2F2;
      --color-neutral-400: #E8E8E8;
      --color-neutral-500: #B6B6B6;
      --color-neutral-600: #868686;
      --color-neutral-700: #202020;

      --color-error-100: #FDECEC;
      --color-error-200: #F16161;
      --color-error-300: #EA0808;
      --color-error-400: #AB0606;
      --color-error-500: #6B0404;

      --color-alert-100: #F6E5B9;
      --color-alert-200: #E9BA45;
      --color-alert-300: #E1A100;
      --color-alert-400: #A47600;
      --color-alert-500: #523B00;

      --color-success-100: #E8F8F0;
      --color-success-200: #4AC889;
      --color-success-300: #07B45D;
      --color-success-400: #06944D;
      --color-success-500: #034222;

      /* COMPONENTS */
      --button-width-sm: 64px;
      --button-height-sm: 32px;

      --button-width-md: 112px;
      --button-height-md: 38px;

      --button-width-lg: 216px;
      --button-height-lg: 56px;
    }

  ```
</details>

## Available Scripts

### `npm start`
Start development server

### `npm run generate [component-type] [component-name]`
Example to generate a new `cws-field` web component:
```bash
npm run generate component cws-field
```

It will create all file structure inside `src/components/cws-field` to start development a new web component

#### Naming Components

When creating new component tags, is required to use `cws-` prefix.
Ex: `cws-button`, `cws-field`, `cws-icon`, `cws-accordion`...

### `npm run build`
Build the components to deploy

### `npm test`

To run the unit tests for the components
