import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cryptocurrency } from '../../classes/cryptocurrency.class';
import { GenericService } from '../class.service';

@Injectable({
	providedIn: 'root'
})
export class BitcoinService extends GenericService {

	protected readonly symbol = "BTC";
	protected market = "CNY";

	private bitcoin: BehaviorSubject<any>;

	constructor(protected httpClient: HttpClient) {
		super(httpClient);
	}


	public getBitcoin(): Observable<any>{
		if(this.bitcoin === undefined) {
			this.bitcoin = new BehaviorSubject<any>({});
			this.updateCriptocoin(this.bitcoin,this.market, this.symbol);
		}

		return this.bitcoin;
	}
}
