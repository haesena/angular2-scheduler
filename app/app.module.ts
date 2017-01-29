import { NgModule }      from '@angular/core';
import { MaterialModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { EventDetails } from './scheduler/event-details/event-details.component';


// Imports for loading & configuring the in-memory web api
import { HttpModule } from '@angular/http';

import { SchedulerHttpService } from './scheduler/service/scheduler.httpservice';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    MaterialModule.forRoot()
  ],
  declarations: [
    AppComponent,
    SchedulerComponent,
    EventDetails
  ],
  providers: [
    SchedulerHttpService,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
