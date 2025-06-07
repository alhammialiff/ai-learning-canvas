import { Injectable } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreakpointObserverService {

  constructor(
    private breakpointObserver: BreakpointObserver
  ) { }

  // Note: These breakpoints are angular's, not bootstrap
  //       To KIV this service until there is a need to deviate from bootstrap's breakpoints
  BREAKPOINTS = {
    XS:'(max-width: 575px)',
    SM:'(min-width: 576px) and (max-width: 767px)',
    MD:'(min-width: 768px) and (max-width: 991px)',
    LG:'(min-width: 992px) and (max-width: 1199px)',
    XL:'(min-width: 1200px) and (max-width: 1919px)',
    XXL:'(min-width: 1920px) and (max-width: 2559px)',
    XXXL:'(min-width: 2560px)',
  }

  observeBreakpoint(): Observable<BreakpointState> {

    return this.breakpointObserver
      .observe([
        this.BREAKPOINTS.XS,
        this.BREAKPOINTS.SM,
        this.BREAKPOINTS.MD,
        this.BREAKPOINTS.LG,
        this.BREAKPOINTS.XL,
        this.BREAKPOINTS.XXL,
        this.BREAKPOINTS.XXXL,
      ]);

  }

}
