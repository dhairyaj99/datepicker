import { Platform } from '@angular/cdk/platform';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormControl } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE, NativeDateAdapter } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

export class MonthpickerDateAdapter extends NativeDateAdapter {
  constructor(matDateLocale: string, platform: Platform) {
    super(matDateLocale, platform);
  }

  override format(date: Date, displayFormat: any): string {
    const month = date.getMonth() + 1;
    const monthAsString = ('0' + month).slice(-2);
    const day = date.getDate();
    const dayAsString = ('0' + day).slice(-2);
    return dayAsString + monthAsString;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MonthpickerDateAdapter,
      deps: [MAT_DATE_LOCALE, Platform],
    },
  ]
})

export class AppComponent {
  title = 'datepicker';
  @Input()
  public monthAndYear: Date | null = null;

  @Output()
  public monthAndYearChange = new EventEmitter<Date | null>();

  public emitDateChange(event: MatDatepickerInputEvent<Date | null, unknown>): void {
    this.monthAndYearChange.emit(event.value);
  }

  public monthChanged(value: any, widget: any): void {
    this.monthAndYear = value;
    widget.close();
  }

  

}
