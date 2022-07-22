import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { Settings, SETTINGS } from './models/settings';

fetch('assets/settings.json').then(res => res.json()).then((settings) => {
  if (environment.production) {
    enableProdMode();
  }

  platformBrowserDynamic([{ provide: SETTINGS, useValue: settings }])
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
});
