import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeModalJoinComponent } from './home-modal-join.component';

describe('HomeModalJoinComponent', () => {
  let component: HomeModalJoinComponent;
  let fixture: ComponentFixture<HomeModalJoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeModalJoinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeModalJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
