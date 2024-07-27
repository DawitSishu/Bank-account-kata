import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Button,
  Box,
  TextField,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Divider,
  Chip,
  IconButton,
} from "@mui/material";
import { DateRangePicker } from "@mui/lab";
import { format, subDays } from "date-fns";
import ClearIcon from "@mui/icons-material/Clear";

// Generate random data for testing
const generateRandomTransactions = (numTransactions) => {
  const transactions = [];
  let balance = 1000;
  for (let i = 0; i < numTransactions; i++) {
    const amount =
      Math.random() > 0.5
        ? (Math.random() * 100).toFixed(2)
        : -(Math.random() * 100).toFixed(2);
    balance += parseFloat(amount);
    transactions.push({
      date: format(subDays(new Date(), i), "yyyy-MM-dd"),
      amount,
      type: amount > 0 ? "Deposit" : "Withdrawal",
      balance: balance.toFixed(2),
    });
  }
  return transactions;
};

const AccountStatement = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("date");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterType, setFilterType] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);

  useEffect(() => {
    const transactions = generateRandomTransactions(50);
    setTransactions(transactions);
    setFilteredTransactions(transactions);
  }, []);

  const handleSortRequest = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFirstPageButtonClick = () => {
    setPage(0);
  };

  const handleLastPageButtonClick = () => {
    setPage(
      Math.max(0, Math.ceil(filteredTransactions.length / rowsPerPage) - 1)
    );
  };

  const handleFilter = () => {
    let filtered = transactions;

    if (filterType) {
      filtered = filtered.filter((transaction) =>
        filterType === "deposits"
          ? parseFloat(transaction.amount) > 0
          : parseFloat(transaction.amount) < 0
      );
    }

    if (dateRange[0] && dateRange[1]) {
      filtered = filtered.filter(
        (transaction) =>
          new Date(transaction.date) >= dateRange[0] &&
          new Date(transaction.date) <= dateRange[1]
      );
    }

    setFilteredTransactions(filtered);
  };

  const handleClearFilters = () => {
    setFilterType("");
    setDateRange([null, null]);
    setFilteredTransactions(transactions);
  };

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (orderBy === "date") {
      return order === "asc"
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    }
    return order === "asc"
      ? parseFloat(a[orderBy]) - parseFloat(b[orderBy])
      : parseFloat(b[orderBy]) - parseFloat(a[orderBy]);
  });

  return (
    <Container component="main" maxWidth="lg">
      <Box sx={{  marginTop: "20px" }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Account Statement
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          marginBottom="20px"
        >
          <FormControl variant="outlined" sx={{ minWidth: 200 }}>
            <InputLabel>Filter by Type</InputLabel>
            <Select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              label="Filter by Type"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="deposits">Deposits</MenuItem>
              <MenuItem value="withdrawals">Withdrawals</MenuItem>
            </Select>
          </FormControl>
          <DateRangePicker
            startText="Start Date"
            endText="End Date"
            value={dateRange}
            onChange={(newValue) => setDateRange(newValue)}
            renderInput={(startProps, endProps) => (
              <>
                <TextField {...startProps} />
                <Box sx={{ mx: 2 }}> to </Box>
                <TextField {...endProps} />
              </>
            )}
          />
          <Button variant="contained" color="primary" onClick={handleFilter}>
            Search
          </Button>
          <IconButton onClick={handleClearFilters} aria-label="clear filters">
            <ClearIcon />
          </IconButton>
        </Box>
        <Divider sx={{ margin: "20px 0" }} />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "date"}
                  direction={orderBy === "date" ? order : "asc"}
                  onClick={() => handleSortRequest("date")}
                >
                  Date
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "amount"}
                  direction={orderBy === "amount" ? order : "asc"}
                  onClick={() => handleSortRequest("amount")}
                >
                  Amount
                </TableSortLabel>
              </TableCell>
              <TableCell>Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedTransactions
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((transaction, index) => (
                <TableRow key={index}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell
                    sx={{
                      backgroundColor:
                        transaction.amount > 0 ? "#e0f7fa" : "#ffebee",
                      color: transaction.amount > 0 ? "#00796b" : "#c62828",
                      fontWeight: "bold",
                    }}
                  >
                    {transaction.amount > 0
                      ? `+${transaction.amount}`
                      : transaction.amount}
                  </TableCell>

                  <TableCell>{transaction.balance}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginTop="20px"
        >
          <Button onClick={handleFirstPageButtonClick} disabled={page === 0}>
            First Page
          </Button>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={filteredTransactions.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <Button
            onClick={handleLastPageButtonClick}
            disabled={
              page >= Math.ceil(filteredTransactions.length / rowsPerPage) - 1
            }
          >
            Last Page
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AccountStatement;
