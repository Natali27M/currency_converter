import { Component, OnInit } from '@angular/core';

import {ExchangeCurrencyService} from "../../modules/forms/services/exchange-currency.service";
import {IRespoceDbUah} from "../../modules/forms/interfaces/respoce-db-uah";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  usd:unknown = 0;
  eur:unknown = 0;

  constructor(private exchangeCurrencyService: ExchangeCurrencyService) { }

  ngOnInit(): void {
    this.exchangeCurrencyService.getUsdAndUah().subscribe((value: IRespoceDbUah) => {
      this.usd = Object.values(value.rates)[0];
    })

    this.exchangeCurrencyService.getEurAndUah().subscribe((value: IRespoceDbUah) => {
      this.eur = Object.values(value.rates)[0];
    })

  }

}
