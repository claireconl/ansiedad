import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CentrarPage } from './centrar.page';

describe('CentrarPage', () => {
  let component: CentrarPage;
  let fixture: ComponentFixture<CentrarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CentrarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
