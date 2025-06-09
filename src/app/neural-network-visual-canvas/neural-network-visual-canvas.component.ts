import { BreakpointObserver } from '@angular/cdk/layout';
import { BreakpointObserverService } from './../ng-service/breakpoint-observer.service';
import { DeepLearningService } from './../ng-service/deep-learning.service';
import { Component, Renderer2, ElementRef, ViewChild, HostListener } from '@angular/core';

@Component({
  selector: 'app-neural-network-visual-canvas',
  templateUrl: './neural-network-visual-canvas.component.html',
  styleUrls: ['./neural-network-visual-canvas.component.scss']
})
export class NeuralNetworkVisualCanvasComponent {

  @ViewChild('neuralNetworkCanvas') neuralNetworkCanvas!: ElementRef;

  constructor(private renderer: Renderer2,
    private deepLearningService: DeepLearningService,
    private breakpointObserverService: BreakpointObserverService
  ){}

  // Network Map Prototyping
  layers: any[] = [];
  layerLength: number = 0;
  neuronPositions2DList: {
    x: number,
    y: number
  }[][] = []

  neuron: any;
  svg: any;

  // TODO: Generalise multiples to accomodate for different
  //       viewports (web and mobile for a start)
  canvasWidth: number = 800;
  canvasHeight: number = 600;

  layerWidth: number = this.canvasWidth/this.layers.length;

  // A necessary repeat to get the dimensional logic right
  layerHeight: number = this.canvasHeight;

  ngOnInit(){

    this.onResize();

    this.deepLearningService.emitLayerShape.subscribe({

      next: (inputShape: any) => {

        if(inputShape.length > 0){

          this.layers = [...inputShape]
          this.layerLength = this.layers.length;
          this.drawNetwork();

        }

      },
      error: (error: any) => {

      }

    });

  }

  ngAfterViewInit(){


    this.drawNetwork();

  }

  // Resize NN Canvas according to current inner viewport width
  @HostListener('window:resize', ['$event'])
  onResize(){

    const width = window.innerWidth;

    if (width < 576) { // xs

      this.canvasWidth = 320;
      this.canvasHeight = 240;

    } else if (width >= 576 && width < 768) { // sm

      this.canvasWidth = 480;
      this.canvasHeight = 320;

    } else if (width >= 768 && width < 992) { // md

      this.canvasWidth = 700;
      this.canvasHeight = 400;

    } else if (width >= 992 && width < 1200) { // lg

      this.canvasWidth = 900;
      this.canvasHeight = 600;

    } else { // xxl and above

      this.canvasWidth = 900;
      this.canvasHeight = 600;

    }

    this.drawNetwork();

  }

  drawNetwork(){

    if (!this.neuralNetworkCanvas || !this.neuralNetworkCanvas.nativeElement) {

      return;

    }

    this.neuronPositions2DList = [];

    // Reset network on every render
    // Why? Every user input is emitted via Behavior Subject
    //      Behavior Subject drives change detection
    if (this.neuralNetworkCanvas && this.neuralNetworkCanvas.nativeElement) {

      this.neuralNetworkCanvas.nativeElement.innerHTML = '';

    }

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
        // TODO: Generalise multiples to accomodate for different
        //       viewports (web and mobile for a start)
        neuronInLayerPosition.push({
          x: (layerIndex + 1) * 100,
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
        if(layerIndex < this.neuronPositions2DList.length - 1){

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
