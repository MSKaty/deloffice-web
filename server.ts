/**
 * *** NOTE ON IMPORTING FROM ANGULAR AND NGUNIVERSAL IN THIS FILE ***
 *
 * If your application uses third-party dependencies, you'll need to
 * either use Webpack or the Angular CLI's `bundleDependencies` feature
 * in order to adequately package them for use on the server without a
 * node_modules directory.
 *
 * However, due to the nature of the CLI's `bundleDependencies`, importing
 * Angular in this file will create a different instance of Angular than
 * the version in the compiled application code. This leads to unavoidable
 * conflicts. Therefore, please do not explicitly import from @angular or
 * @nguniversal in this file. You can export any needed resources
 * from your application's main.server.ts file, as seen below with the
 * import for `ngExpressEngine`.
 */

import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import * as express from 'express';
import { join } from 'path';
import { readFileSync } from 'fs';

// Polyfills required for Firebase
(global as any).WebSocket = require('ws');
(global as any).XMLHttpRequest = require('xhr2');

// import { enableProdMode } from '@angular/core';

// Express server
const app = express();

app.enable('trust proxy');

const APP_NAME = 'deloffice';
const DIST_FOLDER = join(process.cwd(), 'dist');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP, ngExpressEngine, provideModuleMap } = require(`./dist/${APP_NAME}-server/main`);

// enableProdMode();

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');

app.get(/^(\/?)[^.]+$/, (req, res) => {
  res.render(join(DIST_FOLDER, APP_NAME, 'index'), {
    req,
    res
  });
});

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, APP_NAME));

// Static Assets

app.use('/', express.static(join(DIST_FOLDER, APP_NAME), {
  dotfiles: 'allow',
  maxAge: 2592000000,
  setHeaders(res, path) {
    res.setHeader('Expires', new Date(Date.now() + 2592000000 * 30).toUTCString());
  }
}));
app.use('/assets/img', express.static(join(DIST_FOLDER, APP_NAME, 'assets', 'img'), {
  dotfiles: 'allow',
  maxAge: 2592000000,
  setHeaders(res, path) {
    res.setHeader('Expires', new Date(Date.now() + 2592000000 * 30).toUTCString());
  }
}));
app.use('/assets/js', express.static(join(DIST_FOLDER, APP_NAME, 'assets', 'js'), {
  dotfiles: 'allow',
  maxAge: 2592000000,
  setHeaders(res, path) {
    res.setHeader('Expires', new Date(Date.now() + 2592000000 * 30).toUTCString());
  }
}));
app.use('/assets/pdf', express.static(join(DIST_FOLDER, APP_NAME, 'assets', 'pdf'), {
  dotfiles: 'allow',
  maxAge: 2592000000,
  setHeaders(res, path) {
    res.setHeader('Expires', new Date(Date.now() + 2592000000 * 30).toUTCString());
  }
}));


// Start up the Node server
if (!process.env.FUNCTION_NAME) {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Node Express server listening on http://localhost:${PORT}`);
  });
}
