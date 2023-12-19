import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowCanvasToolbarComponent } from './flow-canvas-toolbar.component';

describe('FlowCanvasToolbarComponent', () => {
  let component: FlowCanvasToolbarComponent;
  let fixture: ComponentFixture<FlowCanvasToolbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlowCanvasToolbarComponent]
    });
    fixture = TestBed.createComponent(FlowCanvasToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
