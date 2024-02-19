import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErTablePanelComponent } from './er-table-panel.component';

describe('ErTablePanelComponent', () => {
  let component: ErTablePanelComponent;
  let fixture: ComponentFixture<ErTablePanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErTablePanelComponent]
    });
    fixture = TestBed.createComponent(ErTablePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
