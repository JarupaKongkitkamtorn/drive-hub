import React from "react";

//image
import noimage from "../assets/noimage.png";

//material ui
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

//component
import { imageExist } from "../function/function_image";
import { carData } from "../App";

interface CardCarType {
  car: carData;
  idx: any;
  handleCart: (idx: any, count: number, type: string) => void;
}

function CardCar(data: CardCarType) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const { car, handleCart, idx } = data;

  return (
    <Card className="card">
      <CardMedia
        component="img"
        alt={car.title}
        height={matches ? "249px" : "185px"}
        image={imageExist(car.photo) ? car.photo : noimage}
      />
      <CardContent>
        <Typography gutterBottom className="card-title">
          {car.title}
        </Typography>
        <Typography className="card-description">
          {car.price.toLocaleString()} THB/Day
        </Typography>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0 }}>
        {car.added ? (
          <Button
            size="small"
            variant="contained"
            disabled
            className="button-disable"
          >
            Added
          </Button>
        ) : (
          <Button
            size="small"
            variant="contained"
            className="button"
            onClick={() => handleCart(idx, 1, "carlist")}
          >
            Add to cart
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default CardCar;
