
import { Component, Input, OnInit } from '@angular/core';
import { SchedulerHttpService } from './service/scheduler.httpservice';

import {
    trigger,
    state,
    style,
    transition,
    animate
} from '@angular/core';

require ('../../lib/dhtmlxScheduler_v4.3.1/codebase/sources/dhtmlxscheduler.js');
require ('../../lib/dhtmlxScheduler_v4.3.1/codebase/sources/ext/dhtmlxscheduler_minical.js');

declare var scheduler: any;

@Component({
    moduleId: module.id,
    selector: 'dhtmlx-scheduler',
    templateUrl: 'scheduler.component.html',
    styleUrls: ['./scheduler.component.css'],


    // Animations for the mini-calendar and the event-details
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
    @Input() newEvent : boolean = false;

    constructor(private schedulerService: SchedulerHttpService) { }

    ngOnInit(): void {
        this.initScheduler();
        this.loadEvents();

        // redraw the scheduler
        setTimeout(function() {
            scheduler.updateView();
        }, 0);
    }

    initScheduler() {

        // Enable touch-mode
        scheduler.config.touch = true;
        // Scroll to the actual hour
        scheduler.config.scroll_hour = new Date().getHours();
        // Disable to default tooltip while moving or creating events
        scheduler.config.touch_tip = false;


        // Readonly-Settings
        scheduler.config.readonly_form = true;
        scheduler.config.dblclick_create = false;
        scheduler.config.drag_create = false;
        scheduler.config.drag_resize = false;
        scheduler.config.drag_move = false;

        // Date-Format we get from the WebService
        scheduler.config.xml_date="%Y-%m-%d %H:%i";

        scheduler.config.first_hour = 7;
        scheduler.config.last_hour = 19;

        // Set the templates for the date in the navbar
        scheduler.templates['day_date'] = scheduler.date.date_to_str("%d.%m.%Y");
        scheduler.templates['month_date'] = scheduler.date.date_to_str("%m.%Y");
        scheduler.templates['week_date'] = function(d1:string, d2:string) {
            var d = scheduler.date.date_to_str("%d");
            var m = scheduler.date.date_to_str("%m");

            return d(d1)+"."+m(d2)+" &ndash; "+d(d2)+"."+m(d2);
        }

        /**
         * Additional scheduler configurations can be made here
         */

        // Initialize the scheduler
        scheduler.init('ng_scheduler', this.initialDate, this.mode);

        // reload events when the view is changed (when mode or date changed)
        scheduler.attachEvent("onViewChange", function (new_mode: string , new_date: string){
            this.loadEvents();
        }.bind(this));

        // Event-listeners to intercept the default events
        scheduler.attachEvent("onClick", function (id: string, e: Event){
            var ev = scheduler.getEvent(id);
            this.setEvent(ev);

            if(this.showMiniCalendar)
                this.toggleCalendar();

            scheduler._hide_global_tip();
            
            return false;
        }.bind(this));

        scheduler.attachEvent("onBeforeDrag", function (id, mode, e){
            if(id == null) {
                scheduler._show_global_tip();
                return true;
            } else {
                return false;
            }
        });

        scheduler.attachEvent("onBeforeEventChanged", function(ev, e, is_new, original){
            if(is_new) {
                this.newEvent = true;
                this.setEvent(ev);
            }
            scheduler._hide_global_tip();
            return false;
        }.bind(this));

        scheduler.attachEvent("onEmptyClick", function (d: Date, e: Event){
            this.setEvent(null);
            scheduler._hide_global_tip();

            if(this.showMiniCalendar)
                this.toggleCalendar();

            return true;
        }.bind(this));

        // render the minicalendar 
        this.miniCalendar = scheduler.renderCalendar({
            container:"cal_here",
            navigation:true,
            handler:function(date: string){
                scheduler.setCurrentView(date, scheduler._mode);
                this.toggleCalendar();
            }.bind(this)
        });


    }

    // set the active event which will be displayed in the event-details
    // ev is null, the event-details will be hidden
    setEvent(ev: any) {
        this.activeEvent = ev;
    }

    // load the events
    loadEvents() {
        // get the current state of the scheduler
        var state = scheduler.getState();
        var dateToString = scheduler.date.date_to_str("%Y-%m-%d");
        // get the min and max displayed dates
        var min_date = dateToString(state.min_date);
        var max_date = dateToString(state.max_date);

        // load the events from the scheduler-service
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