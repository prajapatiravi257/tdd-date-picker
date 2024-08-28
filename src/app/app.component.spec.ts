import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { GRID_SIZE } from './constants';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  // Set up the testing environment before each test
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  // Basic component creation tests
  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // Test for displaying current day name
  it('should display the current day name', () => {
    let today = new Date();
    component.currentDate = today;
    let dayName = today.toLocaleString('default', { weekday: 'long' });
    fixture.detectChanges();
    const dayNameElement = fixture.debugElement.query(
      By.css('.day-name')
    ).nativeElement;
    expect(dayNameElement.textContent).toContain(dayName);
  });

  // Test for displaying current date
  it('should display the current date', () => {
    component.currentDate = new Date();
    fixture.detectChanges();
    const dateElement = fixture.debugElement.query(
      By.css('.date')
    ).nativeElement;
    expect(dateElement.textContent).toBe(
      component.currentDate.getDate().toString()
    );
  });

  // Test for displaying current month and year
  it('should display the current month and year', () => {
    let today = new Date();
    component.currentDate = today;
    fixture.detectChanges();
    const monthElement = fixture.debugElement.query(
      By.css('.month')
    ).nativeElement;
    const yearElement = fixture.debugElement.query(
      By.css('.year')
    ).nativeElement;
    expect(monthElement.textContent).toBe(
      component.currentDate.toLocaleString('default', { month: 'long' })
    );
    expect(yearElement.textContent).toBe(
      component.currentDate.getFullYear().toString()
    );
  });

  // Tests for navigation buttons
  it('should update the calendar when the previous month button is clicked', () => {
    spyOn(component, 'previousMonth').and.callThrough();
    const previousButton = fixture.debugElement.query(
      By.css('.month-nav button:first-child')
    ).nativeElement;
    previousButton.click();
    fixture.detectChanges();
    expect(component.previousMonth).toHaveBeenCalled();
  });

  it('should update the calendar when the next month button is clicked', () => {
    spyOn(component, 'nextMonth').and.callThrough();
    const nextButton = fixture.debugElement.query(
      By.css('.month-nav button:last-child')
    ).nativeElement;
    nextButton.click();
    fixture.detectChanges();
    expect(component.nextMonth).toHaveBeenCalled();
  });

  it('should update the calendar when the previous year button is clicked', () => {
    spyOn(component, 'previousYear').and.callThrough();
    const previousButton = fixture.debugElement.query(
      By.css('.year-nav button:first-child')
    ).nativeElement;
    previousButton.click();
    fixture.detectChanges();
    expect(component.previousYear).toHaveBeenCalled();
  });

  it('should update the calendar when the next year button is clicked', () => {
    spyOn(component, 'nextYear').and.callThrough();
    const nextButton = fixture.debugElement.query(
      By.css('.year-nav button:last-child')
    ).nativeElement;
    nextButton.click();
    fixture.detectChanges();
    expect(component.nextYear).toHaveBeenCalled();
  });

  // Test for correct display of calendar grid
  it('should display the dates correctly in the calendar grid', () => {
    component.currentDate = new Date(2024, 8, 1);
    component.updateCalendar();
    fixture.detectChanges();
    const dateElements = fixture.debugElement.queryAll(
      By.css('.calendar-grid .day')
    );
    expect(dateElements.length).toBe(GRID_SIZE);
  });

  // Test for highlighting selected date
  it('should highlight the selected date', () => {
    const today = new Date();
    component.dates = [today];
    fixture.detectChanges();
    const dayElement = fixture.debugElement.query(By.css('.day.selected'));
    expect(dayElement).toBeTruthy();
    expect(dayElement.nativeElement.textContent.trim()).toBe(
      today.getDate().toString()
    );
  });
});
