//Routes simply tell what endpoint, thats all
import express from 'express';
import {
  createNewBootcamps,
  deleteBootcampById,
  getAllBootcamps,
  getSingleBootcamp,
  updateBootcampById,
} from '../controllers/bootcampControllers.js';

let router = express.Router();

// @route - /api/v1/bootcamps/
router.route('/').get(getAllBootcamps).post(createNewBootcamps);

// @route - /api/v1/bootcamps/:id
router
  .route('/:id')
  .get(getSingleBootcamp)
  .put(updateBootcampById)
  .delete(deleteBootcampById);

export default router;
