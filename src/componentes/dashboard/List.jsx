import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import "../../assets/css/dashboard.css";
import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { useAddTransactions } from "../../hooks/useAddTransacations";
import { useGetTransactions } from "../../hooks/useGetUserTransactions";

const List = () => {
  const { addTransactions } = useAddTransactions();
  const { name, profilePhoto, isAuth } = useGetUserInfo();
  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");
  const { transactions } = useGetTransactions();

  const navigate = useNavigate();

  const logout = async () => {
    try {
      await auth.signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/");
      return;
    }
  }, []);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
        crossOrigin="anonymous"
      />

      <div className="container m-5 p-4 rounded mx-auto bg-light shadow">
        {/* App title section */}
        <div className="row mt-5 p-4">
        <Link to={`/dashboard`}>Home</Link>
          <div className="col">
            <div className="p-1 h1 text-primary text-center mx-auto display-inline-block">
              <u>
                {" "}
                <b>Expense Tracker</b>{" "}
              </u>
            </div>
          </div>
        </div>
        
        <div className="p-2 mx-4 border-black-25 border-bottom" />
        {/* //todo iteam */}
        <div className="row mx-1 px-5 pb-3 w-80">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Description</th>
                <th scope="col">TransactionAmount</th>
                <th scope="col">TransactionType</th>
                <th scope="col">TransactionDate</th>
              </tr>
            </thead>
            <tbody>
            {transactions.slice().reverse().map((transaction, index) => {
  const { id, description, transactionAmount, transactionType, createdAt } = transaction;

  // Convert Firestore Timestamp to JavaScript Date
  const date = createdAt.toDate();

  // Format the date as a string
  const formattedDate = date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
  });

 return (
  <React.Fragment>

      <tr key={id}>
        <th scope="row">{index + 1}</th>
        <td>{description}</td>
        <td>₹{transactionAmount}</td>
        <td
          style={{
            color: transactionType === "expense" ? "red" : "green",
          }}
        >
          {transactionType}
        </td>
        <td>{formattedDate}</td>
      </tr>
    
  </React.Fragment>
);
})}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default List;
