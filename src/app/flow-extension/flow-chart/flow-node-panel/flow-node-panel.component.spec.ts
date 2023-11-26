import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowNodePanelComponent } from './flow-node-panel.component';

describe('FlowNodePanelComponent', () => {
  let component: FlowNodePanelComponent;
  let fixture: ComponentFixture<FlowNodePanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlowNodePanelComponent]
    });
    fixture = TestBed.createComponent(FlowNodePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
