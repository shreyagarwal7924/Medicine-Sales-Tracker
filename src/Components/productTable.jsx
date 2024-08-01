import React, { useState, useEffect }from "react";
import { Box, Button } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from "@emotion/react";
import { token } from '../theme';


const columns = [
  {field: 'name', headerName: 'Name'},
  {field: 'packing', headerName: 'Quantity', flex: 1, cellClassName: "name-column--cell"},
  {field: 'company', headerName: 'Company', headerAlign: "left", align: "left"},
  {field: 'sellingPrice', headerName: 'Price', flex:1},
  {field: 'mrp', headerName: 'MRP'},
  {field: 'expiryDate', headerName: 'Expiry Date'},
  {field: 'hsnCode', headerName: 'HSN Code', flex:1}
];

export default function ProductTable() {
    const [tableData, setTableData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("http://localhost:8001/getTable")
            const data = await res.json()
            console.log('resulyt:', data)
            setTableData(data.items)
        }
        fetchData();
    }, [])

    const theme = useTheme();
    const colors = token(theme.palette.mode)

  return (
    <Box 
    ml="100px" 
    display="flex" 
    flexDirection="column" 
    alignItems="flex-start" 
    width="80%"
    height="75vh">
        <Button color="primary" startIcon={<AddIcon /> } sx={{color: colors.blueAccent[700], mb: "2"}} >
                Add Product
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