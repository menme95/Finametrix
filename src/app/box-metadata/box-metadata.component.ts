import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Metadata, Historic } from '../classes/cryptocurrency.class';
import { CurrencyValuesService } from '../core/currency-values.service';


@Component({
	selector: 'app-box-metadata',
	templateUrl: './box-metadata.component.html',
	styleUrls: ['./box-metadata.component.scss']
})
export class BoxMetadataComponent implements OnInit {

	@Input() metadata: Metadata;
	@Input() lastInfo: Historic;
	@Input() currentCurrency;
	@Output() selected: EventEmitter<any> = new EventEmitter<any>();
	constructor(
		private readonly changeService: CurrencyValuesService) { }

	ngOnInit() {
	}

	public select(){
		this.selected.emit(undefined);
	}
	

	public changeDivisa(value) {
		return this.changeService.changeTo(value, this.currentCurrency.name)
	}
}
