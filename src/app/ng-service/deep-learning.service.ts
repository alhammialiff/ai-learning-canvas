import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeepLearningService {

  constructor() { }

  emitLayerShape: BehaviorSubject<any> = new BehaviorSubject<number[]>([]);

  sendLayerShapeForEmit(layerShape: number[]){

    this.emitLayerShape.next(layerShape);

  }

}
