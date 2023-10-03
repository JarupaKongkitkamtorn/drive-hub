import React from "react";

//material ui
import { Grid, TextField, MenuItem, Select } from "@mui/material";

//component
import { filterData } from "../const/Sort";

interface SectionTopType {
  searchValue: string;
  filter: string;
  handleChange: (event: any) => void;
  handleChangeFilter: (event: any) => void;
}

function SectionTop(data: SectionTopType) {
  const { handleChange, searchValue, filter, handleChangeFilter } = data;
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      className="container"
      sx={{ my: 3.5 }}
    >
      <div>
        <div className="section-top-title">Car Available</div>
      </div>
      <div className="input">
        <TextField
          value={searchValue}
          placeholder="Search Car"
          onChange={handleChange}
        />
        <Select
          sx={{
            textAlign: "left",
            width: { sm: 206, xs: "100%" },
            height: 43,
            ml: { sm: 1 },
            mt: { sm: 0, xs: 2 },
          }}
          defaultValue={filterData[0].value}
          value={filter}
          onChange={handleChangeFilter}
        >
          {filterData.map((item: any, idx: any) => (
            <MenuItem key={idx} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </div>
    </Grid>
  );
}

export default SectionTop;
