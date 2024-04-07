import express from 'express';
import { getCsrfToken } from './getToken/handle';

const router = express.Router();

router.get('/csrf-token', getCsrfToken());

export { router as csrfTokenRouter };
