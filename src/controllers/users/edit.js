UsersEditCtrl.$inject = ['User', '$state', '$rootScope'];

function UsersEditCtrl(User, $state, $rootScope){
  this.user = {};

  User
    .findById($state.params.id)
    .then(res => {
      this.user = res.data;
    });

  function handleUpdate(){
    User
      .updateById($state.params.id, this.user)
      .then(res => $rootScope.$broadcast('loggedIn', res.data))
      .then(() => $state.go('profile', $state.params));
  }
  this.handleUpdate = handleUpdate;
}

export default UsersEditCtrl;
