import express from 'express';

const router = express.Router();

router.get('/login');
router.post('/login');

export { router as sessionRouter };
