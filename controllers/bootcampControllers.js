//When we hit the route, run this function

export const getAllBootcamps = (req, res, next) => {
  res.send('Get all');
};

export const createNewBootcamps = (req, res, next) => {
  res.send('Create new  ');
};

export const updateBootcampById = (req, res, next) => {
  res.send('Update Bootcamp ' + req.params);
};

export const deleteBootcampById = (req, res, next) => {
  res.send('Delete Bootcamp');
};
