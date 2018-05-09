UsersShowCtrl.$inject = ['Food', 'User', '$auth'];

function UsersShowCtrl(Food, User, $auth){
  this.user = {};

  User
    .findById($auth.getPayload().sub)
    .then(res => this.user = res.data);

  function handleRequestAccept(foodId, requestId){
    Food
      .requestAccept(foodId, requestId);
  }
  this.handleRequestAccept = handleRequestAccept;
}
export default UsersShowCtrl;
