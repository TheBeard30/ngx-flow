import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowPage } from './flow.page';

describe('XFlowPage', () => {
  let component: FlowPage;
  let fixture: ComponentFixture<FlowPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlowPage]
    });
    fixture = TestBed.createComponent(FlowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
