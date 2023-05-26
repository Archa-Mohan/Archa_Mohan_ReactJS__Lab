import React, { useEffect, useState } from "react";
import { postNewItem } from "../service/dataService";
import "../App.css";

type Props = {
  onTrue: any;
  onClose: any;
};
const ExpenseTracker = ({ onTrue, onClose }: Props) => {
  const [payeeName, setPayeeName] = useState("");
  const [product, setProductName] = useState("");
  const [price, setPriceValue] = useState(0);
  const [setDate, setTheDate] = useState(showDefaultDate());

  function showDefaultDate() {
    const today = new Date();
    return `${today.getFullYear()}-${("0" + (today.getMonth() + 1)).slice(
      -2
    )}-${("0" + (today.getDate() + 1)).slice(-2)}`;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const finalItem = { payeeName, product, price, setDate };
    const data = await postNewItem(finalItem);
    // onTrue();
  }
  function setPayee(event: React.ChangeEvent<HTMLSelectElement>) {
    setPayeeName(event.target.value);
  }
  function setProduct(event: React.ChangeEvent<HTMLInputElement>) {
    setProductName(event.target.value);
  }
  function setPrice(event: React.ChangeEvent<HTMLInputElement>) {
    setPriceValue(parseInt(event.target.value));
  }

  function setDateValue(event: React.ChangeEvent<HTMLInputElement>) {
    setTheDate(event.target.value);
  }

  return (
    <>
      <section>
        <header>
          <h1> Add New Item</h1>
          <p>Read the below instructions before proceeding:</p>
          <div className="info">
            Make sure you fill all the fields where * is provided.
          </div>
        </header>
        <form onSubmit={handleSubmit}>
          <article>
            <p>Name</p>
            <select
              name="name"
              id="name"
              required
              value={payeeName}
              onChange={setPayee}
            >
              <option value="" defaultChecked>
                Choose
              </option>
              <option value="Rahul">Rahul</option>
              <option value="Ramesh">Ramesh</option>
            </select>
          </article>
          <article>
            <p>Product Purchased</p>
            <input
              type="text"
              name="product"
              id="product"
              required
              value={product}
              onChange={setProduct}
            />
          </article>
          <article>
            <p>Price</p>
            <input
              type="number"
              name="price"
              id="price"
              required
              value={price}
              onChange={setPrice}
            />
          </article>
          <article>
            <p>Date</p>
            <input
              type="date"
              name="date"
              id="date"
              required
              value={setDate}
              onChange={setDateValue}
            />
          </article>
          <button className="form-button" onClick={onClose}>
            Close
          </button>
          <button className="form-button" type="submit">
            Submit
          </button>
        </form>
      </section>
    </>
  );
};

export default ExpenseTracker;
