
import { Component, Input, OnInit } from '@angular/core';
import { SchedulerHttpService } from './scheduler.httpservice';

import {
    trigger,
    state,
    style,
    transition,
    animate
} from '@angular/core';

declare var scheduler: any;

@Component({
    moduleId: module.id,
    selector: 'dhtmlx-scheduler',
    templateUrl: 'scheduler.component.html',
    styleUrls: ['./scheduler.component.css'],
    animations: [
        trigger('miniCalState', [
            state('inactive', style({
                transform: 'translateY(-105%)'
            })),
            state('active',   style({
                transform: 'translateY(0)'
            })),
            transition('inactive => active', animate('250ms ease-in')),
            transition('active => inactive', animate('250ms ease-out'))
        ]),

        trigger('eventDetails', [
            state('void', style({
                transform: 'translateY(+105%)'
            })),
            state('*',   style({
                transform: 'translateY(0)'
            })),
            transition('void => *', animate('200ms ease-in')),
            transition('* => void', animate('200ms ease-out'))
        ])
    ]
})

export class SchedulerComponent implements OnInit {

    private events: any;
    private miniCalendar: any;
    miniCalState: string = 'inactive';

    @Input() initialDate: Date = new Date();
    @Input() mode : string = "day";
    @Input() activeEvent : any = null;
    @Input() showMiniCalendar : boolean = false;

    constructor(private schedulerService: SchedulerHttpService) { }

    ngOnInit(): void {

        this.initScheduler();
        this.loadEvents();
    }

    initScheduler() {

        scheduler.config.readonly = true;
        scheduler.config.details_on_dblclick = true;
        scheduler.config.touch = "force";
        scheduler.config.scroll_hour = new Date().getHours();

        scheduler.init('ng_scheduler', this.initialDate, this.mode);


        scheduler.attachEvent("onViewChange", function (new_mode: string , new_date: string){
            this.loadEvents();
        }.bind(this));

        scheduler.attachEvent("onClick", function (id: string, e: Event){
            var ev = scheduler.getEvent(id);
            this.setEvent(ev);

            if(this.showMiniCalendar)
                this.toggleCalendar();

            return true;
        }.bind(this));

        scheduler.attachEvent("onEmptyClick", function (d: Date, e: Event){
            this.setEvent(null);

            if(this.showMiniCalendar)
                this.toggleCalendar();

            return true;
        }.bind(this));

        this.miniCalendar = scheduler.renderCalendar({
            container:"cal_here",
            navigation:true,
            handler:function(date){
                scheduler.setCurrentView(date, scheduler._mode);
                this.toggleCalendar();
            }.bind(this)
        });


    }

    setEvent(ev: any) {
        this.activeEvent = ev;
    }

    loadEvents() {

        var state = scheduler.getState();
        var dateToString = scheduler.date.date_to_str("%Y-%m-%d");
        var min_date = dateToString(state.min_date);
        var max_date = dateToString(state.max_date);

        this.schedulerService.getEvents(min_date, max_date)
            .then(events => {
                this.events = events;
                scheduler.parse(this.events, "json");
            })
            .catch(error => console.log(error));
    }

    toggleCalendar() {
        this.showMiniCalendar = !this.showMiniCalendar;
        setTimeout(function() {
            scheduler.updateCalendar(this.miniCalendar, scheduler._date);
        }.bind(this), 0);

        if(this.showMiniCalendar) {
            this.activeEvent = null;
            this.miniCalState = 'active';
        } else {
            this.miniCalState = 'inactive';
        }
    }
}