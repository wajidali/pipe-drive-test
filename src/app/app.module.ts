import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AppService } from './app.service';
import { CommonModule } from '@angular/common';
import { UploadService } from './upload.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule, 
    BrowserModule,
    AppRoutingModule,
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ProgressbarModule.forRoot(), 
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(), 
    HttpClientModule,    
    ModalModule.forRoot(),
    ToastrModule.forRoot(),
    DataTablesModule,
    FormsModule
  ],
  providers: [AppService, UploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
