import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatroomCallboxComponent } from './chatroom-callbox.component';

describe('ChatroomCallboxComponent', () => {
  let component: ChatroomCallboxComponent;
  let fixture: ComponentFixture<ChatroomCallboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatroomCallboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatroomCallboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
