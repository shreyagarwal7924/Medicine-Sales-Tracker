import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Grid, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const OrderDescription = ({ open, handleClose, order }) => {
  if (!order) return null;

  const { orderNumber, name, contact, date, subtotal, products, _id, email, __v, ...otherDetails } = order;

  const headerNames = {
    orderNumber: 'Order Number',
    name: 'Customer Name',
    contact: 'Contact',
    date: 'Order Date',
    subtotal: 'Subtotal'
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Order Details - #{orderNumber}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {Object.entries({ orderNumber, name, contact, date, subtotal }).map(([key, value]) => (
            <Grid item xs={6} key={key}>
              <Typography variant="subtitle1">{headerNames[key] || key}:</Typography>
              <Typography variant="body1">{value}</Typography>
            </Grid>
          ))}
        </Grid>
        <Typography variant="h6" style={{ marginTop: '20px', marginBottom: '10px' }}>Products:</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Discount</TableCell>
              <TableCell>GST</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={index}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.sellingPrice}</TableCell>
                <TableCell>{product.discount}%</TableCell>
                <TableCell>{product.gst}%</TableCell>
                <TableCell>{product.amount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
      <Button onClick={handleClose}>Close</Button>
    </Dialog>
  );
};

export default OrderDescription;