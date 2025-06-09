import { DeepLearningService } from './../ng-service/deep-learning.service';
import { HttpResponse } from '@angular/common/http';
import { DatasetService } from './../ng-service/dataset.service';
import { ChangeDetectorRef, Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, map } from 'rxjs';
import { BreakpointObserverService } from '../ng-service/breakpoint-observer.service';

@Component({
  selector: 'app-main-content-container',
  templateUrl: './main-content-container.component.html',
  styleUrls: ['./main-content-container.component.scss']
})
export class MainContentContainerComponent {

  // @ViewChild('mainContentContainer') mainContentContainer!: ElementRef;
  // Width and Height including scrollbar excluding toolbar
  viewportWidth = window.innerWidth;
  viewportHeight = window.innerHeight;

  containerMarginLeft = '0px';

  parsedDataset: any;
  parsedColumn: any;
  selectedDatasetTitle: string | null = null;

  modelCreationForm: FormGroup = new FormGroup({
    numOfLayers: new FormControl('')
  })

  layerShapeForm: FormGroup = new FormGroup({
    inputLayer: new FormControl(''),
    hiddenLayer: new FormArray([
      new FormControl(null)
    ]),
    outputLayer: new FormControl('')
  })

  layerShape: number[] = [];

  constructor(
    private datasetService: DatasetService,
    private deepLearningService: DeepLearningService,
    // private breakpointObserverService: BreakpointObserverService,
    // private renderer: Renderer2,
    // private changeDetectorRef: ChangeDetectorRef
  ){}

  ngOnInit(){

    // Init Iris dataset for Github Page
    this.demoIrisDataset();

    // Send a little test signal to kick start the stack works
    // this.datasetService.sendApiTestSignal().subscribe({

    //   next: (apiTestResponse: unknown) => {

    //     if(apiTestResponse){

    //       const response = apiTestResponse as HttpResponse<any>;

    //     }


    //   },
    //   error: (error: any) => {

    //     console.log("Error", error);

    //   }

    // });

  }

  ngAfterViewInit(){

    this.layerShapeForm.valueChanges
      .pipe(
        map((values) => {
        return this.layerShapeForm.getRawValue()
        })
      )
      .subscribe((currentValue) => {

        console.log("[Layer Shape Form]", currentValue);

        const hiddenLayer = [...currentValue.hiddenLayer];

        this.layerShape = [
          currentValue?.inputLayer,
          ...hiddenLayer,
          currentValue?.outputLayer,
        ];

        this.deepLearningService.sendLayerShapeForEmit(this.layerShape);

      });

  }

  addHiddenLayerFormControl(){

    this.hiddenLayer.push(new FormControl(null));

  }

  removeHiddenLayerFormControl(index: number){

    this.hiddenLayer.removeAt(index);

  }

  onClickDataset(event: Event){

    const target = event.target as HTMLElement;
    this.selectedDatasetTitle = target.innerText.toLowerCase();

    if(this.selectedDatasetTitle.split('').length > 1){

      this.selectedDatasetTitle = this.selectedDatasetTitle.split('').reduce((a,b) => a + b);

    }

    this.datasetService.parseGithubPageDataset(this.selectedDatasetTitle).subscribe({

      next: (csv)=>{

        this.parsedDataset = Array.isArray(csv) ? [...csv] : [];
        this.parsedColumn = Object.keys(this.parsedDataset[0]).length;
        console.log(csv);

      },
      error: () => {



      }

    })

  }

  demoIrisDataset(){

    this.selectedDatasetTitle = 'iris';

    this.datasetService.parseGithubPageDataset(this.selectedDatasetTitle).subscribe({

      next: (csv)=>{

        this.parsedDataset = Array.isArray(csv) ? [...csv] : [];
        this.parsedColumn = Object.keys(this.parsedDataset[0]).length;
        console.log(csv);

      },
      error: () => {



      }

    })

  }

  get hiddenLayer(): FormArray {

    return this.layerShapeForm.get('hiddenLayer') as FormArray;

  }

}
