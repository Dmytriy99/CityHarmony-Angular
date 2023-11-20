// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { PostComponent } from './post.component';
// import { ApiService } from 'src/app/service/api.service';
// import { Component } from '@angular/core';

// describe('PostComponent', () => {
//   let component: PostComponent;
//   let fixture: ComponentFixture<PostComponent>;
//   let service: ApiService;
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [PostComponent],
//     }).compileComponents();
//     service = TestBed.inject(ApiService);
//     fixture = TestBed.createComponent(PostComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

// describe("crea tutti i post",() => {
//   it("render post", ()=> {

//   })
// })
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { PostComponent } from './post.component';
import { ApiService } from 'src/app/service/api.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let apiService: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostComponent],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        HttpClientTestingModule,
        MatPaginatorModule,
      ],
      providers: [ApiService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);

    // Mock the ApiService methods
    spyOn(apiService, 'getPost3').and.returnValue(of([]));
    spyOn(apiService, 'postPost').and.returnValue(of({}));
    spyOn(apiService, 'getPost4').and.returnValue(of([]));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSearch and update Allpost', () => {
    const formValue = {
      title: 'Search Query',
    };

    component.onSearch({ value: formValue } as any);

    expect(apiService.getPost4).toHaveBeenCalledWith(formValue.title);
    expect(component.Allpost).toEqual([]);
  });
});
