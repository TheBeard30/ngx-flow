import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErComponent } from './er.component';

describe('ErComponent', () => {
  let component: ErComponent;
  let fixture: ComponentFixture<ErComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErComponent]
    });
    fixture = TestBed.createComponent(ErComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
