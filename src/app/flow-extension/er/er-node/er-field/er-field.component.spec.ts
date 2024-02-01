import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErFieldComponent } from './er-field.component';

describe('ErFieldComponent', () => {
  let component: ErFieldComponent;
  let fixture: ComponentFixture<ErFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErFieldComponent]
    });
    fixture = TestBed.createComponent(ErFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
