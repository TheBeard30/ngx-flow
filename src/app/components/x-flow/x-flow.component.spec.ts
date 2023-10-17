import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XFlowComponent } from './x-flow.component';

describe('XFlowComponent', () => {
  let component: XFlowComponent;
  let fixture: ComponentFixture<XFlowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [XFlowComponent]
    });
    fixture = TestBed.createComponent(XFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
