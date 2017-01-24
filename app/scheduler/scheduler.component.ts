import { Component, Input, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'dhtmlx-scheduler',
    templateUrl: 'scheduler.component.html'
})

export class SchedulerComponent implements OnInit {

    @Input() initialDate: Date = new Date();
    @Input() mode : string = "day";

    ngOnInit(): void {
        scheduler.config.touch = "force";
        scheduler.init('ng_scheduler', this.initialDate, this.mode);
    }
}