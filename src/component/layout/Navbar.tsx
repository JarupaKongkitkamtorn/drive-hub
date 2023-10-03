import React, { useState } from "react";

//image
import logo from "../../assets/dh-logo.svg";
import shopping from "../../assets/Shopping.svg";

//material ui
import { Grid } from "@mui/material";

//component
import CartDialog from "../CartDialog";

interface NavbarType {
  cart: any;
  carListDiscount: any;
  handleCart: (idx: any, count: number, type: string) => void;
}

function Navbar(data: NavbarType) {
  const { cart, carListDiscount, handleCart } = data;
  const [open, setOpen] = useState(false);

  // Open cart dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  //Close cart dialog
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      className="app-header container"
    >
      <img src={logo} alt="logo" height="32px" />
      {carListDiscount && (
        <div className="flex-center cart" onClick={handleClickOpen}>
          {cart.length === 0 ? (
            <img
              src={shopping}
              alt="shopping"
              height="24px"
              width="24px"
              style={{ marginRight: 5 }}
            />
          ) : (
            <div className="div-badge">
              <div className="badge" />
              <img
                src={shopping}
                alt="shopping"
                height="24px"
                width="24px"
                style={{ marginRight: 5 }}
              />
            </div>
          )}
          Cart({cart.length})
        </div>
      )}
      {carListDiscount && (
        <CartDialog
          cart={cart}
          open={open}
          handleClose={handleClose}
          carListDiscount={carListDiscount}
          handleCart={handleCart}
        />
      )}
    </Grid>
  );
}

export default Navbar;
