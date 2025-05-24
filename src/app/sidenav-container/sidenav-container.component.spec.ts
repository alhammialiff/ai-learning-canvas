import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavContainerComponent } from './sidenav-container.component';

describe('SidenavContainerComponent', () => {
  let component: SidenavContainerComponent;
  let fixture: ComponentFixture<SidenavContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidenavContainerComponent]
    });
    fixture = TestBed.createComponent(SidenavContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
