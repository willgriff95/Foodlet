LoginCtrl.$inject = ['$auth', '$state', '$http', '$rootScope'];
function LoginCtrl($auth, $state, $http, $rootScope){
  this.data = {};
  // let currentUser;

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
                $rootScope.currentUser = user;
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
