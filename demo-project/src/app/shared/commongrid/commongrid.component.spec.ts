import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommongridComponent } from './commongrid.component';

describe('CommongridComponent', () => {
  let component: CommongridComponent;
  let fixture: ComponentFixture<CommongridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommongridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommongridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
