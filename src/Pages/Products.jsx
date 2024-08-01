import React from "react";
import SideBar from "../SideBar/SideBar";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";
import { Box } from "@mui/material";
import ProductTable from "../Components/productTable";

function Products() {
    return(
        <Box >
        <SideBar/>
        <Navbar/>
        <Box display="flex" alignContent="space-between" alignItems="center">
            <Header title = "PRODUCTS" subtitle= "My Products"/>
        </Box>
        <Box>
            <ProductTable />
        </Box>
       </Box>
    );
}

export default Products