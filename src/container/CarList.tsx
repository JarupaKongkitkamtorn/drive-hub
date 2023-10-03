import React from "react";

//material ui
import { Grid } from "@mui/material";

//component
import CardCar from "../component/CardCar";

interface CarList {
  carList: any;
  handleCart: (idx: any, count: number, type: string) => void;
}

function CarList(data: CarList) {
  const { carList, handleCart } = data;
  return (
    <div className="card-list">
      <Grid container className="container">
        <Grid container item spacing={4} sx={{ py: 5 }}>
          {carList.map((item: any, idx: React.Key) => (
            <Grid key={idx} item lg={3} sm={6} xs={12}>
              <CardCar car={item} idx={idx} handleCart={handleCart} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
}

export default CarList;
