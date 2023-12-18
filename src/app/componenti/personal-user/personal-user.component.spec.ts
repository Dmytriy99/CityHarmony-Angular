import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PersonalUserComponent } from './personal-user.component';
import { userService } from 'src/app/service/userService/user.service';
import { postService } from 'src/app/service/postService/post.service';
import { of } from 'rxjs';
import { User, Post } from 'src/app/modelli/interface';
import { HttpClientModule } from '@angular/common/http';

describe('PersonalUserComponent', () => {
  let component: PersonalUserComponent;
  let fixture: ComponentFixture<PersonalUserComponent>;
  let mockPostService: jasmine.SpyObj<postService>;
  let mockUserService: jasmine.SpyObj<userService>;

  beforeEach(() => {
    mockPostService = jasmine.createSpyObj('postService', ['getPostById']);
    mockUserService = jasmine.createSpyObj('userService', ['getUserByID']);
    TestBed.configureTestingModule({
      declarations: [PersonalUserComponent],
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [
        { provide: postService, useValue: mockPostService },
        { provide: userService, useValue: mockUserService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonalUserComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should fetch user and posts on initialization', () => {
    const mockUserId = 1;
    const mockUser: User = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      gender: 'male',
      status: 'active',
    };
    const mockPosts: Post[] = [
      { id: 1, user_id: 1, title: 'Post 1', body: 'Body of post 1' },
      { id: 2, user_id: 1, title: 'Post 2', body: 'Body of post 2' },
    ];

    mockUserService.getUserByID.and.returnValue(of(mockUser));

    mockPostService.getPostById.and.returnValue(of(mockPosts));

    spyOn(localStorage, 'getItem').and.returnValue(mockUserId.toString());

    component.ngOnInit();

    expect(mockUserService.getUserByID).toHaveBeenCalledWith(mockUserId);

    expect(mockPostService.getPostById).toHaveBeenCalledWith(mockUserId);

    expect(component.user).toEqual(mockUser);
    expect(component.post).toEqual(mockPosts);
  });
});
