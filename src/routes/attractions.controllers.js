import express from 'express';
import attractions from '../data/attractions.json' with { type: 'json'};

const router = express.router();

router.get('/', (req, res) => {
    res.json(attractions);
});

export default router;