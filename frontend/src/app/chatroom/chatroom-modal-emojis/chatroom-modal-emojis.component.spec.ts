import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatroomModalEmojisComponent } from './chatroom-modal-emojis.component';

describe('ChatroomModalEmojisComponent', () => {
  let component: ChatroomModalEmojisComponent;
  let fixture: ComponentFixture<ChatroomModalEmojisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatroomModalEmojisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatroomModalEmojisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
