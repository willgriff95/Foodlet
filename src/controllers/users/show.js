UsersShowCtrl.$inject = ['Food', 'User', '$auth'];

function UsersShowCtrl(Food, User, $auth){
  this.user = {};

  User
    .findById($auth.getPayload().sub)
    .then(res => this.user = res.data);

  function handleRequestAccept(foodId, requestId){
    Food
      .requestAccept(foodId, requestId)
      .then(res => {
        const index = this.user.foods.findIndex(food => food._id === res.data._id);
        this.user.foods.splice(index, 1, res.data);
      });
  }
  this.handleRequestAccept = handleRequestAccept;
}
export default UsersShowCtrl;
