import { combineReducers } from "redux";
import userReducer from "./userReducer";

export default combineReducers({
  currentUser: userReducer,
  /*
  chosenStock: chosenStockReducer,
  stockData: stockDataReducer,
  chosenCurrency: chosenCurrencyReducer,
  */
});
