import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNodeModalComponent } from './create-node-modal.component';

describe('CreateNodeModalComponent', () => {
  let component: CreateNodeModalComponent;
  let fixture: ComponentFixture<CreateNodeModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateNodeModalComponent]
    });
    fixture = TestBed.createComponent(CreateNodeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
