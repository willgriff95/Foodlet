RegisterCtrl.$inject = ['$auth', '$state'];

function RegisterCtrl($auth, $state) {
  this.data = {};

  function handleRegister(){
    $auth.signup(this.data)
      .then(() => $state.go('login'));
  }
  this.handleRegister = handleRegister;
}

export default RegisterCtrl;
