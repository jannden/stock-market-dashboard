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
import { Search } from "@material-ui/icons";
import chosenStockData from "../actions/chosenStockActions";
import useTable from "../hooks/useTable";
import symbols from "../../data/stocks";

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
];

const Table = function Table() {
  const selectedStock = useSelector((state) => state.chosenStock);
  const stockDataFromRedux = useSelector(
    (state) => state.stockData[selectedStock]
  );
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
              {stockDataFromRedux && stock.symbol === selectedStock && (
                <>
                  <TableCell>
                    {stockDataFromRedux.seriesCandle[0].data[0].y[0]}
                  </TableCell>
                  <TableCell>{stock.change}</TableCell>
                  <TableCell>
                    {stockDataFromRedux.seriesBar[0].data[0].y}
                  </TableCell>
                </>
              )}
              {(!stockDataFromRedux || stock.symbol !== selectedStock) && (
                <>
                  <TableCell> </TableCell>
                  <TableCell> </TableCell>
                  <TableCell> </TableCell>
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
