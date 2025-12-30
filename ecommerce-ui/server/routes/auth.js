import express from 'express';
const router = express.Router();
import fetch from 'node-fetch';

const PROFILE_API_HOST =
  process.env.PROFILE_API_HOST || process.env.REACT_APP_PROFILE_API_HOST;

router.post('/signup', async (req, res) => {
  try {
    const response = await fetch(`${PROFILE_API_HOST}/api/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.json(data);
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/signin', async (req, res) => {
  try {
    const response = await fetch(`${PROFILE_API_HOST}/api/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.json(data);
  } catch (error) {
    console.error('Error signing in:', error);
    res.status(500).json({ error: error.message });
  }
});

router.put('/profile', async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const response = await fetch(`${PROFILE_API_HOST}/api/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.json(data);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
