import express from 'express';
import { addActor } from './addActor/handle';
import { getActor } from './getActor/handle';
import { getActors } from './getActors/handle';
import { removeActor } from './removeActor/handle';
import { updateActor } from './updateActor/handle';

const router = express.Router();

router.get('/actors', getActors());
router.get('/actors/:id', getActor());
router.post('/actors', addActor());
router.put('/actors/:id', updateActor());
router.delete('/actors/:id', removeActor());

export { router as actorRouter };
