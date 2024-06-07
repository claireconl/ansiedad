import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntenderPage } from './entender.page';

describe('EntenderPage', () => {
  let component: EntenderPage;
  let fixture: ComponentFixture<EntenderPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EntenderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
