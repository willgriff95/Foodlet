UsersEditCtrl.$inject = ['User', '$state'];

function UsersEditCtrl(User, $state){
  this.user = {};

  User.findById($state.params.id)
    .then(res => this.user = res.data);

  function handleUpdate(){
    User.updateById($state.params.id, this.user)
      .then(() => $state.go('usersShow', $state.params));
  }
  this.handleUpdate = handleUpdate;
}

export default UsersEditCtrl;
