import { SELECTED_STOCK } from "../actions/types";
import symbols from "../../data/stocks";

export default function chosenStockReducer(
  state = symbols[0].symbol,
  action = {}
) {
  console.log("State", state);
  console.log("action", action);
  switch (action.type) {
    case SELECTED_STOCK:
      return action.payload.stockSymbol;
    default:
      return state;
  }
}
