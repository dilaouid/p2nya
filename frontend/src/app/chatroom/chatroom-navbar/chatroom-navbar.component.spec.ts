import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatroomNavbarComponent } from './chatroom-navbar.component';

describe('ChatroomNavbarComponent', () => {
  let component: ChatroomNavbarComponent;
  let fixture: ComponentFixture<ChatroomNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatroomNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatroomNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
