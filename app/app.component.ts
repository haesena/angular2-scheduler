import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
<h1>Hello {{name}}</h1>
<dhtmlx-scheduler></dhtmlx-scheduler>
`,
})
export class AppComponent  { name = 'Scheduler'; }
