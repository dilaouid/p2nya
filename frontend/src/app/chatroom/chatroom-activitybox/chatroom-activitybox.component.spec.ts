import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatroomActivityboxComponent } from './chatroom-activitybox.component';

describe('ChatroomActivityboxComponent', () => {
  let component: ChatroomActivityboxComponent;
  let fixture: ComponentFixture<ChatroomActivityboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatroomActivityboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatroomActivityboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
