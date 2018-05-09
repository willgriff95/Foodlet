UsersShowCtrl.$inject = ['Food', '$http', '$auth'];

function UsersShowCtrl(Food, $http, $auth){
  this.user = {};

  $http
    .get(`/api/users/${$auth.getPayload().sub}`)
    .then(res => this.user = res.data);

  function handleRequestAccept(foodId, requestId){
    Food
      .requestAccept(foodId, requestId);
  }
  this.handleRequestAccept = handleRequestAccept;
}
export default UsersShowCtrl;
