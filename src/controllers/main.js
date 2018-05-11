MainCtrl.$inject = ['$rootScope','$timeout', '$transitions', '$auth', '$state'];

function MainCtrl($rootScope, $timeout, $transitions, $auth, $state){

  // this.ModalIsOpen = false;

  this.isAuthenticated = $auth.isAuthenticated;

  this.currentUser = JSON.parse(localStorage.getItem('currentUser'));


  // flash messages
  this.flashMessage = null;
  $rootScope.$on('flashMessage', (e, data) => {
    this.flashMessage = data;
    $timeout(() => this.flashMessage = null, 2000);
  });

  $rootScope.$on('loggedIn', (e, data) => {
    this.currentUser = data;
    localStorage.setItem('currentUser', JSON.stringify(data));
  });


  // logout function

  function logout(){
    $auth.logout();
    $state.go('home');
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  this.logout = logout;
}

export default MainCtrl;
