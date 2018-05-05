RegisterCtrl.$inject = ['$auth', '$state'];

function RegisterCtrl($auth, $state) {
  this.data = {};

  function handleRegister(){
    if(this.form.$invalid) return false;

    $auth.signup(this.data)
      .then(() => $state.go('login'));
  }
  this.handleRegister = handleRegister;
}

export default RegisterCtrl;
