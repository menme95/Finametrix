export class CurrencyEnum {
	static DOLLAR = { name: 'USD', symbol: "$USD" };
	static EURO = { name: 'EUR', symbol: "€" };

	public static getCurrency(name) {
		switch (name) {
			case this.DOLLAR.name:
				return this.DOLLAR;
				break;
			case this.EURO.name:
				return this.EURO;
				break;
		}
	}
}