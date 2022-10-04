import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {urls} from "../../../constans";

@Injectable({
  providedIn: 'root'
})
export class ExchangeCurrencyService {

  constructor(private httpClient: HttpClient) { }

  getALLCurrencies():Observable<any>{
    return this.httpClient.get<any>(urls.currency)
  }
  getCurrency(fromCurrency:string,toCurrency:string):Observable<any>{
    return this.httpClient.get<any>( urls.currency + `?base=${fromCurrency}&symbols=${toCurrency}`)
    // return this.httpClient.get<any>( urls.currency + `&currencies=${toCurrency}&base_currency=${fromCurrency}`)
    // return this.httpClient.get<any>( urls.currency + `&currencies${toCurrency}&base_currency${fromCurrency}`)
  }

  getUsdAndUah():Observable<any>{
    return this.httpClient.get<any>(urls.currency + `?base=USD&symbols=UAH`)
  }

  getEurAndUah():Observable<any>{
    return this.httpClient.get<any>(urls.currency + `?base=EUR&symbols=UAH`)
  }
}
