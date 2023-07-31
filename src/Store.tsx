import create from "zustand";
import { persist,devtools } from "zustand/middleware";
import { client, purchasedproduct } from "./pages/types";

interface filter {
  branch: string;
  startDate: string;
  endDate: string;
  transactionType: string;
  detail: string;
  level: string;
}

interface accountTypeState {
  accountType: String;
  setAccountType: (type: String) => void;
  clientt: client;
  setClientt: (type: any) => void;
  purchasedProduct: purchasedproduct;
  setPurchasedProduct: (type: any) => void;
  accessToken: string;
  setAccessToken: (type: string) => void;
  filterValue:filter
  setFilterValue: (type:filter) => void;
}

let cli: client;
let pp: purchasedproduct;
let fv:filter;

const useStore = create(
  persist<accountTypeState>(
    (set) => ({
      accountType: "",
      setAccountType: (accountType) =>
        set((state) => ({
          ...state,
          accountType,
        })),
      clientt: cli,
      setClientt: (clientt) =>
        set((state) => ({
          ...state,
          clientt,
        })),
      purchasedProduct: pp,
      setPurchasedProduct: (purchasedProduct) =>
        set((state) => ({
          ...state,
          purchasedProduct,
        })),
      accessToken: "",
      setAccessToken: (accessToken) =>
        set((state) => ({
          ...state,
          accessToken,
        })),
      filterValue: fv,
      setFilterValue: (filterValue) =>
        set((state) => ({
          ...state,
          filterValue,
        })),
    }),
    {
      name: "pesist_state",
    }
  )
);

export default useStore;
