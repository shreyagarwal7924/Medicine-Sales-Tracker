import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Typography, InputLabel,FormControl, Select, OutlinedInput, MenuItem, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from "@emotion/react";
import { token } from '../theme';
import { Grid } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import OrderDescription from './OrderDescription'


export default function CustomerTable() {
    const columns = [
        { field: 'name', headerName: 'Name', flex: 1, minWidth: 150, resizable: false },
        { field: 'email', headerName: 'Email',  minWidth: 150, flex: 1, resizable: false , cellClassName: "name-column--cell"},
        { field: 'phone', headerName: 'Phone Number', flex: 1, minWidth: 150, resizable: false , headerAlign: "left", align: "left"},
        { field: 'address', headerName: 'Address', flex:1, resizable: false , minWidth: 150},
        {field: 'subtotal', headerName: 'Sub Total', flex:1, resizable: false, minWidth: 150},
        {field: '', width: 100,
          renderCell: (params) => (
            <Button 
            onClick={(event) => handleDeleteOrder(event, params.row.orderNumber)}
            onMouseDown={(event) => event.stopPropagation()}
            >
            <DeleteIcon sx={{color: "white"}}/>
            </Button>
          ),
        },
      ];

    const [tableData, setTableData] = useState([]);
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const colors = token(theme.palette.mode);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [orderProducts, setOrderProducts] = useState([]);
    const [orderNumber, setOrderNumber] = useState();
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orderDescriptionOpen, setOrderDescriptionOpen] = useState(false);
    const email = sessionStorage.getItem('email');

    const handleDeleteOrder = async (event,orderNumber) => {
        event.stopPropagation();
        if (window.confirm("Are you sure you want to delete this order?")) {
          try {
            await axios.post("http://localhost:7001/deleteOrder", { email, orderNumber });
            fetchOrders();
          } catch (error) {
            console.error("Error deleting order:", error);
          }
        }
    };
    const fetchLastOrderNumber = async () => {
        axios.post("http://localhost:7001/getLastOrderNumber", {email})
        .then(res => {
            console.log("result", res.data.nextOrderNumber);
            setOrderNumber(res.data.nextOrderNumber);
        })
        .catch(error => {
            console.error("Error fetching the Order Number:", error.response ? error.response.data : error.message);
            // Set a default value if fetching fails
            setOrderNumber(1);
        });
    }
    const fetchProducts = async () => {
        try {
            const res = await axios.post("http://localhost:8001/getProducts", {email})
            setProducts(res.data.items);
        } catch (error) {
            console.log("Error fetching products: ", error.response? error.response.data : error.message)
        }
    }

    const fetchOrders = async () => {
        try {
            const res = await axios.post("http://localhost:7001/getTable", {email});
            setTableData(res.data.items);
        } catch (error) {
            console.log("Error fetching orders:", error);
        }
    }

    const addProductToOrder = () => {
        if (!selectedProduct) return;
        
        const product = products.find(p => p._id === selectedProduct);
        if (!product) return;
    
        const newOrderProduct = {
            id: orderProducts.length + 1,
            hsnCode: product.hsnCode,
            name: product.name,
            quantity: 1,
            sellingPrice: product.sellingPrice || 0,
            discount: 0,
            gst: product.gst || 0,
            amount: product.sellingPrice || 0,
            availableQuantity: product.quantity
        };
    
        setOrderProducts([...orderProducts, newOrderProduct]);
        setSelectedProduct('');
    };

    const updateOrderProduct = (id, field, value) => {
        const updatedProducts = orderProducts.map(product => {
            if (product.id === id) {
                let updatedValue = value;
                if (field === 'quantity') {
                    updatedValue = Math.min(Math.max(1, parseInt(value)), product.availableQuantity);
                }
                const updatedProduct = { ...product, [field]: updatedValue };
                updatedProduct.amount = calculateAmount(updatedProduct);
                return updatedProduct;
            }
            return product;
        });
        setOrderProducts(updatedProducts);
    };
    
    const calculateAmount = (product) => {
        const quantity = Number(product.quantity) || 0;
        const sellingPrice = Number(product.sellingPrice) || 0;
        const discount = Number(product.discount) || 0;
        const gst = Number(product.gst) || 0;
    
        const subtotal = quantity * sellingPrice;
        const discountAmount = subtotal * (discount / 100);
        const afterDiscount = subtotal - discountAmount;
        const gstAmount = afterDiscount * (gst / 100);
        return afterDiscount + gstAmount;
    };

    const calculateSubtotal = () => {
        return orderProducts.reduce((sum, product) => sum + product.amount, 0).toFixed(2);
    };

    useEffect(() => {
        fetchOrders();
        fetchProducts();
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
        fetchLastOrderNumber();
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOrderClick = async (orderNumber) => {
        try {
            const response = await axios.post("http://localhost:7001/getOrderDetails", { email, orderNumber });
            setSelectedOrder(response.data.order);
            setOrderDescriptionOpen(true);
        } catch (error) {
            console.error("Error fetching order details:", error);
        }
    };

    const handleCloseOrderDescription = () => {
        setOrderDescriptionOpen(false);
        setSelectedOrder(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
    
        if (!formJson.date) {
            formJson.date = new Date().toISOString().split('T')[0];
        }
        const requestData = {
            email,
            orderNumber: Number(orderNumber),
            ...formJson,
            products: orderProducts.map(p => ({
                name: p.name,
                quantity: p.quantity,
                sellingPrice: p.sellingPrice,
                discount: p.discount,
                gst: p.gst,
                amount: p.amount
            })),
            subtotal: calculateSubtotal()
        };
    
        try {
            const orderResponse = await axios.post("http://localhost:7001/add", requestData);
            console.log("Order added successfully:", orderResponse.data);
            for (const product of orderProducts) {
                try {
                    await axios.post("http://localhost:8001/updateInventory", {
                        email,
                        name: product.name,
                        quantityToSubtract: product.quantity
                    });
                    console.log(`Inventory updated for ${product.name}`);
                } catch (error) {
                    console.error(`Error updating inventory for ${product.name}:`, error);
                }
            }
            handleClose();
            fetchOrders();
            fetchLastOrderNumber();
            fetchProducts();
        } catch (error) {
            console.error("Error adding order:", error);
            alert("An error occurred while adding the order. Please try again.");
        }
    };

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
                onClick={handleClickOpen}
            >
                Add Order
            </Button>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg" 
            PaperProps={{
                sx: {
                    width: '80%',
                    height: '80%',
                    maxHeight: 'none',
                    maxWidth: 'none',
                }
            }}
            sx={{
                "& .MuiDialog-paper": {
                    backgroundColor: theme.palette.mode === 'dark' ? '#1f2a40' : 'white'
                }
            }}>
                <DialogTitle sx= {{fontWeight:"800px"}}>
                    <Typography variant="h1"  color= {theme.palette.mode === 'dark' ? 'white' : 'black'}>
                        Create New Order
                    </Typography>
                </DialogTitle>
                <form onSubmit={handleSubmit} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <DialogContent sx={{ flexGrow: 1, overflow: 'auto' }}>
                    <Typography variant="h5" color={colors.greenAccent[400]}>
                        Order details:
                    </Typography>
                    <Grid container spacing={2} sx={{m: "5px 0 0 0"}}>
                        <Grid item xs={3}>
                            <TextField
                            autoFocus
                            id="orderNumber"
                            name="orderNumber"
                            label="Order Number"
                            type="text"
                            value={orderNumber}
                            disabled= {true}
                            fullWidth
                            variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                id="name"
                                name="name"
                                label="Name"
                                type="text"
                                fullWidth
                                required
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                id="contact"
                                name="contact"
                                label="Contact"
                                type="text"
                                fullWidth
                                required
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                id="date"
                                name="date"
                                label="Date"
                                type="date"
                                fullWidth
                                variant="outlined"
                                defaultValue={new Date().toISOString().split('T')[0]}
                                required
                                InputLabelProps={{
                                shrink: true,}}
                            />
                        </Grid>
                    </Grid>
                    <Typography variant="h5" color={colors.greenAccent[400]} sx={{ mb: 2, mt: 2 }}>
                            Products:
                    </Typography>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={9}>
                            <FormControl fullWidth>
                        <InputLabel>Select Product</InputLabel>
                        <Select 
                        value={selectedProduct}
                        onChange={(e) => setSelectedProduct(e.target.value)}
                        input={<OutlinedInput label="Select Product" />}
                        >
                            {products.map((product) => (
                            <MenuItem key={product._id} value={product._id}>
                                {`${product.name}  - HSN: ${product.hsnCode} - Qty: ${product.quantity}`}
                            </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                <Button onClick={addProductToOrder} variant="contained" color="primary">
                    Add Product
                </Button>
                </Grid>
                </Grid>
                <Box sx={{ mt: 2, maxHeight: '300px', overflowY: 'auto' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>S.No</TableCell>
                                <TableCell>HSN Code</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Rate</TableCell>
                                <TableCell>Discount (%)</TableCell>
                                <TableCell>GST (%)</TableCell>
                                <TableCell>Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orderProducts.map((product) => (
                            <TableRow key={product.id}>
                            <TableCell>{product.id}</TableCell>
                            <TableCell>{product.hsnCode}</TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>
                                <TextField
                                type="number"
                                value={product.quantity}
                                onChange={(e) => updateOrderProduct(product.id, 'quantity', e.target.value)}
                                inputProps={{ min: 0, max: product.availableQuantity }}
                                />  
                            </TableCell>
                            <TableCell>{product.sellingPrice}</TableCell>
                            <TableCell>
                                <TextField
                                type="number"
                                value={product.discount}
                                onChange={(e) => updateOrderProduct(product.id, 'discount', e.target.value)}
                                inputProps={{ min: 0, max: 100 }}
                                />
                            </TableCell>
                            <TableCell>{product.gst}</TableCell>
                            <TableCell>{(product.amount || 0).toFixed(2)}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Typography variant="h5" color={colors.greenAccent[400]}>
                        Subtotal: {calculateSubtotal()}
                    </Typography>
                </Box>
                    </DialogContent>
                    <DialogActions  sx={{ justifyContent: 'flex-end', p: 2 }}>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Add</Button>
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
                    onRowClick={(params) => handleOrderClick(params.row.orderNumber)}
                    autoSize
                />
            </Box>
            <OrderDescription
                open={orderDescriptionOpen}
                handleClose={handleCloseOrderDescription}
                order={selectedOrder}
            />
        </Box>
    );
}