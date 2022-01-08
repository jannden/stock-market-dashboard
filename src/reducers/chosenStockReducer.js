import { SELECTED_STOCK } from "../actions/types";

export default function chosenStockReducer(state = {}, action = {}) {
  switch (action.type) {
    case SELECTED_STOCK:
      console.log(action.payload.stockSymbol);
      return {
        ...state,
        [action.payload.stockSymbol]: action.payload.stockSymbol,
      };
    default:
      return state;
  }
}
