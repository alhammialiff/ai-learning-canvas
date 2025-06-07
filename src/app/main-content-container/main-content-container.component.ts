import { DeepLearningService } from './../ng-service/deep-learning.service';
import { HttpResponse } from '@angular/common/http';
import { DatasetService } from './../ng-service/dataset.service';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, map } from 'rxjs';

@Component({
  selector: 'app-main-content-container',
  templateUrl: './main-content-container.component.html',
  styleUrls: ['./main-content-container.component.scss']
})
export class MainContentContainerComponent {

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
    private deepLearningService: DeepLearningService
  ){}

  ngOnInit(){

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

  get hiddenLayer(): FormArray {

    return this.layerShapeForm.get('hiddenLayer') as FormArray;

  }

}
