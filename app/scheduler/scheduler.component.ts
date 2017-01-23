import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'dhtmlx-scheduler',
    templateUrl: 'scheduler.component.html'
})

export class SchedulerComponent implements OnInit {

    ngOnInit(): void {
        scheduler.config.touch = "force";
        scheduler.init('ng_scheduler', new Date(), "day");
    }
}