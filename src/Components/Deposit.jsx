import React, { useState, useContext, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { BalanceContext } from "../Services/BalanceContext";

const Deposit = () => {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { balance, setBalance } = useContext(BalanceContext);

  const handleDeposit = () => {
    if (amount > 0) {
      setIsLoading(true);
      const depositAmount = parseFloat(amount);
      const newBalance = balance + depositAmount;
      setTimeout(() => {
        setBalance(newBalance);
        toastr.success(
          `Successfully deposited $${amount}. New balance is $${newBalance}.`
        );
        setAmount("");
        setIsLoading(false);
        setIsDialogOpen(false);
      }, 1000); // Simulate a network request
    } else {
      toastr.error("Please enter a valid deposit amount");
    }
  };

  const handleOpenDialog = () => {
    if (amount > 0) {
      setIsDialogOpen(true);
    } else {
      toastr.error("Please enter a valid deposit amount");
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    toastr.options = {
      closeButton: true,
      newestOnTop: true,
      progressBar: true,
      showDuration: 300,
      hideDuration: 1000,
      timeOut: 5000,
    };
  }, []);

  return (
    <Container component="main" maxWidth="sm">
      <Box style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Deposit Money
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Your current balance is ${balance}.
        </Typography>
        <Divider style={{ margin: "20px 0" }} />
        <form noValidate autoComplete="off">
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="amount"
            label="Deposit Amount"
            name="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            InputProps={{
              startAdornment: <i className="fas fa-dollar-sign" />,
            }}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: "20px" }}
            onClick={handleOpenDialog}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Deposit"}
          </Button>
        </form>
      </Box>

      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deposit</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to deposit ${amount} to your account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            sx={{ color: "#fc0303" }}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeposit}
            sx={{ color: "#0335fc" }}
            variant="outlined"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Deposit;
