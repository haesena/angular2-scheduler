import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { SchedulerComponent } from './scheduler/scheduler.component';


// Imports for loading & configuring the in-memory web api
import { HttpModule } from '@angular/http';

import { SchedulerHttpService } from './scheduler/service/scheduler.httpservice';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    SchedulerComponent
  ],
  providers: [
    SchedulerHttpService,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
