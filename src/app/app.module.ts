import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BitcoinService } from './core/bitcoin/bitcoin.service';
import { BoxMetadataComponent } from './box-metadata/box-metadata.component';
import { CurrencyPipe } from './pipes/currency.pipe';
import { EthereumService } from './core/etherum/ethereum.service';
import { RippleService } from './core/ripple/ripple.service';
import { FormsModule } from '@angular/forms';
import { CurrencyValuesService } from './core/currency-values.service';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		BoxMetadataComponent,
		CurrencyPipe
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		NgbModule.forRoot(),
		AngularFontAwesomeModule,
		HttpClientModule,
		FormsModule

	],
	providers: [
			BitcoinService,
			EthereumService,
			RippleService,
			CurrencyValuesService
		],
	bootstrap: [AppComponent]
})
export class AppModule { }
