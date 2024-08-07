import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Grid, Button, TextField } from '@mui/material';
import axios from 'axios';

const ProductDescription = ({ open, handleClose, product, onProductUpdate }) => {
  if (!product) return null;

  const { name, description, _id, email, __v, ...otherDetails } = product;

  const headerNames = {
    hsnCode: 'HSN Code',
    packing: 'Packing',
    company: 'Company',
    boxorpieces: 'Box/Pieces',
    mrp: 'MRP',
    quantityinCase: 'Quantity in Case',
    costPrice: 'Cost Price',
    sellingPrice: 'Selling Price',
    expiryDate: 'Expiry Date',
    gst: 'GST',
    quantity: 'Quantity'
  };

  const [quantityToAdd, setQuantityToAdd] = useState('');

  const addQuantity = async () => {
    if (!quantityToAdd || isNaN(quantityToAdd) || parseInt(quantityToAdd) <= 0) {
      alert('Please enter a valid quantity');
      return;
    }

    try {
      const response = await axios.post("http://localhost:8001/addQuantity", {
        email,
        name: product.name,
        packing: product.packing,
        quantityToAdd: parseInt(quantityToAdd)
      });

      if (response.data.success) {
        alert('Quantity added successfully');
        setQuantityToAdd('');
        onProductUpdate(response.data.updatedProduct);
      } else {
        alert('Failed to add quantity');
      }
    } catch (error) {
      console.error("Error adding quantity:", error);
      alert('An error occurred while adding quantity');
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant='h1'>
          {name}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" paragraph>{description}</Typography>
        <Grid container spacing={2}>
          {Object.entries(otherDetails).map(([key, value]) => (
            <Grid item xs={6} key={key}>
              <Typography variant="subtitle1">{headerNames[key] || key}:</Typography>
              <Typography variant="body1">{value}</Typography>
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={2} alignItems="center" style={{ marginTop: '20px' }}>
          <Grid item>
            <TextField
              type="number"
              label="Quantity to Add"
              value={quantityToAdd}
              onChange={(e) => setQuantityToAdd(e.target.value)}
              inputProps={{ min: 1 }}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={addQuantity}>
              Add Quantity
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
      <Button onClick={handleClose}>Close</Button>
    </Dialog>
  );
};

export default ProductDescription;