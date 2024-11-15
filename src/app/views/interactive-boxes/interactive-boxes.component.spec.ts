import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractiveBoxesComponent } from './interactive-boxes.component';

describe('InteractiveBoxesComponent', () => {
  let component: InteractiveBoxesComponent;
  let fixture: ComponentFixture<InteractiveBoxesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InteractiveBoxesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteractiveBoxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
