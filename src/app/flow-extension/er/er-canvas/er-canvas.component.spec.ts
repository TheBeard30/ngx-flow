import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErCanvasComponent } from './er-canvas.component';

describe('ErCanvasComponent', () => {
  let component: ErCanvasComponent;
  let fixture: ComponentFixture<ErCanvasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErCanvasComponent]
    });
    fixture = TestBed.createComponent(ErCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
