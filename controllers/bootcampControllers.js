//When we hit the route, run this function (controller)

import { Bootcamp } from './../models/Bootcamp.js';
import { asyncHandler } from './../middleware/asyncHandler.js';
import { ErrorResponse } from '../utils/errorResponse.js';

export const getAllBootcamps = asyncHandler(async (req, res, next) => {
  console.log(req.query);

  let query;
  let uiValues = {
    filtering: {},
    sorting: {},
  };
  const reqQuery = { ...req.query };

  const removeFields = ['sort'];

  // deleting the property from object
  removeFields.forEach((value) => delete reqQuery[value]);

  const filterKeys = Object.keys(reqQuery);

  const filterValues = Object.values(reqQuery);

  filterKeys.forEach(
    (value, idx) => (uiValues.filtering[value] = filterValues[idx])
  );

  let queryString = JSON.stringify(reqQuery);

  queryString = queryString.replace(
    /\b(gt|gte|lt|in|lte)\b/g,
    (match) => `$${match}`
  );

  query = Bootcamp.find(JSON.parse(queryString));

  if (req.query.sort) {
    const sortByArr = req.query.sort.split(',');

    sortByArr.forEach((value) => {
      let order;

      if (value[0] === '-') {
        order = 'descending';
      } else {
        order = 'ascending';
      }

      uiValues.sorting[value.replace('-', '')] = order;
    });

    const sortByStr = sortByArr.join(' ');

    query = query.sort(sortByStr);
  } else {
    query = query.sort('-price');
  }

  // waiting for the query to resolve
  const bootcamps = await query;

  const maxPrice = await Bootcamp.find()
    .sort({ price: -1 })
    .limit(1)
    .select('-_id price');

  const minPrice = await Bootcamp.find()
    .sort({ price: 1 })
    .limit(1)
    .select('-_id price');

  uiValues.maxPrice = maxPrice[0].price;
  uiValues.minPrice = minPrice[0].price;

  res.status(200).json({
    success: bootcamps.length && true,
    data: bootcamps,
    uiValues,
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
