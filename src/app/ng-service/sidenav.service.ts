import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  constructor() { }

  sidenavState$: BehaviorSubject<{ isOpen: boolean }>
    = new BehaviorSubject<{ isOpen: boolean }>({
      isOpen: true
    });

  sidenavState: { isOpen: boolean } = {
    isOpen: true
  }

  toggleSidenav() {

    this.sidenavState.isOpen = !this.sidenavState.isOpen;

    this.sidenavState$.next({
      isOpen: this.sidenavState.isOpen
    });

  }


  listenToSidenavState(): Observable<{ isOpen: boolean }>{

    return this.sidenavState$.asObservable();

  }

}
