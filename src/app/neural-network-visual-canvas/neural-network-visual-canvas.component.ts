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
  neuronPositions: {
    x: number,
    y: number
  }[][] = []

  ngOnInit(){

    this.layerLength = this.layers.length;

  }

  ngAfterViewInit(){

    this.setFlexLayout();

    this.layers.forEach((neurons, layerIndex) => {

      const divRow = this.renderDivRow();
      this.renderer.appendChild(this.neuralNetworkCanvas.nativeElement, divRow);

      for(let n = 0; n < neurons; n++){

        // this.renderNeuronInColumn();
        const divCol = this.renderDivCol();
        this.renderer.appendChild(divRow,divCol);

        const svg = this.renderSvg();
        const neuron = this.renderNeuron();


        this.renderer.appendChild(svg, neuron);
        this.renderer.appendChild(divCol, svg);
        this.setNeuronContainerSize(svg);

        // const neuronPos = this.getNeuronCoordinates(svg);
        // this.pushNeuronCoordinates(neuronPos, layerIndex, n)
        // ;

        const width = 800;
        const height = 600;
        const layerCount = this.layers.length;
        const xStep = width / (layerCount + 1);

        this.layers.forEach((neurons, layerIndex) => {

          const yStep = height / (neurons + 1);
          const layerPositions: { x: number, y: number }[] = [];

          for (let n = 0; n < neurons; n++) {
            const x = xStep * (layerIndex + 1);
            const y = yStep * (n + 1);
            layerPositions.push({ x, y });
          }

          this.neuronPositions.push(layerPositions);

        });

      }

    });

    setTimeout(()=>{

      // Create a background svg for the lines
      const backgroundSvg = this.renderer.createElement('svg','svg');
      this.renderer.setAttribute(backgroundSvg, 'width', '800');
      this.renderer.setAttribute(backgroundSvg, 'height', '600');
      this.renderer.setStyle(backgroundSvg, 'position', 'absolute');
      this.renderer.setStyle(backgroundSvg, 'top', '0');
      this.renderer.setStyle(backgroundSvg, 'left', '0');
      this.renderer.setStyle(backgroundSvg, 'z-index', '0');

      this.renderer.setStyle(this.neuralNetworkCanvas.nativeElement, 'position', 'relative');

      this.neuronPositions.forEach((layer, i) => {

        const layerA = layer;
        var layerB: any[] = [];
        var layerBLength = null;
        if(this.neuronPositions[i+1]){

          layerB = this.neuronPositions[i + 1];
          layerBLength = layerB.length;

        }

        var counterA = 0;

        if(i < this.neuronPositions.length - 1){

          while(counterA < layerA.length){

            layerB.forEach((inputNeuronPos, j)=>{

              const line = this.renderer.createElement('line','svg');

              this.renderer.setAttribute(line, 'x1', layerA[counterA].x.toString());
              this.renderer.setAttribute(line, 'y1', layerA[counterA].y.toString());

              this.renderer.setAttribute(line, 'x2', layerB[j].x.toString());
              this.renderer.setAttribute(line, 'y2', layerB[j].y.toString());

              this.renderer.setAttribute(line, 'stroke', '#919191');
              this.renderer.setAttribute(line, 'stroke-width', '0.1');

              this.renderer.appendChild(backgroundSvg, line);

            });

            counterA++;

          }

        }

      });

      console.log("[Neuron Coordinates] neuronPositions - ", this.neuronPositions);

      this.renderer.insertBefore(
        this.neuralNetworkCanvas.nativeElement,
        backgroundSvg,
        this.neuralNetworkCanvas.nativeElement.firstChild
      );

      // this.renderer.appendChild(this.neuralNetworkCanvas.nativeElement,backgroundSvg);

    },1)





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
    // this.renderer.setStyle(this.neuralNetworkCanvas.nativeElement, 'border', 'solid 1px red');

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
    // this.renderer.setStyle(divCol,'border','1px solid red');

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

    if(!this.neuronPositions[layerIndex]){

      this.neuronPositions[layerIndex] = [];

    }

    this.neuronPositions[layerIndex][neuronIndex] = neuronPos;

  }

}
