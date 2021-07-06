import { HttpClient } from '@angular/common/http';
import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Component({
  selector: 'app-ex-change',
  templateUrl: './ex-change.component.html',
  styleUrls: ['./ex-change.component.css']
})
export class ExChangeComponent implements OnInit {
  form: FormGroup;
  fxData!: any[];
  //endpoint = 'latest'
  access_key = '1e4e63a14115a9c34a814cb40956a5e3';
 

  constructor(
    private fb: FormBuilder, 
    private httpClient: HttpClient,
    private decimalPipe: DecimalPipe) { 
    this.form = this.fb.group({ 
      fromCurrency: ['', Validators.required], 
      fromAmount: ['', Validators.required], 
      toCurrency: ['', Validators.required], 
      toAmount: [''] 
    }); 
  }

  ngOnInit(): void {
    
  }

  convert() {
    let fromCurrency = this.form.value.fromCurrency;
    let toCurrency = this.form.value.toCurrency;
    let fxRate = 0.0;

    this.httpClient
    .get('https://api.exchangeratesapi.io/latest?access_key=${API_KEY}&symbols=${fromCurrency},${toCurrency}')
    .pipe(
      catchError(error => {
        return throwError(
          'Error in getting exchange rate.');
      })
    )
    .subscribe(
      result => {
        this.fxData = result as any;
       fxRate = this.fxData['rates'][toCurrency] / this.fxData['rates'][fromCurrency];
        this.form.patchValue({
          toAmount: this.decimalPipe.transform((this.form.value.fromAmount * fxRate).toFixed(2))
        });
      }, 
      err => {alert(err)}
    );
  }
}