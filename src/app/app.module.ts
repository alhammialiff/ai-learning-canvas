import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RootUiContainerComponent } from './root-ui-container/root-ui-container.component';
import { SidenavContainerComponent } from './sidenav-container/sidenav-container.component';
import { MainContentContainerComponent } from './main-content-container/main-content-container.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NeuralNetworkVisualCanvasComponent } from './neural-network-visual-canvas/neural-network-visual-canvas.component';
import { SidenavService } from './ng-service/sidenav.service';
import { DeepLearningService } from './ng-service/deep-learning.service';
import { DatasetService } from './ng-service/dataset.service';
import { BreakpointObserver } from '@angular/cdk/layout';

@NgModule({
  declarations: [
    AppComponent,
    RootUiContainerComponent,
    SidenavContainerComponent,
    MainContentContainerComponent,
    NeuralNetworkVisualCanvasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    SidenavService,
    DeepLearningService,
    DatasetService,
    BreakpointObserver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
