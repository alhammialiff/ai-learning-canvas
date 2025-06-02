import { HttpResponse } from '@angular/common/http';
import { DatasetService } from './../ng-service/dataset.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-main-content-container',
  templateUrl: './main-content-container.component.html',
  styleUrls: ['./main-content-container.component.scss']
})
export class MainContentContainerComponent {

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

}
