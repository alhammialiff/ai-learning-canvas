import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RootUiContainerComponent } from './root-ui-container/root-ui-container.component';
import { SidenavContainerComponent } from './sidenav-container/sidenav-container.component';
import { MainContentContainerComponent } from './main-content-container/main-content-container.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    RootUiContainerComponent,
    SidenavContainerComponent,
    MainContentContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
