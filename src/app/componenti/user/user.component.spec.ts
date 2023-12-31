import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { userService } from 'src/app/service/userService/user.service';
import { postService } from 'src/app/service/postService/post.service';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { PostUnicoComponent } from '../post-unico/post-unico.component';
import { CommentiComponent } from '../commenti/commenti.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let mockUserService: jasmine.SpyObj<userService>;
  let mockPostService: jasmine.SpyObj<postService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj('userService', [
      'getUserByID',
      'deleteUser2',
    ]);
    mockPostService = jasmine.createSpyObj('postService', ['getPostById']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    mockUserService.getUserByID.and.returnValue(
      of({
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        gender: 'Male',
        status: 'Active',
      })
    );
    mockPostService.getPostById.and.returnValue(
      of([{ id: 1, user_id: 1, title: 'Post 1', body: 'Body of Post 1' }])
    );

    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        MatCardModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        MatSidenavModule,
        MatIconModule,
        FormsModule,
        MatInputModule,
      ],
      declarations: [UserComponent, PostUnicoComponent, CommentiComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } },
        },
        { provide: Router, useValue: mockRouter },
        { provide: userService, useValue: mockUserService },
        { provide: postService, useValue: mockPostService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should fetch user and posts on initialization', () => {
    const userData = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      gender: 'Male',
      status: 'Active',
    };
    const postData = [
      { id: 1, user_id: 1, title: 'Post 1', body: 'Body of Post 1' },
    ];

    mockUserService.getUserByID.and.returnValue(of(userData));
    mockPostService.getPostById.and.returnValue(of(postData));

    fixture.detectChanges();

    expect(mockUserService.getUserByID).toHaveBeenCalledWith(1);
    expect(mockPostService.getPostById).toHaveBeenCalledWith(1);

    expect(component.users).toEqual(userData);
    expect(component.post).toEqual(postData);
  });

  it('should delete user and navigate to /users', () => {
    mockUserService.deleteUser2.and.returnValue(of({}));

    component.deleteUser();

    expect(mockUserService.deleteUser2).toHaveBeenCalledWith(1);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/users']);
  });
  it('should handle no posts scenario on initialization', () => {
    const userData = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      gender: 'Male',
      status: 'Active',
    };

    mockUserService.getUserByID.and.returnValue(of(userData));

    fixture.detectChanges();

    expect(mockUserService.getUserByID).toHaveBeenCalledWith(1);
    expect(mockPostService.getPostById).toHaveBeenCalledWith(1);

    expect(component.users).toEqual(userData);

    expect(component.noPost).toEqual('There are no Posts yet');
  });
});
