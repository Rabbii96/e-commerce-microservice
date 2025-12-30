import express from 'express';
const router = express.Router();

import fetch from 'node-fetch';

const ORDER_API_HOST = process.env.REACT_APP_ORDER_API_HOST;
// example: http://order-management:9090

// ADD TO CART
router.post('/orders/:userId/cart', async (req, res) => {
  try {
    const response = await fetch(
      `${ORDER_API_HOST}/api/orders/${req.params.userId}/cart`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
      }
    );

    const data = await response.text();
    res.send(data);
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET CART
router.get('/orders/:userId/cart', async (req, res) => {
  try {
    const response = await fetch(
      `${ORDER_API_HOST}/api/orders/${req.params.userId}/cart`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ error: error.message });
  }
});

// SUBTOTAL
router.get('/orders/:userId/cart/subtotal', async (req, res) => {
  try {
    const response = await fetch(
      `${ORDER_API_HOST}/api/orders/${req.params.userId}/cart/subtotal`
    );
    const data = await response.text();
    res.send(data);
  } catch (error) {
    console.error('Error fetching subtotal:', error);
    res.status(500).json({ error: error.message });
  }
});

// SHIPPING
router.get('/orders/:userId/cart/shipping', async (req, res) => {
  try {
    const response = await fetch(
      `${ORDER_API_HOST}/api/orders/${req.params.userId}/cart/shipping`
    );
    const data = await response.text();
    res.send(data);
  } catch (error) {
    console.error('Error fetching shipping total:', error);
    res.status(500).json({ error: error.message });
  }
});

// PURCHASE
router.post('/orders/:userId/purchase', async (req, res) => {
  try {
    const response = await fetch(
      `${ORDER_API_HOST}/api/orders/${req.params.userId}/purchase`,
      { method: 'POST' }
    );
    const data = await response.text();
    res.send(data);
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
