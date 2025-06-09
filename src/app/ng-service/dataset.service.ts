import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as Papa from 'papaparse';

@Injectable({
  providedIn: 'root'
})
export class DatasetService {

  constructor(
    private httpClient: HttpClient
  ) {}

  // ==================================================
  // API Test Signal - Sole to test receipt of data at
  //                   Flask
  // ==================================================
  sendApiTestSignal = (): Observable<any> => {

    // Set header
    const httpHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Create a test body
    const body = {
      message: 'Connectivity Test',
      data: {
        dataset: "iris"
      },
      timestamp: ''
    };

    // Return HTTP Post observable
    // return this.httpClient.post(
    //   'http://localhost:3000/api/test',
    //   body,
    //   { headers: httpHeaders }
    // );

    return this.httpClient.post(
      'http://localhost:3000/api/dataset',
      body,
      { headers: httpHeaders }
    );

  }

  parseGithubPageDataset = (datasetName:string): Observable<any> => {

    var datasetPath: string | null = null;

    switch(datasetName){

      case 'iris':

        datasetPath = '/assets/github-page-resource/iris.csv';

        break;

      case 'heartdisease':

        datasetPath = '/assets/github-page-resource/heartdisease.csv';

        break;

      case 'bankmarketing':

        datasetPath = '/assets/github-page-resource/bankmarketing.csv';

        break;

      case 'studentperformance':

        datasetPath = '/assets/github-page-resource/studentperformance.csv';

        break;

      default:

        datasetPath = '/assets/github-page-resource/iris.csv';

        break;

    }

    return this.httpClient
      .get(datasetPath, {
        responseType: 'text'
      })
      .pipe(
        map(csv => {

          return Papa.parse(csv, {header: true}).data

        })
      );

  }

}
