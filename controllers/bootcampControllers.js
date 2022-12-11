//When we hit the route, run this function (controller)

import { Bootcamp } from './../models/Bootcamp.js';
import { asyncHandler } from './../middleware/asyncHandler.js';
import { ErrorResponse } from '../utils/errorResponse.js';

export const getAllBootcamps = asyncHandler(async (req, res, next) => {
  console.log(req.query);

  let query;

  const reqQuery = { ...req.query };

  const removeFields = ['sort'];

  // deleting the property from object
  removeFields.forEach((value) => delete reqQuery[value]);

  let queryString = JSON.stringify(reqQuery);

  queryString = queryString.replace(
    /\b(gt|gte|lt|in|lte)\b/g,
    (match) => `$${match}`
  );

  query = Bootcamp.find(JSON.parse(queryString));

  if (req.query.sort) {
    const sortByArr = req.query.sort.split(',');

    const sortByStr = sortByArr.join(' ');

    query = query.sort(sortByStr);
  } else {
    query = query.sort('-price');
  }

  // waiting for the query to resolve
  const bootcamps = await query;

  res.status(200).json({
    success: bootcamps.length && true,
    data: bootcamps,
  });
});

export const createNewBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);

  res.status(201).json({ success: true, data: bootcamp });
});

export const updateBootcampById = asyncHandler(async (req, res, next) => {
  let bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp with id ${req.params.id} does not exist`, 404)
    );
  }

  bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    success: true,
    data: bootcamp,
  });
});

export const deleteBootcampById = asyncHandler(async (req, res, next) => {
  let bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp with id ${req.params.id} does not exist`, 404)
    );
  }

  await Bootcamp.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
