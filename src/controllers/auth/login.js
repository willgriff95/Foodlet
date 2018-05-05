LoginCtrl.$inject = ['$auth', '$state', '$http'];
//$auth refers to a package called satellizer.
function LoginCtrl($auth, $state, $http){
  this.data = {};
  this.currentUser = {};

  function handleLogin(){
    if(this.form.$invalid) return false;
    const vm = this.data;

    $auth.login(this.data)
      .then(() => {
        $http
          .get('/api/users')
          .then(res => {
            res.forEach(function(user){
              if(user.username === vm.username){
                this.currentUser = user;
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
}

export default LoginCtrl;
