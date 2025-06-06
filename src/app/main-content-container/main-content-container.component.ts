import { HttpResponse } from '@angular/common/http';
import { DatasetService } from './../ng-service/dataset.service';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

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
      new FormControl('')
    ]),
    outputLayer: new FormControl('')
  })


  constructor(
    private datasetService: DatasetService
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

  addHiddenLayerFormControl(){

    //
    this.hiddenLayer.push(new FormControl(''));

  }

  removeHiddenLayerFormControl(index: number){

    this.hiddenLayer.removeAt(index);

  }

  get hiddenLayer(): FormArray {

    return this.layerShapeForm.get('hiddenLayer') as FormArray;

  }

}
