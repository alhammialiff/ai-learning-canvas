import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootUiContainerComponent } from './root-ui-container.component';

describe('RootUiContainerComponent', () => {
  let component: RootUiContainerComponent;
  let fixture: ComponentFixture<RootUiContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RootUiContainerComponent]
    });
    fixture = TestBed.createComponent(RootUiContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
