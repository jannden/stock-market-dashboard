import { SELECTED_STOCK } from "./types";

const chosenStockData = (stockSymbol) => ({
  type: SELECTED_STOCK,
  payload: { stockSymbol },
});

export default chosenStockData;
