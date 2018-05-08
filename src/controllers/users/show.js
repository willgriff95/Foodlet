UsersShowCtrl.$inject = ['$http', '$auth'];

function UsersShowCtrl($http, $auth){
  this.user = {};

  $http
    .get(`/api/users/${$auth.getPayload().sub}`)
    .then(res => this.user = res.data);
}
export default UsersShowCtrl;
