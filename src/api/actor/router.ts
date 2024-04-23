import express from 'express';
import { createActor } from './createActor/handle';
import { getActorById } from './getActorById/handle';
import { getActors } from './getActors/handle';
import { deleteActor } from './deleteActor/handle';
import { updateActor } from './updateActor/handle';

const router = express.Router();

router.get('/actors', getActors());
router.get('/actors/:id', getActorById());
router.post('/actors', createActor());
router.put('/actors/:id', updateActor());
router.delete('/actors/:id', deleteActor());

export { router as actorRouter };
