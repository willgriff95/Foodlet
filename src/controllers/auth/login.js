LoginCtrl.$inject = ['$auth', '$state', '$rootScope'];
function LoginCtrl($auth, $state, $rootScope){
  this.data = {};
  // let currentUser;

  function handleLogin(){
    if(this.form.$invalid) return false;

    $auth.login(this.data)
      .then(res => $rootScope.$broadcast('loggedIn', res.data.user))
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
