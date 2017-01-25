import { Component, Input, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { SchedulerHttpService } from './scheduler.httpservice';

@Component({
    moduleId: module.id,
    selector: 'dhtmlx-scheduler',
    templateUrl: 'scheduler.component.html'
})

export class SchedulerComponent implements OnInit {

    events: any;

    @Input() initialDate: Date = new Date();
    @Input() mode : string = "day";

    constructor(private schedulerService: SchedulerHttpService) {}

    ngOnInit(): void {
        scheduler.config.touch = "force";
        scheduler.init('ng_scheduler', this.initialDate, this.mode);

        // scheduler.attachEvent("onViewChange", function (new_mode , new_date){
        //
        // });

        this.loadEvents();
    }

    loadEvents() {

        var state = scheduler.getState();
        var dateToString = scheduler.date.date_to_str("%Y-%m-%d");
        var min_date = dateToString(state.min_date);
        var max_date = dateToString(state.max_date);

        this.schedulerService.getEvents(min_date, max_date).then(events => {
            this.events = events;
            scheduler.parse(this.events, "json");
        });
    }

    log() {
        // console.log(scheduler);
    }
}