/* eslint-disable */
import React, { useState } from "react";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";
import FormControl from "react-bootstrap/FormControl";
import {
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
} from "@material-ui/core";
import useTable from "../hooks/useTable";
import { Search } from "@material-ui/icons";
import stocksData from "../stocks";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "75%",
  },
}));

const headCells = [
  { id: "symbol", label: "Symbol" },
  { id: "name", label: "Name" },
  { id: "price", label: "Price" },
  { id: "change", label: "Change" },
  { id: "volume", label: "Volume" },
  { id: "average", label: "Average Volume" },
  { id: "capital", label: "Capital" },
  { id: "ratio", label: "PE Ratio", disableSorting: true },
];

export default function Table() {
  const [stocks] = useState([...stocksData]);
  const classes = useStyles();
  const [records, setRecords] = useState([...stocksData]);
  const [filterFn, setFilterFn] = useState({
    fn: (stocks) => {
      return stocks;
    },
  });

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (stocks) => {
        if (target.value == "") return stocks;
        else
          return stocks.filter((x) =>
            x.name.toLowerCase().includes(target.value)
          );
      },
    });
  };

  return (
    <>
      {/* Stocks Table */}
      <Toolbar>
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
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
            <TableRow key={stock.id}>
              <TableCell>{stock.symbol}</TableCell>
              <TableCell>{stock.name}</TableCell>
              <TableCell>{stock.price}</TableCell>
              <TableCell>{stock.change}</TableCell>
              <TableCell>{stock.volume}</TableCell>
              <TableCell>{stock.average}</TableCell>
              <TableCell>{stock.capital}</TableCell>
              <TableCell>{stock.ratio}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TblContainer>
      <TblPagination />
    </>
  );
}
