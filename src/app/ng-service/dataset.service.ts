import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

}
