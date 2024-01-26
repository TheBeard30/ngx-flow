import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErNodeComponent } from './er-node.component';

describe('ErNodeComponent', () => {
  let component: ErNodeComponent;
  let fixture: ComponentFixture<ErNodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErNodeComponent]
    });
    fixture = TestBed.createComponent(ErNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
