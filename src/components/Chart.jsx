/* eslint-disable no-unused-vars */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactApexChart from "react-apexcharts";

// Redux action creators
import addStockData from "../actions/stockDataActions";

// Design for the chart
import chartOptions from "./chartOptions";

const stocks = ["AAPL", "IBM", "MSFT"];

const StocksChart = function StocksChart() {
  const [selectedStock, setsSelectedStock] = React.useState("AAPL");
  const dispatch = useDispatch();
  const stockDataFromRedux = useSelector(
    (state) => state.stockData[selectedStock]
  );

  React.useEffect(() => {
    // Local storage for stock data to prevent unnecessary calls to the Alpha Ventage API
    const stockDataFromStorageJSON = window.localStorage.getItem("stockData");
    const stockDataFromStorage = JSON.parse(stockDataFromStorageJSON);

    // Last week's trading day to check whether we have up-to-date stock data
    const currentDate = new Date();
    const tradingWeekDay = currentDate.getDate() - currentDate.getDay() + 5;
    const lastTradingWeekDay = new Date(currentDate.setDate(tradingWeekDay))
      .toISOString()
      .split("T")[0];

    if (
      stockDataFromStorage?.[selectedStock]?.seriesCandle?.[0]?.data?.[0]?.x ===
      lastTradingWeekDay
    ) {
      dispatch(
        addStockData(selectedStock, stockDataFromStorage[selectedStock])
      );
    } else {
      console.log("Fetching Alpha Vantage.");
      fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${selectedStock}&apikey=${process.env.APLHA_VENTAGE}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data["Weekly Time Series"]) {
            const stockPrices = Object.keys(data["Weekly Time Series"]).map(
              (key) => ({
                x: key,
                y: [
                  data["Weekly Time Series"][key]["1. open"],
                  data["Weekly Time Series"][key]["2. high"],
                  data["Weekly Time Series"][key]["3. low"],
                  data["Weekly Time Series"][key]["4. close"],
                ],
              })
            );
            const stockVolume = Object.keys(data["Weekly Time Series"]).map(
              (key) => ({
                x: key,
                y: data["Weekly Time Series"][key]["5. volume"],
              })
            );

            const formattedData = {
              [selectedStock]: {
                seriesCandle: [{ name: "prices", data: stockPrices }],
                seriesBar: [{ name: "volume", data: stockVolume }],
              },
            };

            dispatch(addStockData(selectedStock, formattedData[selectedStock]));
            window.localStorage.setItem(
              "stockData",
              JSON.stringify({
                ...stockDataFromStorage,
                [selectedStock]: formattedData[selectedStock],
              })
            );
          } else {
            throw new Error({ name: "Wrong data received.", message: data });
          }
        })
        .catch((error) => {
          console.log("Alpha Vantage Error", error);
        });
    }
  }, [dispatch, selectedStock]);

  return (
    <div>
      {stockDataFromRedux && (
        <div className="chart-box">
          <div id="chart-candlestick">
            <ReactApexChart
              options={chartOptions.optionsCandle}
              series={stockDataFromRedux.seriesCandle}
              type="candlestick"
              height={290}
              width="100%"
            />
          </div>
          <div id="chart-bar">
            <ReactApexChart
              options={chartOptions.optionsBar}
              series={stockDataFromRedux.seriesBar}
              type="bar"
              height={160}
              width="100%"
            />
          </div>
          <button onClick={() => setsSelectedStock(stocks.pop())} type="button">
            Click
          </button>
        </div>
      )}
    </div>
  );
};

export default StocksChart;
