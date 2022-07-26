import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatroomPasswordComponent } from './chatroom-password.component';

describe('ChatroomPasswordComponent', () => {
  let component: ChatroomPasswordComponent;
  let fixture: ComponentFixture<ChatroomPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatroomPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatroomPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
