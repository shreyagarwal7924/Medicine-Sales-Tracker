import React from "react";
import SideBar from "../SideBar/SideBar";
import Navbar from "../Components/Navbar";
import Header from "../Components/Header";
import { Box } from "@mui/material";
import CustomerTable from "../Components/CustomerTable";

function Parties () {
    return(
        <Box >
        <SideBar/>
        <Navbar/>
        <Box display="flex" alignContent="space-between" alignItems="center">
            <Header title = "PARTIES" subtitle= "Your Customers"/>
        </Box>
        <Box>
            <CustomerTable />
        </Box>
       </Box>
    );
}

export default Parties