import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {ExchangeCurrencyService} from "../../services/exchange-currency.service";
import {FormControl, FormGroup} from "@angular/forms";
import {debounceTime, Subject} from 'rxjs';

@Component({
  selector: 'app-current-form',
  templateUrl: './current-form.component.html',
  styleUrls: ['./current-form.component.css']
})
export class CurrentFormComponent implements OnInit {
  currencies: object = {};
  symbols: string[] = [];
  form:any= FormGroup;
  subject = new Subject<'to' | 'from'>()

  constructor(private httpClient: HttpClient, private exchangeCurrencyService: ExchangeCurrencyService) {
    this.subject.pipe(
      debounceTime(300)
    ).subscribe((value) => {

      if (value === 'from') {
        return this.convertFromTo()
      }

      return this.convertToFrom()
    })
  }

  ngOnInit(): void {
    this.getALLCurrencies();
    this._createForm();
  }

  getALLCurrencies() {
    this.exchangeCurrencyService.getALLCurrencies().subscribe(value => {
      this.symbols = [...Object.keys(value.rates)]
      this.currencies = value.rates
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

  convertFromTo(): void {
    const {selectFromCode, selectToCode, selectFromValue} = this.form.value;
    this.exchangeCurrencyService.getCurrency(selectFromCode, selectToCode).subscribe(value => {
      this.form.get('selectToValue')?.setValue(selectFromValue * value.rates[selectToCode])
    })

  }

  convertToFrom(): void {
    const {selectFromCode, selectToCode, selectToValue} = this.form.value;
    this.exchangeCurrencyService.getCurrency(selectFromCode, selectToCode).subscribe(value => {
      this.form.get('selectFromValue')?.setValue(selectToValue / value.rates[selectToCode])
    })
  }
}
