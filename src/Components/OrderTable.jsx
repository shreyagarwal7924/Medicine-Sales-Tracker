import React, { useState, useEffect }from "react";
import { Box, Button } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from "@emotion/react";
import { token } from '../theme';

const columns = [
  { field: 'orderNumber', headerName: 'Order Number'},
  { field: 'name', headerName: 'Name', flex: 1, cellClassName: "name-column--cell"},
  { field: 'contact', headerName: 'Contact', headerAlign: "left", align: "left"},
  { field: 'date', headerName: 'Date', flex:1}
];

export default function OrderTable() {
    const [tableData, setTableData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("http://localhost:7001/getTable")
            const data = await res.json()
            setTableData(data.items)
        }
        fetchData();
    }, [])

    const theme = useTheme();
    const colors = token(theme.palette.mode)

    //width="90%" m="0 auto" p="5px" display="flex" justifyContent="center" borderRadius="4px"

  return (
    <Box 
    ml="100px" 
    display="flex" 
    flexDirection="column" 
    alignItems="flex-start" 
    width="80%"
    height="75vh">
        <Button color="primary" startIcon={<AddIcon /> } sx={{color: colors.blueAccent[700], mb: "2"}} >
                Add Order
        </Button>

        <Box height="100%" width="100%" sx={{
            "& .MuiDataGrid-root": {
                border: "none",
                width: "150vh"
            },
            "& .MuiDataGrid-cell": {
                borderBottom: "none"
            },
            "& .name-column--cell": {
                color: colors.greenAccent[300]
            },
            "& .MuiDataGrid-columnHeader": {
                backgroundColor: colors.blueAccent[700],
                borderBottom: "none"
            },
            "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[700]
            },
        }}>
        <DataGrid rows={tableData} columns={columns} 
        getRowId = {(row) => row._id} 
        sx={{}}
        />
        </Box>
    </Box>
  );
}