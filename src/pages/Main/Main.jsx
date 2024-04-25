import { Box, Container, Grid, Typography, Stack } from "@mui/material";
import React, { useState } from "react";
import Swap from "./Swap/Swap";
import { useAccount, useConfig } from "wagmi";
import { signMessage } from "@wagmi/core";
import { CommonButton } from "../../components";
import { recoverMessageAddress, verifyMessage } from "viem";
import EventsDataTable from "./EventsTable";
const PRK = () => {
  const [signature, setSignature] = useState("");
  const { address } = useAccount();
  const [recoverAddress, setRecoverAddress] = useState("");
  const [validSign, setvalidSign] = useState(false);
  const string = "Welcome to Swap";
  const config = useConfig();
  const signHandler = async () => {
    try {
      console.log("calling");
      const result = await signMessage(config, {
        message: string,
      });
      setSignature(result);
      const [valid, recAddress] = await Promise.all([
        verifyMessage({
          address,
          message: string,
          signature: result,
        }),
        recoverMessageAddress({
          message: string,
          signature: result,
        }),
      ]);
      console.log(valid, recAddress);
      setvalidSign(valid);
      setRecoverAddress(recAddress);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Container maxWidth="xl">
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            <Stack alignItems="center" mb={3}>
              <Typography variant="subtitle1">Sign a Message</Typography>
              <CommonButton onClick={signHandler}>Sign Message</CommonButton>
              <Typography variant="subtitle1">
                Signature: {signature}
              </Typography>
              <Typography variant="subtitle1">
                Recovered Address: {recoverAddress}
              </Typography>
              <Typography variant="subtitle1">
                Valid Signature: {validSign ? "true" : "false"}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={4}>
            <Swap />
          </Grid>
        </Grid>
        <Typography variant="h2" textAlign="center" my={3}>
          Events Data
        </Typography>
        <EventsDataTable />

        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#131313",
              padding: { lg: "100px", xs: "40px" },
            }}
          >
            <Typography variant="subtitle1">Copyright Powered by ME</Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default PRK;
