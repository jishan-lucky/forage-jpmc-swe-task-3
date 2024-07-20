interface Row {
  ratio: number;
  upper_bound: number;
  lower_bound: number;
  trigger_alert: number | undefined;
  price_abc: number;
  price_def: number;
  timestamp: Date;
}

class DataManipulator {
  static generateRow(serverRespond: any[]): Row {
    const [stockABC, stockDEF] = serverRespond;
    const priceABC = stockABC.top_ask_price;
    const priceDEF = stockDEF.top_ask_price;

    // Calculate ratio
    const ratio = priceABC / priceDEF;

    // Define historical average ratio
    const historicalAvgRatio = 1.1; // Example historical average ratio

    // Set upper and lower bounds
    const upper_bound = historicalAvgRatio * 1.05; // +5% of historical average
    const lower_bound = historicalAvgRatio * 0.95; // -5% of historical average

    // Determine trigger alert
    const trigger_alert = (ratio > upper_bound || ratio < lower_bound) ? ratio : undefined;

    // Return the row object
    return {
      ratio,
      upper_bound,
      lower_bound,
      trigger_alert,
      price_abc: priceABC,
      price_def: priceDEF,
      timestamp: new Date() // Assuming timestamp is the current time
    };
  }
}

export default DataManipulator;
