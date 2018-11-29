export class Metadata {
	public code: string;
	public name: string;
	public marketCode: string;
	public marketName: string;

	constructor(data: Object) {
		this.code = data["2. Digital Currency Code"];
		this.name = data["3. Digital Currency Name"];
		this.marketCode = data["4. Market Code"];
		this.marketName = data["5. Market Name"];
	}
}

export class Historic {
	public open: number;
	public high: number;
	public low: number;
	public close: number;
	public volume: number;
	public marketCup: number;
	public date: Date;

	constructor(baseKey: string, data: Object) {
		this.date = new Date(baseKey);
		this.open = data['1b. open (USD)'];
		this.high = data['2b. high (USD)'];
		this.low = data['3b. low (USD)'];
		this.close = data['4b. close (USD)'];
		this.volume = data['5. volume'];
		this.marketCup = data['6. market cap (USD)'];
	}
}
export class Cryptocurrency {
	public metadata: Metadata;
	public historic: Array<Historic>;
	constructor(data: Object) {
		this.metadata = new Metadata(data["Meta Data"])
		this.historic = new Array<Historic>();
		Object.keys(data["Time Series (Digital Currency Daily)"]).forEach((day) => {
			this.historic.push( new Historic(day,data["Time Series (Digital Currency Daily)"][day]))
		})
	}
}
