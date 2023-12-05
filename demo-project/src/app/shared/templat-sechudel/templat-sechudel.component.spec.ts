import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatSechudelComponent } from './templat-sechudel.component';

describe('TemplatSechudelComponent', () => {
  let component: TemplatSechudelComponent;
  let fixture: ComponentFixture<TemplatSechudelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplatSechudelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplatSechudelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
