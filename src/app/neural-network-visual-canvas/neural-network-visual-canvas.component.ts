import { Component, Renderer2, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-neural-network-visual-canvas',
  templateUrl: './neural-network-visual-canvas.component.html',
  styleUrls: ['./neural-network-visual-canvas.component.scss']
})
export class NeuralNetworkVisualCanvasComponent {

  @ViewChild('neuralNetworkCanvas') neuralNetworkCanvas!: ElementRef;

  constructor(private renderer: Renderer2){}

  // Network Map Prototyping
  layers = [8,10,10,10,4];
  layerLength: number = 0;

  ngOnInit(){

    this.layerLength = this.layers.length;

  }

  ngAfterViewInit(){

    this.setFlexLayout();

    for(const numOfNeurons of this.layers){

      const divRow = this.renderDivRow();
      this.renderer.appendChild(this.neuralNetworkCanvas.nativeElement, divRow);

      for(let i = 0; i < numOfNeurons; i++){

        // this.renderNeuronInColumn();
        const divCol = this.renderDivCol();
        this.renderer.appendChild(divRow,divCol);

        const svg = this.renderSvg();
        const circle = this.renderNeuron();

        this.renderer.appendChild(svg, circle);
        this.renderer.appendChild(divCol, svg);
        this.setNeuronContainerSize(svg);

      }


    }



  }

  setNeuronContainerSize(svg: any){

    this.renderer.setStyle(svg,'width','66px');
    this.renderer.setStyle(svg,'height','62px');

  }

  setFlexLayout(){

    // Flex layout
    this.renderer.setStyle(this.neuralNetworkCanvas.nativeElement, 'display', 'flex');
    this.renderer.setStyle(this.neuralNetworkCanvas.nativeElement, 'max-width', '800px');
    this.renderer.setStyle(this.neuralNetworkCanvas.nativeElement, 'flex-direction', 'row');
    this.renderer.setStyle(this.neuralNetworkCanvas.nativeElement, 'border', 'solid 1px red');

  }

  renderSvg(){

    const svg = this.renderer.createElement('svg', 'svg');

    return svg;

  }

  renderDivRow(){

    // <div class="row"></div>
    const divRow = this.renderer.createElement('div');
    this.renderer.addClass(divRow,'row');

    return divRow;

  }

  renderDivCol(){

    // <div class="col"></div>
    const divCol = this.renderer.createElement('div');
    this.renderer.addClass(divCol,'col');

    return divCol;

  }

  renderNeuron(){

    // // <div class="row"></div>
    // const divRow = this.renderer.createElement('div');
    // this.renderer.addClass(divRow,'row');

    // // <div class="col"></div>
    // const divCol = this.renderer.createElement('div');
    // this.renderer.addClass(divRow,'col');

    // Create neuron <circle cx="50" cy="50" r="2vw" stroke="black" stroke-width="1" fill="lightblue" />
    const circle = this.renderer.createElement('circle', 'svg');
    this.renderer.setAttribute(circle, 'cx', '50');
    this.renderer.setAttribute(circle, 'cy', '50');
    this.renderer.setAttribute(circle, 'r', '10px');
    this.renderer.setAttribute(circle, 'stroke', 'black');
    this.renderer.setAttribute(circle, 'stroke-width', '1');
    this.renderer.setAttribute(circle, 'fill', 'lightblue');

    return circle;

  }

}
