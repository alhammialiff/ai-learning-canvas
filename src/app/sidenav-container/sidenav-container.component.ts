import { SidenavService } from './../ng-service/sidenav.service';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-sidenav-container',
  templateUrl: './sidenav-container.component.html',
  styleUrls: ['./sidenav-container.component.scss']
})
export class SidenavContainerComponent {

  constructor(
    private sidenavService: SidenavService
  ){}

  isOpen: boolean = true;

  ngOnInit(){

    this.sidenavService.listenToSidenavState().subscribe({
      next: (state: any) => {

        if(state && state.hasOwnProperty('isOpen')){

          this.isOpen = state.isOpen

        }

      },
      error: (error: any) => {

      }
    });

    this.closeOnWebMd();

  }

  toggleSidenav(){

    this.sidenavService.toggleSidenav();

  }

  @HostListener('window:resize', ['$event'])
  closeOnWebMd(){

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Auto close when vw is less than 992
    if(width < 992){

      if(this.isOpen){

        this.sidenavService.toggleSidenav()

      }

    // Auto open when vw is more than 992
    }else{

      if(!this.isOpen){

        this.sidenavService.toggleSidenav()

      }

    }

  }

}
