//Routes simply tell what endpoint, thats all
import express from 'express';
import {
  createNewBootcamps,
  deleteBootcampById,
  getAllBootcamps,
  updateBootcampById,
} from '../controllers/bootcampControllers';

let router = express.Router();

// @route - /api/v1/bootcamps/
router.route('/').get(getAllBootcamps).post(createNewBootcamps);

// @route - /api/v1/bootcamps/:id
router.route('/:id').put(updateBootcampById).delete(deleteBootcampById);

export default router;
