import { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Tab,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { CommonButton } from "../components";
import { AdbRounded, Brightness4, Brightness7 } from "@mui/icons-material";
import { useAccount, useSignMessage, useDisconnect } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { getSliceAddress } from "../constants/environment";
const Navbar = ({ themeToggler, mode, isLoggedIn }) => {
  const theme = useTheme();
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();

  useMediaQuery("(max-width:1200px)");
  const { address, isConnected, chain } = useAccount();

  return (
    <>
      <Box>
        <AppBar
          position="fixed"
          elevation={0}
          component="nav"
          sx={{
            background: "transparent",
          }}
        >
          <Toolbar sx={{ justifyContent: "space-around" }}>
            <Container maxWidth="xl">
              <Box
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                <Box>LOGO</Box>
                <Box
                  display="flex"
                  justifyContent=" start"
                  alignItems="center"
                  gap={1}
                >
                  <CommonButton onClick={isConnected ? disconnect : open}>
                    {isConnected ? getSliceAddress(address) : "Connect Wallet"}
                  </CommonButton>
                  <Button
                    onClick={themeToggler}
                    sx={{
                      color: "theme.palette.success.main",
                      // backgroundColor: "#070C0E",
                      py: 1.4,
                      borderRadius: "10px",
                    }}
                  >
                    {mode ? <Brightness4 /> : <Brightness7 />}
                  </Button>
                </Box>
              </Box>
            </Container>
          </Toolbar>
        </AppBar>
      </Box>

      <Divider sx={{ color: "#fff", border: "1px solid", marginTop: "70px" }} />
    </>
  );
};
export default Navbar;
