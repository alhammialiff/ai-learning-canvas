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
  neuronPositions2DList: {
    x: number,
    y: number
  }[][] = []


  neuron: any;
  svg: any;

  canvasWidth: number = 1000;
  canvasHeight: number = 600;

  layerWidth: number = this.canvasWidth/this.layers.length;

  // A necessary repeat to get the dimensional logic right
  layerHeight: number = this.canvasHeight;

  ngOnInit(){

    this.layerLength = this.layers.length;

  }

  ngAfterViewInit(){

    // Set neuron position
    this.renderer.setStyle(this.neuralNetworkCanvas.nativeElement,
      'position',
      'relative');

    // ============================
    // Canvas foundation sizing
    // ============================
    // Debugging purposes
    this.renderer.setStyle(this.neuralNetworkCanvas.nativeElement,
      'border',
      '1px solid red');

    // Width and height
    this.renderer.setStyle(this.neuralNetworkCanvas.nativeElement,
      'width',
      `${this.canvasWidth}px`);
    this.renderer.setStyle(this.neuralNetworkCanvas.nativeElement,
      'height',
      `${this.canvasHeight}px`);



    // ============================
    // Set neuron position based on canvas
    // ============================

    // (1) Iterate each layer
    this.layers.forEach((layerHeight, layerIndex)=>{

      var neuronInLayerPosition: {
        x: number,
        y: number
      }[]= []

      // (1) Set gap
      const yStep = this.layerHeight/layerHeight;
      const xStep = this.layerWidth;



      // (2) Use layer values to iterate each neuron position
      for(let neuronIndex = 0; neuronIndex < layerHeight; neuronIndex++){

        // Set neuron position
        neuronInLayerPosition.push({
          x: layerIndex * this.layerWidth,
          y: (neuronIndex+1) * yStep/2
        });

      }

      // This 2D Array store neuronPositions by layer.
      this.neuronPositions2DList.push(neuronInLayerPosition);

    })



    // Set neuron







  }

  setNeuronContainerSize(svg: any){

    this.renderer.setStyle(svg,'width','66px');
    this.renderer.setStyle(svg,'height','62px');

  }

  // setFlexLayout(){

  //   // Flex layout
  //   this.renderer.setStyle(this.neuralNetworkCanvas.nativeElement, 'display', 'flex');
  //   this.renderer.setStyle(this.neuralNetworkCanvas.nativeElement, 'width', '800px');
  //   this.renderer.setStyle(this.neuralNetworkCanvas.nativeElement, 'height', '600px');
  //   // this.renderer.setStyle(this.neuralNetworkCanvas.nativeElement, 'flex-direction', 'row');
  //   // this.renderer.setStyle(this.neuralNetworkCanvas.nativeElement, 'border', 'solid 1px red');

  // }

  renderSvg(){

    const svg = this.renderer.createElement('svg', 'svg');

    return svg;

  }

  // renderDivRow(){

  //   // <div class="row"></div>
  //   const divRow = this.renderer.createElement('div');
  //   this.renderer.addClass(divRow,'row');

  //   return divRow;

  // }

  // renderDivCol(){

  //   // <div class="col"></div>
  //   const divCol = this.renderer.createElement('div');
  //   this.renderer.addClass(divCol,'col');
  //   // this.renderer.setStyle(divCol,'border','1px solid red');

  //   return divCol;

  // }

  renderNeuron(pos: any){

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

    this.renderer.setStyle(circle, 'position', 'absolute');
    this.renderer.setStyle(circle, 'top', pos.x);
    this.renderer.setStyle(circle, 'left', pos.y);
    this.renderer.setAttribute(circle, 'stroke', 'black');
    this.renderer.setAttribute(circle, 'stroke-width', '0');
    this.renderer.setAttribute(circle, 'fill', '#3b3f87');

    return circle;

  }

  getNeuronCoordinates(svgNeuronContainer: any): {
    x: number,
    y: number
  }{

    const rect = svgNeuronContainer.getBoundingClientRect();

    const x = rect.left + (rect.width/2);
    const y = rect.top + (rect.height/2);

    return { x: x , y: y };

  }

  pushNeuronCoordinates(neuronPos: { x: number, y: number },
    layerIndex:number, neuronIndex:number){

    if(!this.neuronPositions2DList[layerIndex]){

      this.neuronPositions2DList[layerIndex] = [];

    }

    this.neuronPositions2DList[layerIndex][neuronIndex] = neuronPos;

  }

}
