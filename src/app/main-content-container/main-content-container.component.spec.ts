import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainContentContainerComponent } from './main-content-container.component';

describe('MainContentContainerComponent', () => {
  let component: MainContentContainerComponent;
  let fixture: ComponentFixture<MainContentContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainContentContainerComponent]
    });
    fixture = TestBed.createComponent(MainContentContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
