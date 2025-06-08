import { BreakpointObserverService } from './../ng-service/breakpoint-observer.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-root-ui-container',
  templateUrl: './root-ui-container.component.html',
  styleUrls: ['./root-ui-container.component.scss']
})
export class RootUiContainerComponent {

  hideDevNote: boolean = false;

  hideDevNote$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private breakpointObserverService:BreakpointObserverService){}

  ngOnInit(){

    // [PLACEHOLDER FOR BREAKPOINT LISTENER]
    // this.breakpointObserverService.observeBreakpoint().subscribe({
    //   next: (viewportListener: any) => {

    //     if(!viewportListener){
    //       return;
    //     }

    //     switch(viewportListener){

    //       case '(max-width: 575px)':


    //         break;

    //       case '(min-width: 576px) and (max-width: 767px)':



    //         break;
    //       case '(min-width: 768px) and (max-width: 991px)':



    //         break;
    //       case '(min-width: 992px) and (max-width: 1199px)':



    //         break;
    //       case '(min-width: 1200px) and (max-width: 1919px)':



    //         break;
    //       case '(min-width: 1920px) and (max-width: 2559px)':



    //         break;
    //       case '(min-width: 2560)':



    //         break;
    //       default:

    //         break;

    //     }

    //   },
    //   error: () => {

    //   },
    // })

    this.hideDevNote$.subscribe({
      next: (state) => {

        this.hideDevNote = state;

      },
      error: () => {


      }
    })

  }

  onCloseDevNote(){

    this.hideDevNote$.next(true);

  }
}
