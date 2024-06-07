import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DesahogarmePage } from './desahogarme.page';

describe('DesahogarmePage', () => {
  let component: DesahogarmePage;
  let fixture: ComponentFixture<DesahogarmePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DesahogarmePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
