import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XFlowPage } from './x-flow.page';

describe('XFlowPage', () => {
  let component: XFlowPage;
  let fixture: ComponentFixture<XFlowPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [XFlowPage]
    });
    fixture = TestBed.createComponent(XFlowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
