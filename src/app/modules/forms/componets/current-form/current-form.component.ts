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

  currencies:any = [];
  currency:number[] = [];
  // currency:ICurrent = {code: '', value: 0};
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
      let strings = [...Object.keys(value.rates)]
      // let strings = Object.keys(value.rates);
      console.log(value.rates,'VALUE');
      this.currencies = strings;
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
      // console.log(this.sumaFrom,'suma1');
      this.exchangerCurrency();
      // this.form.reset();
    })

    this.form.get('selectToValue')?.valueChanges.subscribe((value: number) => {
      this.sumaTo = value;
      // console.log(this.sumaTo,'suma2');
      this.exchangerCurrency();
      // this.form.reset();
    })

    this.form.get('selectFromCode')?.valueChanges.subscribe((value: string) =>{
      this.fromCurrency = value;
      // this.exchangeSomeCurrency();
    })

    this.form.get('selectToCode')?.valueChanges.subscribe((value: string) =>{
      this.toCurrency = value;
      this.exchangeSomeCurrency();
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

  exchangeSomeCurrency(){
    this.exchangeCurrencyService.getCurrency(this.fromCurrency,this.toCurrency).subscribe(value => {
      this.currency = Object.values(value.rates);
      // console.log(this.currency,'result');
      // this.currency = result[0] as ICurrent;
      // console.log(this.currency,'currency');

      // this.exchangeRate = value.rates[this.toCurrency]
      // this.exchangerCurrency()
    })
  }

}
