import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TerceroComponent } from './tercero/tercero.component';

import { DataTablesModule } from 'angular-datatables';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [
    AppComponent,
    TerceroComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
