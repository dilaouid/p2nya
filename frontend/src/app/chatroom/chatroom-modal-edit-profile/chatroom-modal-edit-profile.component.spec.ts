import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatroomModalEditProfileComponent } from './chatroom-modal-edit-profile.component';

describe('ChatroomModalEditProfileComponent', () => {
  let component: ChatroomModalEditProfileComponent;
  let fixture: ComponentFixture<ChatroomModalEditProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatroomModalEditProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatroomModalEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
