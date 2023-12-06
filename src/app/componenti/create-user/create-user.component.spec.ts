import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserComponent } from './create-user.component';

import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, NgForm } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { MatSelectModule } from '@angular/material/select';
import { userService } from 'src/app/service/userService/user.service';
import { of } from 'rxjs';
describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;
  let userServiceStub: jasmine.SpyObj<userService>;

  beforeEach(async () => {
    userServiceStub = jasmine.createSpyObj('userService', ['addUser']);
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        BrowserModule,
        HttpClientModule,
        FormsModule,
        MatFormFieldModule,
        MatOptionModule,
        MatInputModule,
        MatDialogModule,
        MatSelectModule,
      ],
      declarations: [CreateUserComponent],
      providers: [{ provide: userService, useValue: userServiceStub }],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call userService.addUser when onSubmit is called', () => {
    const mockFormValue = {
      value: {
        // Utilizza 'value' per simulare il comportamento del form
        name: 'John Doe',
        email: 'john@example.com',
        gender: 'male',
      },
    };

    const mockUserResponse = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      gender: 'male',
      status: 'active',
    };

    userServiceStub.addUser.and.returnValue(of(mockUserResponse));

    spyOn(console, 'log'); // Spy on console.log to check if it's called

    component.onSubmit(mockFormValue as unknown as NgForm);

    // Check that userService.addUser is called with the correct parameters
    expect(userServiceStub.addUser).toHaveBeenCalledWith({
      name: mockFormValue.value.name,
      email: mockFormValue.value.email,
      gender: mockFormValue.value.gender,
      status: 'active',
    });

    // Check that console.log is called with the response data
    expect(console.log).toHaveBeenCalledWith(mockUserResponse);
  });
});
