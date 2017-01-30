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
    }
}