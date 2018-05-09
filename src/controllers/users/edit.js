UsersEditCtrl.$inject = ['User', '$state'];

function UsersEditCtrl(User, $state){
  this.user = {};
  console.log('user id: ',$state.params.id);

  User
    .findById($state.params.id)
    .then(res => {
      console.log(res.data);
      this.user = res.data;
      console.log('THIS.USER',this.user);
    });

  function handleUpdate(){
    User
      .updateById($state.params.id, this.user)
      .then(() => $state.go('profile', $state.params));
  }
  this.handleUpdate = handleUpdate;
}

export default UsersEditCtrl;
