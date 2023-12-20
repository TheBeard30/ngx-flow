import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowCanvasScaleToolbarComponent } from './flow-canvas-scale-toolbar.component';

describe('FlowCanvasScaleToolbarComponent', () => {
  let component: FlowCanvasScaleToolbarComponent;
  let fixture: ComponentFixture<FlowCanvasScaleToolbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlowCanvasScaleToolbarComponent]
    });
    fixture = TestBed.createComponent(FlowCanvasScaleToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
