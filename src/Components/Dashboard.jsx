import React, { useContext } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Avatar,
  ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { styled } from "@mui/system";
import logo from "../assets/jd.jpg";
import { BalanceContext } from "../Services/BalanceContext";

const drawerWidth = 240;

const ProfileContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(3),
  flexDirection: "column",
}));

const ProfileContent = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(4),
}));

const ProfileImage = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(40),
  height: theme.spacing(40),
  marginRight: theme.spacing(3),
}));

const ProfileDetails = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
}));

const DetailItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(2),
}));

const BoldText = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  marginRight: theme.spacing(1),
}));

const LinkBoxContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-around",
  width: "100%",
  maxWidth: "800px",
  marginTop: theme.spacing(4),
}));

const LinkBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "150px",
  height: "150px",
  boxShadow: theme.shadows[3],
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  textDecoration: "none",
  color: theme.palette.text.primary,
  cursor: "pointer",
  "&:hover": {
    boxShadow: theme.shadows[6],
    backgroundColor: theme.palette.grey[100],
  },
}));

const Dashboard = ({ ChooseLink }) => {
  const { balance } = useContext(BalanceContext);

  const profile = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    address: "123 Main Street, Anytown, USA",
    accountNumber: "123456789012",
  };

  const links = [
    { text: "Deposit", icon: <AttachMoneyIcon />, href: "#/deposit" },
    { text: "Withdraw", icon: <AttachMoneyIcon />, href: "#/withdraw" },
    { text: "Transfer", icon: <SwapHorizIcon />, href: "#/transfer" },
    {
      text: "Account Statement",
      icon: <ListAltIcon />,
      href: "#/account-statement",
    },
  ];

  const handleLinkClick = (text) => {
    ChooseLink(text);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <ProfileContainer>
          <ProfileContent>
            <ProfileImage alt="Profile Picture" src={logo} />
            <ProfileDetails>
              <DetailItem>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <BoldText variant="h6">Name:</BoldText>
                <Typography variant="h6">{profile.name}</Typography>
              </DetailItem>
              <DetailItem>
                <ListItemIcon>
                  <EmailIcon />
                </ListItemIcon>
                <BoldText variant="h6">Email:</BoldText>
                <Typography variant="h6">{profile.email}</Typography>
              </DetailItem>
              <DetailItem>
                <ListItemIcon>
                  <PhoneIcon />
                </ListItemIcon>
                <BoldText variant="h6">Phone:</BoldText>
                <Typography variant="h6">{profile.phone}</Typography>
              </DetailItem>
              <DetailItem>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <BoldText variant="h6">Address:</BoldText>
                <Typography variant="h6">{profile.address}</Typography>
              </DetailItem>
              <DetailItem>
                <ListItemIcon>
                  <AccountBalanceIcon />
                </ListItemIcon>
                <BoldText variant="h6">Account Number:</BoldText>
                <Typography variant="h6">{profile.accountNumber}</Typography>
              </DetailItem>
              <DetailItem>
                <ListItemIcon>
                  <MonetizationOnIcon />
                </ListItemIcon>
                <BoldText variant="h6">Balance:</BoldText>
                <Typography variant="h6">${balance.toLocaleString()}</Typography>
              </DetailItem>
            </ProfileDetails>
          </ProfileContent>
          <LinkBoxContainer>
            {links.map((link) => (
              <LinkBox
                key={link.text}
                onClick={() => handleLinkClick(link.text)}
              >
                {link.icon}
                <Typography variant="h6" align="center">
                  {link.text}
                </Typography>
              </LinkBox>
            ))}
          </LinkBoxContainer>
        </ProfileContainer>
      </Box>
    </Box>
  );
};

export default Dashboard;
