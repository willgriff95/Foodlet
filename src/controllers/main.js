MainCtrl.$inject = ['$rootScope','$timeout', '$transitions', '$auth', '$state'];

function MainCtrl($rootScope, $timeout, $transitions, $auth, $state){
  this.navBarIsOpen = false;
  this.isHome = true;

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
  // end flash messages

  $transitions.onSuccess({}, (transition) => {
    this.isHome = (transition.to().name === 'home');
    this.navBarIsOpen = false;
  });

  function toggleNav(){
    console.log('clicked!');
    this.navBarIsOpen = !this.navBarIsOpen;
  }

  function logout(){
    $auth.logout();
    $state.go('home');
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  this.toggleNav = toggleNav;
  this.logout = logout;

}

export default MainCtrl;
