import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeuralNetworkVisualCanvasComponent } from './neural-network-visual-canvas.component';

describe('NeuralNetworkVisualCanvasComponent', () => {
  let component: NeuralNetworkVisualCanvasComponent;
  let fixture: ComponentFixture<NeuralNetworkVisualCanvasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NeuralNetworkVisualCanvasComponent]
    });
    fixture = TestBed.createComponent(NeuralNetworkVisualCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
