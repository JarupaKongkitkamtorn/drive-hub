import React, { useState, useEffect } from "react";

//image
import noimage from "../assets/noimage.png";
import minus from "../assets/Button minus.png";
import plus from "../assets/Button plus.png";

//material ui
import { Grid, Typography, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

//component
import { imageExist } from "../function/function_image";

interface CartItem {
  cart: any;
  idx: any;
  handleData: (idx: any, type: string) => void;
}
function CartItem(data: CartItem) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const { cart, idx, handleData } = data;
  const [cartData, setCartData] = useState(cart);

  useEffect(() => {
    setCartData(cart);
  }, [cart]);

  return (
    <Grid key={idx} container item lg={12} xs={12}>
      <Grid item container alignItems="center" lg={12} xs={12}>
        {matches && (
          <Grid item lg={2}>
            <img
              src={imageExist(cartData.photo) ? cartData.photo : noimage}
              height="54px"
              width="87px"
            />
          </Grid>
        )}
        <Grid item lg={7} sm={9} xs={7} sx={{ pl: { lg: 2 } }}>
          <Typography gutterBottom className="cart-item-title">
            {cartData.title}
          </Typography>
          <Typography className="cart-item-description">
            {cartData.price.toLocaleString()} THB/Day
          </Typography>
        </Grid>
        <Grid item lg={3} sm={3} xs={5} sx={{ pl: { lg: 3, xs: 2 } }}>
          <Grid item container alignItems="center" lg={12} xs={12}>
            <img
              onClick={() => handleData(idx, "plus")}
              src={plus}
              alt="plus"
              width="30px"
              height="30px"
              style={{ cursor: "pointer" }}
            />
            <div className="count">{cartData.count}</div>
            <img
              onClick={() => cartData.count > 0 && handleData(idx, "minus")}
              src={minus}
              alt="minus"
              width="30px"
              height="30px"
              style={{ cursor: "pointer" }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item container lg={12}>
        <Divider className="divider" />
      </Grid>
    </Grid>
  );
}

export default CartItem;
