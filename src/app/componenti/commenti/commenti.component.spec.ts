import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentiComponent } from './commenti.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

describe('CommentiComponent', () => {
  let component: CommentiComponent;
  let fixture: ComponentFixture<CommentiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatCardModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSidenavModule,
        MatListModule,
        MatToolbarModule,
        MatIconModule,
        FormsModule,
      ],
      declarations: [CommentiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
