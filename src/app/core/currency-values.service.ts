import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

//import * as _ from 'lodash';

@Injectable({
	providedIn: 'root'
})
export class CurrencyValuesService {

	private readonly urlbase = "http://data.fixer.io/api/latest?access_key=a71fc4c1204bd66e77fd9477bc66afa9"
	private USD_value: number;
	public currentValues: BehaviorSubject<any> = new BehaviorSubject<any>({})
	constructor(private readonly httpClient: HttpClient) {
		this.httpClient.get(this.urlbase).subscribe((value) => {
			this.currentValues.next(value)
			this.USD_value = this.currentValues.value.rates['USD']
		})
	}

	public changeTo(value: number, name: string) {
		if (this.currentValues && this.currentValues.value.rates) {
			return this.currentValues.value.rates[name] * (value / this.USD_value)
		}
	}
}
