
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SchedulerHttpService } from '../service/scheduler.httpservice';

@Component({
    moduleId: module.id,
    selector: 'dhtmlx-event-details',
    templateUrl: 'event-details.component.html',
    styleUrls: ['./event-details.component.css'],
})


export class EventDetails {

    @Input() event: any;
    @Input() isNew: boolean = false;

    @Output() closeDetailEvent: EventEmitter<any> = new EventEmitter();

    closeDetail() {
        this.closeDetailEvent.emit();
    }
}