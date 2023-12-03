import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useGetUserInfo } from "./useGetUserInfo";

export const useAddTransactions = () => {
  const transactionCollectionRef = collection(db, "transactions");
  const { userID } = useGetUserInfo();
  const addTransactions = async ({
    description,
    transactionAmount,
    transactionType,
  }) => {
    await addDoc(transactionCollectionRef, {
    userID,
      description,
      transactionAmount,
      transactionType,
      createdAt: new Date(),
    });
  };

  return { addTransactions };
};
