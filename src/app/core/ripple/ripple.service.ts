import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cryptocurrency } from '../../classes/cryptocurrency.class';
import { GenericService } from '../class.service';

@Injectable({
	providedIn: 'root'
})
export class RippleService extends GenericService {

	protected readonly symbol = "XRP";
	protected market = "CNY";

	private ripple: BehaviorSubject<any>;

	constructor(protected httpClient: HttpClient) {
		super(httpClient);
	}


	public getRipple(): Observable<any>{
		if(this.ripple === undefined) {
			this.ripple = new BehaviorSubject<any>({});
			this.updateCriptocoin(this.ripple,this.market, this.symbol);
		}

		return this.ripple;
	}
}
