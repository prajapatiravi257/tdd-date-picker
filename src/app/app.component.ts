import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { GRID_SIZE, WEEK_DAYS } from './constants';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatIconModule, MatButtonModule, DatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  // Array to store all dates displayed in the calendar
  dates: Date[] = [];
  // Current selected date
  currentDate: Date = new Date();
  // Days of the week, imported from constants
  WEEK_DAYS = WEEK_DAYS;

  ngOnInit(): void {
    this.updateCalendar();
  }

  // Populates the dates array with all dates to be displayed in the calendar
  updateCalendar() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const start = new Date(year, month, 1);
    const end = new Date(year, month + 1, 0);

    this.dates = [];
    // Add days from previous month to fill the first week
    const prevMonthDays = start.getDay();
    for (let i = prevMonthDays; i > 0; i--) {
      this.dates.push(new Date(year, month, -i + 1));
    }

    // Add all days of the current month
    for (let i = 1; i <= end.getDate(); i++) {
      this.dates.push(new Date(year, month, i));
    }

    // Add days from next month to fill the last week
    const remainingDays = GRID_SIZE - this.dates.length;
    for (let i = 1; i <= remainingDays; i++) {
      this.dates.push(new Date(year, month + 1, i));
    }
  }

  // Navigation methods
  previousMonth() {
    this.updateDate(0, -1);
  }

  nextMonth() {
    this.updateDate(0, 1);
  }

  previousYear() {
    this.updateDate(-1, 0);
  }

  nextYear() {
    this.updateDate(1, 0);
  }

  // Updates the current date and refreshes the calendar
  updateDate(yearDiff: number, monthDiff: number) {
    this.currentDate = new Date(
      this.currentDate.getFullYear() + yearDiff,
      this.currentDate.getMonth() + monthDiff
    );
    this.updateCalendar();
  }

  // Selects a specific date and updates the calendar
  selectDate(date: Date) {
    this.currentDate = date;
    this.updateCalendar();
  }

  // Resets the calendar to today's date
  goToToday() {
    this.selectDate(new Date());
  }

  // Checks if a given date is the currently selected date
  isSelected(date: Date): boolean {
    return (
      date.getDate() === this.currentDate.getDate() &&
      date.getMonth() === this.currentDate.getMonth() &&
      date.getFullYear() === this.currentDate.getFullYear()
    );
  }
}
