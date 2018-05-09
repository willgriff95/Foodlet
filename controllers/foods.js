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
  //if request.user === req.body.user, return 'accepted'. Else return 'rejected'.

  //This backend should check each request to see if it's accepted.
  // If one is accepted, reject all others, and set the food's active property to false.
  Food
    .findById(req.params.id)
    .exec()
    .then(food => {
      // console.log('req.body.user--->', req.body);
      food.requests = food.requests.map(request => {
        request.status = request.user.equals(req.params.requestId) ? 'accepted' : 'rejected';
        return request;
      });
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
  requestAccept: foodsRequestAccept
};
