import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowChartCanvasComponent } from './flow-chart-canvas.component';

describe('FlowChartCanvasComponent', () => {
  let component: FlowChartCanvasComponent;
  let fixture: ComponentFixture<FlowChartCanvasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlowChartCanvasComponent]
    });
    fixture = TestBed.createComponent(FlowChartCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
