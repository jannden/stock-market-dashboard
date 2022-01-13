import React, { useState } from "react";
import FormControl from "react-bootstrap/FormControl";
import { useDispatch, useSelector } from "react-redux";
import {
  // makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
} from "@material-ui/core";
import Button from "react-bootstrap/Button";
import { Search } from "@material-ui/icons";
import chosenStockData from "../actions/chosenStockActions";
import useTable from "../hooks/useTable";
import symbols from "../../data/stocks";
import { getStockDataFromStorage, getLastTradingWeekDay } from "./Chart";

// Redux action creators
import addStockData from "../actions/stockDataActions";
/*
const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "75%",
  },
}));
*/

const headCells = [
  { id: "symbol", label: "Symbol" },
  { id: "name", label: "Name" },
  { id: "price", label: "Price" },
  { id: "change", label: "Change" },
  { id: "volume", label: "Volume" },
  { id: "buy", label: "" },
  { id: "sell", label: "" },
];

const Table = function Table() {
  const selectedStock = useSelector((state) => state.chosenStock);
  const stockDataFromRedux = useSelector((state) => state.stockData);
  // const [stocks] = useState([...symbols]);
  // const classes = useStyles();
  // const [records] = useState([...symbols]);
  // const [symbol, setSymbol] = useState("");
  const [filterFn, setFilterFn] = useState({
    fn: (stocks) => stocks,
  });

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable([...symbols], headCells, filterFn);

  const handleSearch = (e) => {
    setFilterFn({
      fn: (stocks) => {
        if (e.target.value === "") return stocks;
        return stocks.filter((x) =>
          x.name.toLowerCase().includes(e.target.value)
        );
      },
    });
  };

  const dispatch = useDispatch();

  React.useEffect(() => {
    const stockDataFromStorage = getStockDataFromStorage();
    const lastTradingWeekDay = getLastTradingWeekDay();
    symbols.map((stock) => {
      if (
        stockDataFromStorage?.[stock.symbol]?.seriesCandle?.[0]?.data?.[0]
          ?.x === lastTradingWeekDay ||
        stockDataFromStorage?.[stock.symbol]?.seriesCandle?.[0]?.data?.[1]
          ?.x === lastTradingWeekDay
      ) {
        dispatch(
          addStockData(stock.symbol, stockDataFromStorage[stock.symbol])
        );
      }
      return true;
    });
  }, [dispatch]);

  return (
    <>
      {/* Stocks Table */}
      <Toolbar>
        <FormControl
          type="search"
          placeholder="Search"
          aria-label="Search"
          inputprops={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          onChange={handleSearch}
        />
      </Toolbar>
      <TblContainer>
        <TblHead />
        <TableBody>
          {recordsAfterPagingAndSorting().map((stock) => (
            <TableRow
              key={stock.id}
              selected={stock.symbol === selectedStock}
              onClick={() => dispatch(chosenStockData(stock.symbol))}
            >
              <TableCell>{stock.symbol}</TableCell>
              <TableCell>{stock.name}</TableCell>
              {stockDataFromRedux?.[stock.symbol]?.seriesCandle[0]?.data[0] ? (
                <>
                  <TableCell>
                    $
                    {Math.round(
                      Number(
                        stockDataFromRedux?.[stock.symbol]?.seriesCandle[0]
                          ?.data[0]?.y[3]
                      ) * 100
                    ) / 100}
                  </TableCell>
                  <TableCell>
                    {Math.round(
                      Math.abs(
                        100 -
                          (Number(
                            stockDataFromRedux?.[stock.symbol]?.seriesCandle[0]
                              ?.data[1]?.y[3]
                          ) /
                            Number(
                              stockDataFromRedux?.[stock.symbol]
                                ?.seriesCandle[0]?.data[0]?.y[3]
                            )) *
                            100
                      ) * 100
                    ) / 100}
                    %
                  </TableCell>
                  <TableCell>
                    {Math.round(
                      Number(
                        stockDataFromRedux?.[stock.symbol]?.seriesBar[0]
                          ?.data[0]?.y
                      ) / 1000000
                    )}
                    m
                  </TableCell>
                  <TableCell>
                    <Button variant="outline-primary" size="sm">
                      Buy
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline-primary" size="sm">
                      Sell
                    </Button>
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell />
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </TblContainer>
      <TblPagination />
    </>
  );
};

export default Table;
