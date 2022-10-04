import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {ExchangeCurrencyService} from "../../services/exchange-currency.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-current-form',
  templateUrl: './current-form.component.html',
  styleUrls: ['./current-form.component.css']
})
export class CurrentFormComponent implements OnInit {

  currencies:string[] = [];
  currency:number[] = [];
  fromCurrency:string = '';
  toCurrency:string = '';
  sumaFrom: number = 0;
  sumaTo: number = 0;
  convertSumaFrom: number = 0;
  convertSumaTo: number = 0;
  form:any = FormGroup;

  constructor(private httpClient: HttpClient, private exchangeCurrencyService: ExchangeCurrencyService) { }

  ngOnInit(): void {
    this.getALLCurrencies();
    this._createForm();
  }

  getALLCurrencies() {
    this.exchangeCurrencyService.getALLCurrencies().subscribe(value => {
      this.currencies = [...Object.keys(value.rates)]
    });
  }

  _createForm(): void {
    this.form = new FormGroup({
      selectFromCode: new FormControl(),
      selectToCode: new FormControl(),
      selectFromValue: new FormControl(),
      selectToValue: new FormControl()
    })
  }

  ngAfterViewInit(): void {
    this.form.get('selectFromValue')?.valueChanges.subscribe((value: number) => {
      this.sumaFrom = value;
      this.exchangerCurrency();
    })

    this.form.get('selectToValue')?.valueChanges.subscribe((value: number) => {
      this.sumaTo = value;
      this.exchangerCurrency();
    })

    this.form.get('selectFromCode')?.valueChanges.subscribe((value: string) =>{
      this.fromCurrency = value;
    })

    this.form.get('selectToCode')?.valueChanges.subscribe((value: string) =>{
      this.toCurrency = value;
      this.exchangeMyCurrency();
    })
  }

  exchangerCurrency(){
    if (this.sumaFrom){
      this.convertSumaFrom = this.sumaFrom * this.currency[0]
      this.form.setValue({selectFromValue: this.convertSumaFrom});
    }else if (this.sumaTo) {
      this.convertSumaTo = this.sumaTo / this.currency[0]
      this.form.setValue({selectToValue: this.convertSumaTo});
    }
  }

  exchangeMyCurrency(){
    this.exchangeCurrencyService.getCurrency(this.fromCurrency,this.toCurrency).subscribe(value => {
      this.currency = Object.values(value.rates);
    })
  }

}
