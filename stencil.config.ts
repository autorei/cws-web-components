import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'cws-web-components',
  globalStyle: 'src/global/index.css',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ]
};
