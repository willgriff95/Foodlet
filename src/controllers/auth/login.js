LoginCtrl.$inject = ['$auth', '$state'];
//$auth refers to a package called satellizer.
function LoginCtrl($auth, $state){
  this.data = {};

  function handleLogin(){
    $auth.login(this.data)
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
