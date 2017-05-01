import {Component, OnInit} from '@angular/core';
import {IMyOptions, IMyDateModel, IMyInputFieldChanged, IMyCalendarViewChanged} from 'mydatepicker';

declare var require:any;
const inlineSampleTpl: string = require('./sample-date-picker-inline.html');

@Component({
    selector: 'sample-date-picker-inline',
    template: inlineSampleTpl
})

export class SampleDatePickerInline implements OnInit {

    private myDatePickerInlineOptions: IMyOptions = {
        inline: true,
        disableUntil: {year: 0, month: 0, day: 0},
        disableHeaderButtons: true
    };
    private selectedDateInline: string = '';

    private selectedTextInline: string = '';
    private border: string = 'none';
    private locale:string = 'en';

    private locales:Array<string> = new Array('en', 'fr', 'ja', 'fi', 'es', 'hu', 'sv', 'nl', 'ru', 'uk', 'no', 'tr', 'pt-br', 'de', 'it', 'it-ch', 'pl', 'my', 'sk', 'sl', 'zh-cn', 'he', 'ro', 'ca', 'id', 'en-au', 'am-et', 'cs', 'el', 'kk', 'th', 'ko-kr', 'da');

    constructor() {}

    ngOnInit() {
        console.log('onInit(): SampleDatePickerInline');
    }

    onChangeLocale(locale:string) {
        this.locale = locale;
    }

    onDisablePast(checked:boolean) {
        let date = new Date();

        // Disable/enable dates from 5th backward
        date.setDate(date.getDate() - 5);

        let copy = this.getCopyOfOptions();
        copy.disableUntil = checked ? {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()} : {};
        this.myDatePickerInlineOptions = copy;
    }

    onDisableFuture(checked:boolean) {
        let date = new Date();

        // Disable/enable dates from 5th forward
        date.setDate(date.getDate() + 5);

        let copy = this.getCopyOfOptions();
        copy.disableSince = checked ? {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()} : {};
        this.myDatePickerInlineOptions = copy;
    }

    onDisableSingleDates(checked:boolean) {
        let date = new Date();

        // Disable/enable next month 1st and 3rd days
        let copy = this.getCopyOfOptions();
        copy.disableDays = checked ? [{year: date.getFullYear(), month: date.getMonth() + 2, day: 1}, {year: date.getFullYear(), month: date.getMonth() + 2, day: 3}] : [];
        this.myDatePickerInlineOptions = copy;
    }

    onDisableWeekends(checked:boolean) {
        // Disable/enable weekends
        let copy = this.getCopyOfOptions();
        copy.disableWeekends = checked;
        this.myDatePickerInlineOptions = copy;
    }

    onDateChanged(event: IMyDateModel) {
        console.log('onDateChanged(): ', event.date, ' - jsdate: ', new Date(event.jsdate).toLocaleDateString(), ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
        if(event.formatted !== '') {
            this.selectedTextInline = 'Formatted: ' + event.formatted + ' - epoc: ' + event.epoc;
            this.border = '1px solid #CCC';
        }
        else {
            this.selectedTextInline = '';
            this.border = 'none';
        }
    }

    onInputFieldChanged(event: IMyInputFieldChanged) {
        console.log('onInputFieldChanged(): Value: ', event.value, ' - dateFormat: ', event.dateFormat, ' - valid: ', event.valid);
    }

    onCalendarViewChanged(event: IMyCalendarViewChanged) {
        console.log('onCalendarViewChanged(): Year: ', event.year, ' - month: ', event.month, ' - first: ', event.first, ' - last: ', event.last);
    }

    getCopyOfOptions() {
        return JSON.parse(JSON.stringify(this.myDatePickerInlineOptions));
    }
}