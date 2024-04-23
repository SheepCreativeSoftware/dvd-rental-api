import express from 'express';
import { getFilmById } from './getFilmById/handle';
import { getFilms } from './getFilms/handle';

const router = express.Router();

// Get All
router.get('/films', getFilms());
router.get('/films/:id', getFilmById());

export { router as filmsRouter };
