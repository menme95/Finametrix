import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cryptocurrency } from '../../classes/cryptocurrency.class';
import { GenericService } from '../class.service';

@Injectable({
	providedIn: 'root'
})
export class EthereumService extends GenericService {

	protected readonly symbol = "ETH";
	protected market = "CNY";

	private etherum: BehaviorSubject<any>;

	constructor(protected httpClient: HttpClient) {
		super(httpClient);
	}


	public getEthereum(): Observable<any>{
		if(this.etherum === undefined) {
			this.etherum = new BehaviorSubject<any>({});
			this.updateCriptocoin(this.etherum,this.market, this.symbol);
		}

		return this.etherum;
	}
}
