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

  canvasWidth: number = 800;
  canvasHeight: number = 600;

  layerWidth: number = this.canvasWidth/this.layers.length;

  // A necessary repeat to get the dimensional logic right
  layerHeight: number = this.canvasHeight;

  ngOnInit(){

    this.layerLength = this.layers.length;

  }

  ngAfterViewInit(){

    // ============================
    // Canvas foundation sizing
    // ============================
    // Debugging purposes
    this.renderer.setStyle(this.neuralNetworkCanvas.nativeElement,
      'border',
      '1px solid #d4d4d4');

    this.renderer.setStyle(this.neuralNetworkCanvas.nativeElement,
      'background-color',
      'white');

    // Width and height
    this.renderer.setStyle(this.neuralNetworkCanvas.nativeElement,
      'width',
      `${this.canvasWidth}px`);
    this.renderer.setStyle(this.neuralNetworkCanvas.nativeElement,
      'height',
      `${this.canvasHeight}px`);

    this.renderer.setStyle(this.neuralNetworkCanvas.nativeElement,
      'border-radius',
      `16px`
    )


    // ============================
    // Set neuron position based on canvas
    // ============================
    // (1) Iterate each layer
    this.layers.forEach((layerHeight, layerIndex)=>{

      var neuronInLayerPosition: {
        x: number,
        y: number
      }[]= []

      // (2) Use layer values to iterate each neuron position
      for(let neuronIndex = 0; neuronIndex < layerHeight; neuronIndex++){

        // Set neuron position
        neuronInLayerPosition.push({
          x: (layerIndex + 1) * 130,
          y: (neuronIndex + 1) * 50
        });

      }

      // This 2D Array store neuronPositions by layer.
      this.neuronPositions2DList.push(neuronInLayerPosition);

    });

    // ======================================
    // Set the SVG container and objects for Neuron and Vertices
    // ======================================
    // Set Neuron SVG
    this.svg = this.renderer.createElement('svg', 'svg');
    this.renderer.setAttribute(this.svg,'width','800px');
    this.renderer.setAttribute(this.svg,'height','600px');

    // Set Vertice SVG
    // This SVG takes absolute as display to enable overlay on neurons
    const backgroundSvg = this.renderer.createElement('svg','svg');
    this.renderer.setAttribute(backgroundSvg,'width','800px');
    this.renderer.setAttribute(backgroundSvg,'height','600px');
    this.renderer.setStyle(backgroundSvg,'display','absolute');
    this.renderer.setStyle(backgroundSvg,'top','0px');
    this.renderer.setStyle(backgroundSvg,'left','0px');

    // (1) Iterate 2D array containing layers, which contains each neuron position
    this.neuronPositions2DList.forEach((layer,layerIndex) =>{

      // (2) Use layer values to iterate each neuron position
      for(let neuronIndex = 0; neuronIndex < layer.length; neuronIndex++){

        // Store current index of current layer
        const neuronPosition = layer[neuronIndex];

        // Create Neuron
        // Note: Each circle has to be encapsulated with svg
        const circle = this.renderer.createElement('circle','svg');
        this.renderer.setAttribute(circle,'cx',neuronPosition.x.toString());
        this.renderer.setAttribute(circle,'cy',neuronPosition.y.toString());
        this.renderer.setAttribute(circle,'r','10');
        this.renderer.setAttribute(circle,'fill','#d4d4d4');

        // Append circle to Neuron SVG
        this.renderer.appendChild(this.svg,circle);

        // Check if layer is not last,
        // Without this it'll return an error stating that the target layer is undefined
        // This is because there is no layer after final layer
        if(layerIndex < layer.length - 1){

          // Prep next layer for line rendering
          const nextLayer = this.neuronPositions2DList[layerIndex + 1];
          const nextLayerLength = nextLayer.length;

          // Iterate every neuron position in the next layer
          nextLayer.forEach((neuronPosition2, layerIndex2)=> {

              // Render line based on current layer's neuron pos, and next layer's neuron pos
              const line = this.renderer.createElement('line','svg');
              this.renderer.setAttribute(line,'x1', neuronPosition.x.toString());
              this.renderer.setAttribute(line,'y1', neuronPosition.y.toString());
              this.renderer.setAttribute(line,'x2', neuronPosition2.x.toString());
              this.renderer.setAttribute(line,'y2', neuronPosition2.y.toString());
              this.renderer.setAttribute(line, 'stroke', '#c33984');
              this.renderer.setAttribute(line, 'stroke-width', '0.5');

              // Append line into Vertice SVG
              this.renderer.appendChild(backgroundSvg,line);

            });

        }

      }


    });

    // Append Canvas SVG on Canvas
    this.renderer.appendChild(this.neuralNetworkCanvas.nativeElement, this.svg);

    // Append Neuron SVG on Canvas SVG
    this.renderer.appendChild(this.svg, backgroundSvg);

  }


}
