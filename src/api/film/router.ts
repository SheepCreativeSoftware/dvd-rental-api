import express from 'express';
import { getFilm } from './getFilm/handle';
import { getFilmsBySearch } from './searchFilms/handle';

const router = express.Router();

router.get('/films/search', getFilmsBySearch());
router.get('/films/:id', getFilm());

export { router as filmsRouter };
