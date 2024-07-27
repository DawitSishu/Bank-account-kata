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

// Simple IBAN validation function (you can replace this with a more comprehensive validation if needed)
const validateIBAN = (iban) => {
  const regex = /^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/;
  return regex.test(iban);
};

const Transfer = () => {
  const [iban, setIban] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const { balance, setBalance } = useContext(BalanceContext);

  const handleTransfer = () => {
    if (validateIBAN(iban) && amount > 0 && amount <= balance) {
      setIsLoading(true);
      const transferAmount = parseFloat(amount);
      const newBalance = balance - transferAmount;
      setTimeout(() => {
        setBalance(newBalance);
        toastr.success(
          `Successfully transferred $${amount} to IBAN ${iban}. New balance is $${newBalance}.`
        );
        setIban("");
        setAmount("");
        setIsLoading(false);
        setIsDialogOpen(false);
      }, 1000); // Simulate a network request
    } else {
      toastr.error("Please enter a valid IBAN and amount");
    }
  };

  const handleOpenDialog = () => {
    if (validateIBAN(iban) && amount > 0 && amount <= balance) {
      setIsDialogOpen(true);
      setValidationMessage("");
    } else {
      setValidationMessage("Please enter a valid IBAN and amount");
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
          Transfer Money
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
            id="iban"
            label="Recipient IBAN"
            name="iban"
            type="text"
            value={iban}
            onChange={(e) => setIban(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="amount"
            label="Transfer Amount"
            name="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            InputProps={{
              startAdornment: <i className="fas fa-dollar-sign" />,
            }}
          />
          {validationMessage && (
            <Typography color="error" variant="body2">
              {validationMessage}
            </Typography>
          )}
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: "20px" }}
            onClick={handleOpenDialog}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Transfer"}
          </Button>
        </form>
      </Box>

      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Transfer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to transfer ${amount} to IBAN {iban}?
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
            onClick={handleTransfer}
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

export default Transfer;
