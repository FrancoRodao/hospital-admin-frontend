import { enableProdMode, OnInit, Component } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
  if(window){
    //REMOVE CONSOLE LOGS ON PRODUCTION
    window.console.log = window.console.warn = window.console.info = function(){

    };
  }
}

platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err));

