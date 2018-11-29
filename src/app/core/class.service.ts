import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cryptocurrency } from '../classes/cryptocurrency.class';

@Injectable({
	providedIn: 'root'
})
export abstract class GenericService {
	
	protected readonly baseurl = "https://www.alphavantage.co/query"
	protected readonly funct = "DIGITAL_CURRENCY_DAILY";
	protected abstract symbol;
	protected readonly apikey = "9E4QBEYCQVUM0DSG";
	constructor(protected httpClient: HttpClient) {
	}

	public updateCriptocoin(coin: BehaviorSubject<Cryptocurrency>, market: string, symbol): void {
		const params = new HttpParams().set('function', this.funct).set('symbol', symbol).set('market', market).set('apikey', this.apikey);
		this.httpClient.get(this.baseurl, {params}).subscribe((data) => {
			coin.next(new Cryptocurrency(data));
		})
	}
}