import React from "react";

//material ui
import { Grid } from "@mui/material";

function Footer() {
  return (
    <Grid container className="app-footer">
      <Grid item lg={6} sm={6} xs={12}>
        <Grid className="footer-company-name">Drivehub Co.,Ltd</Grid>
        <Grid className="footer-company-address">
          193-195 Lake Rajada Office Complex,
          <br />
          Ratchadapisek road, Khlong Toei, Bangkok
        </Grid>
      </Grid>
      <Grid
        item
        container
        alignItems="end"
        sx={{ justifyContent: { lg: "end", sm: "end" }, mt: { xs: 1 } }}
        lg={6}
        sm={6}
        xs={12}
        className="footer-year"
      >
        © Drivehub 2023
      </Grid>
    </Grid>
  );
}

export default Footer;
