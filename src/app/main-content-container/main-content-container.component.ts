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

    this.datasetService.sendApiTestSignal().subscribe({

      next: (apiTestResponse: unknown) => {

        if(apiTestResponse){

          const response = apiTestResponse as HttpResponse<any>;

        }

        console.log();

      },
      error: (error: any) => {

        console.log("Error", error);

      }

    })

  }

}
