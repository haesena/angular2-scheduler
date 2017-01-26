import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { SchedulerComponent } from './scheduler/scheduler.component';


// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemorySchedulerService }  from './scheduler/in-memory-scheduler.service';
import { HttpModule } from '@angular/http';

import { SchedulerHttpService } from './scheduler/scheduler.httpservice';

@NgModule({
  imports: [
    BrowserModule,
    InMemoryWebApiModule.forRoot(InMemorySchedulerService),
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
