import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Grid, Button } from '@mui/material';

const ProductDescription = ({ open, handleClose, product }) => {
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
      </DialogContent>
      <Button onClick={handleClose}>Close</Button>
    </Dialog>
  );
};

export default ProductDescription;