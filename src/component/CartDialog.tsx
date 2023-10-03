import React, { useState, useEffect } from "react";

//material ui
import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

//component
import CartItem from "./CartItem";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialog-paper": {
    borderRadius: 16,
    width: 530,
  },
}));

interface CartDialogType {
  cart: any;
  open: boolean;
  carListDiscount: any;
  handleClose: () => void;
  handleCart: (idx: any, count: number, type: string) => void;
}

function CartDialog(data: CartDialogType) {
  const { cart, open, handleClose, carListDiscount, handleCart } = data;
  const [dataCart, setDataCart] = useState(cart);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [discountCode, setDiscountCode] = useState("");
  const grandTotal = total - discount;

  useEffect(() => {
    setDataCart(cart);
  }, [cart]);

  useEffect(() => {
    const totalValue = dataCart.reduce((accumulator: any, object: any) => {
      return accumulator + object.price * object.count;
    }, 0);
    setTotal(totalValue);
  }, [dataCart]);

  //Update cart data after click plus and minus icon
  const handleData = (idx: any, type: string) => {
    const newArray = dataCart.map((item: any, i: any) => {
      if (idx === i) {
        const value = type === "plus" ? item.count + 1 : item.count - 1;
        handleCart(item.id, value, "cart");
        if (value === 0) {
          return {
            ...item,
            count: 0,
          };
        } else {
          return {
            ...item,
            count: value,
          };
        }
      } else {
        return item;
      }
    });
    setDataCart(newArray.filter((item: any) => item.count !== 0));
  };

  //Update discount code
  const handleChange = (event: any) => {
    setDiscountCode(event.target.value);
    const resultDiscount = carListDiscount.find(
      (item: any) =>
        item.code.toLowerCase() === event.target.value.toLowerCase()
    );
    if (!!resultDiscount) {
      setDiscount(resultDiscount.amount);
    } else {
      setDiscount(0);
    }
  };

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2, pb: 1 }} className="dialog-title">
        Cart
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <Grid container className="grid-cart" sx={{ width: "100%" }}>
          <Grid item lg={12} xs={12}>
            {dataCart.length !== 0 ? (
              dataCart.map((item: any, idx: any) => (
                <CartItem idx={idx} cart={item} handleData={handleData} />
              ))
            ) : (
              <div className="empty">Cart is empty!</div>
            )}
          </Grid>
        </Grid>
        <Grid container sx={{ pt: 2 }}>
          <Grid
            item
            lg={12}
            xs={12}
            sx={{
              backgroundColor: "#F3F4F6",
              p: 2,
              borderRadius: "8px",
              width: "100%",
            }}
          >
            <TextField
              value={discountCode}
              placeholder="Discount code"
              sx={{ width: "100%" }}
              className="discount"
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1} sx={{ pt: 2 }}>
          <Grid
            item
            container
            justifyContent="space-between"
            alignItems="center"
            lg={12}
          >
            <Typography className="cart-title">Total</Typography>
            <Typography className="car-price">
              {total.toLocaleString()} THB
            </Typography>
          </Grid>
          <Grid item container lg={12}>
            <Divider className="divider" />
          </Grid>
          <Grid
            item
            container
            justifyContent="space-between"
            alignItems="center"
            lg={12}
          >
            <Typography className="cart-title">Discount</Typography>
            <Typography className="car-price">
              {discount.toLocaleString()} THB
            </Typography>
          </Grid>
          <Grid item container lg={12}>
            <Divider className="divider" />
          </Grid>
          <Grid
            item
            container
            justifyContent="space-between"
            alignItems="center"
            lg={12}
          >
            <Typography className="cart-title">Grand Total</Typography>
            <Typography className="car-price">
              {grandTotal.toLocaleString()} THB
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
    </BootstrapDialog>
  );
}

export default CartDialog;
