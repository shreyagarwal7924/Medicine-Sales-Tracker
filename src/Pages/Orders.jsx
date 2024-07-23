import React from "react";
import SideBar from "../SideBar/SideBar";
import Navbar from "../Components/Navbar"
import Header from "../Components/Header";
import { Box, Button,IconButton,Typography,useTheme } from '@mui/material';
import OrderTable from "../Components/OrderTable";

function Orders() {

    return(
        <Box >
        <SideBar/>
        <Navbar/>
        <Box display="flex" alignContent="space-between" alignItems="center">
            <Header title = "ORDERS" subtitle="My Orders"/>
        </Box>
        <Box>
            <OrderTable />
        </Box>
        </Box>
    )
}

export default Orders