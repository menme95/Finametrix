import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'currency'
})
export class CurrencyPipe implements PipeTransform {

	transform(value: any, name: string, operation: string): any {

		switch(name) {
			
		}
	}
}
