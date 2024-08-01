import React from 'react';
import SideBar from '../SideBar/SideBar'
import Navbar from '../Components/Navbar';
import Header from '../Components/Header';
import { Box, Button,IconButton,Typography,useTheme } from '@mui/material';
import { token } from  '../theme';
import { useLocation } from 'react-router';

const Page1 = () => {
    const location = useLocation();
    const email = location.state?.id;
    return(
       <Box >
        <SideBar/>
        <Navbar/>
        <Box display="flex" alignContent="space-between" alignItems="center">
            <Header title = "DASHBOARD" subtitle= "Welcome to your Dashboard"/>
        </Box>
       </Box>
    );
}
export default Page1;