import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XFlowCanvasComponent } from './x-flow-canvas.component';

describe('XFlowCanvasComponent', () => {
  let component: XFlowCanvasComponent;
  let fixture: ComponentFixture<XFlowCanvasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [XFlowCanvasComponent]
    });
    fixture = TestBed.createComponent(XFlowCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
