export type Metric = {
    key: string;
    label: string;
    value: number;
    format: "number" | "currency" ;
  };
  
  export type ChartData = {
    label: string;
    value: number;
  };
  
  export type MAValue = {
    timestamp: string;
    SMA: number;
    EMA: number;
    WMA: number;
  };
  
  export type RSIValue = {
    timestamp: string;
    RSI: number;
  };
  
  export type MACDValue = {
    timestamp: string;
    MACD: number;
    Signal: number;
  };
  
  export type VolumeValue = {
    timestamp: string;
    volume: number;
  };
  
  export type BollingerValue = {
    timestamp: string;
    Upper: number;
    Lower: number;
  };
  
  export type MVRVValue = {
    timestamp: string;
    MVRV: number;
  };
  
  export type MacroData = {
    interest_rate: number;
    inflation: number;
    dxy: number;
  };
  export type PriceHistoryRow = {
    label: string;
    amountChange: number;
    percentChange: number;
  };

  export type NewsItem = {
    title: string;
    url: string;
    description: string;
  };

  export type DashboardData = {
    summary: {
      max: number;
      min: number;
      average: number;
      median: number;
      volatility: number;
      current_price: number;
    };
    metrics: Metric[];
    chart: ChartData[];
    insight: string;
    news: NewsItem[];
    price: ChartData[];
    price_history: PriceHistoryRow[];
    ma: { values: MAValue[] };
    rsi: { values: RSIValue[] };
    macd: { values: MACDValue[] };
    volume: { total_volume: number; average_volume: number; values: VolumeValue[] };
    bollinger: { values: BollingerValue[] };
    mvrv: { values: MVRVValue[]; latest: number };
    macro: MacroData;
  };