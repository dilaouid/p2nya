import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatroomChatboxComponent } from './chatroom-chatbox.component';

describe('ChatroomChatboxComponent', () => {
  let component: ChatroomChatboxComponent;
  let fixture: ComponentFixture<ChatroomChatboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatroomChatboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatroomChatboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
