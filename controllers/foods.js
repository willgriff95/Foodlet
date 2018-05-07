const Food = require('../models/food');

function foodsIndex(req, res, next){
  Food
    .find()
    .exec()
    .then(foods => res.json(foods))
    .catch(next);           
}

function foodsShow(req, res, next){
  Food
    .findById(req.params.id)
    .exec()
    .then(food => {
      if(!food) return res.sendStatus(404);
      res.json(food);
    })
    .catch(next);
}

function foodsCreate(req, res, next){
  req.body.createdBy = req.currentUser;
  Food
    .create(req.body)
    .then(food => res.status(201).json(food))
    .catch(next);
}

function foodsUpdate(req, res, next){
  Food
    .findById(req.params.id)
    .then(food => {
      if(!food) return res.sendStatus(404);
      return Object.assign(food, req.body);
    })
    .then(food =>  food.save())
    .then(food => res.json(food))
    .catch(next);
}

function foodsDelete(req, res, next){
  Food
    .findById(req.params.id)
    .then(food => {
      if(!food) return res.sendStatus(404);
      return food.remove();
    })
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  index: foodsIndex,
  show: foodsShow,
  create: foodsCreate,
  update: foodsUpdate,
  delete: foodsDelete
};
