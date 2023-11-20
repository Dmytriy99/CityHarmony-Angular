import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostUnicoComponent } from './post-unico.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { CommentiComponent } from '../commenti/commenti.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PostUnicoComponent', () => {
  let component: PostUnicoComponent;
  let fixture: ComponentFixture<PostUnicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MatCardModule,
        FormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      declarations: [PostUnicoComponent, CommentiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PostUnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {});
});
