import {
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import Tokenbox from "./Tokenbox";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useState } from "react";
import { useEffect } from "react";
import { CommonButton } from "../../../components";
import { useAccount, useConfig, useSwitchChain } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import NotificationModal from "../../../components/NotificationModal/NotificationModal";
import {
  ActiveChain,
  swapContract,
  usdtContract,
} from "../../../constants/environment";
import { formatUnits, parseUnits } from "viem";
import {
  writeContract,
  waitForTransactionReceipt,
  readContract,
} from "@wagmi/core";
const Swap = () => {
  const { address, isConnected, chain } = useAccount();
  const { open } = useWeb3Modal();
  const { switchChain } = useSwitchChain();
  const [slect, setslect] = useState("BNB");
  const [toAmount, settoAmount] = useState("");
  const [onebnb, setonebnb] = useState("");
  const [loading, setloading] = useState(false);
  const config = useConfig();
  const [notificationProps, setnotificationProps] = useState({
    error: "",
    message: "",
    modal: false,
  });
  const [fromAmount, setFromAmount] = useState("");

  const init = async () => {
    try {
      let amountsend = parseUnits("1", 18);
      const [bnbToToken, usdtDecimals] = await Promise.all([
        readContract(config, {
          ...swapContract,
          functionName: "calculateETHtoUSDC",
          args: [amountsend],
        }),
        readContract(config, {
          ...usdtContract,
          functionName: "decimals",
        }),
      ]);
      setonebnb(parseFloat(formatUnits(bnbToToken, usdtDecimals)).toFixed(4));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    const onchangehendler = async () => {
      if (fromAmount && !isNaN(fromAmount) && fromAmount > 0) {
        try {
          let amountsend = parseUnits(fromAmount.toString(), 18);
          const [bnbToToken, usdtDecimals] = await Promise.all([
            readContract(config, {
              ...swapContract,
              functionName: "calculateETHtoUSDC",
              args: [amountsend],
            }),
            readContract(config, {
              ...usdtContract,
              functionName: "decimals",
            }),
          ]);
          settoAmount(
            parseFloat(formatUnits(bnbToToken, usdtDecimals)).toFixed(4)
          );
        } catch (error) {
          console.log(error);
        }
      } else {
        settoAmount("");
      }
    };
    onchangehendler();
  }, [fromAmount]);

  const buytokens = async () => {
    if (
      !fromAmount ||
      isNaN(fromAmount) ||
      fromAmount < 0 ||
      fromAmount === 0
    ) {
      setnotificationProps({
        ...notificationProps,
        modal: true,
        error: true,
        message: "Please enter a valid fromAmount.",
      });
    } else {
      try {
        setloading(true);

        let buyHash = await writeContract(config, {
          ...swapContract,
          functionName: "swapETHtoUSDC",
          value: parseUnits(fromAmount.toString(), 18),
          args: [parseUnits(fromAmount.toString(), 18)],
        });
        await waitForTransactionReceipt(config, { hash: buyHash });
        setnotificationProps({
          ...notificationProps,
          modal: true,
          error: false,
          message: "Purchase successfuly completed.",
        });
        setloading(false);
      } catch (error) {
        setloading(false);
        setnotificationProps({
          ...notificationProps,
          modal: true,
          error: true,
          message: error.message,
        });
        console.log("e", error);
      }
    }
  };

  return (
    <div>
      <NotificationModal
        notificationProps={notificationProps}
        setnotificationProps={setnotificationProps}
      />
      <Box
        sx={{
          backgroundColor: "rgba(37, 45, 48, 0.7)", // Adjust the last value (0.7) to change transparency
          padding: "20px",
          borderRadius: "10px",
          border: "0.4px solid rgba(140, 140, 140, 0.40)",
          boxShadow: "0px 2px 9px 0px rgba(151, 151, 151, 0.19)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontFamily: "'Nunito'",
                fontStyle: "normal",
                fontWeight: 700,
                fontSize: "25px",
                color: "white",
              }}
            >
              Swap
            </Typography>
          </Box>
          <IconButton sx={{ color: "white", fontSize: "30px" }}>
            <SettingsIcon />
          </IconButton>
        </Box>
        <Box>
          <Tokenbox
            setslect={setslect}
            slect={slect}
            fromAmount={fromAmount}
            setFromAmount={setFromAmount}
            text={"From"}
          />
        </Box>
        <Box textAlign="center" my="10px">
          <IconButton
            sx={{ color: "white", fontSize: { xs: "20px", sm: "40px" } }}
          >
            <ArrowDownwardIcon sx={{ fontSize: { xs: "20px", sm: "40px" } }} />
          </IconButton>
        </Box>
        <Box>
          <Tokenbox text={"To"} slect={"To"} toAmount={toAmount} />
        </Box>
        <Box
          mt="20px"
          sx={{
            display: "flex ",
            alignItems: "center",
            justifyContent: "space-between",
            color: "white",
          }}
        >
          <Box
            sx={{
              fontFamily: "'Nunito'",
              fontStyle: "normal",
              fontWeight: 700,
              fontSize: { md: "17px", xs: "12px" },
            }}
          >
            Price:
          </Box>
          <Box
            sx={{
              fontFamily: "'Nunito'",
              fontStyle: "normal",
              fontWeight: 700,
              fontSize: { md: "17px", xs: "12px" },
            }}
          >
            {`${onebnb} USDT per BNB`}
          </Box>
        </Box>
        <Stack mt="20px">
          <CommonButton
            onClick={() =>
              !isConnected
                ? open()
                : chain?.id !== ActiveChain
                ? switchChain({ chainId: ActiveChain })
                : buytokens()
            }
            disabled={loading}
          >
            {isConnected
              ? chain?.id !== ActiveChain
                ? "Wrong Network"
                : loading
                ? "processing..."
                : "Swap"
              : "Connect Wallet"}
          </CommonButton>
        </Stack>
      </Box>
    </div>
  );
};

export default Swap;
