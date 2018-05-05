LoginCtrl.$inject = ['$auth', '$state', '$http'];
//$auth refers to a package called satellizer.
function LoginCtrl($auth, $state, $http){
  this.data = {};
  const _this = this;
  this.currentUser = {};

  function handleLogin(){
    if(this.form.$invalid) return false;
    const vm = this.data;

    $auth.login(this.data)
      .then(() => {
        $http
          .get('/api/users')
          .then(res => {
            // console.log(res.data, vm.email);
            res.data.forEach(function(user){
              if(user.email === vm.email){
                _this.currentUser = user;
                // console.log($scope.currentUser.location);
              }
            });
          });
      })
      .then(()=> $state.go('foodsIndex'));
  }

  function authenticate(provider){
    $auth.authenticate(provider)
      .then(() => $state.go('foodsIndex'));
  }

  this.handleLogin = handleLogin;
  this.authenticate = authenticate;
  console.log('this.currentUser:', this.currentUser);
}

export default LoginCtrl;
