import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalUserComponent } from './personal-user.component';
import { HttpClientModule } from '@angular/common/http';

describe('PersonalUserComponent', () => {
  let component: PersonalUserComponent;
  let fixture: ComponentFixture<PersonalUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [PersonalUserComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonalUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
