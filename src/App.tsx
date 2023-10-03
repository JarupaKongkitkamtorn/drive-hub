import React, { useState, useEffect } from "react";
import "./App.css";

//component
import Navbar from "./component/layout/Navbar";
import Footer from "./component/layout/Footer";
import SectionTop from "./container/SectionTop";
import CarList from "./container/CarList";
import Loading from "./component/Loading";

export interface carData {
  title: string;
  price: number;
  photo: string;
  added?: boolean;
  count?: number;
  id?: number;
}

function App() {
  const [carList, setCarList] = useState<carData[]>([]);
  const [carListSearch, setCarListSearch] = useState<carData[]>([]);
  const [carListDiscount, setCarListDiscount] = useState([]);
  const [cart, setCart] = useState<carData[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState("price_low_to_high");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const carFetch = await fetch(
        "https://cdn.contentful.com/spaces/vveq832fsd73/entries?content_type=car",
        {
          headers: { Authorization: `${process.env.REACT_APP_TOKEN}` },
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setLoading(false);
          const res = data.items.map((item: any, idx: any) => ({
            ...item.fields,
            added: false,
            count: 0,
            id: idx,
          }));

          setCarList(res.sort((a: any, b: any) => a.price - b.price));
          setCarListSearch(res.sort((a: any, b: any) => a.price - b.price));
          return res.sort((a: any, b: any) => a.price - b.price);
        });
      await fetch(
        "https://cdn.contentful.com/spaces/vveq832fsd73/entries?content_type=discount",
        {
          headers: { Authorization: `${process.env.REACT_APP_TOKEN}` },
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setCarListDiscount(
            data.items.map((item: any) => ({
              ...item.fields,
            }))
          );
        });
      return carFetch;
    }
    //Fetch car data and Get cart from local storage
    Promise.all([fetchData()]).then((value: any) => {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
        handleMemoryCart(
          JSON.parse(localStorage.getItem("cart") || "[]"),
          value[0]
        );
      }
    });
  }, []);

  //Update car list added with Local Storage
  const handleMemoryCart = (cartFromLocal: any, carFromLocal: any) => {
    const newArray = carFromLocal.map((item: any, i: any) => {
      const cartLocal = cartFromLocal.find(
        (itemCart: any) => itemCart.id === item.id
      );
      if (!!cartLocal) {
        return cartLocal;
      } else {
        return item;
      }
    });
    setCarListSearch(newArray);
  };

  //Uodate cart when added or rental duration of each car in cart and update on local storage too
  const handleCart = (idx: any, count: number, type: string) => {
    const newArray = carListSearch.map((item: any, i: any) => {
      const index = type === "cart" ? item.id : i;
      if (idx === index) {
        if (count === 0) {
          return {
            ...item,
            added: false,
            count: 0,
          };
        } else {
          return {
            ...item,
            added: true,
            count,
          };
        }
      } else {
        return item;
      }
    });
    const cartData = newArray.filter((item: any) => item.added);
    localStorage.setItem("cart", JSON.stringify(cartData) || "[]");
    setCart(cartData);
    setCarListSearch(newArray);
  };

  //Update search car list
  const handleChange = (event: any) => {
    setSearchValue(event.target.value);
    if (event.target.value.length !== 0) {
      const resultSearch = carListSearch.filter((item: any) =>
        item.title.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setCarListSearch(resultSearch);
    } else {
      const result = carList.map((item: any) =>
        !!cart.find((obj: any) => obj.title === item.title)
          ? {
              ...item,
              added: true,
              count: 1,
            }
          : {
              ...item,
              added: false,
              count: 0,
            }
      );
      setCarListSearch(result);
    }
  };

  //Update filter sort car list
  const handleChangeFilter = (event: any) => {
    setFilter(event.target.value);
    switch (event.target.value) {
      case "price_low_to_high":
        const lowtohigh = carListSearch.sort((a, b) => a.price - b.price);
        setCarListSearch(lowtohigh);
        break;
      case "price_high_to_low":
        const hightolow = carListSearch.sort((a, b) => b.price - a.price);
        setCarListSearch(hightolow);
        break;
      case "title_a_to_z":
        const atoz = carListSearch.sort((a, b) => (a.title < b.title ? -1 : 1));
        setCarListSearch(atoz);
        break;
      case "title_z_to_a":
        const ztoa = carListSearch.sort((a, b) => (b.title < a.title ? -1 : 1));
        setCarListSearch(ztoa);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Navbar
        cart={cart}
        carListDiscount={carListDiscount}
        handleCart={handleCart}
      />
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div style={{ height: 80 }} />
          <SectionTop
            handleChange={handleChange}
            searchValue={searchValue}
            filter={filter}
            handleChangeFilter={handleChangeFilter}
          />
          <CarList carList={carListSearch} handleCart={handleCart} />
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;
