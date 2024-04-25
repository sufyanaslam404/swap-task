import tokenAbi from "./tokenAbi.json";
import swapAbi from "./swapAbi.json";
import { http, createConfig } from "@wagmi/core";
import { bscTestnet } from "@wagmi/core/chains";
import axios from "axios";
let url = "http://localhost:3000/";
export const axiosInstance = axios.create({
  baseURL: url,
});

export const swapContract = {
  address: "0x4AEd04856cc136742bDAca9EB3e2aAd8E212053C", //testnet
  abi: swapAbi,
};

export const usdtContract = {
  address: "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd", //testnet
  abi: tokenAbi,
};

export const config = createConfig({
  chains: [bscTestnet],
  transports: {
    [bscTestnet.id]: http(),
  },
});

export const TxUrl = "https://testnet.bscscan.com/tx/";
export const ActiveChain = 97;
export let getSliceAddress = (address) =>
  address?.slice(0, 4) + "..." + address?.slice(-4);
export const getCommas = (value, percision = 2) => {
  value = parseFloat(value).toFixed(percision);
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
