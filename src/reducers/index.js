import { combineReducers } from "redux";
import userReducer from "./userReducer";
import stockDataReducer from "./stockDataReducer";

export default combineReducers({
  currentUser: userReducer,
  stockData: stockDataReducer,
  /*
  chosenStock: chosenStockReducer,
  chosenCurrency: chosenCurrencyReducer,
  */
});
