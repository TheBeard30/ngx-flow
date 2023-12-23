import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorPanelComponent } from './editor-panel.component';

describe('EditorPanelComponent', () => {
  let component: EditorPanelComponent;
  let fixture: ComponentFixture<EditorPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditorPanelComponent]
    });
    fixture = TestBed.createComponent(EditorPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
