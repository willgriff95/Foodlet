UsersShowCtrl.$inject = ['$http', '$state'];

function UsersShowCtrl($http, $state){
  this.user = {};

  $http
    .get(`/api/users/${$state.params.id}`)
    .then(res => this.user = res.data);
}
export default UsersShowCtrl;
