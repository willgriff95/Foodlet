const Food = require('../models/food');

function foodsIndex(req, res, next){
  Food
    .find()
    .populate('user')
    .exec()
    .then(foods => res.json(foods))
    .catch(next);
}

function foodsShow(req, res, next){
  Food
    .findById(req.params.id)
    .populate('user')
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

function foodsRequestCreate(req, res, next){
  req.body.user = req.currentUser;
  Food
    .findById(req.params.id)
    .exec()
    .then(food => {
      food.requests.push(req.body);
      return food.save();
    })
    .then(food => res.json(food))
    .catch(next);
}

function foodsRequestAccept(req, res, next) {
  // console.log('req.body: ', req.body);

  Food
    .findById(req.params.id)
    .exec()
    .then(food => {
      food.active = false;
      food.requests = food.requests.map(request => {
        request.status = request._id.equals(req.params.requestId) ? 'accepted' : 'rejected';
        return request;
      });
      return food.save();
    })
    .then(food => Food.populate(food, { path: 'requests.user' }))
    .then(food => res.json(food))
    .catch(next);
}

function foodsRelistItem(req, res, next){
  Food
    .findById(req.params.id)
    .exec()
    .then(food => {
      food.active = true;
      food.requests = [];
      return food.save();
    })
    .then(food => res.json(food))
    .catch(next);
}


module.exports = {
  index: foodsIndex,
  show: foodsShow,
  create: foodsCreate,
  update: foodsUpdate,
  delete: foodsDelete,
  requestCreate: foodsRequestCreate,
  requestAccept: foodsRequestAccept,
  relistItem: foodsRelistItem
};
