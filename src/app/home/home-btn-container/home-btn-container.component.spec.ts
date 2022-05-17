import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBtnContainerComponent } from './home-btn-container.component';

describe('HomeBtnContainerComponent', () => {
  let component: HomeBtnContainerComponent;
  let fixture: ComponentFixture<HomeBtnContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeBtnContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeBtnContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
