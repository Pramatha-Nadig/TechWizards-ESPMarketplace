import axios from "axios";
import React, { useState } from "react";
import Search from "../components/Search";
import "../public/styles/buyerPage.css";
import { Navbar, NavbarBrand } from "reactstrap";
import dummyItems from "../items";
import ItemCard from "../components/ItemCard";
import { useEffect } from "react";
import Login from "./Login";

export default function BuyerPage() {
  const [items, setItems] = useState([]);
  const [likedItems, setLikedItems] = useState([]);

  useEffect(() => {
    if (likedItems != undefined) {
      axios
        .get("/item")
        .then((res) => {
          let data = res.data;
          setItems(data);
        })
        .catch((err) => {});
      getUserItems();
    }
  }, []);

  const getUserItems = () => {
    let user = localStorage.getItem("userEmail");
    axios
      .get("/favitem?userId=" + user)
      // axios.get("/favitem")
      .then((res) => {
        let data = res.data[0];
        if (data == undefined) setLikedItems([]);
        //data has fitemId array and userID
        else setLikedItems(data.fitemId);
      })
      .catch((err) => console.log(err));
  };

  function create(item) {
    let isLiked =
      likedItems.filter((i) => i == item.itemId).length > 0 ? true : false;

    return (
      <ItemCard
        key={item.itemId}
        id={item.itemId}
        price={item.price}
        name={item.name}
        condition={item.condition}
        filename={item.filename}
        ph={item.ph}
        address={item.address}
        isLiked={isLiked}
        email={item.email}
      />
    );
  }
  return (
    <>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">
          <span className="brandname">ESP Marketplace</span>
          <span>
            <a href="/favorites">Favorites</a>
            &nbsp;&nbsp;
            <Login />
          </span>
        </NavbarBrand>
      </Navbar>
      <Search />
      {items.map(create)}
    </>
  );
}
