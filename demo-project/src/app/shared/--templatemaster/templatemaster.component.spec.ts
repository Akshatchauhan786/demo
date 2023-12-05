import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatemasterComponent } from './templatemaster.component';

describe('TemplatemasterComponent', () => {
  let component: TemplatemasterComponent;
  let fixture: ComponentFixture<TemplatemasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplatemasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplatemasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
