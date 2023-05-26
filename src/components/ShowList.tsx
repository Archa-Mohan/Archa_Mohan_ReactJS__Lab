import React, { useEffect, useState } from "react";
import IProduct from "../model/IProuct";
import { getItemsFromServer } from "../service/dataService";
import ExpenseTracker from "./ExpenseTracker";

function ShowList() {
  const [items, setItems] = useState<IProduct[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [paidByRahul, setPaidByRahul] = useState<number>(0);
  const [paidByRamesh, setPaidByRamesh] = useState<number>(0);
  const fetchItems = async () => {
    try {
      const data = await getItemsFromServer();
      setItems(data);
      setTotalAmount(data.reduce((acc, each) => acc + each.price, 0));
      calculateShares(data);
    } catch (error: any) {
      console.log("Error fetching items");
    }
  };
  const calculateShares = (data: IProduct[]) => {
    let paidByRahulAmt = 0;
    let paidByRameshAmt = 0;

    data.map((eachPrd) => {
      if (eachPrd.payeeName === "Rahul") {
        paidByRahulAmt += eachPrd.price;
      } else if (eachPrd.payeeName === "Ramesh") {
        paidByRameshAmt += eachPrd.price;
      }
    });
    setPaidByRahul(paidByRahulAmt);
    setPaidByRamesh(paidByRameshAmt);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const success = () => {
    setShowForm(false);
    fetchItems();
  };
  const cancel = () => {
    setShowForm(false);
  };
  return (
    <>
      <header id="page-header">Expense Tracker</header>
      <button id="Add-Button" onClick={() => setShowForm(true)}>
        Add
      </button>
      {showForm && (
        <div className="form">
          <ExpenseTracker onClose={cancel} onTrue={success}></ExpenseTracker>
        </div>
      )}
      <>
        <div className="use-inline header-color">Date</div>
        <div className="use-inline header-color">Product Purchased</div>
        <div className="use-inline header-color">Price</div>
        <div className="use-inline header-color">Payee</div>
      </>
      {items &&
        items.map((eachItem, index) => (
          <div key={index}>
            <div className="use-inline date">{eachItem.setDate}</div>
            <div className="use-inline">{eachItem.product}</div>
            <div className="use-inline price">{eachItem.price}</div>
            <div
              className={
                eachItem.payeeName === "Rahul"
                  ? "use-inline Rahul"
                  : "use-inline Ramesh"
              }
            >
              {eachItem.payeeName}
            </div>
          </div>
        ))}
      <hr />
      <>
        <div className="use-inline">Total:</div>
        <span className="use-inline total">{totalAmount}</span>
        <br />
        <div className="use-inline">Rahul paid:</div>
        <span className="use-inline Rahul">{paidByRahul}</span>
        <br />
        <div className="use-inline">Ramesh paid:</div>
        <span className="use-inline Ramesh">{paidByRamesh}</span>
        <br />
        <div className="use-inline payable">
          {paidByRahul > paidByRamesh ? "Pay Rahul" : "Pay Ramesh"}
        </div>
        <span className="use-inline payable">
          {Math.abs((paidByRahul - paidByRamesh) / 2)}
        </span>
        <br />
      </>
    </>
  );
}

export default ShowList;
