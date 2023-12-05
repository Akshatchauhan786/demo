import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactmasterComponent } from './contactmaster.component';

describe('ContactmasterComponent', () => {
  let component: ContactmasterComponent;
  let fixture: ComponentFixture<ContactmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactmasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
