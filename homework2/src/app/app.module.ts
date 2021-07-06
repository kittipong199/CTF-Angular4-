import { NgModule } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ExChangeComponent } from './ex-change/ex-change.component';


@NgModule({
  declarations: [
    AppComponent,
    ExChangeComponent
  ],
  imports: [
  BrowserModule,
  BrowserAnimationsModule, 
  MatButtonModule,
  FormsModule, 
  ReactiveFormsModule,
  HttpClientModule
],
providers: [DecimalPipe],
bootstrap: [AppComponent]
})
export class AppModule { }