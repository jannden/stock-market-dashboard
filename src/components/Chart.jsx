/* eslint-disable no-unused-vars */
import React from "react";
import ReactApexChart from "react-apexcharts";

const selectedStock = "IBM";

// Local storage for stock data to prevent unnecessary calls to the Alpha Ventage API
const appStorage = window.localStorage;
const stockDataFromStorageJSON = window.localStorage.getItem("stockData");
const stockDataFromStorage = JSON.parse(stockDataFromStorageJSON);

// Last week's trading day to check whether we have up-to-date stock data
const currentDate = new Date();
const tradingWeekDay = currentDate.getDate() - currentDate.getDay() + 5;
const lastTradingWeekDay = new Date(currentDate.setDate(tradingWeekDay))
  .toISOString()
  .split("T")[0];

const StocksChart = function StocksChart() {
  const [initialLoading, setInitialLoading] = React.useState(true);
  const [stockOptions, setStockOptions] = React.useState({
    optionsCandle: {
      chart: {
        type: "candlestick",
        height: 290,
        id: "candles",
        toolbar: {
          autoSelected: "pan",
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      plotOptions: {
        candlestick: {
          colors: {
            upward: "#3C90EB",
            downward: "#DF7D46",
          },
        },
      },
      xaxis: {
        type: "datetime",
        convertedCatToNumeric: false,
      },
    },
    optionsBar: {
      chart: {
        height: 160,
        type: "bar",
        brush: {
          enabled: true,
          target: "candles",
        },
        selection: {
          enabled: true,
          xaxis: { max: 1512856800000, min: 1484863200000 },
          fill: { color: "#ccc", opacity: 0.4 },
          stroke: { color: "#0D47A1" },
        },
      },
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        bar: {
          columnWidth: "80%",
          colors: {
            ranges: [
              {
                from: -1000,
                to: 0,
                color: "#F15B46",
              },
              {
                from: 1,
                to: 10000,
                color: "#FEB019",
              },
            ],
          },
        },
      },
      stroke: {
        width: 0,
      },
      xaxis: {
        type: "datetime",
        axisBorder: {
          offsetX: 13,
        },
        convertedCatToNumeric: false,
      },
      yaxis: {
        labels: {
          show: false,
        },
      },
    },
  });

  const [stockData, setStockData] = React.useState({
    [selectedStock]: {
      seriesCandle: [
        {
          data: stockDataFromStorage?.[selectedStock]?.seriesCandle?.[0]?.data,
        },
      ],
      seriesBar: [
        {
          name: "volume",
          data: stockDataFromStorage?.[selectedStock]?.seriesBar?.[0]?.data,
        },
      ],
    },
  });

  React.useEffect(() => {
    if (
      stockDataFromStorage[selectedStock].seriesCandle[0].data[0].x ===
      lastTradingWeekDay
    ) {
      setInitialLoading(false);
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

            setStockData(formattedData);
            window.localStorage.setItem(
              "stockData",
              JSON.stringify(formattedData)
            );
            setInitialLoading(false);
          } else {
            throw new Error({ name: "Wrong data received.", message: data });
          }
        })
        .catch((error) => {
          console.log("Alpha Vantage Error", error);
        });
    }
  }, []);

  React.useEffect(() => {
    console.log("state", stockData);
  }, [stockData]);

  return (
    <div>
      {!initialLoading && (
        <div className="chart-box">
          <div id="chart-candlestick">
            <ReactApexChart
              options={stockOptions.optionsCandle}
              series={stockData[selectedStock].seriesCandle}
              type="candlestick"
              height={290}
              width="100%"
            />
          </div>
          <div id="chart-bar">
            <ReactApexChart
              options={stockOptions.optionsBar}
              series={stockData[selectedStock].seriesBar}
              type="bar"
              height={160}
              width="100%"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StocksChart;
