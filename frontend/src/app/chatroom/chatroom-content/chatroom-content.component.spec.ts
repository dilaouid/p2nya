import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatroomContentComponent } from './chatroom-content.component';

describe('ChatroomContentComponent', () => {
  let component: ChatroomContentComponent;
  let fixture: ComponentFixture<ChatroomContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatroomContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatroomContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
