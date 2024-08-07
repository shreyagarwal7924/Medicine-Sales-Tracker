import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography, InputLabel,FormControl, Select, OutlinedInput, MenuItem, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from "@emotion/react";
import { token } from '../theme';
import { Grid } from "@mui/material";
import ProductDescription from './ProductDescription';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

export default function ProductTable() {
    const theme = useTheme();
    const colors = token(theme.palette.mode);
    const columns = [
        {field: 'hsnCode', headerName: 'HSN Code', flex: 1, resizable: false, minWidth: 150},
        { field: 'name', headerName: 'Name', flex: 1, minWidth: 150, resizable: false },
        { field: 'packing', headerName: 'Packing',  minWidth: 150, flex: 1, resizable: false , cellClassName: "name-column--cell"},
        { field: 'company', headerName: 'Company', flex: 1, minWidth: 150, resizable: false , headerAlign: "left", align: "left"},
        { field: 'costPrice', headerName: 'Price', flex:1, resizable: false , minWidth: 150},
        { field: 'mrp', headerName: 'MRP', flex:1, resizable: false, minWidth: 150},
        {field: 'quantity', headerName: 'Quantity', flex:1, resizable: false, minWidth:150},
        { field: '', width: 100,
          renderCell: (params) => (
            <Button 
            onClick={(event) => handleDeleteProduct(event,params.row.name, params.row.packing)}
            onMouseDown={(event) => event.stopPropagation()}
                    >
              <DeleteIcon sx={{color: theme.palette.mode === 'dark' ? 'white' : 'black'}}/>
            </Button>
          ),
        },
      ];
    
    const email = sessionStorage.getItem('email');
    const [tableData, setTableData] = useState([]);
    const [openProductDialog, setOpenProductDialog] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        hsnCode: '',
        packing: '',
        company: '',
        box: '',
        pieces: '',
        mrp: '',
        quantityinCase: '',
        costPrice: '',
        sellingPrice: '',
        expiryDate: '',
        gst: '',
        quantity: '',
        description: '',
        boxorpiecesType: '',
        boxorpiecesValue: '',
        boxorpieces: '',
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openProductDescription, setOpenProductDescription] = useState(false);

  const handleOpenProductDialog = () => {
    setOpenProductDialog(true);
  };

  const handleRowClick = async (params) => {
    try {
      const response = await axios.post("http://localhost:8001/getProductDetails", { email, name: params.row.name, packing: params.row.packing });
      setSelectedProduct(response.data.product);
      setOpenProductDescription(true);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const handleDeleteProduct = async (event,name, packing) => {
    event.stopPropagation();
    if (window.confirm("Are you sure you want to delete this product?")) {
        try {
          await axios.post("http://localhost:8001/deleteProduct", { email, name, packing });
          fetchProducts();
        } catch (error) {
          console.error("Error deleting order:", error);
        }
      }
  }

  const handleCloseProductDialog = () => {
    setOpenProductDialog(false);
    setNewProduct({
      name: '',
      hsnCode: '',
      packing: '',
      company: '',
      box: '',
      pieces: '',
      mrp: '',
      quantityinCase: '',
      costPrice: '',
      sellingPrice: '',
      expiryDate: '',
      gst: '',
      quantity: '',
      description: '',
      image: null
    });
  };

  const handleProductUpdate = (updatedProduct) => {
    setTableData(prevData => prevData.map(product => 
      product._id === updatedProduct._id ? updatedProduct : product
    ));
  };
  const handleProductChange = (event) => {
    const { name, value } = event.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const updateBoxOrPieces = (type, value) => {
    if (type && value) {
      const boxorpieces = `${value} ${type}${value !== '1' ? 's' : ''}`;
      setNewProduct(prev => ({ ...prev, boxorpieces }));
    } else {
      setNewProduct(prev => ({ ...prev, boxorpieces: '' }));
    }
  };
  const handleSubmitProduct = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const boxorpieces = `${formJson.boxorpiecesValue} ${formJson.boxorpiecesType}`
   
    delete formJson.boxorpiecesType;
    delete formJson.boxorpiecesValue;

    const requestData = {
        email,
        ...formJson,
        boxorpieces
    }
    console.log("result", requestData)
    try {
        await axios.post("http://localhost:8001/addProduct", requestData);
        handleCloseProductDialog();
    } catch (error) {
        console.error("Error adding product:", error);
    }
};

  const fetchProducts = async () => {
    try {
        const res = await axios.post("http://localhost:8001/getTable", {email});
        setTableData(res.data.items);
    } catch (error) {
        console.log("Error fetching orders:", error);
    }
}
    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <Box 
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            height="75vh"
            paddingLeft= "40px"
        >
             <Button 
        color="primary" 
        startIcon={<AddIcon />} 
        sx={{color: colors.blueAccent[700], mb: 2}} 
        onClick={handleOpenProductDialog}
      >
        Add Product
      </Button>

      <Dialog open={openProductDialog} onClose={handleCloseProductDialog} fullWidth maxWidth="md">
        <DialogTitle>Add New Product</DialogTitle>
        <form onSubmit={handleSubmitProduct}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
              <TextField
                  fullWidth
                  multiline
                  rows={1}
                  name="name"
                  label="Name"
                  onChange={handleProductChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  name="description"
                  label="Description"
                  value={newProduct.description}
                  onChange={handleProductChange}
                />
              </Grid>
              {['hsnCode', 'packing', 'company', 'boxorpieces', 'mrp', 'quantityinCase', 'costPrice', 'sellingPrice', 'expiryDate', 'gst', 'quantity'].map((field) => (
              <Grid item xs={6} key={field}>
                {field === 'boxorpieces' ? (
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                        select
                        fullWidth
                        name="boxorpiecesType"
                        label="Box or Pieces"
                        value={newProduct.boxorpiecesType || ''}
                        required
                        onChange={(e) => {
                        handleProductChange(e);
                        updateBoxOrPieces(e.target.value, newProduct.boxorpiecesValue);
                        }}
                        >
                        <MenuItem value="Box">Box</MenuItem>
                        <MenuItem value="Pieces">Pieces</MenuItem>
                        </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                            fullWidth
                            name="boxorpiecesValue"
                            label="Quantity"
                            type="number"
                            value={newProduct.boxorpiecesValue || ''}
                            required
                            onChange={(e) => {
                            handleProductChange(e);
                            updateBoxOrPieces(newProduct.boxorpiecesType, e.target.value);
                        }}
                        /> 
                        </Grid>
                        </Grid>
                        ) : (
                        <TextField
                        fullWidth
                        name={field}
                        label={field.charAt(0).toUpperCase() + field.slice(1)}
                        value={newProduct[field]}
                        required
                        onChange={handleProductChange}
                        type={['mrp', 'quantityinCase', 'costPrice', 'sellingPrice', 'gst', 'quantity'].includes(field) ? 'number' : 'text'}
                    />
                    )}
                    </Grid>
                    ))}
                    </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseProductDialog}>Cancel</Button>
                        <Button type="submit">Add Product</Button>
                    </DialogActions>
                    </form>
                    </Dialog>
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
                        <DataGrid 
                        rows={tableData} 
                        columns={columns} 
                        getRowId={(row) => row._id} 
                        onRowClick={handleRowClick}
                        autoSize
                        />
                        </Box>
                        <ProductDescription
                        open={openProductDescription}
                        handleClose={() => setOpenProductDescription(false)}
                        product={selectedProduct}
                        onProductUpdate={handleProductUpdate}
                        />
                        </Box>
            );
}