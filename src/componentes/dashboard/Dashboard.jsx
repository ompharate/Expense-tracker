import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import "../../assets/css/dashboard.css";
import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { useAddTransactions } from "../../hooks/useAddTransacations";
import { useGetTransactions } from "../../hooks/useGetUserTransactions";

const Dashboard = () => {
  const { addTransactions } = useAddTransactions();
  const { name, profilePhoto, isAuth } = useGetUserInfo();
  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");
  const { transactions , transactionTotals} = useGetTransactions();
  const { balance, income, expenses } = transactionTotals;

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

    if(!transactionAmount) {
      console.log("loading")
    }

  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    addTransactions({
      description,
      transactionAmount,
      transactionType,
    });

    setDescription("");
    setTransactionAmount("");
  };

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
          <div className="col">
            <div className="p-1 h1 text-primary text-center mx-auto display-inline-block">
              <u>
                {" "}
                <b>Expense Tracker</b>{" "}
              </u>
            </div>
          </div>
        </div>
        <div className="top-panel">
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">
                <b>Balance</b>
              </h5>
              <p className="card-text"></p>
              <a href="#" className="btn btn-primary">
                <b>₹{balance}</b>
              </a>
            </div>
          </div>
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">
                <b>Income</b>
              </h5>
              <p className="card-text"></p>
              <a href="#" className="btn btn-success">
                <b>₹{income}</b>
              </a>
            </div>
          </div>
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">
                <b>Expenses</b>
              </h5>
              <p className="card-text"></p>
              <a href="#" className="btn btn-danger">
                <b>₹{expenses}</b>
              </a>
            </div>
          </div>
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">
                <img src={profilePhoto} alt="" />
              </h5>
              <p className="card-text">
                <b>{name}</b>
              </p>
              <a onClick={logout} className="btn btn-warning">
                <b>Logout</b>
              </a>
            </div>
          </div>
        </div>
        {/* Create todo section */}
        <form onSubmit={onSubmit}>
          <div className="row m-1 p-3">
            <div className="col col-11 mx-auto">
              <div className="row bg-white rounded shadow-sm p-2 add-todo-wrapper align-items-center justify-content-center">
                <div className="col">
                  <input
                    className="form-control form-control-lg border-0 add-todo-input bg-transparent rounded"
                    type="text"
                    placeholder="Description"
                    required
                    pattern="^[a-zA-Z ]*$"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <input
                    className="form-control form-control-lg border-0 add-todo-input bg-transparent rounded"
                    type="text"
                    placeholder="Amount"
                    value={transactionAmount}
                    pattern="^(0|[1-9][0-9]*)$"
                    required
                    onChange={(e) => setTransactionAmount(e.target.value)}
                  />
                  <div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios1"
                        value="expense"
                        checked={transactionType === "expense"}
                        onChange={(e) => setTransactionType(e.target.value)}
                      />
                      <label
                        style={{ color: "red" }}
                        className="form-check-label"
                        htmlFor="exampleRadios1"
                      >
                        Expense
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios2"
                        value="income"
                        checked={transactionType === "income"}
                        onChange={(e) => setTransactionType(e.target.value)}
                      />
                      <label
                        style={{ color: "green" }}
                        className="form-check-label"
                        htmlFor="exampleRadios2"
                      >
                        Income
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-auto m-0 px-2 d-flex align-items-center">
                  <label className="text-secondary my-2 p-0 px-1 view-opt-label due-date-label d-none">
                    Due date not set
                  </label>
                  <i
                    className="fa fa-calendar my-2 px-1 text-primary btn due-date-button"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Set a Due date"
                  />
                  <i
                    className="fa fa-calendar-times-o my-2 px-1 text-danger btn clear-due-date-button d-none"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Clear Due date"
                  />
                </div>
                <div className="col-auto px-0 mx-0 mr-2">
                  <button type="submit" className="btn btn-primary">
                    <b>Add</b>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
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
                const {
                  id,
                  description,
                  transactionAmount,
                  transactionType,
                  createdAt,
                } = transaction;

                // Convert Firestore Timestamp to JavaScript Date
                const date = createdAt.toDate();

                // Format the date as a string
                const formattedDate = date.toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                  timeZoneName: "short",
                });

                return (
                  <React.Fragment>
                    {index < 2 ? (
                      <tr key={id}>
                        <th scope="row">{index + 1}</th>
                        <td>{description}</td>
                        <td>₹{transactionAmount}</td>
                        <td
                          style={{
                            color:
                              transactionType === "expense" ? "red" : "green",
                          }}
                        >
                          {transactionType}
                        </td>
                        <td>{formattedDate}</td>
                      </tr>
                    ) : (
                      index === 2 && (
                        <tr key={id}>
                          <td colSpan="5">
                          <Link to={`/list`}>View More
                           </Link>
                          </td>
                        </tr>
                      )
                    )}
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

export default Dashboard;
