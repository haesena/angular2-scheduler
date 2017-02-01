import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { SchedulerHttpService } from '../service/scheduler.httpservice';

@Component({
    moduleId: module.id,
    selector: 'dhtmlx-event-details',
    templateUrl: 'event-details.component.html',
    styleUrls: ['./event-details.component.css'],
})


export class EventDetails implements OnInit {

    private color: string = "#5B9BE0";

    @Input() event: any;
    @Input() isNew: boolean = false;

    @Output() closeDetailEvent: EventEmitter<any> = new EventEmitter();

    closeDetail() {
        this.closeDetailEvent.emit();
    }

    ngOnInit(): void {
        if(this.event.color != undefined)  {
            this.color = this.event.color;
        }

        let start = this.event.start_date;
        let end = this.event.end_date;

        // Events can not span multiple days, so it's safe to just parse the start-date
        this.event.date = start.getDate() + '.' + (start.getMonth() + 1) + "." + start.getFullYear();
        this.event.start_time = start.getHours() + ':' + start.getMinutes();
        this.event.end_time = end.getHours() + ':' + end.getMinutes();
    }
}