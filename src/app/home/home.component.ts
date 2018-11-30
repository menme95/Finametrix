import { Component, OnInit } from '@angular/core';

import * as _ from 'lodash';
import { Chart } from 'chart.js';

import { BitcoinService } from '../core/bitcoin/bitcoin.service';
import { Cryptocurrency } from '../classes/cryptocurrency.class';
import { CurrencyEnum } from '../classes/currency.enum';
import { EthereumService } from '../core/etherum/ethereum.service';
import { RippleService } from '../core/ripple/ripple.service';
import { CurrencyValuesService } from '../core/currency-values.service';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	public coins: Array<Cryptocurrency> = new Array<Cryptocurrency>(3);
	public divisa: any = CurrencyEnum.DOLLAR;
	public orderBy: string = '';
	public chart: any;
	public test: any;
	public fromDate: NgbDate;
	public toDate: NgbDate;
	public hoveredDate: NgbDate;
	public selected;

	constructor(private readonly bitcoinService: BitcoinService,
		private readonly etherumService: EthereumService,
		private readonly ripleService: RippleService,
		calendar: NgbCalendar) {
		this.fromDate = calendar.getToday();
		this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
	}

	ngOnInit() {
		this.bitcoinService.getBitcoin().subscribe((data: Cryptocurrency) => {
			this.coins[0] = data;
			this.showGraphic(data, 30, 0);
		})
		this.etherumService.getEthereum().subscribe((data) => {
			this.coins[1] = data
		})
		this.ripleService.getRipple().subscribe((data) => {
			this.coins[2] = data
		})

	}

	public onChange() {
		this.coins = _.orderBy(this.coins, function (e) { return Number(e.historic[0][this.orderBy]) }.bind(this), ['desc']);
	}

	public onChangeDivisa() {
		this.divisa = CurrencyEnum.getCurrency(this.divisa);
	}

	public showGraphic(data: Cryptocurrency, init: number, end: number) {
		var labels = [];
		var market = [];
		var closePrice = [];
		var volume = [];
		this.selected = data;
		if (data.historic) {
			let aux = data.historic.slice(end, init)
			aux.forEach(element => {
				labels.push(element.date.toISOString().substring(0, 10));
				market.push(element.marketCup);
				closePrice.push(element.close);
				volume.push(element.volume);
			});
			this.chart = new Chart('realtime', {
				type: 'line',
				data: {
					labels: labels,
					datasets: [
						{
							label: 'Market Cup',
							fill: false,
							data: market,
							backgroundColor: '#d1eafa',
							borderColor: '#168ede'
						},
						{
							label: 'Close',
							fill: false,
							data: closePrice,
							backgroundColor: '#e6ccff',
							borderColor: '#7300e6'
						},
						{
							label: 'Volume',
							fill: false,
							data: volume,
							backgroundColor: '#f2ffcc',
							borderColor: '#86b300'
						}
					]
				}
			});
		}
	}

	public onDateSelection(date: NgbDate) {
		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
		} else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
			this.toDate = date;
		} else {
			this.toDate = null;
			this.fromDate = date;
		}
		this.recalculateGraph()
	}

	public isHovered(date: NgbDate) {
		return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
	}

	public isInside(date: NgbDate) {
		return date.after(this.fromDate) && date.before(this.toDate);
	}

	public isRange(date: NgbDate) {
		return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
	}

	public recalculateGraph() {

		if (this.fromDate && this.toDate) {

			//let init = new Date(, this.fromDate.month - 1, this.fromDate.day);
			//let end = new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day);

			let index0 = _.findIndex(this.coins[0].historic, function (o, init) {
				return (o.date.toISOString().substring(0, 10)) === (this.fromDate.year + '-' + this.fromDate.month + '-' + this.fromDate.day)
			}.bind(this))
			let index1 = _.findIndex(this.coins[0].historic, function (o) {
				return (o.date.toISOString().substring(0, 10)) === (this.toDate.year + '-' + this.toDate.month + '-' + this.toDate.day)
			}.bind(this))
			if (index0 >= 0 && index1 >= 0)
				this.showGraphic(this.selected, index0, index1)
		}

	}

}

