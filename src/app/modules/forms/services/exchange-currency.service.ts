import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

import {urls} from "../../../constans";
import {IRespoceDbUah} from '../interfaces/respoce-db-uah';
import {IResponceAllDb} from "../interfaces/responce-all-db";

@Injectable({
  providedIn: 'root'
})
export class ExchangeCurrencyService {

  constructor(private httpClient: HttpClient) { }

  getALLCurrencies():Observable<IResponceAllDb>{
    return this.httpClient.get<IResponceAllDb>(urls.currency)
  }

  getCurrency(fromCurrency:string,toCurrency:string):Observable<any>{
    return this.httpClient.get<any>( urls.currency + `?base=${fromCurrency}&symbols=${toCurrency}`)
  }

  getUsdAndUah():Observable<IRespoceDbUah>{
    return this.httpClient.get<IRespoceDbUah>(urls.currency + `?base=USD&symbols=UAH`)
  }

  getEurAndUah():Observable<IRespoceDbUah>{
    return this.httpClient.get<IRespoceDbUah>(urls.currency + `?base=EUR&symbols=UAH`)
  }
}
