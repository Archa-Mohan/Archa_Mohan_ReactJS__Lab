import axios from "axios";
import IProduct from "../model/IProduct";

const getItemsFromServer = () => {
  return axios
    .get<IProduct[]>("http://localhost:3001/items")
    .then((res) => res.data);
};
const postNewItem = (newItem: Omit<IProduct, "id">) => {
  return axios
    .post<IProduct>("http://localhost:3001/items", newItem, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data);
};
export { getItemsFromServer, postNewItem };
