import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeModalCreateComponent } from './home-modal-create.component';

describe('HomeModalCreateComponent', () => {
  let component: HomeModalCreateComponent;
  let fixture: ComponentFixture<HomeModalCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeModalCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeModalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
