import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { SchedulerComponent } from './scheduler/scheduler.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, SchedulerComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
