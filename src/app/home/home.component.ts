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
			this.showGraphic(data);
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

	public showGraphic(data) {
		var labels = [];
		var amount = [];
		this.selected = data;
		if (data.historic) {

			data.historic.forEach(element => {
				labels.push(element.date);
				amount.push(element.marketCup)
			});
			this.chart = new Chart('realtime', {
				type: 'line',
				data: {
					labels: labels,
					datasets: [
						{
							label: 'marketCup',
							fill: false,
							data: amount,
							backgroundColor: '#168ede',
							borderColor: '#168ede'
						}
					]
				},
				options: {
					tooltips: {
						enabled: false
					},
					legend: {
						display: true,
						position: 'bottom',
						labels: {
							fontColor: 'white'
						}
					},
					scales: {
						yAxes: [{
							ticks: {
								fontColor: "white"
							}
						}],
						xAxes: [{
							ticks: {
								fontColor: "white",
								beginAtZero: true
							}
						}]
					}
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
		let init = new Date(this.fromDate.year, this.fromDate.month-1, this.fromDate.day);
		let end = new Date(this.fromDate.year, this.fromDate.month-1, this.fromDate.day);

		let index0 = _.findIndex(this.coins[0].historic, {date: init})
		let index1 = _.findIndex(this.coins[0].historic, {date: end})

		this.showGraphic(this.coins[0].historic.slice(index0, index1))
	}

}
