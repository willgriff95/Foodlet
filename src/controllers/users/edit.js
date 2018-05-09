UsersEditCtrl.$inject = ['$http', '$state'];

function UsersEditCtrl($http, $state){
  this.user = {};
  console.log('user id: ',$state.params.id);

  $http.get(`/api/users/${$state.params.id}`)
    .then(res => {
      console.log(res.data);
      this.user = res.data;
      console.log('THIS.USER',this.user);
    });

  function handleUpdate(){
    if(this.form.$invalid) return false;

    $http
      .put(`/api/users/${$state.params.id}`, this.user);
    // .then(() => $state.go('usersShow', $state.params));
  }
  this.handleUpdate = handleUpdate;
}

export default UsersEditCtrl;
