import React, { useContext } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Avatar,
  ListItemIcon,
  useMediaQuery,
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
  alignItems: "flex-start",
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

const ProfileImage = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(40),
  height: theme.spacing(40),
  marginRight: theme.spacing(3),
  [theme.breakpoints.down("sm")]: {
    width: theme.spacing(30),
    height: theme.spacing(30),
    marginBottom: theme.spacing(2),
    marginRight: 0,
  },
}));

const ProfileDetails = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  [theme.breakpoints.down("sm")]: {
    alignItems: "flex-start",
  },
}));

const DetailItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    justifyContent: "flex-start",
    width: "100%",
  },
}));

const BoldText = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  marginRight: theme.spacing(1),
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
  },
}));

const ValueText = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(1),
}));

const LinkBoxContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-around",
  width: "100%",
  maxWidth: "800px",
  flexWrap: "wrap",
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
  margin: theme.spacing(1),
  "&:hover": {
    boxShadow: theme.shadows[6],
    backgroundColor: theme.palette.grey[100],
  },
}));

const Dashboard = ({ ChooseLink }) => {
  const { balance } = useContext(BalanceContext);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

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
                <ValueText variant="h6">{profile.name}</ValueText>
              </DetailItem>
              <DetailItem>
                <ListItemIcon>
                  <EmailIcon />
                </ListItemIcon>
                <BoldText variant="h6">Email:</BoldText>
                <ValueText variant="h6">{profile.email}</ValueText>
              </DetailItem>
              <DetailItem>
                <ListItemIcon>
                  <PhoneIcon />
                </ListItemIcon>
                <BoldText variant="h6">Phone:</BoldText>
                <ValueText variant="h6">{profile.phone}</ValueText>
              </DetailItem>
              <DetailItem>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <BoldText variant="h6">Address:</BoldText>
                <ValueText variant="h6">{profile.address}</ValueText>
              </DetailItem>
              <DetailItem>
                <ListItemIcon>
                  <AccountBalanceIcon />
                </ListItemIcon>
                <BoldText variant="h6">Account Number:</BoldText>
                <ValueText variant="h6">{profile.accountNumber}</ValueText>
              </DetailItem>
              <DetailItem>
                <ListItemIcon>
                  <MonetizationOnIcon />
                </ListItemIcon>
                <BoldText variant="h6">Balance:</BoldText>
                <ValueText variant="h6">${balance.toLocaleString()}</ValueText>
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
