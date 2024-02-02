import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErCanvasToolbarComponent } from './er-canvas-toolbar.component';

describe('ErCanvasToolbarComponent', () => {
  let component: ErCanvasToolbarComponent;
  let fixture: ComponentFixture<ErCanvasToolbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErCanvasToolbarComponent]
    });
    fixture = TestBed.createComponent(ErCanvasToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
