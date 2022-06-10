import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatroomModalNotYetComponent } from './chatroom-modal-not-yet.component';

describe('ChatroomModalNotYetComponent', () => {
  let component: ChatroomModalNotYetComponent;
  let fixture: ComponentFixture<ChatroomModalNotYetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatroomModalNotYetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatroomModalNotYetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
