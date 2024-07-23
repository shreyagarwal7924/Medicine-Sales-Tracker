import React from "react";
import SideBar from "../SideBar/SideBar";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";
import { Box } from "@mui/material";

function Products() {
    return(
        <Box >
        <SideBar/>
        <Navbar/>
        <Box display="flex" alignContent="space-between" alignItems="center">
            <Header title = "PRODUCTS" subtitle= "My Products"/>
        </Box>
       </Box>
    );
}

export default Products